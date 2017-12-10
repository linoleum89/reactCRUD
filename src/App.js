import React, { Component } from 'react';
import User from './User/User';
import Edit from './Edit/Edit';
const request = require('superagent');

class App extends Component {
  state = {
    users: [],
    showEdit: false,
    userToEdit: ''
  };
  // constructor() {
  //   super();
  //   this.state = {
  //     users: []
  //   };
  // }

  componentDidMount() {
    request
    .get('http://localhost:4000/users')
    .end((err, res) => {
      if (res && res.body) {
        console.log(res.body);
        this.setState({
          users: res.body
        })
      }
    });
  }

  render() {
    const users = this.state.users.map((user, index) => {
      return <User key={user.id} user={user} edit={(event) => this.editHandler(event, user)} remove={(event) => this.removeHandler(index)} />
    });

    const edit = this.state.showEdit ? <Edit user={this.state.userToEdit} save={(event) => this.saveEditHandler(event)} changed={(event) => this.onChanged(event)}/> : null;

    return (
      <div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>User</th>
            <th></th>
            <th></th>
            <th><button onClick={this.addHandler.bind(this)}>Add</button></th>
          </tr>
        </thead>
        <tbody>
          {users}
        </tbody>
      </table>
      {edit}
      </div>
    );
  }

  addHandler() {
    const firstName = prompt('Set first name');
    const lastName = prompt('Set last name');
    const city = prompt('Set city');
    const state = prompt('Set state');

    if (firstName && lastName && city && state) {
      const data = {
        first_name: firstName,
        last_name: lastName,
        city: city,
        state: state
      };

      request
        .post('http://localhost:4000/users')
        .send(data)
        .end((err, res) => {
          if (err || !res.ok) {
            alert('invalid data!');
          } else {
            console.log(res.body);
            const users = [...this.state.users, res.body];
            this.setState({
              users: users
            });
          }
        });
    } 
  }

  editHandler = (event, user) => {
    console.log(event, user)
    this.setState({
      showEdit: true,
      userToEdit: user
    });
  }

  onChanged = (event) => {
    const userIndex = this.state.users.findIndex(p => {
      return p.id === this.state.userToEdit.id;
    });

    const user = {
      ...this.state.users[userIndex]
    };

    switch(event.target.dataset.edit) {
      case "1":
        user.first_name = event.target.value;
        break;
      case "2":
        user.last_name = event.target.value;
        break;
      case "3":
        user.city = event.target.value;
        break;
      case "4":
        user.state = event.target.value;
        break;
      default:
    }

    const users = [...this.state.users];
    users[userIndex] = user;

    this.setState( {
      users: users,
      userToEdit: user
    } );
  }

  saveEditHandler = (event) => {
    console.log(event);
    request
    .put('http://localhost:4000/user/' + this.state.userToEdit.id)
    .send(this.state.userToEdit)
    .end((err, res) => {
      if (err || !res.ok) {
        alert('error');
      } else {
        alert('user saved!');
        this.setState({
          showEdit: false
        });
      }
    });
  }

  removeHandler = (userIndex) => {
    const users = [...this.state.users];
    const user = users.splice(userIndex, 1);
    request
      .delete('http://localhost:4000/user/' + user[0].id)
      .end((err, res) => {
        if (err || !res.ok) {
          alert('error');
        } else {
          this.setState({users: users});
        }
      });
  }
}

export default App;
