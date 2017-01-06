function createUser(execlib, ParentUser) {
  'use strict';

  var lib = execlib.lib,
    qlib = lib.qlib;

  if (!ParentUser) {
    ParentUser = execlib.execSuite.ServicePack.Service.prototype.userFactory.get('user');
  }

  function User(prophash) {
    ParentUser.call(this, prophash);
  }
  
  ParentUser.inherit(User, require('../methoddescriptors/user'), [/*visible state fields here*/]/*or a ctor for StateStream filter*/);
  User.prototype.__cleanUp = function () {
    ParentUser.prototype.__cleanUp.call(this);
  };

  User.prototype.setDistribution = function (bankname, distributionhash, referencearray, defer) {
    console.log('setDistribution?', bankname, distributionhash);
    qlib.promise2defer(this.__service.setDistribution(bankname, distributionhash, referencearray), defer);
  };

  return User;
}

module.exports = createUser;
