import type { FormEvent, ChangeEvent } from 'react';
import React, {
  useState, useEffect,
} from 'react';
import validator from './validator';
import TextField from './TextField';
import Button from './Button';
// import api from '../../../../api';

type Field = {
  value: string,
  isRequired: boolean,
  errors: {
    valid: boolean,
    message: string,
  }
};

type FormFields = {
  [key: string]: Field,
};

type FormProps = {
  name: string,
  required: boolean,
};

type FormBody = {
  [key: string]: string,
}

const ContactForm = ({
  formName,
  fields,
  submissionCallback,
} : {
  formName: string,
  fields: FormProps[],
  submissionCallback: Function,
}) => {
  const mappedFields: FormFields = {};
  fields.forEach((el) => {
    mappedFields[el.name] = {
      value: '',
      isRequired: el.required,
      errors: {
        valid: false,
        message: '',
      },
    };
  });

  const [formFields, setFormFields] = useState<FormFields>(mappedFields);

  // Copying empty form to set to later
  const [defaultForms] = useState(formFields);

  const [disabledButton, setDisabled] = useState(true);
  const [butonText, setButtonText] = useState('Submit');

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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value }: { value: string } = e.target;
    const { name }: { name: string } = e.target;

    const errorResult = validator(name, value);

    setFormFields({
      ...formFields,
      [name]: {
        ...formFields[name],
        value,
        errors: errorResult,
      },
    });
  };

  const clearForm = () => {
    setFormFields(defaultForms);
  };

  const onSubmission = () => {
    setButtonText('Submitting...');
  };

  // const onSuccess = () => {
  //   setButtonText('Success!');
  //   clearForm();
  // };

  // const onError = () => {
  //   setButtonText('Error');
  // };

  const handleSubmit = (e: FormEvent) => {
    // The norm as we're hadling it ourselves
    e.preventDefault();

    // Another check here so someone doesn't remove the disbaled props and submit
    if (disabledButton) return;

    const reqBody : FormBody = {};
    Object.keys(formFields).map((el) => {
      reqBody[el] = formFields[el].value;
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

export default ContactForm;
