var sportsFeedConfig = sails.config.auth.sportsFeed;
var baseURL = 'https://'+ sportsFeedConfig.username + ':' + sportsFeedConfig.password +'@api.mysportsfeeds.com/v1.2/pull/nba/2018-playoff/';
var rp = require('request-promise');
var moment = require('moment');
var Promise = require('bluebird');


module.exports = {
  fetchUpcomingGames: function() {
    /**
    * Fetch games for the next 5 days
    **/
    var numDaysToFetch = 5;
    var today = moment();
    var daysToFetch = [];
    for(i = 0; i <= numDaysToFetch; i++) {
      daysToFetch.push(moment().add(i, 'days').format('YYYYMMDD'));
    }

    return Promise.map(daysToFetch, function(date){
      var apiEndPoint = baseURL + 'daily_game_schedule.json?fordate=' + date;
      return rp(apiEndPoint).then(function (response) {
        var response = JSON.parse(response);
        var games = response.dailygameschedule ? response.dailygameschedule.gameentry : [];
        return Promise.map(games, function(game){
          var sportsFeedId = game.id;
          // {
          //   "id": "46248",
          //   "scheduleStatus": "Normal",
          //   "originalDate": null,
          //   "originalTime": null,
          //   "delayedOrPostponedReason": null,
          //   "date": "2018-05-08",
          //   "time": "8:00PM",
          //   "awayTeam": {
          //     "ID": "98",
          //     "City": "Utah",
          //     "Name": "Jazz",
          //     "Abbreviation": "UTA"
          //   },
          //   "homeTeam": {
          //     "ID": "109",
          //     "City": "Houston",
          //     "Name": "Rockets",
          //     "Abbreviation": "HOU"
          //   },
          //   "location": "Toyota Center"
          // },
          var homeTeam = game.homeTeam;
          var awayTeam = game.awayTeam;
          var convGameFormat = {
            question: homeTeam.City + ' ' + homeTeam.Name + ' vs ' + awayTeam.City + ' ' + awayTeam.Name,
            option: {
              gameId: sportsFeedId,
              matchup: [{
                question: homeTeam.City + ' ' + homeTeam.Name,
                option: homeTeam.ID,
              }, {
                question: awayTeam.City + ' ' + awayTeam.Name,
                option: awayTeam.ID
              }]
            },
          };

          return Games.findOrCreate({
            sportsFeedId: sportsFeedId
          },{
            gameDetails: game,
            sportsFeedId: sportsFeedId,
            convGameFormat: convGameFormat,
            startDateTime: game.date + ' ' + moment(game.time, 'H:mm A').format('HH:mm:ss')
          });
        })
      });
    });
  }
}