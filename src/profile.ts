import { MN } from "./const"
import { IConfig } from "./typings"
import { ReplaceParam } from "./utils/input"

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
  magicaction4card: {
    smartSelection: false,
    defaultMergeText: `%["1"]. $&\\n\\n`
  },
  magicaction4text: {
    noteOptions: []
  },
  export2flomo: {
    exportMethod: [1],
    flomoAPI: "",
    exportContent: "",
    templateFlomo: [0],
    showTemplate: true,
    addTags: [0],
    tagTemplate: "{{#tags}}#{{.}} {{/tags}}#{{notebook.title}} #MarginNote",
    flomoTemplate1: "{{excerpts.ocr.0}}",
    flomoTemplate2: "",
    flomoTemplate3: ""
  },
  export2anki: {
    exportMethod: [1],
    ankiConnectAPI: "",
    profileName: MN.isZH ? "账户1" : "User 1",
    jumpBack: true,
    allowRepeat: true,
    addTags: [0],
    autoSync: [0],
    tagTemplate: "{{#tags}}#{{.}} {{/tags}}#{{notebook.title}} #MarginNote",
    showTemplate: [1],
    modelName1: "",
    field11: "",
    field12: "",
    field13: "",
    field14: "",
    field15: "",
    field16: "",
    field17: "",
    field18: "",
    field19: "",
    modelName2: "",
    field21: "",
    field22: "",
    field23: "",
    field24: "",
    field25: "",
    field26: "",
    field27: "",
    field28: "",
    field29: "",
    modelName3: "",
    field31: "",
    field32: "",
    field33: "",
    field34: "",
    field35: "",
    field36: "",
    field37: "",
    field38: "",
    field39: ""
  },
  export2devonthink: {
    exportMethod: [0],
    showTemplate: true,
    title: "{{notebook.title}}",
    comment: "",
    addTags: [0],
    tags: "{{#tags}}{{.}},{{/tags}},{{notebook.title}},MarginNote",
    destination: "",
    htmlsource: "",
    pdfsource: "",
    mdtext: "{{allText}}",
    txtext: "{{allText}}",
    hide: false,
    referrer: "",
    width: "",
    paginated: false
  },
  export2obsidian: {
    // exportMethod:[0],
    vault: "",
    fileName: "",
    contentMethod: [0],
    imgprocess: [0],
    imgsize: "100",
    writeMethod: [0]
  },

  additional: {
    backupID: "",
    autoocr: {
      lastGetToken: 0,
      baiduToken: ""
    }
  }
}

// Each document has a independent profile
const docProfilePreset = {
  magicaction4text: {
    preOCR: false
  }
}

const notebookProfilePreset = {
  addon: {
    profile: [0]
  },
  export2anki: {
    deckName: "{{notebook.title}}",
    defaultTemplate: [0]
  },
  export2flomo: {
    defaultTemplate: [0]
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
