const { Model } = require('objection');

class Result extends Model {
  static get tableName() {
    return 'results';
  }
}

module.exports = Result;
