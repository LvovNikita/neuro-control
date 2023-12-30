import { ListConfig, list } from '@keystone-6/core';
import { relationship, calendarDay, json } from '@keystone-6/core/fields';
import { BaseListTypeInfo } from '@keystone-6/core/types';

export const TestResultEntity: ListConfig<BaseListTypeInfo> = list({
  fields: {
    test: relationship({
      ref: 'Test',
      many: false
    }),
    child: relationship({
      ref: 'Child',
      many: false,
    }),
    date: calendarDay(),
    result: json(),
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
