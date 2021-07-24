const Sequelize = require('sequelize');

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('../lib/config')} config
 * @param {import('../lib/logger')} appLog
 * @param {object} sequelizeDb - sequelize instance
 */
// eslint-disable-next-line no-unused-vars
async function up(queryInterface, config, appLog, sequelizeDb) {
  if (config.all.backendDatabaseUri.indexOf('postgres') >= 0) {
    try {
      const query =
        'ALTER TABLE "service_tokens" ALTER COLUMN "id" TYPE VARCHAR(255);';
      await queryInterface.sequelize.query(query);
    } catch (error) {
      appLog.error(
        error,
        `Error alter id column from integer to string under postgres`
      );
    }
  } else if (config.all.backendDatabaseUri.indexOf('mssql') >= 0) {
    try {
      // drop default value constraint
      const query =
        'SELECT name FROM SYS.DEFAULT_CONSTRAINTS ' +
        "WHERE PARENT_OBJECT_ID = OBJECT_ID('service_tokens', 'U') " +
        "AND PARENT_COLUMN_ID = (SELECT column_id FROM sys.columns WHERE NAME = ('id') " +
        "AND object_id = OBJECT_ID('service_tokens', 'U'));";
      await queryInterface.sequelize.query(query);
      // change column
      await queryInterface.changeColumn('service_tokens', 'id', {
        type: Sequelize.STRING,
        defaultValue: Sequelize.UUIDV4,
      });
    } catch (error) {
      appLog.error(
        error,
        `Error alter id column from integer to string under mssql`
      );
    }
  } else {
    try {
      // alter id column from integer to string
      await queryInterface.changeColumn('service_tokens', 'id', {
        type: Sequelize.STRING,
        defaultValue: Sequelize.UUIDV4,
      });
    } catch (error) {
      appLog.error(error, `Error alter id column from integer to string`);
    }
  }
}

module.exports = {
  up,
};
