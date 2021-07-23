const Sequelize = require('sequelize');

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('../lib/config')} config
 * @param {import('../lib/logger')} appLog
 * @param {object} sequelizeDb - sequelize instance
 */
// eslint-disable-next-line no-unused-vars
async function up(queryInterface, config, appLog, sequelizeDb) {
  if (config.Sequelize.dialect === 'postgres') {
    try{
      const query = "ALTER TABLE \"service_tokens\" ALTER COLUMN \"id\" TYPE VARCHAR(255)"
      await queryInterface.sequelize.query(query)
    }catch(error){
      appLog.error(error, `Error alter id column from integer to string under postgres`);
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
