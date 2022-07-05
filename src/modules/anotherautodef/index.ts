import { CellViewType } from "~/typings/enum"
import { unique } from "~/utils"
import {
  checkReplaceParamFromMNLink,
  checkRegArrayFromMNLink,
  checkReplaceParam
} from "~/utils/checkInput"
import { defineConfig } from "~/profile"
import { string2ReplaceParam, extractArray } from "~/utils/input"
import { getAllText, modifyNodeTitle } from "~/utils/note"
import { lang } from "./lang"
import { ExtractTitle } from "./typings"

const { label, option, intro, link, help } = lang

export default defineConfig({
  name: "Another AutoDef",
  key: "anotherautodef",
  intro,
  link,
  settings: [
    {
      key: "preset",
      type: CellViewType.MuiltSelect,
      option: option.preset,
      label: label.preset
    }
  ],
  actions4card: [
    {
      type: CellViewType.ButtonWithInput,
      label: label.extract_title,
      option: option.extract_title,
      key: "extractTitle",
      method: ({ nodes, content, option }) => {
        console.log("")
      },
      check({ input }) {
        checkReplaceParam(input)
      }
    }
  ]
})
