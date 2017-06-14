import React from 'react';
import PropTypes from 'prop-types';
import ToDos from './toDos/Component';
import { Users } from './users';
// <Users filter={params.filter} />
const ToDoUserAssignmentScreen = ({ params }) => {
  console.log('TTT');
  return (
    <div>
      <ToDos filter={params.filter} />
      <Users filter={params.filter} />
      <Users filter={params.filter} />
    </div>
  );
};

ToDoUserAssignmentScreen.propTypes = {
  params: PropTypes.shape({
    filter: PropTypes.string,
  }),
};

export default ToDoUserAssignmentScreen;
