import React, { Component } from 'react';
import User from './User/User';
const request = require('superagent');

class App extends Component {
  state = {
    users: []
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
      console.log(res.body);
      this.setState({
        users: res.body
      })
    });
  }

  render() {
    const users = this.state.users.map((user, index) => {
      return <User key={user.id} user={user} edit={this.editHandler.bind(this)} remove={(event) => this.removeHandler(event, index)} />
    });

    return (
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
        .post('/users')
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

  editHandler(event) {

  }

  removeHandler = (event, index) => {
    const user = this.state.users.splice(index, 1);
    console.log(user);
    // request
    //   .delete('/user/' + user[0].id)
    //   //.send({ id: user[0].id })
    //   .end((err, res) => {
    //     if (err || !res.ok) {
    //       alert('error');
    //     } else {
    //       console.log(res.body);
    //     }
    //   });
  }
}

export default App;
