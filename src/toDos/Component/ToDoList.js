import React from 'react';
import PropTypes from 'prop-types';
import ToDoItem from './ToDoItem';

const ToDoList = ({ todos, onToDoClick }) => (
  <div>
    {todos.map(todo =>
      <ToDoItem
        key={todo.id}
        {...todo}
        onClick={() => onToDoClick(todo.id)}
      />
    )}
  </div>
);

ToDoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  onToDoClick: PropTypes.func.isRequired,
};

export default ToDoList;
