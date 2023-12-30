import { ListConfig, list } from '@keystone-6/core';
import { text } from '@keystone-6/core/fields';
import { BaseListTypeInfo } from '@keystone-6/core/types';
import { allowAdminRuleGroup } from '../../auth';

export const PermissionEntity: ListConfig<BaseListTypeInfo> = list({
  fields: {
    name: text(),
    sysname: text({
      isIndexed: true
    }),
    description: text(),
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
