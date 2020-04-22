const util = require('util');
const request = util.promisify(require('request'));

const CONTACTS_API = '/contacts/v1/contact/vid';
const BASE_URL = 'https://api.hubapi.com';

exports.main = ({ accountId, contact }, sendResponse) => {
  const defaultParams = {
    portalId: accountId,
    hapikey: process.env.APIKEY,
  };

  if (!contact || !contact.isLoggedIn) {
    sendResponse({
      statusCode: 403,
      body: {
        message: 'User is not authenticated',
      },
    });
    return;
  }

  request({
    baseUrl: BASE_URL,
    json: true,
    uri: `${CONTACTS_API}/${contact.vid}/profile`,
    qs: defaultParams,
  })
    .then(response => {
      const contactFormSubmissions = response.body['form-submissions'];

      const submittedForms = contactFormSubmissions.map(submission => {
        return submission['form-id'];
      });

      sendResponse({
        statusCode: 200,
        body: {
          formSubmissions: submittedForms,
          contact,
        },
      });
    })
    .catch(error => {
      sendResponse({
        statusCode: 500,
        body: { error },
      });
    });
};
