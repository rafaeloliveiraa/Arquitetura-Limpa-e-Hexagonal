/** @param {import('knex').Knex} knex */
export async function up(knex) {
    const exists = await knex.schema.hasTable('transacoes');

    if (exists) return;

    return knex.schema.createTable('transacoes', (table) => {
        table.uuid('id').primary();
        table.string('descricao').notNullable();
        table.decimal('valor', 14, 2).notNullable();
        table.date('vencimento').defaultTo(knex.fn.now()).notNullable();

        table
            .uuid('usuario_id')
            .notNullable()
            .references('id')
            .inTable('usuarios')
            .onDelete('CASCADE');
    });
}

/** @param {import('knex').Knex} knex */
export async function down(knex) {
    return knex.schema.dropTableIfExists('transacoes');
}
