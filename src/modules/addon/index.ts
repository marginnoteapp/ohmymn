import { Addon } from "~/const"
import { CellViewType } from "~/typings/enum"
import { defineConfig } from "~/profile"
import { lang } from "./lang"

const { label, help, option } = lang
export default defineConfig({
  name: Addon.title,
  key: "addon",
  intro: `当前版本: ${Addon.version}`,
  settings: [
    {
      help: help.profile,
      key: "profile",
      type: CellViewType.Select,
      option: option.profile,
      label: label.profile
    },
    {
      label: label.quick_switch,
      key: "quickSwitch",
      type: CellViewType.MuiltSelect,
      option: []
    },
    {
      key: "panelPosition",
      type: CellViewType.Select,
      option: option.panel_position,
      label: label.panel_position
    },
    {
      key: "panelHeight",
      type: CellViewType.Select,
      option: option.panel_height,
      label: label.panel_height
    },
    {
      key: "panelControl",
      type: CellViewType.MuiltSelect,
      option: option.panle_control,
      label: label.panle_control
    },
    {
      key: "autoBackup",
      type: CellViewType.Switch,
      label: label.auto_backup,
      help: help.auto_backup
    }
  ]
})
