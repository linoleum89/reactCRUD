import React from 'react';

const user = (props) => {
    return (
          <tr>
            <td>{props.user.id}</td>
            <td>{props.user.first_name} {props.user.last_name}</td>
            <td>{props.user.city}</td>
            <td>{props.user.state}</td>
            <td>
              <button onClick={props.edit}>Edit</button>
            </td>
            <td>
              <button onClick={props.remove}>Remove</button>
            </td>
          </tr>
    );
}

export default user;