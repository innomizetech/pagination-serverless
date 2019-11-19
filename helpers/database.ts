import { URL } from 'url';
import * as serverlessMysql from 'serverless-mysql';

// Replace below with your database connection string
const dbConnectionString = process.env.DB_CON_STR || 'jdbc://root:root@localhost:3306/example_db';

const dbConfig = new URL(dbConnectionString);

// Require and initialize outside of your main handler
export const mysql: serverlessMysql.ServerlessMysql = serverlessMysql({
  config: {
    host: dbConfig.hostname,
    database: dbConfig.pathname.replace('/', ''),
    user: decodeURIComponent(dbConfig.username),
    password: decodeURIComponent(dbConfig.password)
  }
});
