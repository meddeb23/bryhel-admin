const Contact = require("../models/Contact");
const FAQ = require("../models/FAQ");
const Location = require("../models/location");
const Product = require("../models/Product");
const Project = require("../models/Project");
const RandD = require("../models/RandD");

const fs = require("fs");
const path = require("path");
const Award = require("../models/Award");

function pageList() {
  return Object.freeze({
    getAboutPage,
    getProductsPage,
    getServicesPage,
    getPlatformPage,
    getContactPage,

    updateAboutPage,
    updateProductPage,

    updatePage,
  });

  async function addContact(language, file) {
    file[file.length - 1].contact = await Contact.findAll({
      where: { language },
    });
    return file;
  }
  async function updateContact(language, file) {
    forEachAsync(file[file.length - 1].contact, async (item) => {
      await Award.update(
        { type: item.type, value: item.value },
        { where: { id: item.id } }
      );
    });
    return file;
  }

  async function getAboutPage(language) {
    let file = require(`../pages/about-${language}.json`);
    file[1].awards = await Award.findAll({ where: { language } });
    file[3].location = await Location.findAll({ where: { language } });
    file[4].projects = await Project.findAll({ where: { language } });
    file[5].FAQ = await FAQ.findAll({ where: { language } });
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

  async function updateAboutPage(language, page, content) {
    forEachAsync(content[1].awards, async (item) => {
      await Award.update(
        { name: item.name, description: item.description },
        { where: { id: item.id } }
      );
    });
    forEachAsync(content[3].location, async (item) => {
      await Location.update({ name: item.name }, { where: { id: item.id } });
    });
    forEachAsync(content[4].projects, async (item) => {
      await Project.update(
        { name: item.name, description: item.description },
        { where: { id: item.id } }
      );
    });
    forEachAsync(content[5].FAQ, async (item) => {
      await FAQ.update(
        { question: item.question, answer: item.answer },
        { where: { id: item.id } }
      );
    });
    updateContact(language, content);
    updatePage(language, page, content);
  }

  async function updateProductPage(language, page, content) {
    forEachAsync(content[0].products, async (item) => {
      await Product.update({ name: item.name }, { where: { id: item.id } });
    });
    updateContact(language, content);
    updatePage(language, page, content);
  }

  async function updateProductPage(language, page, content) {
    forEachAsync(content[4].RandD, async (item) => {
      await RandD.update(
        { title: item.title, description: item.description },
        { where: { id: item.id } }
      );
    });
    updateContact(language, content);
    updatePage(language, page, content);
  }
  async function updatePage(language, page, content) {
    const data = JSON.stringify(content);
    // fs.writeFileSync(
    //   path.join(__dirname, "..", "pages", `${page}-${language}.json`),
    //   data
    // );
  }
}

const forEachAsync = async (array, callback) => {
  for (const item of array) {
    await callback(item);
  }
};
module.exports = pageList();
