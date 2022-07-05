import { ISection } from "./typings"
import { CellViewType } from "./typings/enum"
import gesture from "./modules/gesture"
import magicaction4card from "./modules/magicaction4card"
import magicaction4text from "./modules/magicaction4text"
import addon from "./modules/addon"
import anotherautodef from "./modules/anotherautodef"

export const modules = {
  gesture,
  anotherautodef
}

export const constModules = { addon, magicaction4card, magicaction4text }

export const more: ISection = {
  header: "More",
  key: "more",
  rows: [
    {
      type: CellViewType.PlainText,
      label: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
      link: ""
    }
  ]
}
