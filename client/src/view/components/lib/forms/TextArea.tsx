import React from 'react';

const TextArea = ({
  id,
  label,
  inputName,
  rows = 5,
  cols = 33,
  placeholder = 'Placeholder',
  value = '',
  errors,
  required,
  errorMessage,
  handleChange,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  rows: number;
  cols: number;
  inputName: string;
  required: boolean;
  errors: boolean;
  errorMessage: string;
  handleChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void | null;
}) => (
  <div className="form-field form-field--text-area">
    <label className="form-field__label" htmlFor={ id }>
      { label }
    </label>
    <div className={ `form-field__input-wrap${errors ? ' has-error' : ''}` }>
      <textarea
        className="form-field__input"
        name={ inputName }
        id={ id }
        rows={ rows }
        cols={ cols }
        placeholder={ placeholder }
        value={ value }
        required={ required }
        onChange={ handleChange }
      />
    </div>
    { errors ? <p className="text-area__helper">{ errorMessage }</p> : null }
  </div>
);
export default TextArea;
TextArea.defaultProps = {
  handleChange: null,
};
