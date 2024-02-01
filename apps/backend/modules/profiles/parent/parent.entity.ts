import { ListConfig, list } from '@keystone-6/core';
import { BaseListTypeInfo } from '@keystone-6/core/types';
import { relationship, text } from '@keystone-6/core/fields'
import { allowAdminRuleGroup, allowSelf } from '../../auth';

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
      query: allowSelf,
      create: allowAdminRuleGroup,
      update: allowSelf,
      delete: allowSelf
    }
  },
})
