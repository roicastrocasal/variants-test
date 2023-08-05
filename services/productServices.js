module.exports.plainByVariantType = (products, productId, valueClusterId) => {


    const p = products.filter(p => p.uuid === productId)[0];

    const variantsByType = p.variants.filter(v => v.valueClusterId === valueClusterId);

    return variantsByType.flatMap(variant => {
        
        const valueTypes = variant.valueTypes;
        const firstVariatValue = valueTypes[0];
        let objs = firstVariatValue.values.map(vv => {
            const pVariant = {uuid : p.uuid , name: p.name}
            pVariant[firstVariatValue.valueTypeName.toLowerCase()] = vv.label
            return pVariant
        });
        if(valueTypes.length>1){
            for(var i = 1; i< valueTypes.length; i++){
                const valueType = valueTypes[i];
                objs = objs.flatMap(obj => {
                    return valueType.values.map(vv => {
                        const objTemp =  {
                            ...obj,

                        };
                        objTemp[valueType.valueTypeName.toLowerCase()] = vv.label;
                        return objTemp;
                    })
                })


            }
        }
        return objs
        

    })



}

module.exports.addVariantValue = ({products,valueTypes,productId,variantId,valueTypeId, newValue}) => {

    const product = products.filter(p => p.uuid === productId)[0];

    product.variants.filter(v => v.uuid === variantId).forEach(variant => {

        const valueType = variant.valueTypes.filter(vv => vv.valueTypeId === valueTypeId)[0];
        const values = valueType.values.filter(v => v.valueId === newValue.valueId)
        if(values.length > 0){
           const value = values[0];
           value.data = newValue.data;
        }else{
            const value = valueTypes
            .filter(vv => vv.uuid === valueTypeId )
            .flatMap(vv => vv.values)
            .filter(v => v.uuid === newValue.valueId)[0];

            valueType.values.push({valueId : value.uuid, label:value.label, data: newValue.data})
        }
        
    });

    return product;

}