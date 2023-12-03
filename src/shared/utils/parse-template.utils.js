const fs = require('fs');
const { promisify } = require('util');
const readFilePromise = promisify(fs.readFile);

/**
 * Read html template and replace string with value
 * @param {string} filePath
 * @param {{search: string, replaceValue: any}[]} replacements
 * @returns {Promise<string>}
 */
const parseTemplateUtils = async (filePath, replacements) => {
  try {
    let rawTemplate = await readFilePromise(filePath, { encoding: 'utf-8' });
    replacements.forEach((item) => {
      rawTemplate = rawTemplate.replace(item.search, item.replaceValue);
    });
    return rawTemplate;
  } catch (error) {
    throw error;
  }
};

module.exports = parseTemplateUtils;
