const userConstraints = {
  firstName: {
    presence: { allowEmpty: false },
  },
  lastName: {
    presence: { allowEmpty: false },
  },
  email: {
    presence: { allowEmpty: false },
    email: true,
  },
  password: {
    presence: { allowEmpty: false },
    length: {
            minimum: 4,
            maximum: 20
        },
  }
  
};

export const addUserConstraints = {
  firstName: userConstraints.firstName,
  lastName: userConstraints.lastName,
  email: userConstraints.email,
  password: userConstraints.password,
};

export const signInConstraints = {
  email: userConstraints.email,
  password: userConstraints.password,
};