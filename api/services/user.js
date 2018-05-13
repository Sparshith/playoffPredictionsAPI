module.exports = {
  checkIfUsernameExists: async function(username){
    var usernameDoc = await User.findOne({
      username: username
    });

    if(usernameDoc) {
      return true
    } else {
      return false;
    }
  },
  create: async function(username, password) {
    var newUser = await User.create({
      username: username,
      password: password
    }).fetch();
    return newUser;
  }
}
