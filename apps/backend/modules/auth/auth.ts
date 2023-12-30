import { createAuth } from '@keystone-6/auth';

export const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['username', 'email', 'password'],
  },
  // Добавим в сессию информацию о роли пользователя
  sessionData: 'role { sysname }',
});
