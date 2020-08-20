export default (name: string, value: string) => {
  const result = {
    valid: false,
    message: '',
  };
  switch (name) {
    case 'email': {
      const emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      result.valid = !!emailValid;
      result.message = emailValid ? '' : 'Not a valid email address.';
      break;
    }
    case 'name': {
      const nameValid = value.match(/^[a-zA-z ]{2,}$/);
      result.valid = !!nameValid;
      result.message = nameValid ? '' : 'Can only contain letters.';
      break;
    }
    case 'company': {
      const companyValid = value.match(/^[\w '.]{1,}$/);
      result.valid = !!companyValid;
      result.message = companyValid ? '' : 'Please remove special characters.';
      break;
    }
    default:
      result.valid = true;
      break;
  }

  return result;
};
