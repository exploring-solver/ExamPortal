 exports.up = function(knex) {
    return knex.schema.createTable('question_stats', table => {
      table.increments('id').primary();
      table.integer('question_id').unsigned().notNullable();
      table.integer('exam_appearances').notNullable();
      table.integer('attempted_count').notNullable();
      table.integer('correct_count').notNullable();
      table.integer('wrong_count').notNullable();
      table.foreign('question_id').references('questions.id');
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('question_stats');
  };