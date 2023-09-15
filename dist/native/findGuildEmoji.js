"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const structures_1 = require("../structures");
exports.default = new structures_1.NativeFunction({
    name: "$findGuildEmoji",
    version: "1.0.0",
    description: "Finds a emoji of a guild",
    brackets: true,
    args: [
        {
            name: "guild ID",
            description: "The guild to find the emoji on",
            type: structures_1.ArgType.Guild,
            rest: false,
            required: true
        },
        {
            name: "query",
            description: "The id, mention or emoji name to find",
            rest: false,
            type: structures_1.ArgType.String,
            required: true
        }
    ],
    unwrap: true,
    execute(ctx, [guild, q]) {
        const parsed = (0, discord_js_1.parseEmoji)(q);
        if (structures_1.CompiledFunction.IdRegex.test(q)) {
            const e = guild.emojis.cache.get(q);
            if (e)
                return structures_1.Return.success(e.id);
        }
        const name = parsed?.name.toLowerCase();
        return structures_1.Return.success(guild.channels.cache.find(x => x.id === q || x.name.toLowerCase() === q.toLowerCase() || x.toString() === q)?.id);
    },
});
//# sourceMappingURL=findGuildEmoji.js.map