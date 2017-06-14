import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import './FilterLink.scss';

const FilterLink = ({ filter, children }) => (
  <Link
    className="aaaa"
    to={`/todos/${filter}`}
    activeClassName="activex"
    activeStyle={{
      textDecoration: 'none',
      color: 'black',
    }}
  >
    {children}
  </Link>
);

FilterLink.propTypes = {
  filter: PropTypes.oneOf(['all', 'completed', 'active']).isRequired,
  children: PropTypes.node.isRequired,
};

export default FilterLink;
