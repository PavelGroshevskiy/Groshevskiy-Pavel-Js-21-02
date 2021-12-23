const FormData = require("form-data");
const imgBBApi = require("../constants/imgDbApi");

module.exports = {
  uploadImg: (file) =>
    new Promise((res, rej) => {
      const form = new FormData();
      form.append(imgBBApi.IMGBB_PARAMEXPIRE, imgBBApi.IMGBB_EXPIRE.toString());
      form.append(imgBBApi.IMGBB_PARAMKEY, imgBBApi.IMGBB_APIKEY);

      form.append(imgBBApi.IMGBB_PARAMIMAGE, file.buffer, {
        filename: file.originalname,
        size: file.size,
      });

      form.submit(
        {
          protocol: "https:",
          method: imgBBApi.IMGBB_METHOD,
          host: imgBBApi.IMGBB_HOST,
          path: imgBBApi.IMGBB_PATH,
        },
        function (err, response) {
          if (err || response.statusCode !== 200) {
            return rej({ error: err || "error" });
          }
          response.on("data", (chunk) => {
            return res(JSON.parse(chunk.toString()));
          });
        }
      );
    }),
};
