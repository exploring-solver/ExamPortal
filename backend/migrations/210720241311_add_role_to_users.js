exports.up = function (knex) {
    return knex.schema.table('users', function (table) {
      table.enu('role', ['admin', 'student', 'organization']).notNullable().defaultTo('student');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table('users', function (table) {
      table.dropColumn('role');
    });
  };
  