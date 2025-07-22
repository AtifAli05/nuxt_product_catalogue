// server/middleware/auth.js or wherever you store it

import { getHeader, eventHandler, createError } from 'h3';
import { verifyAccessToken } from '../utils/jwt.js';

export const requireAuth = eventHandler(async (event) => {
  const token = getHeader(event, 'authorization')?.split(' ')[1];

  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'No token provided' });
  }

  try {
    const user = verifyAccessToken(token);
    event.context.user = user;
  } catch {
    throw createError({ statusCode: 401, statusMessage: 'Invalid token' });
  }
});

export const requireAdmin = eventHandler((event) => {
  const user = event.context.user;

  if (!user || user.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Admin access required' });
  }
});
