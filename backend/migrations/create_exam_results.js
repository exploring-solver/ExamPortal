exports.up = function(knex) {
    return knex.schema.createTable('exam_results', table => {
      table.increments('id').primary();
      table.integer('max_score').notNullable();
      table.integer('total_score').notNullable();
      table.integer('exam_id').unsigned().notNullable();
      table.integer('candidate_id').unsigned().notNullable();
      table.foreign('exam_id').references('exams.id');
      table.foreign('candidate_id').references('students.id');
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('exam_results');
  };