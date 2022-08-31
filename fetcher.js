const fs = require('fs');
const request = require('request');

//source website and destination file from command line
const args = process.argv.slice(2);
const source = args[0];
const destination = args[1];

//callback when file is finished writing
const doneWriting = (fileSize, destination) => {
  console.log(`Downloaded and saved ${fileSize} bytes to ${destination}`)
};

request(source, (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //console.log('body:', body); // Print the HTML for the Google homepage.
  if (body) {
    fs.writeFile(destination, body, err => {
      if (err) {
        console.log(err);
      }
      if (!err) {
        doneWriting(body.length, destination);
      }
    })
  }
});