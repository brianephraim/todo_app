import { v4 } from 'node-uuid';
// This is a fake in-memory implementation of something
// that would be implemented by calling a REST server.

// if localstorage exists use it, else fake it
const storage = window && window.localStorage || {
  getItem() {},
  setItem() {},
};

// if storage already has data, use it, otherwise use fake data
const fakeDatabase = JSON.parse(storage.getItem('fakeDatabase')) || {
  justInitialized: true,
  todos: [
    {
      id: v4(),
      text: 'do dishes',
      completed: true,
    }, {
      id: v4(),
      text: 'take out trash',
      completed: true,
    }, {
      id: v4(),
      text: 'buy food',
      completed: false,
    },
  ],
  users: [
    {
      id: v4(),
      name: 'Boomer',
    },
    {
      id: v4(),
      name: 'Mr. Z',
    },
  ],
};

const updateFakeDatabaseStorage = () => {
  storage.setItem('fakeDatabase', JSON.stringify(fakeDatabase));
};

const makeUnique = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// in case we just initialized with fake data, store it.
if (fakeDatabase.justInitialized) {
  delete fakeDatabase.justInitialized;
  updateFakeDatabaseStorage();
}

const delay = (ms) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

const fetchUsers = () => {
  return delay(500).then(() => {
    return makeUnique(fakeDatabase.users);
  });
};

const fetchToDos = (filter) => {
  return delay(500).then(() => {
    switch (filter) {
      case 'all':
        return makeUnique(fakeDatabase.todos);
      case 'active':
        return makeUnique(fakeDatabase.todos.filter(t => { return !t.completed; }));
      case 'completed':
        return makeUnique(fakeDatabase.todos.filter(t => { return t.completed; }));
      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  });
};

const addToDo = (text) => {
  return delay(500).then(() => {
    const todo = {
      id: v4(),
      text,
      completed: false,
    };
    fakeDatabase.todos.push(todo);
    updateFakeDatabaseStorage();
    return makeUnique(todo);
  });
};

const updateToDo = (toDoToUpdate) => {
  return delay(500).then(() => {
    fakeDatabase.todos = fakeDatabase.todos.map((oldToDo) => {
      if (toDoToUpdate.id === oldToDo.id) {
        return toDoToUpdate;
      }
      return oldToDo;
    });
    updateFakeDatabaseStorage();
    return makeUnique(toDoToUpdate);
  });
};

const toggleToDo = (id) => {
  return delay(500).then(() => {
    const todo = fakeDatabase.todos.find(t => { return t.id === id; });
    todo.completed = !todo.completed;
    updateFakeDatabaseStorage();
    return makeUnique(todo);
  });
};

export const fakePost = (endpoint, params = {}) => {
  switch (endpoint) {
    case 'fetchUsers':
      return fetchUsers(params.filter);
    case 'fetchToDos':
      return fetchToDos(params.filter);
    case 'addToDo':
      return addToDo(params.text);
    case 'updateToDo':
      return updateToDo(params.toDo);
    case 'toggleToDo':
      return toggleToDo(params.id);
    default:
      throw new Error(`Unkown endpoint: ${endpoint}`);
  }
};
