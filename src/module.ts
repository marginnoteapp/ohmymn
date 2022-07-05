import { ISection } from "./typings"
import { CellViewType } from "./typings/enum"
import magicaction4card from "./modules/magicaction4card"
import addon from "./modules/addon"
import export2anki from "./modules/export2anki"
import export2devonthink from "./modules/export2devonthink"
import export2flomo from "./modules/export2flomo"
import export2obsidian from "./modules/export2obsidian"

export const modules = {
  export2anki,
  export2flomo,
  export2obsidian,
  export2devonthink
}

export const constModules = { addon, magicaction4card }

export const more: ISection = {
  header: "More",
  key: "more",
  rows: [
    {
      type: CellViewType.PlainText,
      label: "OhMyMN 官网：ohmymn.vercel.app",
      link: "https://ohmymn.vercel.app"
    },
    {
      type: CellViewType.PlainText,
      label: "核心开发团队：ourongxing，Bryan",
      link: ""
    },
    {
      type: CellViewType.PlainText,
      label: "OhMyMN 完全开源，官方支持，欢迎参与开发。",
      link: ""
    },
    {
      type: CellViewType.PlainText,
      label: "\n\n\n\n\n\n\n\n\n\n",
      link: ""
    }
  ]
}
