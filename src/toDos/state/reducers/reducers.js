import { combineReducers } from 'redux';
import toDosIdDictReducer from './toDosIdDictReducer';
import createToDoListReducers from './createToDoListReducers';

const listByFilter = combineReducers({
  all: createToDoListReducers('all'),
  active: createToDoListReducers('active'),
  completed: createToDoListReducers('completed'),
});

export default combineReducers({
  toDosIdDict: toDosIdDictReducer,
  listByFilter,
});
