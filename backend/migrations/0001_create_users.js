// create_users
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
      table.increments('id').primary();
      table.string('username').notNullable();
      table.string('password').notNullable();
      table.string('email').notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  };
 
  
  // create_exams.js
//   exports.up = function(knex) {
//     return knex.schema.createTable('exams', table => {
//       table.increments('id').primary();
//       table.string('name').notNullable();
//       table.timestamps(true, true);
//     });
//   };
  
//   exports.down = function(knex) {
//     return knex.schema.dropTable('exams');
//   };
  