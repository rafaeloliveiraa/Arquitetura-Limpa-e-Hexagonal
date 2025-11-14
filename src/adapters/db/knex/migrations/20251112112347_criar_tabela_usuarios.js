
export const up = async function(knex) {
    const exists = await knex.schema.hasTable('usuarios');
    if (!exists) {
        return knex.schema.createTable('usuarios', function(table) {
            table.uuid('id').primary();
            table.string('nome').notNullable();
            table.string('email').notNullable().unique();
            table.string('senha').notNullable();
        });
    }
};


export const down = function(knex) {
    return knex.schema.dropTableIfExists('usuarios')
};
