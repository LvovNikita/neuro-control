"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_dotenv = __toESM(require("dotenv"));
var import_core10 = require("@keystone-6/core");

// modules/auth/index.ts
var import_crypto = require("crypto");
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== "production") {
  sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  initFirstItem: {
    fields: ["username", "email", "password"]
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// modules/admin/users/user.entity.ts
var import_core = require("@keystone-6/core");
var import_fields = require("@keystone-6/core/fields");
var UserEntity = (0, import_core.list)({
  fields: {
    username: (0, import_fields.text)(),
    password: (0, import_fields.password)(),
    email: (0, import_fields.text)({
      isIndexed: "unique"
    }),
    role: (0, import_fields.relationship)({
      ref: "Role",
      many: false
    })
  },
  access: {
    operation: {
      query: () => true,
      create: () => true,
      update: () => true,
      delete: () => true
    }
  }
});

// modules/admin/roles/role.entity.ts
var import_core2 = require("@keystone-6/core");
var import_fields2 = require("@keystone-6/core/fields");
var RoleEntity = (0, import_core2.list)({
  fields: {
    name: (0, import_fields2.text)(),
    sysname: (0, import_fields2.text)({
      isIndexed: "unique"
    }),
    pages: (0, import_fields2.relationship)({
      ref: "Page",
      many: true
    }),
    permission: (0, import_fields2.relationship)({
      ref: "Permission",
      many: true
    })
  },
  access: {
    operation: {
      query: () => true,
      create: () => true,
      update: () => true,
      delete: () => true
    }
  }
});

// modules/admin/permissions/permission.entity.ts
var import_core3 = require("@keystone-6/core");
var import_fields3 = require("@keystone-6/core/fields");
var PermissionEntity = (0, import_core3.list)({
  fields: {
    name: (0, import_fields3.text)(),
    sysname: (0, import_fields3.text)({
      isIndexed: true
    }),
    description: (0, import_fields3.text)()
  },
  access: {
    operation: {
      query: () => true,
      create: () => true,
      update: () => true,
      delete: () => true
    }
  }
});

// modules/profiles/parent/parent.entity.ts
var import_core4 = require("@keystone-6/core");
var import_fields4 = require("@keystone-6/core/fields");
var ParentEntity = (0, import_core4.list)({
  fields: {
    user: (0, import_fields4.relationship)({
      ref: "User",
      many: false
    }),
    name: (0, import_fields4.text)(),
    children: (0, import_fields4.relationship)({
      ref: "Child",
      many: true
    }),
    friends: (0, import_fields4.relationship)({
      ref: "Parent",
      many: true
    })
  },
  access: {
    operation: {
      query: () => true,
      create: () => true,
      update: () => true,
      delete: () => true
    }
  }
});

// modules/child/child.entity.ts
var import_core5 = require("@keystone-6/core");
var import_fields5 = require("@keystone-6/core/fields");
var ChildEntity = (0, import_core5.list)({
  fields: {
    name: (0, import_fields5.text)(),
    dateOfBirth: (0, import_fields5.calendarDay)(),
    gender: (0, import_fields5.select)({
      type: "enum",
      options: [
        { label: "male", value: "male" },
        { label: "female", value: "female" }
      ]
    }),
    medicalInfo: (0, import_fields5.text)(),
    testsResults: (0, import_fields5.relationship)({
      ref: "TestResult",
      many: true
    })
  },
  access: {
    operation: {
      query: () => true,
      create: () => true,
      update: () => true,
      delete: () => true
    }
  }
});

// modules/tests/test/test.entity.ts
var import_core6 = require("@keystone-6/core");
var import_fields6 = require("@keystone-6/core/fields");
var TestEntity = (0, import_core6.list)({
  fields: {
    title: (0, import_fields6.text)(),
    questions: (0, import_fields6.relationship)({
      ref: "Question",
      many: true
    })
  },
  access: {
    operation: {
      query: () => true,
      create: () => true,
      update: () => true,
      delete: () => true
    }
  }
});

// modules/tests/question/question.entity.ts
var import_core7 = require("@keystone-6/core");
var import_fields7 = require("@keystone-6/core/fields");
var QuestionEntity = (0, import_core7.list)({
  fields: {
    title: (0, import_fields7.text)(),
    description: (0, import_fields7.text)(),
    isRequired: (0, import_fields7.checkbox)(),
    type: (0, import_fields7.select)({
      type: "enum",
      options: [
        { label: "short", value: "short" },
        { label: "multipleChoice", value: "multipleChoice" },
        // Выбор одного из множества
        { label: "checkboxes", value: "checkboxes" }
      ]
    }),
    answer: (0, import_fields7.json)(),
    points: (0, import_fields7.integer)()
  },
  access: {
    operation: {
      query: () => true,
      create: () => true,
      update: () => true,
      delete: () => true
    }
  }
});

// modules/admin/pages/page.entity.ts
var import_core8 = require("@keystone-6/core");
var import_fields8 = require("@keystone-6/core/fields");
var PageEntity = (0, import_core8.list)({
  fields: {
    title: (0, import_fields8.text)(),
    parent: (0, import_fields8.relationship)({
      ref: "Page",
      many: false
    }),
    showInMenu: (0, import_fields8.checkbox)()
  },
  access: {
    operation: {
      query: () => true,
      create: () => true,
      update: () => true,
      delete: () => true
    }
  }
});

// modules/tests/test/testResult.entity.ts
var import_core9 = require("@keystone-6/core");
var import_fields9 = require("@keystone-6/core/fields");
var TestResultEntity = (0, import_core9.list)({
  fields: {
    test: (0, import_fields9.relationship)({
      ref: "Test",
      many: false
    }),
    child: (0, import_fields9.relationship)({
      ref: "Child",
      many: false
    }),
    date: (0, import_fields9.calendarDay)(),
    result: (0, import_fields9.json)()
  },
  access: {
    operation: {
      query: () => true,
      create: () => true,
      update: () => true,
      delete: () => true
    }
  }
});

// keystone.ts
import_dotenv.default.config({ path: "./config/.env" });
var keystone_default = withAuth(
  (0, import_core10.config)({
    db: {
      provider: "postgresql",
      url: "postgres://postgres:postgres@localhost:5432/develop_neuro_control",
      enableLogging: true,
      idField: {
        kind: "uuid"
      },
      onConnect: async () => {
        console.log("Connected to PostgreSQL");
      }
    },
    lists: {
      User: UserEntity,
      Role: RoleEntity,
      Permission: PermissionEntity,
      Page: PageEntity,
      Parent: ParentEntity,
      Child: ChildEntity,
      Test: TestEntity,
      Question: QuestionEntity,
      TestResult: TestResultEntity
    },
    session
  })
);
//# sourceMappingURL=config.js.map
