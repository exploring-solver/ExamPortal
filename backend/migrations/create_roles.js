// create_student
exports.up = function (knex) {
    return knex.schema.createTable('students', table => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('users.id');
        table.timestamps(true, true);
    })
        .createTable('organizations', table => {
            table.increments('id').primary();
            table.integer('user_id').unsigned().notNullable();
            table.foreign('user_id').references('users.id');
            table.string('name').notNullable();
            table.timestamps(true, true);
        })
        .createTable('admins', table => {
            table.increments('id').primary();
            table.integer('user_id').unsigned().notNullable();
            table.foreign('user_id').references('users.id');
            table.timestamps(true, true);
        });
};

exports.down = function (knex) {
    console.log("Running migration down script");
    return knex.schema
        .dropTable('admins')
        .dropTable('students')
        .dropTable('organizations')
};