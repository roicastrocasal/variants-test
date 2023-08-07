module.exports.plainByVariantType = (products, productId, variantTypeId) => {


    const p = products.filter(p => p.uuid === productId)[0];

    const pPlain = {
        uuid: p.uuid,
        name: p.name
    }

    p.attrs.forEach(attr => {
        pPlain[attr.attributeValueName.toLowerCase()] = attr.value.label
    })

    const variantsByType = p.variants.filter(v => v.variantTypeId === variantTypeId);

    return variantsByType.map(variant => {
        
        const pVariantPlain = {...pPlain}

        variant.variantValues.forEach(variantValue =>{
            pVariantPlain[variantValue.attributeValueName.toLowerCase()] = variantValue.value.label;
        })

        return pVariantPlain
        

    })




}

module.exports.findProduct = (productId, products) => products.filter(p => p.uuid === productId)[0]

module.exports.addDataToVariant = (product, variantId,data) => {

    const variant = product.variants.filter(variant => variant.uuid === variantId)[0];

    if(variant.data == null){
        variant.data = []
    }

    if(variant){
        const prevData = variant.data?.filter(d => d.type === data.type)[0];
        if(prevData){
            prevData.params = data.params
        }else{
            variant.data.push(data);
        }
    }

    return product

}
