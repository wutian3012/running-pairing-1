/*

user:

email
password (hash)
name
times
{"5k":...,"10k":...,...}
VO2Max

*/

//will replace with real backend, just a super quick hacky thing
var users = [];

//temp function
exports.newUser = function(userObj,callback){
  users.push(userObj);
  callback();
}
exports.findUser = function(email,callback){
  var user = null;
  for (var i = 0; i < users.length; i++)
    if (users[i].email == email)
      user = users[i];
  callback(user)
}