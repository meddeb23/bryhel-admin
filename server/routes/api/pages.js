const routes = require("express").Router();

const pageList = require("../../database/getPages");
const fs = require("fs");
const path = require("path");
const { validateQueryParams } = require("../../utilities/validation");
const Award = require("../../models/Award");
const Location = require("../../models/location");
const Product = require("../../models/Product");
const Project = require("../../models/Project");

// @desc get the page content

routes.get("/", async (req, res) => {
  const language = req.query.language || "en";
  const title = req.query.title || "about";

  const message = validateQueryParams(language, title);
  if (message) return res.status(400).json(message);
  let page = "";
  switch (title) {
    case "about":
      page = await pageList.getAboutPage(language);
      break;
    case "products":
      page = await pageList.getProductsPage(language);
      break;
    case "services":
      page = await pageList.getServicesPage(language);
      break;
    case "platform":
      page = await pageList.getPlatformPage(language);
      break;
    case "contact":
      page = await pageList.getContactPage(language);
      break;
    default:
      return res.status(400).json({ message: "invalide page" });
  }
  console.log(page);
  res.status(200).json(page);
});

// @desc update the page content

routes.post("/", async (req, res) => {
  const language = req.query.language || "en";
  const title = req.query.title || "about";
  const { content } = req.body;
  const message = validateQueryParams(language, title);
  if (message) return res.status(400).json(message);
  switch (title) {
    case "about":
      await pageList.updateAboutPage(language, title, content);
      break;
    case "products":
      await pageList.updatePage(language, title, content);
      break;
    case "services":
      await pageList.updatePage(language, title, content);
      break;
    case "platform":
      await pageList.updatePage(language, title, content);
      break;
    case "contact":
      await pageList.updatePage(language, title, content);
      break;
    default:
      return res.status(400).json({ message: "invalide page" });
  }
  res.status(203).json({ success: true });
});

routes.post("/upload", async (req, res) => {
  const { slug, type } = req.body;
  const { image } = req.files;
  if (image) {
    const regex = /^image\/(png|jpg|jpeg)$/;
    if (!regex.test(image.mimetype))
      return res
        .status(400)
        .json({ message: "File type should be png, jpg, or jpeg" });
    fs.writeFileSync(
      path.join(__dirname, "..", "..", "public", `${type}_${image.name}`),
      image.data
    );
    const filePath = `/static/${type}_${image.name}`;
    switch (type) {
      case "award":
        await Award.update({ logo: filePath }, { where: { slug } });
        break;
      case "location":
        await Location.update({ logo: filePath }, { where: { slug } });
        break;
      case "product":
        console.log(slug, type, filePath);
        await Product.update({ image: filePath }, { where: { slug } });
        break;
      case "project":
        await Project.update({ image: filePath }, { where: { slug } });
        break;

      default:
        return res.status(400).json({ message: "invalide params" });
    }
  }

  res.status(203).json({ success: true });
});

module.exports = routes;
