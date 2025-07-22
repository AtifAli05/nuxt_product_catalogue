// server/api/auth/register.post.js
import User from '../models/users.js';
import { hashPassword } from '../utils/hash.js';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  if (!email || !password) {
    return sendError(event, createError({ statusCode: 400, message: 'Missing credentials' }));
  }

  const existing = await User.findOne({ where: { email } });
  if (existing) {
    return sendError(event, createError({ statusCode: 409, message: 'User already exists' }));
  }

  const hashedPassword = await hashPassword(password);
  const user = await User.create({ email, password: hashedPassword });

  return { message: 'User registered successfully', user: { id: user.id, email: user.email } };
});
