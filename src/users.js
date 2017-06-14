import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fakePost as post } from './api';
import { normalize, Schema, arrayOf } from 'normalizr';
import { combineReducers } from 'redux';
import createCachedSelector from 're-reselect';
import styled from 'styled-components';

// =================

export const usersReducers = combineReducers({
  idDict: (state = {}, action) => {
    switch (action.type) {
      case 'FETCH_USERS_SUCCESS':
        return {
          ...state,
          ...action.response.entities.users,
        };
      default:
        return state;
    }
  },
  list: (state = [], action) => {
    switch (action.type) {
      case 'FETCH_USERS_SUCCESS':
        return action.response.result;
      default:
        return state;
    }
  },
});

// =================

const usersSchema = new Schema('users');
const arrayOfUsersSchema = arrayOf(usersSchema);
const schema = {
  users: usersSchema,
  arrayOfUsers: arrayOfUsersSchema,
};

const actions = {
  fetchUsers: () => {
    return (dispatch/* , getState*/) => {
      return post('fetchUsers').then(
        (response) => {
          dispatch({
            type: 'FETCH_USERS_SUCCESS',
            response: normalize(response, schema.arrayOfUsers),
          });
        }
      );
    };
  },
};

// =================

const getUserId = (state, props) =>
  props.user.id

const getTodosIdDict = (state, props) =>
  state.toDos.toDosIdDict

const getToDoAssignments = createCachedSelector(
  [ getUserId, getTodosIdDict ],
  (userId, toDosIdDict) => {
    console.log('selector processing', userId);
    return Object.keys(toDosIdDict).reduce((accum, toDoId) => {

      if (toDosIdDict[toDoId].assignedUserId === userId) {
        accum.push(toDosIdDict[toDoId].text);
      }
      return accum;
    }, []);
  }
)(
  /*
   * Re-reselect resolver function.
   * Cache/call a new selector for each different "props.user.id"
   */
  (state, props) => { return props.user.id; }
);


// const makeMapStateToProps = () => {
//   const mapStateToProps = (state, props) => {
//     return {
//       toDoAssignments: getToDoAssignments(state, props)
//     }
//   }
//   return mapStateToProps
// }
const UserStyled = styled.div`
  background: #bbb;
  margin: 10px;
  padding: 10px;
  color: #000;
`;
class User extends Component {
  render () {
    const { user, onClick, toDoAssignments } = this.props;
    return (
      <UserStyled
        onClick={() => { return onClick(user.id); }}
      >
        {user.name} - {JSON.stringify(toDoAssignments)}
      </UserStyled>
    );
  }
}

User.propTypes = {
  user: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  toDoAssignments: PropTypes.array,
};

User = connect(
  //mapStateToProps
  (state, props) => {
    return {
      toDoAssignments: getToDoAssignments(state, props)
    }
  }
  //,mapDispatchToProps
  //,mergeProps
)(User)


// =================


class Users extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    return (
      <div>
        <hr />
        <h2>Users</h2>
        {
          this.props.users.map((user) => {
            return (
              <User
                key={user.id}
                user={user}
                onClick={() => {
                  this.props.prepareExternalAssignment(user.id);
                }}
              />
            );
          })
        }
        <hr />
        <h4>assigning: {this.props.toBeAssigned}</h4>
      </div>
    );
  }
}

Users.propTypes = {
  users: PropTypes.array.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  prepareExternalAssignment: PropTypes.func.isRequired,
  toBeAssigned: PropTypes.any,
};

const getDetailsOfToBeAssigned = (state) => {
  const id = state.appRoot.toBeAssigned;
  if (!id) {
    return id;
  }
  return state.users.idDict[id].name;
};

const mapStateToProps = (state/* , { params }*/) => {
  return {
    users: state.users.list.map((id) => {
      return state.users.idDict[id];
    }),
    toBeAssigned: getDetailsOfToBeAssigned(state),
  };
};

const mapDispatchToProps = {
  fetchUsers: actions.fetchUsers,
  prepareExternalAssignment(userId) {
    return (dispatch/* , getState*/) => {
      dispatch({
        type: 'PREPARE_EXTERNAL_ASSIGNMENT',
        userId,
      });
    };
  },
};

Users = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Users));

export { Users };
