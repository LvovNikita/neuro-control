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
      query: () => true,
      create: () => true,
      update: () => true,
      delete: () => true
    }
  },
})
