const sql = require('mssql');

export class DatabaseConnector {
    configs = {
        user: 'CloudSA2a696802', 
        password: 'O62Fsn%*l7t7', 
        server: 'calendar-server-db-dev.database.windows.net', 
        database: 'calendar-db-dev', 
        authentication: {
            type: 'default'
        },
        options: {
            encrypt: true
        }
    };

    async ConnectAndQuery(query: String) {
        try {
            const poolConnection = await sql.connect(this.configs); 
            // const resultSet = await connection.query(query); 
            // return resultSet; 
            console.log("Connection created");
            const resultSet = await poolConnection.request().query(query);
            console.log(resultSet);
            return resultSet;
        } catch (err: any) {
            console.error(err.stack);
        }
    }
}