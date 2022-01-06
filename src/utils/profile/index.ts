import { IProfile, IDocProfile, profilePreset, docProfilePreset } from "profile"
import { docProfile, profile } from "profile"
import { log } from "utils/common"
import { Addon } from "const"
import { updateProfileDataSource } from "./updateDataSource"

let allProfile: IProfile[]
let allDocProfile: { [k: string]: IDocProfile }

const { profileKey, docProfileKey } = Addon

const getDataByKey = (key: string): any =>
  NSUserDefaults.standardUserDefaults().objectForKey(key)
const setDataByKey = (
  data: IProfile[] | { [k: string]: IDocProfile },
  key: string
) => void NSUserDefaults.standardUserDefaults().setObjectForKey(data, key)

export const enum Range {
  first,
  doc,
  global
}

const readProfile = (docmd5: string, range: Range) => {
  switch (range) {
    case Range.first:
      // 仅第一次打开才读取本地数据，然后先后读取文档配置和全局配置
      const docProfileSaved: {
        [k: string]: IDocProfile
      } = getDataByKey(docProfileKey)
      if (!docProfileSaved) log("初始化文档配置", "profile")
      allDocProfile = docProfileSaved ?? { [docmd5]: docProfilePreset }
      const profileSaved: IProfile[] = getDataByKey(profileKey)
      if (!profileSaved) log("初始化全局配置", "profile")
      allProfile = profileSaved ?? Array(5).fill(profilePreset)
    case Range.doc:
      // 打开文档时读文档配置，此时也必须读全局配置
      updateProfileDataSource(
        docProfile,
        allDocProfile?.[docmd5] ?? docProfilePreset
      )
      log("读取当前文档配置", "profile")
    case Range.global:
      // 切换配置时只读全局配置，读全局配置不需要 md5
      updateProfileDataSource(
        profile,
        allProfile[docProfile.ohmymn.profile[0]],
        true
      )
      log("读取全局配置", "profile")
  }
}

// 保存文档配置就必须保存全局配置，只有切换配置才只保存全局配置，切换配置是保存到上一个文档
const saveProfile = (docmd5?: string, num = docProfile.ohmymn.profile[0]) => {
  const deepCopy = (value: any) => JSON.parse(JSON.stringify(value))
  if (num != undefined) {
    allProfile[num] = deepCopy(profile)
    setDataByKey(allProfile, profileKey)
    log("保存全局配置", "profile")
  }
  if (docmd5 != undefined) {
    // 这传的是引用，我靠，气死了，折腾好久
    // allDocProfile[docmd5] = docProfile
    allDocProfile[docmd5] = deepCopy(docProfile)
    setDataByKey(allDocProfile, docProfileKey)
    log("保存当前文档配置", "profile")
  }
}

const removeProfile = () => {
  NSUserDefaults.standardUserDefaults().removeObjectForKey(profileKey)
  NSUserDefaults.standardUserDefaults().removeObjectForKey(docProfileKey)
}

export { saveProfile, readProfile, removeProfile }