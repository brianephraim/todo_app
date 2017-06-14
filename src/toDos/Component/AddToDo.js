import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addToDo } from '../state/actions';
import SingleInputForm from 'SingleInputForm';

const AddToDo = ({ dispatch }) => {
  console.log('G');
  return (
    <SingleInputForm
      buttonText="Add ToDo ....."
      onSubmit={(value) => { return dispatch(addToDo(value)); }}
    />
  );
};

AddToDo.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(AddToDo);
