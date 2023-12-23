import { ListConfig, list } from '@keystone-6/core';
import { checkbox, relationship, text } from '@keystone-6/core/fields';
import { BaseListTypeInfo } from '@keystone-6/core/types';

export const PageEntity: ListConfig<BaseListTypeInfo> = list({
  fields: {
    title: text(),
    parent: relationship({
      ref: 'Page',
      many: false
    }),
    showInMenu: checkbox(),
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
