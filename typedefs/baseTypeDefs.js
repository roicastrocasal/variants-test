module.exports = `
    type Product{
        urn :  ID!
        uuid : String
        name : String
        productType : String
        categories : [String]
        schema :  Schema
        attributes: ProductAttribute
        metainfo: ProductMetainfo
        variants: [ProductVariant]
    }

    interface Variant {
        urn : String
        type: String
        sku: String
    }

    type Url {
        url: String
    }

    type Design {
        pattern: String,
        sketch: String
    }

    type Design3d {
        file3d: String,
        render3d: String
    }

   


   
`