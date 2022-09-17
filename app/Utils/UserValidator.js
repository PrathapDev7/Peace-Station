import * as yup from "yup";

const createUserSchema = yup.object().shape({
  first_name: yup.string().min(3, 'first_name must be more than 3 characters').max(100).required({ first_name: 'first_name is required' }),
  last_name: yup.string().min(3, 'last_name must be more than 3 characters').max(100).required({ last_name: 'last_name is required' }),
  email: yup.string().min(3, 'email must be more than 3 characters').max(100).email().required({ email: 'email is required' }),
  mobile_number: yup.string().min(3).max(100),
  password: yup.string().min(3, 'password must be more than 3 characters').max(100).required({ password: 'password is required' }),
});

const createUserWithoutPasswordSchema = yup.object().shape({
  parent_type: yup.string().required({ parent_type: 'parent_type is required' }),
  first_name: yup.string().min(3, 'first_name must be more than 3 characters').max(100).required({ first_name: 'first_name is required' }),
  last_name: yup.string().min(3, 'last_name must be more than 3 characters').max(100).required({ last_name: 'last_name is required' }),
  email: yup.string().min(3, 'email must be more than 3 characters').max(100).email().required({ email: 'email is required' }),
  mobile_number: yup.string().min(3).max(100),
  having_children: yup.number().required({ having_children: 'please let us know how many children do you have.' }),
});

const loginSchema = yup.object().shape({
  email: yup.string().min(3, 'email must be more than 3 characters').max(100).email().required({ email: 'email is required' }),
  password: yup.string().min(3, 'password must be more than 3 characters').max(100).required({ password: 'password is required' }),
});

const updateUserSchema = yup.object().shape({
  first_name: yup.string().min(3, 'first_name must be more than 3 characters').max(100).required({ first_name: 'first_name is required' }),
  last_name: yup.string().min(3, 'last_name must be more than 3 characters').max(100).required({ last_name: 'last_name is required' }),
});

module.exports = {
  loginSchema,
  createUserSchema,
  updateUserSchema,
  createUserWithoutPasswordSchema
}
