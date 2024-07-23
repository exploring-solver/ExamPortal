// migrations/20240723120000_create_exam_organization_link.js
exports.up = function(knex) {
    return knex.schema.createTable('exam_organization', table => {
      table.increments('id').primary();
      table.integer('exam_id').unsigned().notNullable();
      table.integer('organization_id').unsigned().notNullable();
      table.foreign('exam_id').references('exams.id').onDelete('CASCADE');
      table.foreign('organization_id').references('organizations.id').onDelete('CASCADE');
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('exam_organization');
  };
  