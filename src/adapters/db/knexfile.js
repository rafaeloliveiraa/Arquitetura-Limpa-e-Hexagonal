import dotenv from 'dotenv';
dotenv.config({ path: '../../../.env' });

/** @type {import('knex').Knex.Config} */
const config = {
    client: 'pg',
    connection: process.env.BD_URL,
    migrations: {
        tableName: 'knex_migrations',
        extension: 'js', // importante para ESM
        directory: './migrations'
    },
    pool: {
        min: 2,
        max: 10
    }
};

export default config;
