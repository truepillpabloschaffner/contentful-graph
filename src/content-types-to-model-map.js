const getRelations = require('./get-relations');

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
  types.forEach((type) => {
    try {
      modelsMap[type.sys.id] = {
        name: type.name,
        fields: type.fields,
        relations: getRelations(type, types),
        //sys: type.sys,
      };
    } catch (e) {
    }
  });
  //console.log('modelsMap', modelsMap);
  return modelsMap;
}

module.exports = contentTypesToModelMap;
