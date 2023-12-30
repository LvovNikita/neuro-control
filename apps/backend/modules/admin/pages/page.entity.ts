import { ListConfig, list } from '@keystone-6/core';
import { checkbox, relationship, text } from '@keystone-6/core/fields';
import { BaseListTypeInfo } from '@keystone-6/core/types';
import { allowAdminRuleGroup, allowEveryone } from '../../auth';

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
      query: allowEveryone,
      create: allowAdminRuleGroup,
      update: allowAdminRuleGroup,
      delete: allowAdminRuleGroup
    }
  },
})
