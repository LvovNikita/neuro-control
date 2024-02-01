# NeuroControl

TODO:

* написать миграцию на роли администратора и родителя
* выдать права на операции над сущностями
* hooks
* custom Admin UI logo
* virtual field isAdmin
* поле для авторизации — username вместо email

RBAC:

|              | Admin | Parent |
|--------------|-------|--------|
| Pages        | CRUD  | -R--   |
| Permissions  | CRUD  | ----   |
| Roles        | CRUD  | ----   |
| Users        | CRUD  | ----   |
| Children     | CRUD  | CRUD*  |
| Parents      | CRUD  | -RUD*  |
| Questions    | CRUD  | -R--   |
| Tests        | CRUD  | -R--   |
| TestsResults | -R-D  | CR-D*  |

* — если является создателем или совершается действия со своим профилем
