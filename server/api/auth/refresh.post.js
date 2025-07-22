// server/api/auth/refresh.post.js

import { signAccessToken, verifyRefreshToken } from "../utils/jwt";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { refreshToken } = body;

  if (!refreshToken) {
    return sendError(event, createError({ statusCode: 400, message: 'Refresh token missing' }));
  }

  try {
    const payload = verifyRefreshToken(refreshToken);
    const newAccessToken = signAccessToken({ id: payload.id, email: payload.email });

    return { accessToken: newAccessToken };
  } catch (err) {
    return sendError(event, createError({ statusCode: 403, message: 'Invalid refresh token' }));
  }
});
