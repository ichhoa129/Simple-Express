import { knex } from 'knex';
import config from '../../knexfile';

const connection = knex(config);

export default connection;

export const getTransaction = () => connection.transaction();

export const connectDatabase = async () => {
    try {
        await connection.raw('SELECT 1');
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error, please check your connection');
    }
};
