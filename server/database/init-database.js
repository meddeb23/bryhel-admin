require("dotenv").config();
const sequelize = require("./database");

// models
const Contact = require("../models/Contact");
const RandD = require("../models/RandD");
const Location = require("../models/location");
const FAQ = require("../models/FAQ");
const Award = require("../models/Award");
const Product = require("../models/Product");
const Project = require("../models/Project");

// data
const contacts = require("../data/contact.json");
const researchAndDevelopment = require("../data/researchAndDevelopment.json");
const locations = require("../data/locations.json");
const FAQs = require("../data/FAQ.json");
const awards = require("../data/awards.json");
const products = require("../data/products.json");
const projects = require("../data/projects.json");

async function initDB() {
  await sequelize.sync({ force: true });
  await Project.bulkCreate(projects);
  await Contact.bulkCreate(contacts);
  await RandD.bulkCreate(researchAndDevelopment);
  await Award.bulkCreate(awards);
  await Location.bulkCreate(locations);
  await FAQ.bulkCreate(FAQs);
  await Product.bulkCreate(products);
}

initDB();
