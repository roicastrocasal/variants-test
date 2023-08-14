module.exports = `
    type Schema {
        urn : String
        name: String
        productType : String
        variants: [SchemaVariant]
        attributes : [SchemaAttribute]
        metainfo : SchemaMetainfo
    }

    type SchemaVariant {
        urn: String
        name : String
        attributes: [SchemaAttribute]

    }

    type SchemaAttribute {
        urn: String
        fieldName: String
    }

    type SchemaMetainfo {
        urn : String
        name: String
        dataTypes: [SchemaMetainfoDataType]
    }

    type SchemaMetainfoDataType {
        urn: String
        fieldName : String
        params: [SchemaMetainfoDataTypeParams]
    }
    type SchemaMetainfoDataTypeParams {
        urn: String
        fieldName : String
        type: String
    }


` 