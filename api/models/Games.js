/**
 * Games.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  datastore: 'mongodb',
  attributes: {
    gameDetails: {
      type: 'json'
    },
    sportsFeedId: {
      type: 'number'
    }, 
    convGameFormat: {
      type: 'json'
    },
    startDateTime: {
      type: 'string'
    }
  }
};

