import dotenv from 'dotenv'
import { config } from '@keystone-6/core';

import { withAuth, session } from './modules/auth';
import { UserEntity } from './modules/admin/users/user.entity';
import { RoleEntity } from './modules/admin/roles/role.entity';
import { PermissionEntity } from './modules/admin/permissions/permission.entity';
import { ParentEntity } from './modules/profiles/parent/parent.entity';
import { ChildEntity } from './modules/child/child.entity';
import { TestEntity } from './modules/tests/test/test.entity';
import { QuestionEntity } from './modules/tests/question/question.entity';
import { PageEntity } from './modules/admin/pages/page.entity';
import { TestResultEntity } from './modules/tests/test/testResult.entity';

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
      Role: RoleEntity,
      Permission: PermissionEntity,
      Page: PageEntity,
      Parent: ParentEntity,
      Child: ChildEntity,
      Test: TestEntity,
      Question: QuestionEntity,
      TestResult: TestResultEntity
    },
    session,
  })
);
