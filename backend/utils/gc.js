const { Storage } = require('@google-cloud/storage');

const gc = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY,
  },
});

const myBucket = gc.bucket(process.env.GOOGLE_CLOUD_BUCKET);

// const blob = myBucket.file(`${req.params.id}-main.jpeg`);
// const blobStream = blob.createWriteStream({
//   resumable: false,
//   metadata: {
//     cacheControl: "no-cache",
//   },
// });
// blobStream.on("error", (err) => console.log(err));
// const publicUrl = `https://storage.googleapis.com/${process.env.GOOGLE_CLOUD_BUCKET}/${req.params.id}-main.jpeg`;

// blobStream.on("finish", () => {});
// const imageBuffer =

// const publicUrl = `https://storage.googleapis.com/${process.env.GOOGLE_CLOUD_BUCKET}/${filename}`;

// const blob = myBucket.file(filename);
// const blobStream = blob.createWriteStream({
//   resumable: false,
//   metadata: {
//     cacheControl: "no-cache",
//   },
// });
// blobStream.on("error", (err) => console.log(err));

// blobStream.on("finish", () => {});

// const imageBuffer =

// blobStream.end(imageBuffer);
