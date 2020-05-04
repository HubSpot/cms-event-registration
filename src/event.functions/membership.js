const util = require('util');
const request = util.promisify(require('request'));

const CONTACTS_API = '/contacts/v1/contact/vid';
const BASE_URL = 'https://api.hubapi.com';
const APIKEY = process.env.APIKEY;

exports.main = ({ accountId, contact }, sendResponse) => {
  const defaultParams = {
    portalId: accountId,
    hapikey: APIKEY,
  };

  if (!APIKEY) {
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
      const slugs = formSubmissions.map(registration => {
        return registration['page-url'].split('/').pop();
      }
      );

      const submittedFormsIds = formSubmissions.map(submission => {
        return submission['form-id'];
      });

      sendResponse({
        statusCode: 200,
        body: {
          formSubmissions: submittedFormsIds,
          contact,
          slugs,
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
