const util = require('util');
const request = util.promisify(require('request'));

const CONTACTS_API = '/contacts/v1/contact/vid';
const BASE_URL = 'https://api.hubapi.com';

exports.main = ({ accountId, contact }, sendResponse) => {
  const defaultParams = {
    portalId: accountId,
    hapikey: process.env.APIKEY,
  };

  if (!process.env.APIKEY) {
    sendResponse({
      statusCode: 403,
      body: { message: 'API key not present' },
    });
  }

  if (!contact || !contact.isLoggedIn) {
    sendResponse({
      statusCode: 403,
      body: {
        message: 'User is not authenticated',
      },
    });
    return;
  }

  const getContact = async vid => {
    const { statusCode, body } = await request({
      baseUrl: BASE_URL,
      json: true,
      uri: `${CONTACTS_API}/${vid}/profile`,
      qs: defaultParams,
    });

    if (statusCode != 200) {
      sendResponse({
        statusCode: 500,
        body: { message: body.message },
      });
    }

    return body['form-submissions'];
  };

  (async () => {
    try {
      const formSubmissions = await getContact(contact.vid);

      const submittedFormsIds = formSubmissions.map(submission => {
        return submission['form-id'];
      });

      sendResponse({
        statusCode: 200,
        body: {
          formSubmissions: submittedFormsIds,
          contact,
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
