var express         = require('express');
var graphqlHTTP     = require('express-graphql');
var { buildSchema } = require('graphql');


// Schema
var schema = buildSchema(`
type RandomDie {
numSides: Int!
rollOnce: Int!
roll(numRolls: Int!): [Int]
}

type Query {
getDie(numSides: Int): RandomDie
}
`)

// Random Die
class RandomDie {

  // Class constructor
  constructor (numSides) {
    this.numSides = numSides;
  }

  // Roll dice once
  rollOnce(){
    return 1 + Math.floor(Math.random() * this.numSides);
  }

  // Roll dice multiple times
  roll({numRolls}){
    var output = [];
    for(var i = 0; i < numRolls; i ++){
      output.push(this.rollOnce());
    }
    return output;
  }
};


// Root
var root = {
  getDie: function({numSides}){
    return new RandomDie(numSides || 6);
  }
};

// Server
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
