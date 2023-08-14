module.exports = `
    interface Product {
        urn :  ID!
        uuid : String
        name : String
        productType : String
        categories : [String]
        schema :  Schema
        
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

   


   
`