var express         = require('express')
var graphqlHTTP     = require('express-graphql')
var { buildSchema } = require('graphql')

var schema = buildSchema(`
type Query {
quoteOfTheDay: String
random: Float!
rollDice(numDice: Int!, numSides: Int): [Int]
}
`);


// Root = resolver for the API
var root = {
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
  },
  random: () => {
    return Math.random();
  },
  rollDice: function({numDice, numSides}){
    var output = [];
    for (var i = 0; i < numDice; i++){
      output.push(1 + Math.floor(Math.random() * (numSides || 6)))
    }
    return output;
  },
};

// API
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));
app.listen(4000)
console.log('Running a GraphiQL API server at localhost:4000/graphql')
