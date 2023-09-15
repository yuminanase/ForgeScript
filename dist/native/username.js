"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NativeFunction_1 = require("../structures/NativeFunction");
const Return_1 = require("../structures/Return");
exports.default = new NativeFunction_1.NativeFunction({
    name: "$username",
    version: "1.0.0",
    description: "Retrieves an user's username",
    brackets: false,
    args: [
        {
            name: "id",
            description: "The user id to get the username of",
            type: NativeFunction_1.ArgType.User,
            rest: false
        }
    ],
    unwrap: true,
    execute: async function (ctx, [user]) {
        user ??= ctx.user; // < No bracket support
        return Return_1.Return.success(user?.username);
    }
});
//# sourceMappingURL=username.js.map