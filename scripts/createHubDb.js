const fs = require('fs-extra');
const { getPortalId } = require('@hubspot/cms-lib');
const hubdb = require('@hubspot/cms-lib/api/hubdb');
const {
  createHubDbTable,
} = require('@hubspot/cms-lib/hubdb');
const argv = require('yargs');

const fetchTables = async portal => {
  try {
    const response = await hubdb.fetchTables(portal);
    return response.objects;
  } catch (e) {
    console.log(
      `There was an error fetching tables from  ${portal}`,
      e.message
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
    return table.id;
  } catch (e) {
    console.log(e.message);
  }
};

const createTable = async (portal, src) => {
  const portalId = getPortalId(portal);

  await createHubDbTable(portalId, src);
}

const createTableIfNone = async (portalId, src) => {
  const { name } = fs.readJsonSync(src);

  const existingTable = await getTableIdByName(name, portalId);

  if (existingTable) {
    console.log('Table already exists in portal')
    return;
  } else {
    const newTable = await createTable(portalId, src);
    console.log(`Table with id X was created`)
  }
}


argv
  .command(
    'create',
    'Create HubDb table in portal',
    () => {},
    argv => {
      createTableIfNone(argv.portal, argv.table_path);
    }
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
