import { ListConfig, list } from '@keystone-6/core';
import { text, relationship } from '@keystone-6/core/fields';
import { BaseListTypeInfo } from '@keystone-6/core/types';
import { allowAdminRuleGroup, allowEveryone } from '../../auth';

export const TestEntity: ListConfig<BaseListTypeInfo> = list({
  fields: {
    title: text(),
    questions: relationship({
      ref: 'Question',
      many: true,
    }),
  },
  access: {
    operation: {
      query: allowEveryone,
      create: allowAdminRuleGroup,
      update: allowAdminRuleGroup,
      delete: allowAdminRuleGroup
    }
  },
})
