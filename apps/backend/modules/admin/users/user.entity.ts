import { ListConfig, list } from '@keystone-6/core';
import { BaseListTypeInfo } from '@keystone-6/core/types';
import { password, relationship, text } from '@keystone-6/core/fields'

export const UserEntity: ListConfig<BaseListTypeInfo> = list({
  fields: {
    username: text(),
    password: password(),
    email: text({
      isIndexed: 'unique'
    }),
    role: relationship({
      ref: 'Role',
      many: false
    }),
  },
  access: {
    operation: {
      query: () => true,
      create: () => true,
      update: () => true,
      delete: () => true
    }
  },
})
