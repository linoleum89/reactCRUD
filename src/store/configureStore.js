import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';

const logger = createLogger({
    collapsed: true
  });

// Reducer
function crudActions(state = { users: [{
    id: 1,
    first_name: 'Jorge',
    last_name: 'Cortes',
    city: 'Monterrey',
    state: 'NL'
  }, {
    id: 2,
    first_name: 'Diego',
    last_name: 'Montes',
    city: 'Chihuahua',
    state: 'CUU'
  }], showEdit: false, userToEdit: '' }, action) {
    switch (action.type) {
        case 'ADD':
            return { value: state.value + 1 }
        case 'EDIT':
            return { value: state.value - 1 }
        case 'REMOVE':
            return {};
        default:
            return state
    }
}
let store = createStore(
    crudActions,
    applyMiddleware(logger)
);

export default store;