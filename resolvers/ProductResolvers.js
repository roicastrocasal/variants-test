const products = require('../data/product.json')
const attributeValues = require('../data/attributeValues.json')
const schemas = require('../data/models.json')
const variantTypes = require('../data/variantTypes.json')


module.exports.productAttributesResolver = (parent,args,context,info ) => {
    const obj = {};
    parent.attrs.forEach(attr => {
        const attrValue = attributeValues.find(attrVal => attrVal.urn === attr.attributeValue)
        obj.__type = parent.productType
        if(attr.multivaluated){
            const values = attrValue.values.filter(attrVal => attr.value.includes(attrVal.urn));
            obj[attrValue.fieldName] = values.map(val => ({
                urn: val.urn,
                label: val.label,
                value: val.value
            }));
        }else{
            const value = attrValue.values.find(attrVal => attrVal.urn === attr.value);
        
            obj[attrValue.fieldName] = {
                urn: value.urn,
                label: value.label,
                value: value.value
            };
        }
        

        
    })
    return obj;
};

module.exports.productPlainAttributesResolver = (parent,args,context,info ) => {
    const obj = {};
   
    parent.attrs.map(attr => {
        const attrValue = attributeValues.find(attrVal => attrVal.urn === attr.attributeValue)
        obj.__type = parent.productType
        if(attr.multivaluated){
            const values = attrValue.values.filter(attrVal => attr.value.includes(attrVal.urn));
            obj[attrValue.fieldName] = values.map(val => ({
                urn: val.urn,
                label: val.label,
                value: val.value
            }));
        }else{
            const value = attrValue.values.find(attrVal => attrVal.urn === attr.value);
        
            obj[attrValue.fieldName] = {
                urn: value.urn,
                label: value.label,
                value: value.value
            };
        }
        

        
    })
    return obj;
};


module.exports.productVariantsResolver = (parent,args,context,info ) => {
    return parent.variants.map(variant => {
        const obj = {}
        obj.urn = variant.urn;
        obj.type = variant.type;
        obj.supplier = variant.supplier
        obj.salesPeriod = variant.salesPeriod;
        obj.sku = variant.sku;
        variant.variantValues.forEach(val => {
            const attrValue = attributeValues.find(attrVal => attrVal.urn === val.attributeValue)
            obj.__type = parent.productType;
            if (val.multivaluated) {
                const values = attrValue.values.filter(attrVal => val.value.includes(attrVal.urn));
                obj[attrValue.fieldName] = values.map(val => ({
                    urn: val.urn,
                    label: val.label,
                    value: val.value
                }))
            } else { 
               
                const value = attrValue.values.find(attrVal => attrVal.urn === val.value);
               
                obj[attrValue.fieldName] = {
                    urn: value.urn,
                    label: value.label,
                    value: value.value
                }
            }
            
        })
       
        return obj;
    })
};

module.exports.productPlainVariantsResolver = (_, args) => {
    return products.filter(p => p.urn === args.urn)
    .flatMap(p => { 
        
        return p.variants.map(variant => { 
            return {
                __type: p.productType,
                urn: variant.urn,
                salesPeriod: variant.salesPeriod,
                supplier: variant.supplier,
                attrs: [
                    ...variant.variantValues,
                    ...p.attrs
                ]
                
            }
        })

    })
} 




