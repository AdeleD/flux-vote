var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _users = [];
var _currentUser = '';

var USER_LIST_CHANGE = 'user-list-change';
var CURRENT_USER_CHANGE = 'current-user-change';

var FluxVoteStore = assign({}, EventEmitter.prototype, {
  getAllUsers: function() {
    return _users;
  },

  getCurrentUser: function() {
    return _currentUser;
  },

  emitUserListChange: function() {
    this.emit(USER_LIST_CHANGE);
  },

  addUserListChangeListener: function(callback) {
    this.on(USER_LIST_CHANGE, callback);
  },

  removeUserListChangeListener: function(callback) {
    this.removeListener(USER_LIST_CHANGE, callback);
  },

  emitCurrentUserChange: function() {
    this.emit(CURRENT_USER_CHANGE);
  },

  addNewCurrentUserListener: function(callback) {
    this.on(CURRENT_USER_CHANGE, callback);
  },

  removeNewCurrentUserListener: function(callback) {
    this.removeListener(CURRENT_USER_CHANGE, callback);
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
