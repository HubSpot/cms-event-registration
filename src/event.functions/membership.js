const axios = require('axios').default

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
      statusCode: 401,
      body: {
        message: 'User is not authenticated',
      },
    });
    return;
  }

  const getContact = async vid => {
    const { status, data } = await axios.get(BASE_URL + `${CONTACTS_API}/${vid}/profile`, {
      params: defaultParams,
    });

    if (status != 200) {
      sendResponse({
        statusCode: 500,
        body: { message: data.message },
      });
    }

    return data['form-submissions'];
  };

  (async () => {
    try {
      const formSubmissions = await getContact(contact.vid);
      const slugs = formSubmissions.map(registration => {
        return registration['page-url'].split('/').pop();
      });

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
