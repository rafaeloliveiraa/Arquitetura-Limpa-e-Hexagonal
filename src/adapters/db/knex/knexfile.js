import dotenv from 'dotenv'
dotenv.config({ path: '../../../../.env' })

export default {
    client: 'pg',
    connection: "postgres://postgres:root@localhost:5432/arquitetura",
    migrations: {
        tableName: 'knex_migrations',
},
pool: {
    min: 2,
    max: 10
}
}
