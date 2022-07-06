const routes = require("express").Router();

const pageList = require("../../database/getPages");
const { validateQueryParams } = require("../../utilities/validation");

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
  res.status(200).json(page);
});

// @desc update the page content

routes.post("/", async (req, res) => {
  const language = req.query.language || "en";
  const title = req.query.title || "about";
  const { content } = req.body;
  console.log(content);
  const message = validateQueryParams(language, title);
  if (message) return res.status(400).json(message);
  switch (title) {
    case "about":
      await pageList.updatePage(language, title, content);
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

module.exports = routes;
