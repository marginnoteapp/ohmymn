import { build } from "@ourongxing/estrella"
import { Plugin } from "esbuild"
import mnaddon from "./mnaddon.json"
import copy from "esbuild-plugin-mxn-copy"
import AutoImport from "unplugin-auto-import/esbuild"
import { homedir } from "os"
import fs from "fs"
import { exec } from "child_process"

const isProd = process.env.NODE_ENV === "production"

const bannerText = `/*
THIS IS A GENERATED/BUNDLED FILE BY ESBuild
if you want to view the source code, please visit the github repository
https://github.com/marginnoteapp/ohmymn
version: ${mnaddon.version} by ${mnaddon.author}
*/
`

const outDir = isProd
  ? "./dist/"
  : homedir() +
    `/Library/Containers/QReader.MarginStudyMac/Data/Library/MarginNote Extensions/${mnaddon.addonid}/`

function clear(): Plugin {
  return {
    name: "Clear",
    setup(build) {
      build.onStart(() => {
        if (fs.existsSync(outDir)) {
          fs.rmSync(outDir, { recursive: true })
        }
      })
    }
  }
}

function zip(): Plugin {
  return {
    name: "Zip",
    setup(build) {
      build.onEnd(() => {
        const fileName = `${mnaddon.addonid.split(".")[2]} v${
          mnaddon.version
        }.mnaddon`
        exec(`cd ${outDir} && zip -qr ${fileName.replace(/ /g, "_")} *`)
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
    clear(),
    AutoImport({
      imports: [
        {
          "~/utils/common": [isProd ? "" : "console"]
        }
      ],
      dts: false
    }),
    copy({
      copy: [
        "assets/logo.png",
        "mnaddon.json",
        "assets/icon"
        // "assets/dict.zip"
      ].map(k => ({
        from: k,
        to: outDir
      }))
    }),
    zip()
  ]
})