var DataTypes = require("sequelize").DataTypes;
var _comments = require("./comments");
var _posts = require("./posts");
var _users = require("./users");
var _likes = require("./likes");

function initModels(sequelize) {
  var comments = _comments(sequelize, DataTypes);
  var posts = _posts(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var likes = _likes(sequelize, DataTypes);


  return {
    comments,
    posts,
    users,
    likes
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
