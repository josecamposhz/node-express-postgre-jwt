import joi from 'joi';

const first_name = joi.string().min(2).max(255).required().label('Nombres');
const last_name = joi.string().min(2).max(255).required().label('Apellidos');
const email = joi.string().min(6).max(255).required().email().label('Correo electrónico');
const password = joi.string().min(6).max(1024).required();

export const schemaRegister = joi.object({
  first_name,
  last_name,
  email,
  password: password.label('Contraseña'),
});
export const schemaLogin = joi.object({ email, password: password.label('Contraseña') });

export const schemaTask = joi.object({
  description: joi.string().min(2).max(255).required().label('Descripción'),
  done: joi.boolean().label('Estado'),
});
