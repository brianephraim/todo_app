import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../state/actions';
import * as getters from '../state/getters';
import ToDoList from './ToDoList';
import FetchError from './FetchError';

class VisibleToDoList extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, fetchToDos } = this.props;
    fetchToDos(filter);
  }

  render() {
    const { isFetching, errorMessage, onToDoClick, todos } = this.props;
    if (isFetching && !todos.length) {
      return <p>Loading...</p>;
    }
    if (errorMessage && !todos.length) {
      return (
        <FetchError
          message={errorMessage}
          onRetry={() => { return this.fetchData(); }}
        />
      );
    }

    return (
      <ToDoList
        todos={todos}
        onToDoClick={onToDoClick}
      />
    );
  }
}

VisibleToDoList.propTypes = {
  filter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
  errorMessage: PropTypes.string,
  todos: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchToDos: PropTypes.func.isRequired,
  onToDoClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state, { params }) => {
  const filter = params.filter || 'all';
  return {
    isFetching: getters.getIsFetching(state, filter),
    errorMessage: getters.getErrorMessage(state, filter),
    todos: getters.getVisibleToDos(state, filter),
    toBeAssignedFromRoot: getters.getToBeAssignedFromRoot(state),
    filter,
  };
};

const mapDispatchToProps = {
  fetchToDos: actions.fetchToDos,
  addToDo: actions.addToDo,
  toggleToDo: actions.toggleToDo,
  assignUser: actions.assignUser,
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  let onToDoClick = dispatchProps.toggleToDo;
  if (stateProps.toBeAssignedFromRoot) {
    onToDoClick = dispatchProps.assignUser;
  }
  return {
    ...stateProps,

    ...dispatchProps,
    onToDoClick,

    ...ownProps,
  };
}

VisibleToDoList = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(VisibleToDoList));

export default VisibleToDoList;
