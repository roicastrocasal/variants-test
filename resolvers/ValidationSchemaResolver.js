const attributeValues = require('../data/attributeValues.json')
const schemas = require('../data/models.json')
const variantTypes = require('../data/variantTypes.json')

module.exports.productSchemaResolver = (parent,args,context,info) => {
    return schemas.find(schema => schema.urn === parent.schema)
}

module.exports.productSchemaAttributesResolver = (parent,args,context,info) => {
    return parent.attributes.map(attr => {
        const attrValue = attributeValues.find(attrVal => attrVal.urn === attr.urn);
        return {
            name: attrValue.name,
            fieldName: attrValue.fieldName,
            ...attr
        }

    })
    
}

module.exports.productSchemaVariants =  (parent,args,context,info) => {
    return variantTypes.filter(vType => parent.variants.includes(vType.urn))

}

module.exports.productSchemaVariantsAttributes =  (parent,args,context,info) => {
    return parent.attributeTypes.map(attr => {
        const attrValue = attributeValues.find(attrVal => attrVal.urn === attr.urn);
        return {
            name: attrValue.name,
            fieldName: attrValue.fieldName,
            ...attr
        }

    })

}


