const fs = require("fs");
const AWS = require("aws-sdk");

// const uploadFile = (fileName) => {
//   // Read content from the file
//   const fileContent = fs.readFileSync(fileName);

//   // Setting up S3 upload parameters
//   const params = {
//     Bucket: S3_BUCKET_NAME,
//     Key: "vehicle.jpg", // File name for image we are saving as in S3
//     Body: fileContent,
//   };

//   // Uploading files to the bucket
//   s3.upload(params, function (err, data) {
//     if (err) {
//       throw err;
//     }
//     console.log(`File uploaded successfully. ${data.Location}`);
//   });
// };

function uploadFile() {
  var file = document.getElementById("file").files[0];
  var fd = new FormData();

  var key = "events/" + new Date().getTime() + "-" + file.name;

  fd.append("key", key);
  fd.append("acl", "public-read");
  fd.append("Content-Type", file.type);
  fd.append("AWSAccessKeyId", "YOUR ACCESS KEY");
  fd.append("policy", "YOUR POLICY");
  fd.append("signature", "YOUR SIGNATURE");

  fd.append("file", file);

  var xhr = new XMLHttpRequest();

  xhr.upload.addEventListener("progress", uploadProgress, false);
  xhr.addEventListener("load", uploadComplete, false);
  xhr.addEventListener("error", uploadFailed, false);
  xhr.addEventListener("abort", uploadCanceled, false);

  xhr.open("POST", "https://<yourbucket>.s3.amazonaws.com/", true); //MUST BE LAST LINE BEFORE YOU SEND

  xhr.send(fd);
}

module.exports = { uploadFile };
