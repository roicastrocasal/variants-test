const express = require('express');
const { loadFiles } = require('@graphql-tools/load-files')
const { ApolloServer, gql } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const products = require('./data/product.json')
const configModelTypes = require('./config/modelTypes.json')
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
            return configModelTypes
                .find(config => config.type === parent.__type).attribute
        }
    },
    ProductVariant: {
       __resolveType: (parent) => { 
            return configModelTypes
                .find(config => config.type === parent.__type).variant
        }
    },
    ProductMetainfo: {
       __resolveType: (parent) => { 
            return configModelTypes
                .find(config => config.type === parent.__type).metainfo
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
    const typeDefs= await loadFiles('./schemas/*.graphql');
    const server = new ApolloServer({
        typeDefs,
        resolvers
      });
    const startInstance = await startStandaloneServer(server, {
        listen: { port: 4000 },
      });
    console.log("start server");
    return startInstance;
};