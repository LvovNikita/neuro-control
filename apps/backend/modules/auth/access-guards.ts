import { BaseListTypeInfo, ListOperationAccessControl } from '@keystone-6/core/types';
import { AccessOperation, BaseAccessArgs } from '@keystone-6/core/dist/declarations/src/types/config/access-control';

export const allowEveryone: ListOperationAccessControl<AccessOperation, BaseListTypeInfo> = () => {
  return true;
} 

export const allowAdminRuleGroup: ListOperationAccessControl<AccessOperation, BaseListTypeInfo> = (args: BaseAccessArgs<BaseListTypeInfo>) => {
  const { session } = args;
  return session?.data?.role?.sysname === 'admin';
} 

export const allowParentRuleGroup: ListOperationAccessControl<AccessOperation, BaseListTypeInfo> = (args: BaseAccessArgs<BaseListTypeInfo>) => {
  const { session } = args;
  return session?.data?.role?.sysname === 'parent';
} 
