module.exports = `
    

   
    type ClothesAttribute {
        model : String
        quality: String
    }

    type CarsAttribute {
        carType: String
        group: String
    }

    union ProductAttribute = ClothesAttribute | CarsAttribute



    type ClothesVariant implements Variant {
        urn : String
        type: String
        sku: String
        color: String
        size: String
        stamp: String
        vMetainfo: ClothesMetainfo
    }

    type CarsVariant implements Variant {
        urn : String
        type: String
        sku: String
        color: String
    
    }

    union ProductVariant = ClothesVariant | CarsVariant

    type ClothesMetainfo {
        image : Url,
        design: Design
    }

    type CarsMetainfo {
        design3d: Design3d
    }

    union ProductMetainfo = ClothesMetainfo | CarsMetainfo

    type Query {  
        product(id: ID!): Product
    }

`