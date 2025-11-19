import dotenv from 'dotenv';
dotenv.config({ path: '../../../.env' });

/** @type {import('knex').Knex.Config} */
const config = {
    client: 'pg',
    connection: 'postgres://postgres:root@localhost:5432/arquitetura',
    migrations: {
        tableName: 'knex_migrations',
    },
    pool: {
        min: 2,
        max: 10
    }
};

export default config;
