const fs = require('fs-extra');
const { getPortalId } = require('@hubspot/cms-lib');
const hubdb = require('@hubspot/cms-lib/api/hubdb');
const { createHubDbTable } = require('@hubspot/cms-lib/hubdb');
const argv = require('yargs');

const fetchTables = async portal => {
  try {
    const response = await hubdb.fetchTables(portal);
    return response.objects;
  } catch (e) {
    console.log(
      `There was an error fetching tables from  ${portal}`,
      e.message,
    );
    return;
  }
};

const getTableIdByName = async (tableName, portalId) => {
  try {
    const tables = await fetchTables(portalId);
    const table = tables.find(tab => {
      return tab.name === tableName;
    });

    return table;
  } catch (e) {
    console.log(e.message);
  }
};

const createTable = async (portal, src) => {
  const portalId = getPortalId(portal);
  const { name } = fs.readJsonSync(src);

  const fetchExistingTable = await getTableIdByName(name, portalId);

  if (fetchExistingTable) {
    console.log('Table already exists in portal');
    return;
  } else {
    const { tableId } = await createHubDbTable(portalId, src);
    console.log(`Table with id ${tableId} was created`);
  }
};

argv
  .command(
    'create',
    'Create HubDb table in portal',
    () => {},
    argv => {
      createTable(argv.portal, argv.table_path);
    },
  )
  .help()
  .options({
    table_path: {
      demandOption: true,
    },
    portal: {
      demandOption: true,
    },
  }).argv;
