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
  settings: [
    {
      key: "smartSelection",
      type: CellViewType.Switch,
      label: label.smart_selection
    }
  ],
  actions4card: [
    {
      key: "manageProfile",
      type: CellViewType.Button,
      label: label.manage_profile,
      option: option.manage_profile,
      help: help.manage_profile,
      method: () => {
        console.log()
      }
    },
    {
      type: CellViewType.ButtonWithInput,
      label: label.filter_cards,
      option: option.filter_cards,
      key: "filterCards",
      method({ nodes, content, option }) {
        if (!content) {
          showHUD(hud.none_card)
          return []
        }
        const regGroup = string2RegArray(content)
        const customSelectedNodes = nodes.filter(node => {
          const title = node.noteTitle ?? ""
          const searchContent = (() => {
            switch (option) {
              case FilterCards.Title:
                return title
              case FilterCards.Tag:
                return getAllTags(node).join(" ")
              case FilterCards.Excerpt:
                return getExcerptText(node).ocr.join("\n")
              case FilterCards.Comment:
                return getAllCommnets(node).nopic.join("\n")
              default:
                return `${title}\n${getAllText(node)}`
            }
          })()
          return regGroup.some(regs =>
            regs.every(reg => reg.test(searchContent))
          )
        })
        if (customSelectedNodes.length) {
          HUDController.show(hud.is_clicked)
          return customSelectedNodes
        } else {
          showHUD(hud.none_card)
          return []
        }
      },
      check({ input }) {
        checkRegArray(input)
      }
    }
  ]
})
