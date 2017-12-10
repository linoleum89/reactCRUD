import React from 'react';

const Edit = (props) => {
    console.log(props);
    return (
        <div>
            <h1>Edit User # {props.user.id}</h1>
            <input type="text" data-edit="1" value={props.user.first_name} onChange={props.changed}/>
            <input type="text" data-edit="2" value={props.user.last_name} onChange={props.changed}/>
            <input type="text" data-edit="3" value={props.user.city} onChange={props.changed}/>
            <input type="text" data-edit="4" value={props.user.state} onChange={props.changed}/>
            <button onClick={props.save}>Save</button>
        </div>
    );
}

export default Edit;