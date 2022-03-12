import {
  PanelHeight,
  PanelPosition,
  HasTitleThen,
  PanelControl
} from "modules/ohmymn"
import { AutoTitlePreset } from "modules/anotherautotitle"
import { AutoListPreset } from "modules/autolist"
import { AutoReplacePreset } from "modules/autoreplace"
import { AutoStandardizePreset } from "modules/autostandardize"
import { AutoStylePreset } from "modules/autostyle"
import { AutoTagPreset } from "modules/autotag"
import { QuickSwitch } from "synthesizer"
import { ReplaceParam } from "utils/input"
import { TitleLinkSplit } from "modules/anotherautodef"
import { FillWordInfo } from "modules/autocomplete"
import { MultipleTitlesExcerpt } from "modules/copysearch"

const profilePreset = {
  ohmymn: {
    quickSwitch: [] as QuickSwitch[],
    lockExcerpt: false,
    screenAlwaysOn: false,
    hasTitleThen: [HasTitleThen.NoChange],
    panelControl: [] as PanelControl[],
    panelPosition: [PanelPosition.Auto],
    panelHeight: [PanelHeight.Standard]
  },
  gesture: {
    // 单选不允许为空，一般设置一个选项为空
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
  autocomplete: {
    on: false,
    fillWordInfo: [FillWordInfo.None],
    customFill: "{{zh}}"
  },
  autostandardize: {
    on: false,
    preset: [] as AutoStandardizePreset[],
    customStandardize: "",
    standardizeTitle: false
  },
  anotherautotitle: {
    on: false,
    preset: [] as AutoTitlePreset[],
    changeTitleNoLimit: false,
    wordCount: "[10, 5]",
    customBeTitle: ""
  },
  anotherautodef: {
    on: false,
    preset: [] as number[],
    onlyDesc: false,
    toTitleLink: false,
    titleLinkSplit: [TitleLinkSplit.Default],
    customTitleSplit: "",
    customDefLink: "",
    customExtractTitle: ""
  },
  autolist: {
    on: false,
    preset: [] as AutoListPreset[],
    customList: ""
  },
  autoreplace: {
    on: false,
    preset: [] as AutoReplacePreset[],
    customReplace: ""
  },
  autotag: {
    on: false,
    preset: [] as AutoTagPreset[],
    customTag: ""
  },
  autostyle: {
    on: false,
    preset: [] as AutoStylePreset[],
    wordCountArea: "[10, 5, 10]",
    showArea: false,
    defaultTextExcerptColor: [0],
    defaultPicExcerptColor: [0],
    defaultTextExcerptStyle: [0],
    defaultPicExcerptStyle: [0]
  },
  magicactionforcard: {
    smartSelection: false
  },
  copysearch: {
    multipleTitles: [MultipleTitlesExcerpt.All],
    multipleExcerpts: [MultipleTitlesExcerpt.All],
    customContent: "[{{title}}]({{link}})",
    showSearchEngine: false,
    separatorSymbols: "\\n\\n",
    whichSearchEngine: [0],
    searchChineseText: "https://www.bing.com/search?q={{keyword}}&ensearch=0",
    searchEnglishText: "https://www.bing.com/search?q={{keyword}}&ensearch=1",
    searchWord: "eudic://dict/{{keyword}}",
    searchTranslation: "https://www.deepl.com/zh/translator#en/zh/{{keyword}}",
    searchAcademic: "https://scholar.google.com.hk/scholar?q={{keyword}}",
    searchQuestion: "https://www.zhihu.com/search?q={{keyword}}",
    searchOtherText: ""
  }
}

const docProfilePreset = {
  ohmymn: {
    profile: [0]
  },
  // 不显示在 UI 上的配置信息
  additional: {
    // 这个文档上次打开的时间
    lastExcerpt: 0,
    // 保存每次自动生成的标题，如果一个月没打开过该文档，则删除该配置，防止配置文件过大。
    cacheExcerptTitle: {} as {
      [noteid: string]: string[] | undefined
    }
  }
}

// 感觉转换这么复杂，每次使用的时候都需要转换，有点浪费，应该在读配置的时候预先缓存
// 主要还是 [//,//];[//,//] 和 (//,"",0);(//,"",0);
const profileTempPreset = {
  replaceParam: {
    customTag: [] as ReplaceParam[] | undefined,
    customList: [] as ReplaceParam[] | undefined,
    customReplace: [] as ReplaceParam[] | undefined,
    customExtractTitle: [] as ReplaceParam[] | undefined,
    customStandardize: [] as ReplaceParam[] | undefined
  },
  regArray: {
    customTitleSplit: [] as RegExp[][] | undefined,
    customBeTitle: [] as RegExp[][] | undefined,
    customDefLink: [] as RegExp[][] | undefined
  }
}

type IProfileTemp = typeof profileTempPreset
type IProfile = typeof profilePreset
type IDocProfile = typeof docProfilePreset

export {
  profilePreset,
  docProfilePreset,
  profileTempPreset,
  IProfile,
  IDocProfile,
  IProfileTemp
}
