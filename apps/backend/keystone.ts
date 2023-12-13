import dotenv from 'dotenv'
import { config } from '@keystone-6/core';

import { withAuth, session } from './modules/auth';
import { UserEntity } from './modules/users/user.entity';
import { RoleEntity } from './modules/roles/role.entity';

dotenv.config({ path: './config/.env' });

export default withAuth(
  config({
    db: {
      provider: 'postgresql',
      url: 'postgres://postgres:postgres@localhost:5432/develop_neuro_control',
      enableLogging: true,
      idField: {
        kind: 'uuid',
      },
      onConnect: async () => {
        console.log('Connected to PostgreSQL')
      }
    },
    lists: {
      User: UserEntity,
      Role: RoleEntity
    },
    session,
  })
);
