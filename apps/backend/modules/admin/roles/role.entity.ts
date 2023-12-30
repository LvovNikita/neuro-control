import { ListConfig, list } from '@keystone-6/core';
import { relationship, text } from '@keystone-6/core/fields';
import { BaseListTypeInfo } from '@keystone-6/core/types';
import { allowAdminRuleGroup } from '../../auth';

export const RoleEntity: ListConfig<BaseListTypeInfo> = list({
  fields: {
    name: text(),
    sysname: text({
      isIndexed: 'unique'
    }),
    pages: relationship({
      ref: 'Page',
      many: true
    }),
    permission: relationship({
      ref: 'Permission',
      many: true
    })
  },
  access: {
    operation: {
      query: allowAdminRuleGroup,
      create: allowAdminRuleGroup,
      update: allowAdminRuleGroup,
      delete: allowAdminRuleGroup
    }
  },
})
