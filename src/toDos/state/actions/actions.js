import { normalize } from 'normalizr';
import * as schema from './schema';
import { fakePost as post } from '../../../api';
import { getIsFetching } from '../getters';

export const fetchToDos = (filter) => {
  return (dispatch, getState) => {
    if (getIsFetching(getState(), filter)) {
      return Promise.resolve();
    }

    dispatch({
      type: 'FETCH_TODOS_REQUEST',
      filter,
    });

    return post('fetchToDos', { filter }).then(
      (response) => {
        dispatch({
          type: 'FETCH_TODOS_SUCCESS',
          filter,
          response: normalize(response, schema.arrayOfToDos),
        });
      },
      (error) => {
        dispatch({
          type: 'FETCH_TODOS_FAILURE',
          filter,
          message: error.message || 'Something went wrong.',
        });
      }
    );
  };
};

export const addToDo = (text) => {
  return (dispatch) => {
    return post('addToDo', { text }).then(response => {
      dispatch({
        type: 'ADD_TODO_SUCCESS',
        response: normalize(response, schema.todo),
      });
    });
  };
};

export const toggleToDo = (id) => {
  return (dispatch) => {
    return post('toggleToDo', { id }).then(response => {
      dispatch({
        type: 'TOGGLE_TODO_SUCCESS',
        response: normalize(response, schema.todo),
      });
    });
  };
};

export const assignUser = (id) => {
  return (dispatch, getState) => {
    let state = getState();
    dispatch({
      type: 'PREPARE_EXTERNAL_ASSIGNMENT',
      userId: null,
    });
    dispatch({
      type: 'ASSIGN_USER_TO_TODO',
      toDoId: id,
      userId: state.appRoot.toBeAssigned,
    });
    state = getState();
    const toDo = state.toDos.toDosIdDict[id];
    return post('updateToDo', { toDo });
  };
};
