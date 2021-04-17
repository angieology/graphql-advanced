const {ApolloServer} = require('apollo-server');
// create a schema based off of type defs and resolvers
const gql = require('graphql-tag')
// compile them to ast which server can understand

const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        createdAt: Int!
    }

    type Settings {
        user: User!
        theme: String!
    }

    input NewSettingsInput {
        user: ID!
        theme: String!
    }

    type Query {
        me: User!
        settings(user: ID!): Settings!
    }

    type Mutation {
        settings(input: NewSettingsInput!): Settings!
    }
`;

// resolvers map one to one with fields we have in type defs
// normally start on query, mutations, then fiel dle vels, then special things 
// ie. converting/transforming value, something that doesn't exist in DB etc.

// make a seperate resolver for settings, to be able to define what its
// User field returns
const resolvers = {
    Query: {
        me() {
            return {
                id: 1,
                username: 'coder12',
                createdAt: 123123123123
            }
        },
        settings(_, {user}){
            return {
                user,
                theme: 'light theme'
            }
        }
    },
    Mutation: {
        settings(_, {input}){
            return input
        }
    },

    Settings: {
        user(settings){
            return {
                id: 1,
                username: 'coder12',
                createdAt: 123123123123
            }
        }
    }
}

// initialize server
const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({url})  => console.log(`server at ${url}`));