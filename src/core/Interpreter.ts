import { inspect } from "util"
import { Sendable } from "../structures/Container"
import { Context } from "../structures/Context"
import { ReturnType } from "../structures/Return"
import { IExtendedCompilationResult } from "./Compiler"
import { ForgeClient } from "./ForgeClient"

export interface IRunnable {
    client: ForgeClient
    data: IExtendedCompilationResult
    obj: Sendable
    doNotSend?: boolean
    args?: string[]
}

export class Interpreter {
    public static async run(runtime: IRunnable): Promise<string | null> {
        const ctx = new Context(runtime)
        
        const args = new Array<unknown>(runtime.data.functions.length)
        
        for (let i = 0, len = runtime.data.functions.length;i < len;i++) {
            const fn = runtime.data.functions[i]
            const rt = await fn.execute(ctx)

            if (!rt.success && !ctx.handleNotSuccess(rt)) return null

            args[i] = rt.value
        }

        const content = runtime.data.resolve(args)
        if (!runtime.doNotSend) {
            ctx.container.content = content
            await ctx.container.send(runtime.obj)
        }

        return content
    }
}