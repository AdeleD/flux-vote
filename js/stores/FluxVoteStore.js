var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _users = [];
var _currentUser = '';

var NEW_USER = 'new-user';
var NEW_CURRENT_USER = '';

var FluxVoteStore = assign({}, EventEmitter.prototype, {
  getAllUsers: function() {
    return _users;
  },

  getCurrentUser: function() {
    return _currentUser;
  },

  emitUserListChange: function() {
    this.emit(NEW_USER);
  },

  addUserListChangeListener: function(callback) {
    this.on(NEW_USER, callback);
  },

  removeUserListChangeListener: function(callback) {
    this.removeListener(NEW_USER, callback);
  },

  emitCurrentUserChange: function() {
    this.emit(NEW_CURRENT_USER);
  },

  addNewCurrentUserListener: function(callback) {
    this.on(NEW_CURRENT_USER, callback);
  },

  removeNewCurrentUserListener: function(callback) {
    this.removeListener(NEW_CURRENT_USER, callback);
  },
});

AppDispatcher.register(function(action) {
  switch(action.eventName) {
    case 'new-user':
      _users.push(action.newUser);
      FluxVoteStore.emitUserListChange();
      break;

    case 'new-current-user':
      _currentUser = action.newCurrentUser;
      FluxVoteStore.emitCurrentUserChange();

    default:
      // no op
  }
});

module.exports = FluxVoteStore;
