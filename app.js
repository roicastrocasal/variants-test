const express = require('express');
const { ApolloServer, gql } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const products = require('./data/product.json')
const {
    productAttributesResolver,
    productMetainfoResolver,
    productVariantsResolver
} = require('./resolvers/ProductResolvers')
const {
    productSchemaResolver,
    productSchemaAttributesResolver,
    productSchemaVariants,
    productSchemaVariantsAttributes,
    productSchemaMetainfo,
    schemaMetainfoDatatypesResolver
} = require('./resolvers/ValidationSchemaResolver')

 const genericTypeDefs = require('./typedefs/baseTypeDefs')
 const clothesTypeDefs = require('./typedefs/clothesTypeDefs')
 const validationSchemaDefs = require('./typedefs/validationSchemaDefs')
// Construct a schema, using GraphQL schema language
const typeDefs = [genericTypeDefs,clothesTypeDefs,validationSchemaDefs];



// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        product: (_, args) => products.find(p => p.urn === args.id)
    },
    Product : {
        attributes : productAttributesResolver,
        metainfo: productMetainfoResolver,
        variants: productVariantsResolver,
        schema: productSchemaResolver
    },
    ProductAttribute: {
        __resolveType: (parent) => { 
            switch (parent.__type) { 
                case "urn:zara:clothes":
                    return 'ClothesAttribute'
                default:
                    return 'CarsAttribute'
            }
        }
    },
    ProductVariant: {
       __resolveType: (parent) => { 
            switch (parent.__type) { 
                case "urn:zara:clothes":
                    return 'ClothesVariant'
                default:
                    return 'CarsVariant'
            }
        }
    },
    ProductMetainfo: {
       __resolveType: (parent) => { 
            switch (parent.__type) { 
                case "urn:zara:clothes":
                    return 'ClothesMetainfo'
                case "urn:zara:cars":
                    return 'CarsMetainfo'
               
            }
        }
    },
    Schema : {
        attributes: productSchemaAttributesResolver,
        variants: productSchemaVariants,
        metainfo : productSchemaMetainfo
    },
    SchemaVariant: {
        attributes : productSchemaVariantsAttributes
    },
    SchemaMetainfo: {
        dataTypes: schemaMetainfoDatatypesResolver
    }
};

module.exports.start = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
      });
    const startInstance = await startStandaloneServer(server, {
        listen: { port: 4000 },
      });
    console.log("start server");
    return startInstance;
};