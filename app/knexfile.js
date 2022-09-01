import {
    DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_TYPE
} from './src/env';

const dbConfig = {
    client: DB_TYPE,
    connection: {
        charset: 'utf8',
        timezone: 'UTC',
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
    },
    migrations: {
        directory: 'src/database/migrations',
        tableName: 'migrations',
    },
    seeds: {
        directory: 'src/database/seeds',
    },
};

export default dbConfig;
