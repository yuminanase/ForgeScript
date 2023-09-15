"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const structures_1 = require("../structures");
exports.default = new structures_1.NativeFunction({
    name: "$roleColor",
    version: "1.0.0",
    description: "Returns the role color",
    brackets: false,
    unwrap: true,
    args: [
        {
            name: "guildID",
            description: "The guild id to return the role from",
            rest: false,
            type: structures_1.ArgType.Guild,
            required: true
        },
        {
            name: "role ID",
            description: "The role id return its color",
            rest: false,
            type: structures_1.ArgType.Role,
            pointer: 0,
            required: true
        },
    ],
    execute(ctx, [guild, role]) {
        return structures_1.Return.success((role ?? ctx.role)?.hexColor);
    }
});
//# sourceMappingURL=roleColor.js.map