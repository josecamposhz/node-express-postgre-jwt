import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import schemaValidate from '../helpers/joi';
import ResponseHttp from '../helpers/ResponseHttp';
import { schemaRegister, schemaLogin } from '../helpers/joi/schemas';

import userRepository from '../repositories/user.repository';

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hash(password, salt);
  return hash;
};

async function register(body) {
  try {
    // Validamos que los datos cumplen con la estructura del schemaRegister
    const { error } = schemaValidate(schemaRegister, body);
    if (error) return ResponseHttp({ error }, 400);

    // Validamos que el email no se encuentra en nuestra base de datos
    const validEmail = await userRepository.getUserByEmail(body.email);
    if (validEmail.length === 0) {
      return ResponseHttp({ error: 'Email ya registrado' }, 400);
    }

    const password = await encryptPassword(body.password);

    await userRepository.create({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      password,
    });

    return ResponseHttp('Registro exitoso', 201);
  } catch (error) {
    return ResponseHttp({ error }, 400);
  }
}

async function login(body) {
  try {
    const { error } = schemaValidate(schemaLogin, body);
    if (error) return ResponseHttp({ error }, 400);

    const validEmail = await userRepository.getUserByEmail(body.email);
    if (validEmail.length === 0) {
      return ResponseHttp({ error: 'Usuario no encontrado' }, 404);
    }

    const user = validEmail[0];

    const validPassword = await await bcrypt.compare(body.password, user.password);
    if (!validPassword) {
      return ResponseHttp({ error: 'Contraseña incorrecta' }, 400);
    }

    // Se crea el token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: 60 * 60 * 24 * 30 }
    ); // Expira en 30 días

    return ResponseHttp({ user, token }, 200);
  } catch (error) {
    return ResponseHttp({ error }, 400);
  }
}

export default {
  register,
  login,
};
