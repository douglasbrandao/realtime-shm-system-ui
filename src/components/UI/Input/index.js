import React from 'react';
import PropTypes from 'prop-types';
import Alert from '../Alert';

function StyledInput({ field, form: { errors }, ...props }) {
  return (
    <>
      <input {...field} {...props} />
      {errors[field.name] && (
        <Alert type="danger">
          <span>{errors[field.name]}</span>
        </Alert>
      )}
    </>
  );
}

StyledInput.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    errors: PropTypes.shape({
      field: PropTypes.string,
    }),
  }).isRequired,
};

export default StyledInput;
