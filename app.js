const express = require('express');
const { loadFiles } = require('@graphql-tools/load-files')
const { ApolloServer, gql } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const products = require('./data/product.json')
const models = require('./data/models.json')
const configModelTypes = require('./config/modelTypes-generated.json')
const {
    productAttributesResolver,
    productVariantsResolver,
    productPlainVariantsResolver
} = require('./resolvers/ProductResolvers')
const {
    productSchemaResolver,
    productSchemaAttributesResolver,
    productSchemaVariants,
    productSchemaVariantsAttributes
} = require('./resolvers/ValidationSchemaResolver')
const generateModel = require('./schemas/templates/generateModel')



// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        product: (_, args) => products.find(p => p.urn === args.id),
        schema: (_, args) => models.find(m => m.urn === args.urn),
        plainProduct: productPlainVariantsResolver
    },
    Product : {
        attributes : productAttributesResolver,
        variants: productVariantsResolver
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
    ProductPlainVariant: {
       __resolveType: (parent) => { 
            return configModelTypes
                .find(config => config.type === parent.__type).plainVariant
        }
       
    },
    ClothesPlainVariant: {
        attrs: productAttributesResolver
    },
    Schema : {
        attributes: productSchemaAttributesResolver,
        variants: productSchemaVariants
    },
    SchemaVariant: {
        attributeTypes : productSchemaVariantsAttributes
    }
};

module.exports.start = async () => {
    //generateModel();
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