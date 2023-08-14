const express = require('express');
const { ApolloServer, gql } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const products = require('./data/product.json')
const {productAttributesResolver,productMetainfoResolver,productVariantsResolver} = require('./resolvers/ProductResolvers')
 const genericTypeDefs = require('./typedefs/baseTypeDefs')
 const clothesTypeDefs = require('./typedefs/clothesTypeDefs')
// Construct a schema, using GraphQL schema language
const typeDefs = [genericTypeDefs,clothesTypeDefs];

// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        product: (_, args) => products.find(p => p.urn === args.id)
    },
    ClothesProduct : {
        attributes : productAttributesResolver,
        metainfo: productMetainfoResolver,
        variants: productVariantsResolver,
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