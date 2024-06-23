const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

app.get("/api/images/:folder", (req, res) => {
  const folder = req.params.folder;
  const directoryPath = path.join(
    __dirname,
    `../public/images/promo/${folder}`,
  );

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send("Unable to scan directory: " + err);
    }
    const images = files.map((file) => ({
      src: `/images/promo/${folder}/${file}`,
      alt: file,
    }));
    res.json(images);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
