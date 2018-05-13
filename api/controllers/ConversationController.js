/**
 * ConversationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  fetchUpcomingGames: function(req, res) {
    var data = req.body;
    return conv.fetchUpcomingGames().then((response)=>{
      res.ok({
        data: response
      });
    });
  },
  logPrediction: function(req, res) {
    var data = req.body;
    var confidence = data.confidence;
    var teamId = data.teamId;
    var gameId = data.gameId;
    var userId = data.userHash;

    Predictions.updateOrCreate({
      userId: userId,
      gameId: gameId
    }, {
      userId: userId,
      gameId: gameId, 
      teamId: teamId,
      confidence: confidence
    }).then(function(){
      return res.ok({
        status: 'logged'
      });
    });




  }
};

