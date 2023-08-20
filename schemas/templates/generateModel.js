const _ = require('lodash');
const fs = require('fs');

const models = require('../../data/models.json');
const attributeValues = require('../../data/attributeValues.json');
const variantTypes = require('../../data/variantTypes.json');

module.exports= () => {
    let modelStr = '';
    const tmpl = fs.readFileSync(__dirname+'/products-schemas.template').toString();
    const tmplUnion = fs.readFileSync(__dirname+'/unions.template').toString();
    const compiled = _.template(tmpl);
    const compiledUnion = _.template(tmplUnion);

    models.forEach(model => {
        const data = {};
        data.attributes = model.attributes.map(attr => (
            {
                ...attributeValues.find(attrVal => attrVal.urn === attr.urn),
                multivaluated: attr.multivaluated
            }
        )).map(attrVal => ({
            fieldName: attrVal.fieldName,
            multivaluated: attrVal.multivaluated
        }))
        data.variants = _.uniq(model.variants
                    .flatMap(variant => variantTypes
                        .find(varType => varType.urn===variant)
                        .attributeTypes
                        .map(attr => attributeValues
                            .find(attrVal => attrVal.urn === attr))
                            .map(attrVal => attrVal.fieldName))).map(val => ({fieldName: val}))
        
        
        modelStr = modelStr +'\n'+ compiled({
            name: model.name,
            attributes: data.attributes,
            variants: data.variants
        });

        
    })

    const unionsStr = compiledUnion({models});

    const configModelTypes = models.map(model => ({
        type: model.productType,
        variant: model.name+"Variant",
        attribute: model.name+"Attribute"
    }))
    fs.writeFileSync(__dirname+'/../../config/modelTypes-generated.json',JSON.stringify(configModelTypes,null,2));


    console.log(modelStr)
    console.log(unionsStr);

    fs.writeFileSync(__dirname+'/../products-schema-generated.graphql',modelStr+unionsStr);

}


                






