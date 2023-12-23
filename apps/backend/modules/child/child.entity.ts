import { ListConfig, list } from '@keystone-6/core';
import { text, calendarDay, select, relationship } from '@keystone-6/core/fields';
import { BaseListTypeInfo } from '@keystone-6/core/types';

export const ChildEntity: ListConfig<BaseListTypeInfo> = list({
  fields: {
    name: text(),
    dateOfBirth: calendarDay(),
    gender: select({
      type: 'enum',
      options: [
        { label: 'male', value: 'male' },
        { label: 'female', value: 'female' },
      ]
    }),
    medicalInfo: text(),
    testsResults: relationship({
      ref: 'TestResult',
      many: true,
    })
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
