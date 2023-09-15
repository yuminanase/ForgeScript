"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const structures_1 = require("../structures");
exports.default = new structures_1.NativeFunction({
    name: "$emojiCreatedAt",
    version: "1.0.0",
    description: "Returns the emoji creation timestamp",
    brackets: false,
    unwrap: true,
    args: [
        {
            name: "emoji ID",
            description: "The emoji id to return its creation timestamp",
            rest: false,
            type: structures_1.ArgType.GuildEmoji,
            required: true
        }
    ],
    execute(ctx, [emoji]) {
        emoji ?? ctx.emoji;
        return structures_1.Return.success(emoji?.createdTimestamp);
    },
});
//# sourceMappingURL=emojiCreatedAt.js.map