const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Note = require("./resolvers/Note");

const resolvers = {
  Query,
  Mutation,
  Note,
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: (request) => {
    return { ...request, prisma };
  },
});

server.start(() => console.log("listening on http://localhost:4000"));
