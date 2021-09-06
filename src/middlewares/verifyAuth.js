import jwt from 'jsonwebtoken';

// Middleware para validar el token (rutas protegidas)
function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  // Se verifica si el request posee el header authorization
  if (!token) return res.status(403).json({ error: 'No token provided.' });
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    // Continuamos
    next();
  } catch (error) {
    return res.status(400).json({ error: 'Invalid token' });
  }
}

export default verifyToken;
