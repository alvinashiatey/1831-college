const { AssetCache } = require("@11ty/eleventy-cache-assets");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const creds = require("../../creds.json");

require("dotenv").config();
async function citation() {
  try {
    const doc = new GoogleSpreadsheet(process.env.SHEETID);
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();

    let data = [];
    const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
    const rows = await sheet.getRows();
    let columns = rows[0]._sheet.headerValues;
    for (let i = 0; i < rows.length; i++) {
      const row = {};
      for (column of columns) {
        row[column] = rows[i][column];
      }
      data.push(row);
    }
    return data;
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = async () => {
  let asset = new AssetCache("black-college");
  if (asset.isCacheValid("1d")) {
    return asset.getCachedValue();
  }
  let data = await citation();

  asset.save(data, "json");
  return data;
};
