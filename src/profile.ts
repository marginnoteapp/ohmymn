import { IConfig } from "./typings"
import { ReplaceParam } from "./utils/input"
interface Data {
  globalData: {
    notebookNum: number
    notebook: {
      title: string
      creatTime: number
      docNum: number
      readRate: number
    }[]
  }
  dailyData: {
    // 关闭或开始的日期，用于对比是否是同一天
    flag: number
    day: {
      // 打开 MN
      open: number
      close: number
      // 打开笔记本
      notebook: {
        title: string
        open: number
        close: number
        time: number
        // 打开文档
        docChangeRoute: {
          title: string
          open: number
          close: number
          time: number
        }[]
      }[]
    }
  }[]
}

const globalProfilePreset = {
  addon: {
    quickSwitch: [],
    lockExcerpt: false,
    screenAlwaysOn: false,
    hasTitleThen: [1],
    removeExcerpt: [1],
    panelControl: [],
    panelPosition: [0],
    panelHeight: [1],
    autoBackup: false
  },
  magicaction4card: {},
  gesture: {
    singleBarSwipeUp: [0],
    singleBarSwipeDown: [0],
    singleBarSwipeRight: [0],
    singleBarSwipeLeft: [0],
    muiltBarSwipeUp: [0],
    muiltBarSwipeDown: [0],
    muiltBarSwipeRight: [0],
    muiltBarSwipeLeft: [0],
    selectionBarSwipeUp: [0],
    selectionBarSwipeDown: [0],
    selectionBarSwipeRight: [0],
    selectionBarSwipeLeft: [0]
  },
  anotherautodef: {
    on: false,
    preset: [],
    onlyDesc: false,
    toTitleLink: false,
    titleLinkSplit: [1],
    customTitleSplit: "",
    customDefLink: "",
    customExtractTitle: ""
  },
  additional: {
    backupID: "",
    globalData: {} as Data["globalData"],
    dailyData: [] as Data["dailyData"]
  }
}

// Each document has a independent profile
const docProfilePreset = {}

const notebookProfilePreset = {
  addon: {
    profile: [0]
  },
  // Information not displayed on the UI
  additional: {
    cacheTitle: {} as Record<string, [string, string, string][]>,
    cacheComment: {} as Record<string, [string, string, string][]>
  }
}

// Cache Regex like [//,//];[//,//] 和 (//,"",0);(//,"",0);
const tempProfilePreset = {
  replaceParam: {
    customTag: [],
    customComment: [],
    customList: [],
    customReplace: [],
    customExtractTitle: [],
    customFormat: []
  },
  regArray: {
    customTitleSplit: [],
    customBeTitle: [],
    customDefLink: []
  }
}

type UtilTemp<T> = {
  [K in keyof T]: K extends "replaceParam"
    ? {
        [M in keyof T[K]]: ReplaceParam[] | undefined
      }
    : {
        [M in keyof T[K]]: RegExp[][] | undefined
      }
}

type UtilProfile<T> = {
  [K in keyof T]: K extends "additional"
    ? T[K]
    : {
        [M in keyof T[K]]: T[K][M] extends any[] ? number[] : T[K][M]
      }
}

type ITempProfile = UtilTemp<typeof tempProfilePreset>
type IGlobalProfile = UtilProfile<typeof globalProfilePreset>
type IDocProfile = UtilProfile<typeof docProfilePreset>
type INotebookProfile = UtilProfile<typeof notebookProfilePreset>
type IAllProfile = IGlobalProfile & IDocProfile & INotebookProfile

export {
  globalProfilePreset,
  docProfilePreset,
  tempProfilePreset,
  notebookProfilePreset,
  IGlobalProfile,
  IDocProfile,
  INotebookProfile,
  ITempProfile,
  IAllProfile
}

export const defineConfig = <T extends keyof IAllProfile>(
  options: IConfig<T>
) => options
