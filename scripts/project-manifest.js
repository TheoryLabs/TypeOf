import readProjectManifest from '@pnpm/read-project-manifest'



const getFileNamesInDir = async (currPath = __dirname) => {
  const fs = require('fs')
  let dirFilesArr

  try {
    dirFilesArr = await fs.readdirSync(currPath)
    return await dirFilesArr
  }
  catch(err) {
    console.error(err)
    throw err
  }
}
const dirContainsFileName = async (currPath = __dirname, fileName ='package.json') => {
  let fileNamesArr

  try {
    fileNamesArr = await getFileNamesInDir(currPath)
    return await fileNamesArr.includes(fileName)
  }
  catch(err) {
    console.error(err)
    throw err
  }
}



export default (currPath = process.cwd()) => (async () =>  {
  let projectRootPath
  let _manifest

  try  {
    projectRootPath = await currPath

    if(await dirContainsFileName(projectRootPath)) {
      const { manifest, fileName } = await readProjectManifest(projectRootPath)
      _manifest = await manifest
    } else {
      const { manifest, fileName } = await readProjectManifest(process.cwd())
      _manifest = await manifest
    }

    if(await _manifest) {
      return await _manifest
    } else {
      throw Error(`Expected to find package.json at path: ${projectRootPath} but none was found!`)
    }
  }
  catch(err) {
    console.error(err)
    process.exitCode = 1
    const { exitCode } = process
    process.exit(exitCode)
  }
})()
