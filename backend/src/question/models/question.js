const { Model } = require('objection');

class Question extends Model {
  static get tableName() {
    return 'questions';
  }
}

module.exports = Question;
