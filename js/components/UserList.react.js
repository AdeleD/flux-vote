var React = require('react');
var ReactPropTypes = React.PropTypes;

var UserList = React.createClass({
  propTypes: {
    allUsers: ReactPropTypes.array.isRequired
  },

  render: function() {
    var allUsers = this.props.allUsers;

    var userHTML = allUsers.map(function(user, index) {
      return (
        <li key={index}>
          {user.name}
        </li>
      );
    });

    return (
      <ul>
        {userHTML}
      </ul>
    );
  }
});

module.exports = UserList;
