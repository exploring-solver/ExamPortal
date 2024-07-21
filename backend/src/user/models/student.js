const { Model } = require('objection');

class Student extends Model {
  static get tableName() {
    return 'students';
  }
}

module.exports = Student;
