import { Dict } from "lang"

const dict: Dict = {
  addon: {
    ohmymn: {
      option: {
        profile: "Profile",
        panel_position: ["Auto", "Left", "Center", "Right"],
        panel_height: ["Higher", "Standard", "Lower"]
      },
      label: {
        quick_switch: "Quick Switch",
        profile: "Choose Profile",
        panel_position: "面板显示位置",
        panel_height: "面板显示高度",
        double_click: "双击打开面板",
        click_hidden: "自动关闭面板",
        screen_always_on: "保持屏幕常亮",
        lock_excerpt: "锁定摘录文字",
        auto_correct: "是否开启自动在线矫正"
      },
      help: {
        profile: "【当前文档生效】可用于不同情景",
        auto_correct: "【当前文档生效】开启后会在矫正后执行处理"
      }
    },
    gesture: {
      intro: "自定义手势触发动作",
      singleBar: "单选工具栏",
      muiltBar: "多选工具栏"
    },
    anotherautodef: {
      intro:
        "提取被定义项或任意内容为标题或标题链接\n定义 = 被定义项 + 定义联项 + 定义项",
      link: "https://busiyi.notion.site/AnotherAutoDef-13910b3b225743dcb72b29eabcc81e22",
      label: {
        only_desc: "摘录仅保留定义项",
        to_title_link: "别名转为标题链接",
        custom_split_name: "自定义别名分词，点击查看具体格式",
        preset: "选择需要的预设",
        custom_split: "自定义定义联项，点击查看具体格式",
        custom_def_title: "自定义提取内容，点击查看具体格式",
        extraTitle: "从卡片中提取标题"
      },
      option: {
        preset: [
          "自定义提取内容",
          "自定义定义联项",
          "xxx : yyy",
          "xxx —— yyy",
          "xxx ，是(指) yyy",
          "xxx 是(指)，yyy",
          "xxx 是指 yyy"
        ]
      }
    },
    magicaction: {
      intro:
        "请注意，以下功能均为选中卡片后使用\n点击查看具体使用方法和注意事项",
      link: "https://busiyi.notion.site/MagicAction-c4fb456af9a7407683c5cd615481f04c",
      option: {
        filter_cards: ["仅判断标题", "判断整个卡片内容"],
        change_fill_style: ["边框+填充", "填充", "边框"],
        merge_text: ["合并为摘录", "合并为评论"],
        merge_cards: ["同时合并标题", "不合并标题"]
      },
      help: {
        filter_cards: "注意事项及具体输入格式见顶上帮助信息",
        change_color: "输入颜色索引，也就是顺序，1 到 16",
        merge_text: "输入分隔符，注意事项及具体输入格式见顶上帮助信息",
        rename_title: "注意事项及具体输入格式见顶上帮助信息"
      },
      label: {
        filter_cards: "筛选卡片",
        change_fill_style: "修改摘录样式",
        change_color: "修改摘录颜色",
        merge_cards: "合并多张卡片",
        merge_text: "合并卡片内文字",
        rename_title: "批量重命名标题"
      },
      hud: {
        is_clicked: "您需要的卡片已选中，请继续操作",
        none_card: "未找到符合的卡片"
      }
    },
    autostandardize: {
      intro: "优化摘录和标题的排版与格式\nPowerd by Pangu.js",
      option: {
        preset: [
          "半角转全角",
          "中英文加空格",
          "去除重复空格",
          "英文标题规范化"
        ],
        standardize_selected: ["都优化", "仅优化标题", "仅优化摘录"]
      },
      label: {
        standardize_selected: "优化排版和格式",
        preset: "选择需要的预设"
      }
    },
    autoreplace: {
      intro: "自动替换摘录中的某些错误",
      link: "https://busiyi.notion.site/AutoReplace-23df00035c97436e88a863925a08e57f",
      option: {
        preset: ["自定义"],
        replace_selected: ["使用 AutoReplace 的配置", "确定"]
      },
      help: {
        replace_selected: "具体输入格式见顶上帮助信息"
      },
      label: {
        preset: "选择需要的预设",
        replace_selected: "批量替换摘录文字",
        custom_replace: "自定义，点击查看具体格式"
      }
    },
    autolist: {
      intro: "针对序列文本，自动换行，仅适配中文",
      link: "https://busiyi.notion.site/AutoList-4c52b2607225450f913a6bfaba1f15ec",
      option: {
        preset: ["自定义", "选择题", "句首中文编号", "句末分号", "句末句号"],
        list_selected: ["使用 AutoList 的配置", "确定"]
      },
      help: {
        list_selected: "具体输入格式见顶上帮助信息"
      },
      label: {
        preset: "选择需要的预设",
        custom_list: "自定义，点击查看具体格式",
        list_selected: "序列摘录换行"
      }
    },
    autocomplete: {
      intro: "补全单词词形，只支持动词和名词",
      link: "https://busiyi.notion.site/AutoComplete-1eab78ee6d7648339e088c593326b5ca",
      label: {
        custom_complete: "自定义摘录填充信息，点击查看支持变量",
        complete_selected: "补全单词词形"
      },
      option: {
        complete_selected: ["仅补全单词词形", "同时填充单词信息"]
      },
      error: {
        not_find_word: "查询不到该单词"
      }
    },
    anotherautotitle: {
      intro: "更强大的自动转换标题插件",
      link: "https://busiyi.notion.site/AnotherAutoTitle-bef78c75901e4895b4fa2d03d83c48d6",
      option: {
        has_title_then: ["作为摘录", "标题链接", "覆盖标题"],
        preset: ["自定义", "字数限制", "不含有点号"],
        switch_title: ["切换为不存在的", "交换标题和摘录"]
      },
      label: {
        has_title_then: "标题存在，继续摘录",
        change_title_no_limit: "拓宽标题摘录不受限制",
        preset: "选择需要的预设",
        custom_be_title: "自定义，点击查看具体格式",
        switch_title: "切换摘录或标题",
        word_count: "设定最多字数"
      },
      help: {
        has_title_then: "也要先满足预设条件",
        switch_title: "当两者都存在时请使用「交换标题和摘录」"
      }
    },
    more: {
      donate: "如果 ohmymn 对你有所帮助，欢迎赞赏，点击\n即可直达二维码。",
      github:
        "ohmymn 完全开源，容易扩展，欢迎参与开发。\n点击直达 Github 查看源码，欢迎 star 和 fork。",
      feishu:
        "点击加入飞书话题群，一起交流 ohmymn 使用\n技巧，我会不定期为大家解决疑问。"
    }
  },
  handle_received_event: {
    hud: {
      not_selected: "未选中任何脑图卡片",
      auto_correct: "请按实际情况选择开关，不建议无脑打开自动矫正",
      lock_excerpt: "锁定摘录不建议和自动矫正同时开启",
      input_saved: "输入已保存",
      input_clear: "输入已清空"
    },
    smart_select: {
      option: [
        "仅处理选中的卡片",
        "仅处理所有子节点",
        "处理选中的卡片及其子节点"
      ],
      card_with_children: "检测到您选中的唯一卡片有子节点",
      cards_with_children: "检测到您选中的同层级卡片均有子节点"
    }
  },
  switch_panel: {
    better_with_mindmap: "OhMyMN 与脑图更配喔"
  },
  handle_user_action: {
    sure: "确定",
    input_error: "输入错误，请重新输入"
  },
  implement_datasource_method: {
    none: "无",
    clicked: "选中"
  }
}

export default dict
