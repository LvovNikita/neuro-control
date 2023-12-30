import { ListConfig, list } from '@keystone-6/core';
import { BaseListTypeInfo } from '@keystone-6/core/types';
import { password, relationship, text } from '@keystone-6/core/fields'

import { allowAdminRuleGroup } from '../../auth/access-guards';

export const UserEntity: ListConfig<BaseListTypeInfo> = list({
  fields: {
    username: text(),
    password: password({
      isFilterable: false,
      isOrderable: false
    }),
    email: text({
      isIndexed: 'unique'
    }),
    role: relationship({
      ref: 'Role',
      many: false,
    }),
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
