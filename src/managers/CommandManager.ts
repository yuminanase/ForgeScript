import { Collection, Message } from "discord.js"
import { ForgeClient } from "../core/ForgeClient"
import { Command, CommandType, ICommand } from "../structures/Command"
import { readdirSync } from "fs"

export class CommandManager {
    private readonly commands = new Collection<CommandType, Command[]>()

    public constructor(private readonly client: ForgeClient) {}

    public load(path: string, refresh = false) {
        this.commands.clear()

        for (const file of readdirSync(path, { recursive: true, withFileTypes: true }).filter(x => !x.isDirectory() && x.name.endsWith(".js"))) {
            const path = `${file.path}/${file.name}`

            const req = require(path).default as ICommand | Command
            this.add(req)
        }
    }

    public get(type: CommandType, fn: (cmd: Command) => boolean): Command[] {
        return this.commands.get(type)?.filter(fn) ?? []
    }

    public add(req: ICommand | Command) {
        const cmd = req instanceof Command ? req : new Command(req)
            
        const col = this.commands.ensure(cmd.type, () => new Array())
        col.push(cmd)
    }
}