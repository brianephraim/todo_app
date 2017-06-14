import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import DragAndTossable from 'DragAndTossable';
import styled from 'styled-components';

const Ball = styled(DragAndTossable)`
  width: 80px;
  height: 80px;
  background: #aaa;
  border-radius: 50%;
  border: 5px solid #222;
`;

const Wrapper = styled.div`
  background: #bbb;
  display: inline-block;
  margin: 10px;
  padding: 10px;
  color: #000;
  width: 150px;
  height: 150px;
`;


class ToDoItem extends Component {
  constructor() {
    super();
    this.state = {
      extreme: false,
    };
  }
  render() {
    const { onClick, completed, text, assignedUser } = this.props;
    return (
      <Wrapper>
        <div className="b">
          <Ball
            maybeResetAtEnd={(data) => {
              // stimulate({
              //   from: 5,
              //   to: 100,
              //   duration: 1000,
              //   frame: function(progress){
              //     console.log(progress.tweened)
              //   }
              // });
              return data.delta.x < 200;
            }}
            onDraggy={(data) => {
              if (data.delta.x > 200) {
                this.setState({
                  extreme: true,
                });
              } else {
                this.setState({
                  extreme: false,
                });
              }
            }}
          />
          <div
            onClick={onClick}
            style={{
              textDecoration: completed ? 'line-through' : 'none',
            }}
          >
            <div>Task: {text}</div>
            <div>Assigned: {assignedUser && assignedUser.name} {this.state.extreme ? '!' : ''}</div>
          </div>
        </div>
      </Wrapper>
    );
  }
}

ToDoItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  assignedUser: PropTypes.object,
};

const mapStateToProps = (state, props) => {
  return {
    assignedUser: state.users.idDict[props.assignedUserId],
  };
};

ToDoItem = withRouter(connect(mapStateToProps)(ToDoItem));

export default ToDoItem;
