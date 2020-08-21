import React, {
  FormEvent,
  ChangeEvent,
  useState,
  useEffect,
} from 'react';

import validator from './validator';
import TextField from './TextField';
import Button from './Button';

const Form = ({
  formName,
  fields,
  submissionCallback,
  wasSuccess,
  wasError,
} : {
  formName: string,
  fields: FormProps[],
  submissionCallback: (body: FormBody) => void,
  wasSuccess: boolean,
  wasError: boolean,
}) => {
  const mappedFields: FormFields = {};
  fields.forEach((el) => {
    mappedFields[el.name] = {
      value: '',
      isRequired: el.required,
      errors: {
        valid: !el.required,
        message: '',
      },
    };
  });

  const [formFields, setFormFields] = useState<FormFields>(mappedFields);

  // Copying empty form to set to later
  const [defaultForms] = useState(formFields);

  const [disabledButton, setDisabled] = useState(true);
  const [butonText, setButtonText] = useState('Submit');

  const onSubmission = () => {
    setButtonText('Submitting...');
  };

  useEffect(() => {
    let btnWillBeDisabled = false;
    const keys = Object.keys(formFields);

    keys.forEach((el) => {
      const curField = formFields[el];

      // If invalid then that's enough
      if (!curField.errors.valid) btnWillBeDisabled = true;

      // If empty and required then should still be disabled
      if (curField.value === '' && curField.isRequired) { btnWillBeDisabled = true; }
    });

    setDisabled(btnWillBeDisabled);
  }, [formFields]);

  /**
   * Passing possible success from outside
   */
  useEffect(() => {
    const onSuccess = () => {
      setButtonText('Success!');
      setFormFields(defaultForms);
    };

    if (wasSuccess) onSuccess();
  }, [wasSuccess, defaultForms]);

  /**
   * Passing possible error from outside
   */
  useEffect(() => {
    const onError = () => {
      setButtonText('Error');
    };
    if (wasError) onError();
  }, [wasError]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value }: { value: string } = e.target;
    const { name }: { name: string } = e.target;

    const errorResult = formFields[name].isRequired
      ? validator(name, value)
      : { valid: true, message: '' };

    setFormFields({
      ...formFields,
      [name]: {
        ...formFields[name],
        value,
        errors: errorResult,
      },
    });
  };

  const handleSubmit = (e: FormEvent) => {
    // The norm as we're hadling it ourselves
    e.preventDefault();

    // Another check here so someone doesn't remove the disbaled props and submit
    if (disabledButton) return;

    const reqBody : FormBody = {};
    Object.keys(formFields).map((el) => {
      reqBody[el] = formFields[el].value;
      return true;
    });

    // Once request goes out...
    onSubmission();
    submissionCallback(reqBody);
    // Emit event...
  };

  return (
    <form className={ `${formName}-form` } noValidate onSubmit={ handleSubmit }>
      {
        fields.map((el) => (
          <TextField
            key={ el.name }
            inputName={ el.name }
            id={ `${formName}-${el.name}` }
            label={ el.name.toUpperCase() }
            value={ formFields[el.name].value }
            errors={ !formFields[el.name].errors.valid }
            errorMessage={ formFields[el.name].errors.message }
            handleChange={ handleChange }
            placeholder=""
            required
          />
        ))
      }

      <div className="contact-form__btn-wrap">
        <Button
          className="button--pri"
          type="submit"
          disabled={ disabledButton }
        >
          { butonText }
        </Button>
      </div>
    </form>
  );
};

export default Form;
