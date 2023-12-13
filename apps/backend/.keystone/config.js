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
var import_core3 = require("@keystone-6/core");

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

// modules/users/user.entity.ts
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

// modules/roles/role.entity.ts
var import_core2 = require("@keystone-6/core");
var import_fields2 = require("@keystone-6/core/fields");
var RoleEntity = (0, import_core2.list)({
  fields: {
    name: (0, import_fields2.text)(),
    sysname: (0, import_fields2.text)({
      isIndexed: "unique"
    })
    // groups: []
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
  (0, import_core3.config)({
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
      Role: RoleEntity
    },
    session
  })
);
//# sourceMappingURL=config.js.map
