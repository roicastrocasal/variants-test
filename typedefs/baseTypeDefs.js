module.exports = `
    interface Product {
        urn :  ID!
        uuid : String
        name : String
        productType : String
        categories : [String]
        schema :  String
        
    }

    interface Variant {
        urn : String
        type: String
    }

    type Url {
        url: String
    }

    type Design {
        pattern: String,
        sketch: String
    }


   
`