import { ListConfig, list } from '@keystone-6/core';
import { text, select, checkbox, json, integer } from '@keystone-6/core/fields';
import { BaseListTypeInfo } from '@keystone-6/core/types';

export const QuestionEntity: ListConfig<BaseListTypeInfo> = list({
  fields: {
    title: text(),
    description: text(),
    isRequired: checkbox(),
    type: select({
      type: 'enum',
      options: [
        { label: 'short', value: 'short' },
        { label: 'multipleChoice', value: 'multipleChoice' }, // Выбор одного из множества
        { label: 'checkboxes', value: 'checkboxes' }
      ],
    }),
    answer: json(),
    points: integer(),
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
