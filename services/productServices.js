module.exports.plainByVariantType = (products, productId, withMetainfo) => {


    const p = products.filter(p => p.uuid === productId)[0];

    const pPlain = {
        uuid: p.uuid,
        name: p.name
    }

    p.attrs.forEach(attr => {
        pPlain[attr.attributeValueName.toLowerCase()] = attr.value.label
    })

    

    return p.variants.map(variant => {
        
        const pVariantPlain = {product: p.urn, ...pPlain, uuid: variant.uuid,  }

        if(withMetainfo){

            if(variant.metainfo){
                const typesVariant = variant.metainfo.data.map(d => d.type);
                const dataTypesProduct = p.metainfo.data.filter(d  => -!typesVariant.includes(d.type));
                pVariantPlain.metainfo = variant.metainfo;
                variant.metainfo.data = [...variant.metainfo.data, ...dataTypesProduct];
                
            }else{
                pVariantPlain.metainfo = p.metainfo;
            }

           
        }

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
        const prevData = variant.data ? variant.data.filter(d => d.type === data.type)[0] : [];
        if(prevData){
            prevData.params = data.params
        }else{
            variant.data.push(data);
        }
    }

    return product

}


module.exports.filterByCategories = (category,values) => {

   
        return category ? values.filter(attr => {
            return attr.categories.includes(category);
        }) : values;
   
    


}
