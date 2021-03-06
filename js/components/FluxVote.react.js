var UserList = require('./UserList.react');
var React = require('react');
var FluxVoteStore = require('../stores/FluxVoteStore');
var AppDispatcher = require('../dispatcher/AppDispatcher');

function getFluxVoteState() {
  return {
    currentUser: FluxVoteStore.getCurrentUser(),
    allUsers: FluxVoteStore.getAllUsers()
  };
}

var FluxVote = React.createClass({

  getInitialState: function() {
    return getFluxVoteState();
  },

  componentDidMount: function() {
    FluxVoteStore.addNewCurrentUserListener(this._onChange);
    FluxVoteStore.addUserListChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    FluxVoteStore.removeNewCurrentUserListener(this._onChange);
    FluxVoteStore.removeUserListChangeListener(this._onChange);
  },

  render: function() {
    var counter = Object.keys(this.state.allUsers).length;

    return (
      <section>
        <div>
          <p>Please enter a username here: <input type="text" name="current-user" onChange={this.newCurrentUser} /></p>
          <p>Current user: <strong>{this.state.currentUser}</strong></p>
        </div>
        <div>
          <p>Submit your vote by clicking the 'vote' button:</p>
          <button onClick={this.newVote}>Vote</button> <strong>{counter}</strong>
        </div>
        <UserList allUsers={this.state.allUsers} />
      </section>
    );
  },

  _onChange: function() {
    this.setState(getFluxVoteState());
  },

  newVote: function(evt) {
    var currentUser = this.state.currentUser;

    if (!currentUser || !currentUser.name) {
      currentUser = {name: 'Anonymous'}
    }

    AppDispatcher.dispatch({
      eventName: 'new-user',
      newUser: currentUser
    });
  },

  newCurrentUser: function(evt) {
    AppDispatcher.dispatch({
      eventName: 'new-current-user',
      newCurrentUser: {name: evt.target.value}
    });
  }

});

module.exports = FluxVote;
