import type { ICheckMethod, IConfig } from "typings"
import { CellViewType } from "typings/enum"
import { lang } from "./lang"
import { ActionKey, OutFormat, TranslateProviders } from "./enum"
import { IDocProfile, IProfile } from "profile"
import fetch from "utils/network"
import MD5 from "utils/third party/md5"
import { showHUD } from "utils/common"
import { checkPositiveinteger } from "utils/checkInput"
const { intro, link, label, option, help } = lang

const configs: IConfig<
  (IProfile & IDocProfile)["autotranslate"],
  typeof ActionKey
> = {
  name: "AutoTranslate",
  intro: "摘录时自动附加上翻译结果",
  link,
  settings: [
    {
      key: "on",
      type: CellViewType.Switch,
      label: label.on
    },
    {
      key: "outFormat",
      type: CellViewType.Select,
      label: "输出格式",
      option: [
        "摘录:译文",
        "摘录:原文+译文",
        "标题:译文，摘录:原文",
        "标题:原文，摘录:译文"
      ]
    },
    {
      key: "translateProviders",
      type: CellViewType.Select,
      option: ["百度翻译", "彩云小译"],
      label: "翻译提供商"
    },
    {
      key: "caiyunFromLang",
      label: "输入语言",
      type: CellViewType.Select,
      option: ["自动检测", "中文", "英文", "日文"],
      help: "【当前文档生效】",
      bind: [["translateProviders", 1]]
    },
    {
      key: "caiyunToLang",
      label: "输出语言",
      type: CellViewType.Select,
      option: ["中文", "英文", "日文"],
      help: "【当前文档生效】",
      bind: [["translateProviders", 1]]
    },
    {
      key: "baiduFromLang",
      label: "输入语言",
      type: CellViewType.Select,
      option: [
        "自动检测",
        "中文",
        "英语",
        "粤语",
        "文言文",
        "日语",
        "韩语",
        "法语",
        "西班牙语",
        "泰语",
        "阿拉伯语",
        "俄语",
        "葡萄牙语",
        "德语",
        "意大利语",
        "希腊语",
        "荷兰语",
        "波兰语",
        "保加利亚语",
        "爱沙尼亚语",
        "丹麦语",
        "芬兰语",
        "捷克语",
        "罗马尼亚语",
        "斯洛文尼亚语",
        "瑞典语",
        "匈牙利语",
        "繁体中文",
        "越南语"
      ],
      help: "【当前文档生效】",
      bind: [["translateProviders", 0]]
    },
    {
      key: "baiduToLang",
      label: "输出语言",
      help: "【当前文档生效】",
      type: CellViewType.Select,
      option: [
        "中文",
        "英语",
        "粤语",
        "文言文",
        "日语",
        "韩语",
        "法语",
        "西班牙语",
        "泰语",
        "阿拉伯语",
        "俄语",
        "葡萄牙语",
        "德语",
        "意大利语",
        "希腊语",
        "荷兰语",
        "波兰语",
        "保加利亚语",
        "爱沙尼亚语",
        "丹麦语",
        "芬兰语",
        "捷克语",
        "罗马尼亚语",
        "斯洛文尼亚语",
        "瑞典语",
        "匈牙利语",
        "繁体中文",
        "越南语"
      ],
      bind: [["translateProviders", 0]]
    },
    {
      key: "baiduThesaurus",
      type: CellViewType.Switch,
      label: "自定义术语库",
      help: "高级版可用，仅支持中英互译，点击新建自定义术语。",
      link: "https://fanyi-api.baidu.com/manage/term",
      bind: [["translateProviders", 0]]
    },
    {
      key: "hudTime",
      type: CellViewType.InlineInput,
      label: "翻译弹窗显示时间"
    },
    {
      key: "showKey",
      type: CellViewType.Switch,
      label: "显示/隐藏 Key"
    },
    {
      key: "baiduAppID",
      type: CellViewType.Input,
      help: "百度 App ID，点击查看如何获取。",
      bind: [
        ["showKey", 1],
        ["translateProviders", 0]
      ]
    },
    {
      key: "baiduSecretKey",
      type: CellViewType.Input,
      help: "百度密钥",
      bind: [
        ["showKey", 1],
        ["translateProviders", 0]
      ]
    },
    {
      key: "caiyunToken",
      type: CellViewType.Input,
      help: "彩云小译 Token，点击查看如何获取。",
      bind: [
        ["showKey", 1],
        ["translateProviders", 1]
      ]
    }
  ],
  actions4text: [
    {
      key: "translateText",
      type: CellViewType.Button,
      label: "翻译所选文字",
      method: async ({ text }) => {
        try {
          const { hudTime, translateProviders } = self.profile.autotranslate
          const translation =
            translateProviders[0] === TranslateProviders.Baidu
              ? await utils.baiduTranslate(text)
              : await utils.caiyunTranslate(text)
          showHUD(translation, Number(hudTime))
        } catch (err) {
          showHUD(String(err), 2)
        }
      }
    }
  ]
}

