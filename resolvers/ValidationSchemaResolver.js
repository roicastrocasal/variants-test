const attributeValues = require('../data/attributeValues.json')
const dataTypes = require('../data/dataTypes.json')
const schemas = require('../data/models.json')
const variantTypes = require('../data/variantTypes.json')
const metainfoTypes = require('../data/metainfoTypes.json')

module.exports.productSchemaResolver = (parent,args,context,info) => {
    return schemas.find(schema => schema.urn === parent.schema)
}

module.exports.productSchemaAttributesResolver = (parent,args,context,info) => {
    return attributeValues.filter(attr => parent.attributes.includes(attr.urn))
}

module.exports.productSchemaVariants =  (parent,args,context,info) => {
    return variantTypes.filter(vType => parent.variants.includes(vType.urn))

}

module.exports.productSchemaVariantsAttributes =  (parent,args,context,info) => {
    return attributeValues.filter(attr => parent.attributeTypes.includes(attr.urn))

}

module.exports.productSchemaMetainfo =  (parent,args,context,info) => {
    return metainfoTypes.find(mInfo => parent.metainfo === mInfo.urn)

}

module.exports.schemaMetainfoDatatypesResolver =  (parent,args,context,info) => {
    return dataTypes.filter(dType => parent.dataTypes.includes(dType.urn))

}