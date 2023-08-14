const products = require('../data/product.json')
const attributeValues = require('../data/attributeValues.json')
const dataTypes = require('../data/dataTypes.json')
const schemas = require('../data/models.json')
const variantTypes = require('../data/variantTypes.json')


module.exports.productAttributesResolver = (parent,args,context,info ) => {
    const obj = {};
    parent.attrs.forEach(attr => {
        const attrValue = attributeValues.find(attrVal => attrVal.urn === attr.attributeValue)
        const value = attrValue.values.find(attrVal => attrVal.urn === attr.value);
        obj.__type = parent.productType
        obj[attrValue.fieldName] = value.label;

        
    })
    return obj;
};

const metaInfoResolver = (parent,args,context,info ) => {
    const mInfoObj = {};
    mInfoObj.__type = parent.productType
    if(parent.metainfo && parent.metainfo.data){
        parent.metainfo.data.forEach(d => {
            const dataType = dataTypes.find(dt => dt.urn === d.type);
            if(dataType){
                mInfoObj[dataType.fieldName] = {};
                d.params.forEach(param => {
                    const dataTypeParam = dataType.params.find(dtParam => dtParam.urn === param.type)
                    if(dataTypeParam && dataTypeParam.fieldName){
                        mInfoObj[dataType.fieldName][dataTypeParam.fieldName] = param.value
                    }
                  
    
    
                })
            }
            
        })
    }
    
    return mInfoObj;
}

module.exports.productVariantsResolver = (parent,args,context,info ) => {
    return parent.variants.map(variant => {
        const obj = {}
        obj.urn = variant.urn;
        obj.type = variant.type;
        obj.sku = variant.sku;
        variant.variantValues.forEach(val => {
            const attrValue = attributeValues.find(attrVal => attrVal.urn === val.attributeValue)
            const value = attrValue.values.find(attrVal => attrVal.urn === val.value);
            obj.__type = parent.productType;
            obj[attrValue.fieldName] = value.label
        })
       
        obj.vMetainfo = metaInfoResolver(variant)
        return obj;
    })
};

module.exports.productMetainfoResolver =  metaInfoResolver;


