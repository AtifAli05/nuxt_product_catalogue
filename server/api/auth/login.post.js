// server/api/auth/login.post.js
import User from '../models/users.js';
import { comparePasswords } from '../utils/hash.js';
import { signAccessToken, signRefreshToken } from '../utils/jwt.js';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return sendError(event, createError({ statusCode: 401, message: 'Invalid email or password' }));
  }

  const isMatch = await comparePasswords(password, user.password);
  if (!isMatch) {
    return sendError(event, createError({ statusCode: 401, message: 'Invalid email or password' }));
  }

  const payload = { id: user.id, email: user.email };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  return {
    accessToken,
    refreshToken,
    user: { id: user.id, email: user.email }
  };
});
