import * as esbuild from 'esbuild'
import { pnpPlugin } from '@yarnpkg/esbuild-plugin-pnp'
import RawPlugin from 'esbuild-plugin-raw'
import { nodeBuiltIns } from 'esbuild-node-builtins'



import ManifestFile from './project-manifest'



// const {
//   build,
//   buildSync,
//   formatMessages,
//   formatMessagesSync,
//   initialize,
//   serve,
//   transform,
//   transformSync,
//   version
// } = esbuild

// build: [Function: build],
//   buildSync: [Function: buildSync],
//   formatMessages: [Function: formatMessages],
//   formatMessagesSync: [Function: formatMessagesSync],
//   initialize: [Function: initialize],
//   serve: [Function: serve],
//   transform: [Function: transform],
//   transformSync: [Function: transformSync],
//   version: '0.12.17'

const onRebuild = (error, result) => {
  if(error) {
    console.error('FAILURE: Build could not resolve successfully due to codebase malformation at current state.', error)
  }
  else {
    console.log(`SUCCESS: Build resolved without issue. Keep on rockin' brosef!`, result)
  }
}


(async () => {
  let manifestFile
  let entryFile

  let service
  let results

  try {
    await esbuild.initialize()

    manifestFile = await ManifestFile(__dirname)
    entryFile = await manifestFile.source


    if(process.env.NODE_ENV !== 'production') {


      results = await esbuild.build({
        plugins: [
          pnpPlugin(),
          RawPlugin(),
          nodeBuiltIns()
        ],
        entryPoints: [
          entryFile
        ],
        outdir: 'dist/esm',
        bundle: true,
        sourcemap: true,
        minify: false,
        keepNames:true,
        incremental: true,
        splitting: true,
        format: 'esm',
        target: [
          'esnext'
        ],
        color: true
      })
      .finally(onRebuild)

      // await results.stop()
      await console.log(results)
      // await results.rebuild()

      // Call "rebuild" as many times as you want
      // for (let i = 0; i < 5; i++) {
      //   let result2 = await results.rebuild()
      // }

      // Call "dispose" when you're done to free up resources.
      // await results.rebuild.dispose()
    }
    else {

      results = await esbuild.build({
        plugins: [
          pnpPlugin(),
          RawPlugin(),
          nodeBuiltIns()
        ],
        entryPoints: [
          entryFile
        ],
        outdir: 'dist/esm',
        bundle: true,
        sourcemap: false,
        minify: true,
        keepNames:true,
        splitting: true,
        format: 'esm',
        target: [
          'esnext'
        ]
      })

      await console.log(results)

      // Call "rebuild" as many times as you want
      // for (let i = 0; i < 5; i++) {
      //   let result2 = await results.rebuild()
      // }

      // Call "dispose" when you're done to free up resources.
      //await results.rebuild.dispose()
    }
  }
  catch(err) {
    console.error(err)
    process.exit(1)
  }
})()
