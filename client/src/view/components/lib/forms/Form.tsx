import React, {
  FormEvent,
  ChangeEvent,
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  Container,
  TextField,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { reach, AnyObjectSchema } from 'yup';

const useStyles = makeStyles(() => ({
  button: {
    display: 'block',
    margin: '0 auto',
  },
}));

const Form = ({
  formName,
  fields,
  buttonText,
  submissionCallback,
  wasSuccess,
  wasError,
  schema,
} : {
  formName: string,
  fields: FormProps[],
  submissionCallback: (body: FormBody) => void,
  wasSuccess: boolean,
  wasError: boolean,
  buttonText: string,
  schema: AnyObjectSchema,
}) => {
  const classes = useStyles();
  const mapFields = useCallback(() => {
    const mappedFields: FormFields = {};
    fields.forEach((el) => {
      mappedFields[el.name] = {
        value: el.value || '',
        isRequired: el.required,
        errors: {
          valid: true,
          message: '',
        },
      };
    });

    return mappedFields;
  }, [fields]);

  const [formFields, setFormFields] = useState<FormFields>(mapFields());
  // Copying initial fields to set to later
  const [defaultForms] = useState(formFields);

  const [disabledButton, setDisabled] = useState(true);
  const [butonText, setButtonText] = useState(buttonText);

  useEffect(() => {
    setFormFields(mapFields());
  }, [fields, mapFields]);

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

    reach(schema, name)
      .validate(value)
      .then(() => {
        setFormFields({
          ...formFields,
          [name]: {
            ...formFields[name],
            value,
            errors: { valid: true, message: '' },
          },
        });
      })
      .catch((error: Error) => {
        setFormFields({
          ...formFields,
          [name]: {
            ...formFields[name],
            value,
            errors: { valid: false, message: error.message },
          },
        });
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
    <Container>
      <form className={ `${formName}-form` } noValidate onSubmit={ handleSubmit }>
        {
          fields.map((el) => (
            <TextField
              fullWidth
              margin="normal"
              required={ el.required }
              key={ el.name }
              name={ el.name }
              id={ `${formName}-${el.name}` }
              label={ el.label }
              value={ formFields[el.name].value }
              variant="outlined"
              error={ !formFields[el.name].errors.valid }
              helperText={
                formFields[el.name].errors.valid
                  ? el.helperText
                  : formFields[el.name].errors.message
              }
              onChange={ handleChange }
            />
          ))
        }
        <Button
          type="submit"
          disabled={ disabledButton }
          variant="contained"
          color="primary"
          size="large"
          className={ classes.button }
        >
          { butonText }
        </Button>
      </form>
    </Container>
  );
};

export default Form;
