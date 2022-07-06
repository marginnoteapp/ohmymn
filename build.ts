import { build } from "@ourongxing/estrella"
import { Plugin } from "esbuild"
import mnaddon from "./mnaddon.json"
import copy from "esbuild-plugin-mxn-copy"
import AutoImport from "unplugin-auto-import/esbuild"
import os from "os"
import fs from "fs"

const isProd = process.env.NODE_ENV === "production"

const bannerText = `/*
THIS IS A GENERATED/BUNDLED FILE BY ESBuild
if you want to view the source code, please visit the github repository
https://github.com/mnaddon/ohmymn
version: ${mnaddon.version} by ${mnaddon.author}
*/
`

const outDir = isProd
  ? "./dist/"
  : os.homedir() +
    `/Library/Containers/QReader.MarginStudyMac/Data/Library/MarginNote Extensions/${mnaddon.addonid}/`

function clear(dir: string): Plugin {
  return {
    name: "Clear",
    setup(build) {
      build.onStart(() => {
        if (fs.existsSync(dir)) {
          fs.rmSync(dir, { recursive: true })
        }
      })
    }
  }
}

build({
  entry: "src/main.ts",
  tslint: !isProd,
  outfile: outDir + "main.js",
  splitting: false,
  sourcemap: false,
  clear: true,
  watch: !isProd,
  minify: isProd,
  banner: {
    js: bannerText
  },
  pure: ["console.log", "console.error", "console.assert", "console.warn"],
  bundle: true,
  plugins: [
    clear(outDir),
    AutoImport({
      imports: [
        {
          "~/utils/common": [isProd ? "" : "console"]
        }
      ],
      dts: false
    }),
    copy({
      copy: ["assets/logo.png", "mnaddon.json", "assets/icon"].map(k => ({
        from: k,
        to: outDir
      }))
    })
  ]
})
