import { BaseListTypeInfo, ListOperationAccessControl } from '@keystone-6/core/types';
import { AccessOperation, BaseAccessArgs } from '@keystone-6/core/dist/declarations/src/types/config/access-control';

/** Разрешить всем */
export const allowEveryone: ListOperationAccessControl<AccessOperation, BaseListTypeInfo> = () => {
  if (process.env.NO_AUTH === 'true') return true
  return true;
} 

/** Разрешить пользователям с ролью admin */
export const allowAdminRuleGroup: ListOperationAccessControl<AccessOperation, BaseListTypeInfo> = (args: BaseAccessArgs<BaseListTypeInfo>) => {
  if (process.env.NO_AUTH === 'true') return true
  const { session } = args;
  return session?.data?.role?.sysname === 'admin';
} 

/** Разрешить пользователям с ролью parent */
export const allowParentRuleGroup: ListOperationAccessControl<AccessOperation, BaseListTypeInfo> = (args: BaseAccessArgs<BaseListTypeInfo>) => {
  if (process.env.NO_AUTH === 'true') return true
  const { session } = args;
  return session?.data?.role?.sysname === 'parent';
} 

/** Разрешить создателю записи */
export const allowAuthor = () => {
  if (process.env.NO_AUTH === 'true') return true
  // TODO:
  return false
}

/** Разрешить себе (операции над профилем) */
export const allowSelf = () => {
  if (process.env.NO_AUTH === 'true') return true
  // TODO:
  return false
}

/** Разрешить родителю (операции над детьми) */
export const allowParent = () => {
  if (process.env.NO_AUTH === 'true') return true
  // TODO:
  return false
}
