import React from 'react';

const TextField = ({
  id,
  label,
  placeholder = 'Placeholder',
  value = '',
  errors = false,
  errorMessage = '',
  inputName,
  required,
  handleChange,
}: {
  id: string,
  label: string,
  placeholder: string,
  value: string,
  errors: boolean,
  errorMessage: string,
  inputName: string,
  required: boolean,
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void | null,
}) => (
  <div className="form-field form-field--text-field">
    <label className="form-field__label" htmlFor={ id }>
      { label }
    </label>
    <div
      className={ `form-field__input-wrap${
        errors && errorMessage !== '' ? ' has-error' : ''
      }` }
    >
      <input
        className="form-field__input"
        name={ inputName }
        type="text"
        id={ id }
        placeholder={ placeholder }
        value={ value }
        onChange={ handleChange }
        required={ required }
      />
    </div>
    { errors ? <p className="form-field__helper">{ errorMessage }</p> : null }
  </div>
);
export default TextField;
TextField.defaultProps = {
  handleChange: null,
};
