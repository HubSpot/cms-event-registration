const util = require('util');
const request = util.promisify(require('request'));

const CONTACTS_API = '/contacts/v1/contact/vid';
const BASE_URL = 'https://api.hubapi.com';

exports.main = ({ accountId, secrets, contact }, sendResponse) => {
  const defaultParams = {
    portalId: accountId,
    hapikey: secrets.APIKEY,
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
      const eventFormSubmissions= contactFormSubmissions.filter(submission => submission['form-id'] === secrets.EVENTS_FORM_GUID);

      const slugs = eventFormSubmissions.map(submission =>
        submission['page-url'].split('/').pop()
      );

      sendResponse({
        statusCode: 200,
        body: {
          eventFormSubmissions,
          contact,
          slugs,
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
