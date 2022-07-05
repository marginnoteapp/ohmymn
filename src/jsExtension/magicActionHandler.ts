import lang from "~/lang"
import { PanelControl } from "~/modules/addon/typings"
import { checkInputCorrect, actions4card } from "~/synthesizer"
import { IRowButton, MbBookNote } from "~/typings"
import { CellViewType, UIAlertViewStyle } from "~/typings/enum"
import { undoGroupingWithRefresh } from "~/utils/note"
import popup from "~/utils/popup"
import { getMNLinkValue } from "~/utils/profile"
import { closePanel } from "./switchPanel"

export default async (
  type: "card" | "text",
  row: IRowButton,
  option?: number
) => {
  if (option !== undefined)
    await handleMagicAction({ type, key: row.key, option })
  else
    switch (row.type) {
      case CellViewType.ButtonWithInput:
        while (1) {
          const { option, content } = await popup(
            {
              title: row.label,
              message: row.help ?? "",
              type: UIAlertViewStyle.PlainTextInput,
              // It is better to have only two options, because then the last option will be automatically selected after the input
              buttons: row.option ? row.option : [lang.sure]
            },
            ({ alert, buttonIndex }) => ({
              content: alert.textFieldAtIndex(0).text,
              option: buttonIndex
            })
          )
          if (option === -1) return
          const text = content ? getMNLinkValue(content) : ""
          // Allowed to be empty
          if (
            text === "" ||
            (text && (await checkInputCorrect(text, row.key)))
          ) {
            await handleMagicAction({
              type,
              key: row.key,
              option,
              content: text
            })
            return
          }
        }
      case CellViewType.Button:
        const { option } = await popup(
          {
            title: row.label,
            message: row.help ?? "",
            type: UIAlertViewStyle.Default,
            buttons: row.option ?? [lang.sure]
          },
          ({ buttonIndex }) => ({
            option: buttonIndex
          })
        )
        if (option === -1) return
        await handleMagicAction({
          type,
          key: row.key,
          option
        })
    }
}

const handleMagicAction = async ({
  type,
  key,
  option,
  content = ""
}: {
  type: "card" | "text"
  key: string
  option: number
  content?: string
}) => {
  try {
    const nodes: MbBookNote[] = []
    key != "filterCards" &&
      self.globalProfile.addon.panelControl.includes(
        PanelControl.CompleteClose
      ) &&
      closePanel()

    // Promise can not be placed in undoGroupingWithRefresh()
    if (actions4card[key] instanceof Promise)
      actions4card[key]({
        content,
        nodes,
        option
      })
    else
      undoGroupingWithRefresh(
        () =>
          void actions4card[key]({
            content,
            nodes,
            option
          })
      )
  } catch (err) {
    console.error(String(err))
  }
}
