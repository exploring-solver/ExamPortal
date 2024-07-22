exports.up = function(knex) {
    return knex.schema.createTable('questions', table => {
      table.increments('id').primary();
      table.string('question').notNullable();
      table.string('option_a').notNullable();
      table.string('option_b').notNullable();
      table.string('option_c').notNullable();
      table.string('option_d').notNullable();
      table.string('answer').notNullable();
      table.string('subject').notNullable();
      table.enu('category', ['easy', 'medium', 'hard']).notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('questions');
  };