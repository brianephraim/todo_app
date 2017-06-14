export const getVisibleToDos = (state, filter) => {
  const ids = state.toDos.listByFilter[filter].ids;
  return ids.map((id) => { return state.toDos.toDosIdDict[id]; });
};

export const getIsFetching = (state, filter) => {
  return state.toDos.listByFilter[filter].isFetching;
};

export const getErrorMessage = (state, filter) => {
  return state.toDos.listByFilter[filter].errorMessage;
};

export const getToBeAssignedFromRoot = (state) => {
  return state.appRoot.toBeAssigned;
};
