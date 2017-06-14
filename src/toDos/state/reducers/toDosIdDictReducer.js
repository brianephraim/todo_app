// action.response.entities.todos is an object.
// It's property keys are toDoIds
// This function returns a toDos object.
// state as a toDos object.
// Redux will make this function name a property on its state
// And that property is an object containing key/val todoIds/todoObjects
const toDosIdDictReducer = (state = {}, action) => {
  if (action.type === 'ASSIGN_USER_TO_TODO') {
    const toDo = {
      ...state[action.toDoId],
      assignedUserId: action.userId,
    };
    return {
      ...state,
      [action.toDoId]: toDo,
    };
  }
  if (action.response) {
    return {
      ...state,
      ...action.response.entities.todos,
    };
  }
  return state;
};

export default toDosIdDictReducer;
