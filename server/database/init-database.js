require("dotenv").config();
const sequelize = require("./database");
const bcrypt = require("bcryptjs");
const debug = require("debug")("build");

// models
const Contact = require("../models/Contact");
const RandD = require("../models/RandD");
const Location = require("../models/location");
const FAQ = require("../models/FAQ");
const Award = require("../models/Award");
const Product = require("../models/Product");
const Project = require("../models/Project");
const User = require("../models/User");

// data
const contacts = require("../data/contact.json");
const researchAndDevelopment = require("../data/researchAndDevelopment.json");
const locations = require("../data/locations.json");
const FAQs = require("../data/FAQ.json");
const awards = require("../data/awards.json");
const products = require("../data/products.json");
const projects = require("../data/projects.json");

async function initDB() {
  debug("Creating database");
  await sequelize.sync({ force: true });

  debug("Creating user");
  const password = "password";
  const salt = await bcrypt.genSalt(10);
  if (!salt) throw Error("Something went wrong with bcrypt");

  const hash = await bcrypt.hash(password, salt);
  if (!hash) throw Error("Something went wrong hashing the password");

  await User.create({
    name: "youssef admin",
    admin: true,
    email: "email@example.com",
    password: hash,
  });
  debug("uploading data");
  await Project.bulkCreate(projects);
  await Contact.bulkCreate(contacts);
  await RandD.bulkCreate(researchAndDevelopment);
  await Award.bulkCreate(awards);
  await Location.bulkCreate(locations);
  await FAQ.bulkCreate(FAQs);
  await Product.bulkCreate(products);
  debug("dataBase is ready ✅");
}

initDB();
