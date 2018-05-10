/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var md5 = require('md5');

module.exports = {
  checkUsername: function(req, res) {
    var data = req.query;
    var username = data.username;
    return user.checkIfUsernameExists(username).then(function(doesUsernameExist){
      if(doesUsernameExist) {
        res.ok({
          status: 'already_exists'
        })
      } else {
        res.ok({
          status: 'new'
        })
      }
    });
  },
  create: function(req, res) {
    var data = req.body;
    var username = data.username;
    var password = data.password;
    return user.create(username, md5(password)).then(()=>{
      res.ok();
    });
  }
};

