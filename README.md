CMS Event Registration App
========================

A web app built for pages hosted on the HubSpot CMS.

⚠️ **This is a BETA release that uses some HubSpot features that are not available to all customer accounts. If you would like to try out all the functionality of the CMS Event Registration app, please use an account with the Enterprise tier of CMS Hub or start your [14 day free trial](https://www.hubspot.com/pricing/cms). Please refer to the HubSpot [Developer Beta Terms](https://legal.hubspot.com/developerbetaterms)** ⚠️

## Purpose

The CMS Event Registration app illustrates how developers can leverage modern frontend technologies like React to build web applications hosted on the HubSpot CMS. This prototype React app, designed to manage events and event sign ups, can be added to a HubSpot page template as a module, making it a powerful tool for developers seeking to create personalized online experiences for their customers.

Follow and star the repository to stay up-to-date with product releases and evolving best practices for building apps on the HubSpot CMS.

## Getting started

0. Make sure that you're set up for [local development](https://designers.hubspot.com/tutorials/getting-started) with the [HubSpot CMS CLI](https://designers.hubspot.com/docs/developer-reference/local-development-cms-cli).
1. Clone this repo to your machine
2. Install dependencies by running `yarn install`
3. Run `yarn create-table` to create an example HubDB table with the required columns in your default portal
4. Add your HubSpot API key for the portal by running `yarn hs secrets add APIKEY <api-key-goes-here>`
5. Run `yarn start` which will build the javascript, auto-upload the files to your `defaultPortal`, and watch for changes
6. Create a page in your portal that:
    - Has the slug `/events/`
    - Uses the `Events app` module in a page template
    - References the `Events - Sample` HubDB table, set up for dynamic pages

7. For each event that you create, you'll need to create a form and add that form ID to the HubDB entry. The form fields needed are:
    - First name
    - Last name
    - Email

### Setting up membership

8. Create a [dynamic list](https://app.hubspot.com/l/contacts/lists) that includes contacts that have filled out any event form
9. Create a "My Events" page in your portal that:
    - Has the slug `/my-events/`
    - Uses the `Events app` module in a page template; the page shouldn't be dynamic
    - Under "Control audience access for page", select "Private - Registration required" and select the list you made in the previous step
