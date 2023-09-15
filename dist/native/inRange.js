"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const structures_1 = require("../structures");
exports.default = new structures_1.NativeFunction({
    name: "$inRange",
    version: "1.0.0",
    description: "Whether a number is in range",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "number",
            description: "The number to validate",
            rest: false,
            type: structures_1.ArgType.Number,
            required: true
        },
        {
            name: "min",
            description: "The min value",
            rest: false,
            type: structures_1.ArgType.Number
        },
        {
            name: "max",
            description: "The max value",
            rest: false,
            type: structures_1.ArgType.Number
        }
    ],
    execute(ctx, [n, min, max]) {
        return structures_1.Return.success(min !== null && max !== null ?
            n >= min && n <= max :
            min !== null ?
                n >= min :
                max !== null ?
                    n <= max :
                    true);
    },
});
//# sourceMappingURL=inRange.js.map