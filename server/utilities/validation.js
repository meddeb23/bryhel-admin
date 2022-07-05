const validateQueryParams = (lang) => {
  if (["en", "fr"].indexOf(lang) === -1)
    return { message: "invalide language" };
};

module.exports = { validateQueryParams };
