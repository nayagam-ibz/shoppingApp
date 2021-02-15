const validation = (values) => {
  const errors = {};

  if (!values.firstname) {
    errors.firstname = 'required';
  }

  if (!values.lastname) {
    errors.lastname = 'required';
  }

  if (!values.address1) {
    errors.address1 = 'required';
  }

  if (!values.address2) {
    errors.address2 = 'required';
  }

  if (!values.phone) {
    errors.phone = 'required';
  }

  if (!values.state_id) {
    errors.state_id = 'required';
  }

  if (!values.country_id) {
    errors.country_id = 'required';
  }

  if (!values.city) {
    errors.city = 'required';
  }

  if (!values.zipcode) {
    errors.zipcode = 'required';
  }

  if (!values.email) {
    errors.email = 'required';
  } else if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'required validate email';
  }

  if (!values.password) {
    errors.password = 'required';
  }

  if (!values.password_confirmation) {
    errors.password_confirmation = 'required';
  } else if (values.password_confirmation !== values.password) {
    errors.password_confirmation = 'mismatched';
  }

  if (!values.phone) {
    errors.phone = 'required';
  } else if (values.phone && values.phone.length < 10) {
    errors.phone = 'required';
  }

  return errors;
};

export default validation;