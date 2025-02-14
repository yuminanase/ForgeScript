import { readFileSync } from "fs"
import { ArgType, NativeFunction } from "../"

const infoImgSrc = "<img align=\"top\" src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Infobox_info_icon.svg/160px-Infobox_info_icon.svg.png?20150409153300\" alt=\"image\" width=\"25\" height=\"auto\">"
const sourceCodeImgSrc = "<img align=\"top\" src=\"https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png\" alt=\"image\" width=\"25\" height=\"auto\"> "
//const warningImgSrc = "<img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Warning.svg/156px-Warning.svg.png\" alt=\"image\" width=\"25\" height=\"auto\">"
const experimentalModeSrc = "<img align=\"top\" src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Warning.svg/156px-Warning.svg.png\" alt=\"image\" width=\"25\" height=\"auto\"> This feature is currently <span style=\"color:yellow\"><strong>experimental</strong></span>."

export default function(fn: NativeFunction, adaptedSrc?: string): string {
    const args = new Array<string>()

    args.push(`# ${fn.data.name}`)

    args.push(`> ${infoImgSrc} ${fn.data.description}`)

    if (fn.data.experimental) args.push(`\n> ${experimentalModeSrc}\n`)

    args.push("## Usage")

    if (!fn.data.brackets) {
        args.push(`\`\`\`\n${fn.name}\n\`\`\``)
    }

    if (fn.data.brackets === false || fn.data.brackets) {
        if (fn.data.brackets === false) args.push("---")
        
        args.push(`\`\`\`\n${fn.name}[${fn.data.args!.map(x => x.rest ? `...${x.name}` : x.name).join(";")}]\n\`\`\``)

        args.push(
            "| Name | Type | Description | Required | Spread", 
            "| :---: | :---: | :---: | :---: | :---: |",
            ...fn.data.args!.map(x => [
                x.name,
                `${ArgType[x.type]}${x.enum ? ` (${Object.values(x.enum).filter((x: any) => isNaN(Number(x))).map(x => `\`${x}\``).join(", ")})` : ""}`,
                x.description,
                x.required ? "Yes" : "No",
                x.rest ? "Yes": "No"
            ].join(" | "))
        )
    } 

    const code = readFileSync(`${adaptedSrc ?? "./src/native"}/${fn.name.slice(1)}.ts`, "utf-8")
    args.push(`<details>
<summary>
    
## ${sourceCodeImgSrc} [Source Code](https://github.com/tryforge/ForgeScript-V2/blob/main/src/native/${fn.name.slice(1)}.ts)
    
</summary>
    
\`\`\`ts
${code}
\`\`\`
    
</details>`)

    return args.join("\n")
}