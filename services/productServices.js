module.exports.plainByVariantType = (products, productId, variantTypeId) => {


    const p = products.filter(p => p.uuid === productId)[0];

    const variantsByType = p.variants.filter(v => v.variantTypeId === variantTypeId);

    return variantsByType.flatMap(variant => {
        
        const variantValues = variant.variantValues;
        const firstVariatValue = variantValues[0];
        let objs = firstVariatValue.values.map(vv => {
            const pVariant = {uuid : p.uuid , name: p.name}
            pVariant[firstVariatValue.variantValueName.toLowerCase()] = vv.label
            return pVariant
        });
        if(variantValues.length>1){
            for(var i = 1; i< variantValues.length; i++){
                const variantValue = variantValues[i];
                objs = objs.flatMap(obj => {
                    return variantValue.values.map(vv => {
                        const objTemp =  {
                            ...obj,

                        };
                        objTemp[variantValue.variantValueName.toLowerCase()] = vv.label;
                        return objTemp;
                    })
                })


            }
        }
        return objs
        

    })



}

module.exports.addVariantValue = ({products,variantValues,productId,variantId,variantValuesId, newValue}) => {

    const product = products.filter(p => p.uuid === productId)[0];

    product.variants.filter(v => v.uuid === variantId).forEach(variant => {

        const variantValue = variant.variantValues.filter(vv => vv.variantValueId === variantValuesId)[0];
        const values = variantValue.values.filter(v => v.valueId === newValue.valueId)
        if(values.length > 0){
           const value = values[0];
           value.data = newValue.data;
        }else{
            const value = variantValues
            .filter(vv => vv.uuid === variantValuesId )
            .flatMap(vv => vv.values)
            .filter(v => v.uuid === newValue.valueId)[0];

            variantValue.values.push({valueId : value.uuid, label:value.label, data: newValue.data})
        }
        
    });

    return product;

}