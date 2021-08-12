const fs = require('fs')


getCurrentFilenames()


fs.rename('hello.txt', 'geeks.txt', (error) => {
  if (error) {

    // Show the error
    console.log(error);
  }
  else {

    // List all the filenames after renaming
    console.log("\nFile Renamed\n");

    // List all the filenames after renaming
    getCurrentFilenames();
  }
});

// Function to get current filenames
// in directory
function getCurrentFilenames() {


  console.log(process.cwd())
  process.chdir('src')

  console.log(process.cwd())

  console.log("Current filenames:")
  fs.readdirSync(__dirname).forEach(file => {
    console.log(file);
  });
}
