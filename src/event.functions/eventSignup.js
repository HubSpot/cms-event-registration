const util = require('util');
const request = util.promisify(require('request'));

const HUBDB_API = 'https://api.hubspot.com/cms/v3/hubdb';
const FORMS_API = `https://api.hsforms.com/submissions/v3/integration/submit`;
const APIKEY = process.env.APIKEY;

exports.main = ({ body, accountId }, sendResponse) => {
  if (!APIKEY) {
    sendResponse({
      statusCode: 403,
      body: { message: 'API key not present' },
    });
  }

  const {
    form_guid,
    email,
    firstName,
    lastName,
    rowId,
    pageName,
    pageUri,
    utk,
  } = body;

  const defaultParams = {
    portalId: accountId,
    hapikey: APIKEY,
  };

  const getRow = async id => {
    const { statusCode, body } = await request({
      baseUrl: HUBDB_API,
      json: true,
      uri: `/tables/events/rows/${id}`,
      qs: defaultParams,
    });

    if (statusCode != 200) {
      sendResponse({
        statusCode: 500,
        body: {
          message: body.message,
        },
      });
    }

    return body.values;
  };

  const incrementAttendeeCount = async id => {
    const { registered_attendee_count } = await getRow(id);

    if (!registered_attendee_count) {
      sendResponse({
        statusCode: 500,
        body: { message: 'Invalid attendee count value' },
      });
    }

    const updatedRow = {
      registered_attendee_count: registered_attendee_count + 1,
    };

    const { statusCode, body } = await request({
      baseUrl: HUBDB_API,
      method: 'PATCH',
      json: true,
      uri: `/tables/events/rows/${id}/draft`,
      qs: defaultParams,
      body: { values: updatedRow },
    });

    if (statusCode != 200) {
      sendResponse({
        statusCode: 500,
        body: { message: body.message },
      });
    }

    return body;
  };

  const publishTable = async id => {
    const updatedTable = await incrementAttendeeCount(id);

    const { statusCode, body } = await request({
      baseUrl: HUBDB_API,
      method: 'POST',
      json: true,
      simple: true,
      uri: `/tables/events/draft/push-live`,
      qs: defaultParams,
    });

    if (statusCode != 200) {
      sendResponse({
        statusCode: 500,
        body: { message: body.message },
      });
    }

    return updatedTable;
  };

  const updateContact = async () => {
    const formApiWithGuid = `${FORMS_API}/${accountId}/${form_guid}`;

    const { statusCode, body } = await request({
      method: 'POST',
      json: true,
      simple: true,
      uri: formApiWithGuid,
      body: {
        fields: [
          {
            name: 'firstname',
            value: firstName,
          },
          {
            name: 'lastname',
            value: lastName,
          },
          {
            name: 'email',
            value: email,
          },
        ],
        context: {
          pageUri: pageUri,
          pageName: pageName,
          hutk: utk,
        },
      },
    });

    if (statusCode != 200) {
      sendResponse({
        statusCode: 500,
        body: { message: body.message },
      });
    }

    return body;
  };

  (async () => {
    try {
      const updatedTable = await publishTable(rowId);
      const updatedContact = await updateContact();

      sendResponse({
        statusCode: 200,
        body: {
          rowUpdate: updatedTable,
          contactUpdate: updatedContact,
        },
      });
    } catch (e) {
      sendResponse({
        statusCode: 500,
        body: {
          message: 'There was a problem updating this registration',
          error: e.message,
        },
      });
    }
  })();
};
