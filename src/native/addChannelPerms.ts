import { BaseChannel, PermissionFlagsBits, PermissionsString, TextChannel } from "discord.js"
import { ArgType, NativeFunction, Return } from "../structures"

export default new NativeFunction({
    name: "$addChannelPerms",
    version: "1.0.3",
    description: "Adds permission overwrites to a channel, returns bool",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "channel ID",
            description: "The channel to add perms to",
            rest: false,
            required: true,
            type: ArgType.Channel,
            check: (i: BaseChannel) => i.isTextBased() && "permissionOverwrites" in i
        },
        {
            name: "id",
            description: "The role or member id to add these perms to",
            rest: false,
            required: true,
            type: ArgType.String
        },
        {
            name: "perms",
            description: "The perms to add to the id",
            rest: true,
            type: ArgType.String,
            required: true,
            enum: PermissionFlagsBits
        }
    ],
    async execute(ctx, [ ch, id, perms ]) {
        const channel = ch as TextChannel
        
        const obj: Partial<Record<PermissionsString, boolean>> = {}

        perms.forEach(x => obj[x as PermissionsString] = true)

        return Return.success(
            !!(await channel.permissionOverwrites.create(id, obj))
        )
    },
})