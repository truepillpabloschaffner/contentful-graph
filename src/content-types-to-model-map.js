const getRelations = require('./get-relations');

/**
 * Returns the amount of times a given type is used within the entries
 * @param {string} type 
 * @param {any} types 
 * @returns {number}
 */
function numOccurrences(word,string) {
  return (string.match(new RegExp(word, 'g')) || []).length;
}

/**
 * Convert Contentful model types definitions to a structure
 * that contains "relations" property, which can be used to build
 * dependency graph
 *
 * @param {any} types
 * @returns
 */
function contentTypesToModelMap(typesx) {
  const modelsMap = {};
  const types = typesx.contentTypes;
  const entries = JSON.stringify(typesx.entries);
  types.forEach((type) => {
    try {
      modelsMap[type.sys.id] = {
        name: type.name,
        fields: type.fields,
        relations: getRelations(type, types),
        used: numOccurrences(type.sys.id,entries),
        //sys: type.sys,
      };
    } catch (e) {
    }
  });
  console.log('modelsMap', modelsMap);
  return modelsMap;
}

module.exports = contentTypesToModelMap;
