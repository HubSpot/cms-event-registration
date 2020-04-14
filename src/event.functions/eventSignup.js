const util = require('util');
const request = util.promisify(require('request'));

const HUBDB_API = '/cms/v3/hubdb';
const FORMS_API = `https://api.hsforms.com/submissions/v3/integration/submit`;
const BASE_URL = `https://api.hubspot.com`;

exports.main = ({ body, accountId, secrets }, sendResponse) => {
  const {
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
    hapikey: secrets.APIKEY,
  };

  const fetchRowPromise = request({
    baseUrl: BASE_URL,
    json: true,
    uri: `${HUBDB_API}/tables/events/rows/${rowId}`,
    qs: defaultParams,
  });
  fetchRowPromise
    .then(response => {
      const updatedRowCell = {
        registered_attendee_count:
          response.body.values.registered_attendee_count + 1,
      };

      const updateRowPromise = request({
        baseUrl: BASE_URL,
        method: 'PATCH',
        json: true,
        uri: `${HUBDB_API}/tables/events/rows/${rowId}/draft`,
        qs: defaultParams,
        body: { values: updatedRowCell },
      });
      const formApiWithGuid = `${FORMS_API}/${accountId}/${secrets.EVENTS_FORM_GUID}`;
      const updateContactPromise = request({
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

      Promise.all([updateRowPromise, updateContactPromise])
        .then(updateResponses => {
          request({
            baseUrl: BASE_URL,
            method: 'POST',
            json: true,
            simple: true,
            uri: `${HUBDB_API}/tables/events/draft/push-live`,
            qs: defaultParams,
          })
            .then(() => {
              sendResponse({
                statusCode: 200,
                body: {
                  rowUpdate: updateResponses[0].body,
                  contactUpdate: updateResponses[1].body,
                },
              });
            })
            .catch(error => {
              sendResponse({
                statusCode: 500,
                body: { error },
              });
            });
        })
        .catch(error => {
          sendResponse({
            statusCode: 500,
            body: { error },
          });
        });
    })
    .catch(error => {
      sendResponse({ error });
    });
};
