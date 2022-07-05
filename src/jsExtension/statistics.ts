import { MN } from "~/const"

const data = {
  notebook: [] as {
    title: string
    creatTime: number
    docNum: number
    // 百分比
    readProportion: number
  }[]
}

export default function () {
  /**
   * 数据该怎么统一获取和存放
   */
  console.log(MN.db.allNotebooks()[0].options)
  // 连日期都没法获取到
  // 如何获取目前的所有笔记本
}
