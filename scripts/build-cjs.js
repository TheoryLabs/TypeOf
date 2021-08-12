import * as esbuild from 'esbuild'
import { pnpPlugin } from '@yarnpkg/esbuild-plugin-pnp'
import RawPlugin from 'esbuild-plugin-raw'
import { nodeBuiltIns } from 'esbuild-node-builtins'


import ManifestFile from './project-manifest'



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
        manifestFile = await ManifestFile(__dirname)
        entryFile = await manifestFile.source

        if(process.env.NODE_ENV !== 'production') {
          service = await esbuild.initialize()

          results = await esbuild.build({
            plugins: [
              pnpPlugin(),
              RawPlugin(),
              nodeBuiltIns()
            ],
            entryPoints: [
              entryFile
            ],
            outdir: 'dist/cjs',
            bundle: true,
            sourcemap: true,
            minify: false,
            keepNames:true,
            incremental: true,
            platform: 'node',
            color: true
          })
          .finally(onRebuild)

          await console.log(results)

          // Call "rebuild" as many times as you want
          // for (let i = 0; i < 5; i++) {
          //   let result2 = await results.rebuild()
          // }

          // Call "dispose" when you're done to free up resources.
          // await results.rebuild.dispose()
        }
        else {
          service = await esbuild.initialize()

          results = await esbuild.build({
            plugins: [
              pnpPlugin(),
              RawPlugin(),
              nodeBuiltIns()
            ],
            entryPoints: [
              entryFile
            ],
            outdir: 'dist/cjs',
            bundle: true,
            sourcemap: false,
            minify: true,
            keepNames:true,
            platform: 'node'
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
