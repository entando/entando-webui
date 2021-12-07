import React from 'react';
import PropTypes from 'prop-types';

export default function Root(props) {
  return <section>{props.name} is mounted!</section>;
}

Root.propTypes = {
  name: PropTypes.string.isRequired
};
