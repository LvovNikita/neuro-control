import { ListConfig, list } from '@keystone-6/core';
import { text, relationship } from '@keystone-6/core/fields';
import { BaseListTypeInfo } from '@keystone-6/core/types';

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
      query: () => false,
      create: () => false,
      update: () => false,
      delete: () => false
    }
  },
})
