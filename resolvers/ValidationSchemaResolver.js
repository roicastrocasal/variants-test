const attributeValues = require('../data/attributeValues.json')
const schemas = require('../data/models.json')
const variantTypes = require('../data/variantTypes.json')

module.exports.productSchemaResolver = (parent,args,context,info) => {
    return schemas.find(schema => schema.urn === parent.schema)
}

module.exports.productSchemaAttributesResolver = (parent,args,context,info) => {
    return attributeValues.filter(attr => parent.attributes
        .map(pAttr => pAttr.urn)
        .includes(attr.urn))
}

module.exports.productSchemaVariants =  (parent,args,context,info) => {
    return variantTypes.filter(vType => parent.variants.includes(vType.urn))

}

module.exports.productSchemaVariantsAttributes =  (parent,args,context,info) => {
    return attributeValues.filter(attr => parent.attributeTypes
        .map(pAttrType => pAttrType.urn)
        .includes(attr.urn))

}


