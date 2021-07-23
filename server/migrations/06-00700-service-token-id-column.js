const Sequelize = require('sequelize');

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('../lib/config')} config
 * @param {import('../lib/logger')} appLog
 * @param {object} sequelizeDb - sequelize instance
 */
// eslint-disable-next-line no-unused-vars
async function up(queryInterface, config, appLog, sequelizeDb) {
  try {
    // alter id column from integer to string
    await queryInterface.changeColumn('service_tokens', 'id', {
      type: Sequelize.STRING,
      defaultValue: Sequelize.UUIDV4,
    });
  } catch (error) {
    // ignore error. constraint may not exist depending on backend database
    appLog.error(error, `Error alter id column from integer to string`);
  }
}

module.exports = {
  up,
};
