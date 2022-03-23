import { Addon, MN } from "const"
import handleExcerpt, {
  removeLastCommentCacheTitle
} from "jsExtension/excerptHandler"
import { layoutViewController } from "jsExtension/switchPanel"
import lang from "lang"
import { EventHandler } from "typings"
import {
  delayBreak,
  eventHandlerController,
  isThisWindow,
  showHUD
} from "utils/common"
import { getNoteById } from "utils/note"
import { Range, readProfile, saveProfile } from "utils/profile"
import { updateProfileTemp } from "utils/profile/updateDataSource"
import handleMagicAction from "./magicActionHandler"

export const eventHandlers = eventHandlerController([
  Addon.key + "InputOver",
  Addon.key + "ButtonClick",
  Addon.key + "SelectChange",
  Addon.key + "SwitchChange",
  "OCRForNote",
  "OCRImageEnd",
  "OCRImageBegin",
  "EndOCRForNote",
  "PopupMenuOnNote",
  "ProcessNewExcerpt",
  "ChangeExcerptRange",
  "PopupMenuOnSelection",
  "ClosePopupMenuOnNote",
  "ClosePopupMenuOnSelection"
])

const onButtonClick: EventHandler = async sender => {
  if (!isThisWindow(sender)) return
  // For magicaction
  console.log("Click a button", "event")
  const { row, type } = sender.userInfo
  handleMagicAction(type, row)
}

const onSwitchChange: EventHandler = sender => {
  if (!isThisWindow(sender)) return
  console.log("Switch the switch", "event")
  const { name, key, status } = sender.userInfo
  if (self.profile?.[name]?.[key] !== undefined)
    self.profile[name][key] = status
  else self.docProfile[name][key] = status
  switch (key) {
    case "screenAlwaysOn":
      UIApplication.sharedApplication().idleTimerDisabled = status
      break
    case "preOCR":
      status && showHUD(lang.make_sure_autoocr, 2)
      break
  }
}

const onSelectChange: EventHandler = async sender => {
  if (!isThisWindow(sender)) return
  console.log("Change the select", "event")
  const { name, key, selections } = sender.userInfo
  if (key == "profile") {
    const lastProfileNum = self.docProfile.addon.profile[0]
    self.docProfile.addon.profile = selections
    saveProfile(undefined, lastProfileNum)
    readProfile(Range.Global)
  } else {
    if (self.profile?.[name]?.[key] !== undefined)
      self.profile[name][key] = selections
    else self.docProfile[name][key] = selections
    switch (key) {
      case "panelPosition":
      case "panelHeight":
        layoutViewController()
        break
    }
  }
}

const onInputOver: EventHandler = sender => {
  if (!isThisWindow(sender)) return
  console.log("Input", "event")
  const { name, key, content } = sender.userInfo
  if (self.profile?.[name]?.[key] !== undefined)
    self.profile[name][key] = content
  else self.docProfile[name][key] = content
  updateProfileTemp(key, content)
  const { input_clear, input_saved } = lang
  showHUD(content ? input_saved : input_clear)
}

const onOCRImageBegin: EventHandler = sender => {
  if (!isThisWindow(sender)) return
  self.OCROnline.status = "begin"
  console.log("OCR begin", "ocr")
}

const onOCRImageEnd: EventHandler = async sender => {
  if (!isThisWindow(sender)) return
  self.OCROnline.status = "end"
  self.OCROnline.times = 1
  console.log("OCR end", "ocr")
}

const onPopupMenuOnSelection: EventHandler = sender => {
  if (!isThisWindow(sender)) return
  self.textSelectBar = {
    winRect: sender.userInfo.winRect,
    arrow: sender.userInfo.arrow
  }
  console.log("Popup menu on selection open", "event")
}

const onClosePopupMenuOnSelection: EventHandler = sender => {
  if (!isThisWindow(sender)) return
  self.textSelectBar = undefined
  self.OCROnline = {
    times: 0,
    status: "free"
  }
  console.log("Reset OCR status", "ocr")
  console.log("Popup menu on selection close", "event")
}

const tmp = {
  isProcessNewExcerpt: false,
  isChangeExcerptRange: false,
  lastExcerptText: "😎"
}

const onPopupMenuOnNote: EventHandler = async sender => {
  if (!isThisWindow(sender)) return
  tmp.isChangeExcerptRange = false
  tmp.isProcessNewExcerpt = false
  const success = await delayBreak(
    10,
    0.05,
    () => tmp.isChangeExcerptRange || tmp.isProcessNewExcerpt
  )
  if (success) return
  const note = sender.userInfo.note
  const { selViewLst } = MN.studyController().notebookController.mindmapView
  const { focusNote } =
    MN.studyController().readerController.currentDocumentController
  self.noteSelectBar = {
    status: true,
    type: selViewLst?.length ? (focusNote ? "both" : "card") : "doc"
  }
  console.log(`Popup menu on ${self.noteSelectBar.type} note open`, "event")
  // Excerpt text may be empty
  tmp.lastExcerptText = note.excerptText!
}

const onClosePopupMenuOnNote: EventHandler = async sender => {
  if (!isThisWindow(sender)) return
  const note = sender.userInfo.note
  self.noteSelectBar = {
    status: false
  }
  self.OCROnline = {
    times: 0,
    status: "free"
  }
  console.log("Reset OCR status", "ocr")
  console.log("Popup menu on note close", "event")
}

const onChangeExcerptRange: EventHandler = sender => {
  if (!isThisWindow(sender)) return
  console.log("Change excerpt range", "event")
  self.noteid = sender.userInfo.noteid
  const note = getNoteById(self.noteid)
  tmp.isChangeExcerptRange = true
  handleExcerpt(note, tmp.lastExcerptText)
}

const onProcessNewExcerpt: EventHandler = sender => {
  if (!isThisWindow(sender)) return
  console.log("Process new excerpt", "event")
  self.noteid = sender.userInfo.noteid
  const note = getNoteById(self.noteid)
  tmp.isProcessNewExcerpt = true
  if (self.profile.addon.lockExcerpt) tmp.lastExcerptText = "😎"
  removeLastCommentCacheTitle(true)
  handleExcerpt(note)
}

export default {
  onInputOver,
  onOCRImageBegin,
  onOCRImageEnd,
  onButtonClick,
  onSelectChange,
  onSwitchChange,
  onPopupMenuOnNote,
  onProcessNewExcerpt,
  onChangeExcerptRange,
  onClosePopupMenuOnNote,
  onPopupMenuOnSelection,
  onClosePopupMenuOnSelection
}
