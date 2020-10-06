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
  required: boolean,
};

type FormBody = {
  [key: string]: string,
}
