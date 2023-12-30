import { randomBytes } from 'node:crypto';

import { statelessSessions } from '@keystone-6/core/session';

let sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret && process.env.NODE_ENV !== 'production') {
  sessionSecret = randomBytes(32).toString('hex');
}

const sessionMaxAge = 60 * 60 * 24 * 30;

export const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: sessionSecret,
});
