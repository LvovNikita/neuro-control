import { ListConfig, list } from '@keystone-6/core';
import { text } from '@keystone-6/core/fields';
import { BaseListTypeInfo } from '@keystone-6/core/types';

export const RoleEntity: ListConfig<BaseListTypeInfo> = list({
  fields: {
    name: text(),
    sysname: text({
      isIndexed: 'unique'
    }),
    // groups: []
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
