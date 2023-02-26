const sql = require('mssql');

export class DatabaseConnector {
  configs = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    authentication: {
      type: 'default',
    },
    options: {
      encrypt: true,
    },
  };

  async ConnectAndQuery(query: String) {
    try {
      const poolConnection = await sql.connect(this.configs);
      const resultSet = await poolConnection.request().query(query);
      return resultSet;
    } catch (err: any) {
      console.error(err.stack);
    }
  }
}