const utils = {
  getBaiduSign(text: string, appid: string, key: string, salt: number) {
    // appid + q + salt + 密钥
    return MD5(appid + text + salt + key)
  },
  async baiduTranslate(text: string) {
    const { baiduAppID, baiduSecretKey, baiduThesaurus } =
      self.profile.autotranslate
    const { baiduFromLang, baiduToLang } = self.docProfile.autotranslate
    const fromLangKey = [
      "auto",
      "zh",
      "en",
      "yue",
      "wyw",
      "jp",
      "kor",
      "fra",
      "spa",
      "th",
      "ara",
      "ru",
      "pt",
      "de",
      "it",
      "el",
      "nl",
      "pl",
      "bul",
      "est",
      "dan",
      "fin",
      "cs",
      "rom",
      "slo",
      "swe",
      "hu",
      "cht",
      "vie"
    ]
    const toLangKey = fromLangKey.slice(1)
    const salt = Date.now()
    const sign = utils.getBaiduSign(text, baiduAppID, baiduSecretKey, salt)
    const res = (await fetch(
      "https://fanyi-api.baidu.com/api/trans/vip/translate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        form: {
          sign,
          salt,
          q: text,
          appid: baiduAppID,
          from: fromLangKey[baiduFromLang[0]],
          to: toLangKey[baiduToLang[0]],
          action: baiduThesaurus ? 1 : 0
        }
      }
    ).then(res => res.json())) as {
      trans_result: [
        {
          src: string
          dst: string
        }
      ]
      error_code?: number
      error_msg?: string
    }
    if (res.error_code && res.error_msg)
      throw `${res.error_code}: ${res.error_msg}`
    return res.trans_result.map(k => k.dst).join("\n")
  },
  async caiyunTranslate(text: string) {
    const { caiyunToken } = self.profile.autotranslate
    const { caiyunFromLang, caiyunToLang } = self.docProfile.autotranslate
    const fromLangKey = ["auto", "zh", "en", "ja"]
    const toLangKey = fromLangKey.slice(1)
    const res = (await fetch(
      "http://api.interpreter.caiyunai.com/v1/translator",
      {
        method: "POST",
        headers: {
          "X-Authorization": `token ${caiyunToken}`
        },
        json: {
          source: [text],
          trans_type: `${fromLangKey[caiyunFromLang[0]]}2${
            toLangKey[caiyunToLang[0]]
          }`,
          request_id: "ohmymn",
          detect: true
        }
      }
    ).then(res => res.json())) as {
      target: string[]
    }
    if (!res.target.length) throw "没有获取到结果"
    return res.target.join("\n")
  },
  async main(text: string) {
    try {
      const { translateProviders, outFormat } = self.profile.autotranslate
      const translation =
        translateProviders[0] === TranslateProviders.Baidu
          ? await utils.baiduTranslate(text)
          : await utils.caiyunTranslate(text)
      switch (outFormat[0]) {
        case OutFormat.EmptyT:
          return {
            title: [],
            text: translation
          }
        case OutFormat.EmptyOT:
          return {
            title: [],
            text: `${text}\n${translation}`
          }
        case OutFormat.TO:
          return {
            title: [translation],
            text: text
          }
        default:
          return {
            title: [text],
            text: translation
          }
      }
    } catch (err) {
      showHUD(String(err), 2)
      return undefined
    }
  }
}

const checker: ICheckMethod<
  PickByValue<(IProfile & IDocProfile)["autotranslate"], string> &
    typeof ActionKey
> = (input, key) => {
  switch (key) {
    case "hudTime": {
      checkPositiveinteger(Number(input))
    }
    default:
      return undefined
  }
}

const autotranslate = { configs, utils, checker }
export default autotranslate
