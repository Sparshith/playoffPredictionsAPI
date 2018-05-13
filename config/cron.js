module.exports.cron = {
  fetchUpcomingGames: {
    schedule: '0 0,12 * * *',
    onTick: function () {
      console.log('You will see this every second');
    }
  },
  fetchMatchResults: {
    schedule: '0 0,8,16 * * *',
      onTick: function () {
      console.log('You will see this every second');
    }
  }
};