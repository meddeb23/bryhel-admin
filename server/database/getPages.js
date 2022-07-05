const Contact = require("../models/Contact");
const FAQ = require("../models/FAQ");
const Location = require("../models/location");
const Product = require("../models/Product");
const Project = require("../models/Project");
const RandD = require("../models/RandD");

function pageList() {
  return Object.freeze({
    getAboutPage,
    getProductsPage,
    getServicesPage,
    getPlatformPage,
    getContactPage,
  });

  async function addContact(language, file) {
    file[file.length - 1].contact = await Contact.findAll({
      where: { language },
    });
    return file;
  }

  async function getAboutPage(language) {
    let file = require(`../pages/about-${language}.json`);
    file[2].location = await Location.findAll({ where: { language } });
    file[3].projects = await Project.findAll({ where: { language } });
    file[4].FAQ = await FAQ.findAll({ where: { language } });
    file = await addContact(language, file);
    return file;
  }
  async function getProductsPage(language) {
    let file = require(`../pages/products-${language}.json`);
    file[0].products = await Product.findAll({ where: { language } });
    file = await addContact(language, file);
    return file;
  }
  async function getServicesPage(language) {
    let file = require(`../pages/services-${language}.json`);
    file[4].RandD = await RandD.findAll({ where: { language } });
    file = await addContact(language, file);
    return file;
  }
  async function getPlatformPage(language) {
    let file = require(`../pages/platform-${language}.json`);
    file = await addContact(language, file);
    return file;
  }
  async function getContactPage(language) {
    let file = require(`../pages/contact-${language}.json`);
    file = await addContact(language, file);
    return file;
  }
}
module.exports = pageList();
