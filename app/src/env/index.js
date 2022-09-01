import 'dotenv/config';

export const {
    NODE_ENV,
    PORT,
    DB_TYPE,
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    JWT_SECRET,
    EXPPIRE_DAYS,
    SALT_ROUNDS,
} = process.env;
