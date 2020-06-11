# CMS Event Registration App

A web app built for pages hosted on the HubSpot CMS.

⚠️ **This is a BETA release that uses some HubSpot features that are not available to all customer accounts. If you would like to try out all the functionality of the CMS Event Registration app, please use an account with the Enterprise tier of CMS Hub or start your [14 day free trial](https://www.hubspot.com/pricing/cms). Please refer to the HubSpot [Developer Beta Terms](https://legal.hubspot.com/developerbetaterms)** ⚠️

## Purpose

The CMS Event Registration app illustrates how developers can leverage modern frontend technologies like React to build web applications hosted on the HubSpot CMS. This prototype React app, designed to manage events and event sign ups, can be added to a HubSpot page template as a module, making it a powerful tool for developers seeking to create personalized online experiences for their customers.

Follow and star the repository to stay up-to-date with product releases and evolving best practices for building apps on the HubSpot CMS.

Join [#events-app-beta](https://hubspotdev.slack.com/archives/C011GFF8KNZ) in the HubSpot Developers Slack

## Getting started

0. Make sure that you're set up for [local development](https://designers.hubspot.com/tutorials/getting-started) with the [HubSpot CMS CLI](https://designers.hubspot.com/docs/developer-reference/local-development-cms-cli).
1. Clone this repo to your machine
2. Install dependencies by running `yarn install`
3. Run `yarn create-table --portal <portalId>` to create the HubDB table where you will manage your events
4. Add your [HubSpot API key](https://knowledge.hubspot.com/integrations/how-do-i-get-my-hubspot-api-key) for the portal by running `yarn hs secrets add APIKEY <api-key-goes-here>`. The API key is used by `eventSignup.js` to update the HubDB table
5. Run `yarn start` which will build the javascript, auto-upload the files to your `defaultPortal`, and watch for changes
6. Registrations are stored in the CRM using the [Forms API](https://developers.hubspot.com/docs/methods/forms/forms_overview). You'll need to create a form with the fields:
   - First name
   - Last name
   - Email
7. Create an `events` page in your portal that:
   - Uses the `Events app` module in a page template and has the form you created in `6.` selected in the module fields.
   - References the `Events` HubDB table, set up for dynamic pages

### Setting up membership

_Note: In order to set up membership, your account will need a [connected domain](https://knowledge.hubspot.com/cos-general/connect-a-domain-to-hubspot)_

8. Create a [dynamic list](https://app.hubspot.com/l/contacts/lists) that includes contacts that have filled out any event form
9. Create a `my events` page in your portal that:
   - Uses the `Events app` module in a page template and has the form you created in `6.` selected in the module fields.
   - Unlike the `events` page we created in step `7.`, the `my events` page shouldn't be using HubDB dynamic pages.
   - Under "Control audience access for page", select "Private - Registration required" and select the list you made in the previous step
10. In the `Events app` module on the 'events listing' page you created in step `7.`, select the `my events` page you just created.

> _Note_: The `events` and the `my events` can be named, titled, and have any url you like, as long as they are selected in the appropriate page selector fields in both instances of the `Events app` module (on both `my events` and `events`).

> _Note_: This app is configured to work on a single subdomain, so `my events` and `events` should be on the same subdomain

#### Usage

The following commands are available in this project:

`yarn start` - Watches your project. Re-builds and re-uploads to your HubSpot account on save.

`yarn build` - Builds the project into `dist/`.

`yarn deploy` - Uploads the project to your HubSpot account.

`yarn create-table` - Builds a HubDB table for your events from `resources/events.hubdb.json`, see above.

`yarn lint` - Checks `src/` against ESLint and Prettier (only `.js` and `.json` files) with HubSpot's style guidelines.

`yarn prettier:write` - Reformats `.js` and `.json` files in `src/` with Prettier using the HubSpot style guide.

See the [ESLint](https://eslint.org/docs/user-guide/configuring) and [Prettier](https://prettier.io/docs/en/configuration.html) documentation for questions on configuration.
