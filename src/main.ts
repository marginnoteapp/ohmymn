import handleReceivedEvent from "~/jsExtension/handleReceivedEvent"
import switchPanel from "~/jsExtension/switchPanel"
import { getObjCClassDeclar } from "~/utils/common"
import lifeCycle, { clsMethons } from "~/jsExtension/lifeCycle"
import { MN, Addon } from "~/const"

JSB.newAddon = mainPath => {
  MN.mainPath = mainPath
  return JSB.defineClass(
    getObjCClassDeclar(Addon.title, "JSExtension"),
    {
      ...lifeCycle,
      ...switchPanel,
      ...handleReceivedEvent
    },
    clsMethons
  )
}
