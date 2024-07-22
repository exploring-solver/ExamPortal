exports.up = function (knex) {
    return knex.schema.createTable('exam_questions', table => {
        table.increments('id').primary();
        table.integer('exam_id').unsigned().notNullable();
        table.integer('question_id').unsigned().notNullable();
        table.foreign('exam_id').references('exams.id');
        table.foreign('question_id').references('questions.id');
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('exam_questions');
};

