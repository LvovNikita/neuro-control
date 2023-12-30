import dotenv from 'dotenv';
import { config } from '@keystone-6/core';

import {
  ChildEntity,
  PageEntity,
  ParentEntity,
  PermissionEntity,
  QuestionEntity,
  RoleEntity,
  TestEntity,
  TestResultEntity,
  UserEntity,
  session,
  withAuth,
} from './modules';
import { onConnectHook } from './hooks/on-connect.hook';

dotenv.config({ path: './config/.env' });

export default withAuth(
  config({
    db: {
      provider: 'postgresql',
      url: `postgres://${process.env.STORAGE_PG_LOGIN}:${process.env.STORAGE_PG_PASSWORD}@${process.env.STORAGE_PG_HOST}:${process.env.STORAGE_PG_PORT}/${process.env.STORAGE_PG_PREFIX}_${process.env.STORAGE_PG_DBNAME}`,
      enableLogging: true,
      idField: { kind: 'uuid' },
      onConnect: onConnectHook
    },
    lists: {
      User: UserEntity,
      Role: RoleEntity,
      Permission: PermissionEntity,
      Page: PageEntity,
      Parent: ParentEntity,
      Child: ChildEntity,
      Test: TestEntity,
      Question: QuestionEntity,
      TestResult: TestResultEntity,
    },
    session,
  })
);
