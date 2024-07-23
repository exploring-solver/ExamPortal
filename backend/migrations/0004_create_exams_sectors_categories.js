exports.up = function(knex) {
  console.log("Running migration up script");
  return knex.schema
    .createTable('sectors', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
    })
    .createTable('categories', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.integer('sector_id').unsigned().references('id').inTable('sectors').onDelete('CASCADE');
    })
    .createTable('exams', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.integer('category_id').unsigned().references('id').inTable('categories').onDelete('CASCADE');
      table.integer('sector_id').unsigned().references('id').inTable('sectors').onDelete('CASCADE');
      table.date('exam_date').notNullable();
      table.enum('status', ['upcoming', 'previous']).notNullable();
    });
};

exports.down = function(knex) {
  console.log("Running migration down script");
  return knex.schema
    .dropTable('exams')
    .dropTable('categories')
    .dropTable('sectors');
};
