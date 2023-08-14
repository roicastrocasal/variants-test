module.exports = `
    type ClothesProduct implements Product{
        urn :  ID!
        uuid : String
        name : String
        productType : String
        categories : [String]
        schema :  Schema
        attributes: ClothesAttribute
        metainfo: ClothesMetainfo
        variants: [ClothesVariant]
    }

    type ClothesAttribute {
        model : String
        quality: String
    }

    type ClothesVariant implements Variant {
        urn : String
        type: String
        sku: String
        color: String
        size: String
        stamp: String
        vMetainfo: ClothesMetainfo
    }

    type ClothesMetainfo {
        image : Url,
        design: Design
    }

    type Query {  
        product(id: ID!): ClothesProduct
    }

`