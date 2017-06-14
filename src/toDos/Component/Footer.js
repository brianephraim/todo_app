import React from 'react';
import styled from 'styled-components';
import FilterLink from './FilterLink';


const Wrapper = styled.div`
  background: #fff;
  margin: 10px;
  padding: 10px;
  color: #000;
`;

const Footer = () => {
  return (
    <Wrapper>
      Show:
      {" "}
      <FilterLink filter="all">
        All
      </FilterLink>
      {", "}
      <FilterLink filter="active">
        Active
      </FilterLink>
      {", "}
      <FilterLink filter="completed">
        Completed
      </FilterLink>
    </Wrapper>
  );
};

export default Footer;
