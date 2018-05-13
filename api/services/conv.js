var moment = require('moment');

module.exports = {
  fetchUpcomingGames: async function() {
    var upcomingGames = await Games.find({
      select: ['convGameFormat'],
      where: {
        startDateTime: {
          '<' : moment().add(2, 'days').format('YYYY-MM-DD HH:mm:ss'),
          '>=': moment().format('YYYY-MM-DD HH:mm:ss')
        }
      }
    });
    return upcomingGames;
  }
}