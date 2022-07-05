import lang from "./lang"
import { more } from "./module"
import { constModules, modules } from "./module"
import { ModuleKeyType } from "./synthesizer"
import { ISection, IConfig, IRow, IRowButton } from "./typings"
import { CellViewType } from "./typings/enum"
import { SerialCode } from "./utils/number"

const { addon, magicaction4card } = constModules

export const actionKey4Card: {
  key: string
  option?: number
  module?: ModuleKeyType
  moduleName?: string
}[] = [{ key: "none" }, { key: "open_panel" }]
export const actionKey4Text: typeof actionKey4Card = [
  { key: "none" },
  { key: "open_panel" }
]

const genSection = (config: IConfig): ISection => {
  const rows: IRow[] = [
    {
      type: CellViewType.PlainText,
      label: config.intro,
      link: config.link
    }
  ]
  for (const setting of config.settings) {
    //@ts-ignore magic hack
    rows.push(setting)
    if (setting.help) {
      switch (setting.type) {
        case CellViewType.MuiltSelect:
        case CellViewType.Select:
        case CellViewType.Switch:
          rows.push({
            type: CellViewType.PlainText,
            label: "↑ " + setting.help,
            link: setting.link,
            bind: setting.bind
          })
          break
        case CellViewType.InlineInput:
        case CellViewType.Input:
          rows.push({
            type: CellViewType.PlainText,
            label: "↑ " + setting.help,
            link: setting.link,
            bind: setting.bind
          })
      }
    }
  }
  return {
    header: config.name,
    key: config.key as ModuleKeyType,
    rows
  }
}

const genDataSource = (
  configs: IConfig[],
  magicaction4card: IConfig
): ISection[] => {
  const dataSource: ISection[] = []
  const moduleNameList: string[] = []
  const actions4card =
    magicaction4card.actions4card?.map(k => ({
      ...k,
      module: "magicaction4card" as ModuleKeyType,
      moduleName: "MagicAction For Card"
    })) ?? []
  configs.forEach(config => {
    dataSource.push(genSection(config))
    if (config.actions4card?.length)
      actions4card.push(
        ...config.actions4card.map(k => ({
          ...k,
          moduleName: config.name,
          module: config.key as ModuleKeyType,
          help:
            lang.magicaction_from_which_module(config.name) +
            (k.help ? "\n" + k.help : "")
        }))
      )
  })
  dataSource.forEach((sec, index) => {
    index && moduleNameList.push(sec.header)
  })

  const Action4CardSection = genSection(magicaction4card)
  Action4CardSection.rows.push(...actions4card)

  // 更新 quickSwitch 为 moduleList
  const [AddonSection, GestureSection] = dataSource
  for (const row of AddonSection.rows) {
    if (row.type == CellViewType.MuiltSelect && row.key == "quickSwitch")
      row.option = moduleNameList.map(
        (value, index) => SerialCode.hollow_circle_number[index] + " " + value
      )
  }

  // 同步 gesture 的 option 为 magicaction 列表
  const { gestureOption: gestureOption4Card, actionKeys: _actionKey4Card } =
    getActionKeyGetureOption(Action4CardSection)

  actionKey4Card.push(..._actionKey4Card)

  dataSource.splice(1, 0, Action4CardSection)
  dataSource.push(more)
  return dataSource
}

function genDataSourceIndex(dataSource: ISection[]) {
  return dataSource.reduce((acc, sec, secIndex) => {
    acc[sec.key] = sec.rows.reduce((acc, row, rowIndex) => {
      if (row.type != CellViewType.PlainText) {
        acc[row.key] = [secIndex, rowIndex]
      }
      return acc
    }, {} as Record<string, [number, number]>)
    return acc
  }, {} as Record<ModuleKeyType, Record<string, [number, number]>>)
}

const getActionKeyGetureOption = (section: ISection) => {
  const gestureOption = [lang.open_panel]
  const actionKeys = []
  for (const _row of section.rows) {
    if (
      _row.type !== CellViewType.Button &&
      _row.type !== CellViewType.ButtonWithInput
    )
      continue
    const row = _row as IRowButton
    gestureOption.push(row.label)
    if (!row.option?.length)
      actionKeys.push({
        key: row.key,
        module: row.module,
        moduleName: row.moduleName,
        option: 0
      })
    else {
      actionKeys.push({
        key: row.key,
        module: row.module,
        moduleName: row.moduleName
      })
      if (row.type == CellViewType.Button) {
        row.option.forEach((option, index) => {
          gestureOption.push("——" + option)
          actionKeys.push({
            key: row.key,
            option: index,
            module: row.module,
            moduleName: row.moduleName
          })
        })
      } else if (row.option[0].includes("Auto")) {
        gestureOption.push("——" + row.option[0])
        actionKeys.push({
          key: row.key,
          option: 0,
          module: row.module,
          moduleName: row.moduleName
        })
      }
    }
  }
  return { actionKeys, gestureOption }
}

export const dataSourcePreset = genDataSource(
  // @ts-ignore
  [addon, ...Object.values(modules)],
  magicaction4card
)
export const dataSourceIndex = genDataSourceIndex(dataSourcePreset)
