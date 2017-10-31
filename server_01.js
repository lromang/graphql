var express         = require('express')
var graphqlHTTP     = require('express-graphql')
var { buildSchema } = require('graphql')

// Construct schema
var schema = buildSchema(`
      type Query {
      hello: String
      }
`)

// Resolver
var root = {
  hello: () => {
    return 'Hello World!';
  },
};

// App
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}))

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql')
