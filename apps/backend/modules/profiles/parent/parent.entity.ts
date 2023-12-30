import { ListConfig, list } from '@keystone-6/core';
import { BaseListTypeInfo } from '@keystone-6/core/types';
import { relationship, text } from '@keystone-6/core/fields'
import { allowAdminRuleGroup, allowParentRuleGroup } from '../../auth';

export const ParentEntity: ListConfig<BaseListTypeInfo> = list({
  fields: {
    user: relationship({
      ref: 'User',
      many: false,
    }),
    name: text(),
    children: relationship({
      ref: 'Child',
      many: true,
    }),
    friends: relationship({
      ref: 'Parent',
      many: true,
    })
  },
  access: {
    operation: {
      query: () => false,
      create: () => false,
      update: () => false,
      delete: allowAdminRuleGroup
    }
  },
})
