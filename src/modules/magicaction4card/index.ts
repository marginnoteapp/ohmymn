import { textComment } from "~/typings"
import { CellViewType } from "~/typings/enum"
import { unique } from "~/utils"
import { checkPlainText, checkRegArray } from "~/utils/checkInput"
import { showHUD, HUDController } from "~/utils/common"
import { defineConfig } from "~/profile"
import {
  string2RegArray,
  escapeDoubleQuote,
  string2ReplaceParam,
  reverseEscape
} from "~/utils/input"
import {
  getAllTags,
  getExcerptText,
  getAllCommnets,
  getAllText,
  getAncestorNodes,
  addTags,
  removeHighlight,
  modifyNodeTitle
} from "~/utils/note"
import { lang } from "./lang"
import { FilterCards, MergeCards, MergeText, SwitchTitle } from "./typings"
import { getSerialInfo } from "~/utils/number"
const { help, option, intro, label, link, hud } = lang

export default defineConfig({
  name: "MagicAction for Card",
  key: "magicaction4card",
  intro,
  link,
  settings: [],
  actions4card: [
    {
      key: "switchTitle",
      type: CellViewType.Button,
      label: label.switch_title,
      option: option.switch_title,
      help: help.switch_title,
      method: ({ nodes, option }) => {
        console.log("")
      }
    }
  ]
})
