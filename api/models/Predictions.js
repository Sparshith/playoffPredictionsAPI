/**
 * Predictions.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  datastore: 'mongodb',
  attributes: {
    userId: {
      type: 'string'
    },
    teamId: {
      type: 'number',
      columnType: 'integer'
    },
    gameId: {
      type: 'number',
      columnType: 'integer'
    },
    confidence: {
      type: 'number',
      columnType: 'float'
    },
    score: {
      type: 'number',
      columnType: 'float'
    }
  },
  updateOrCreate: function (queryColumns, recordToCreate) {
    return Predictions.findOne().where(queryColumns).then(function(result) {
      if(result) {
        return Predictions.update(queryColumns, recordToCreate);
      } else {
        return Predictions.create(recordToCreate);
      }
    });
  },

};

