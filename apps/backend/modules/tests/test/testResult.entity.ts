import { ListConfig, list } from '@keystone-6/core';
import { relationship, calendarDay, json } from '@keystone-6/core/fields';
import { BaseListTypeInfo } from '@keystone-6/core/types';
import { allowAuthor, allowParent } from '../../auth';

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
      query: allowAuthor,
      create: allowAuthor,
      update: allowAuthor,
      delete: allowAuthor
    }
  },
})
