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
  label: string,
  helperText: string,
  required: boolean,
  value?: any,
};

type FormBody = {
  [key: string]: string,
}
