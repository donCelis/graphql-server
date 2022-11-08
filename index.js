import { ApolloServer, UserInputError, gql } from 'apollo-server'

import { v4 as uuid } from 'uuid'

import axios from 'axios'

const getData = async () => {
  // const { data } = await axios.get('http://localhost:3000/persons')
  const { data: { users } } = await axios.get('https://dummyjson.com/users?limit=20')
  return users
}

const persons = await getData()

/* Definición de los datos */
const typeDefs = gql`
  enum YesNo {
    YES
    NO
  }

  type Bank {
    cardExpire: String!
    cardNumber: String!
    cardType: String!
    currency: String!
    iban: String!
  }

  type FullNameObj {
    first: String!
    last: String!
  }

  type Person {
    id: ID!
    firstName: String!
    lastName: String!
    phone: String
    email: String!
    bank: Bank
    fullName: FullNameObj!
    enterName: String
  }

  type Query {
    personCount: Int!
    allPersons (phone: YesNo, limit: Int): [Person]!
    findPerson (name: String!): Person
  }

  type Mutation {
    addPerson (
      firstName: String!
      lastName: String!
      phone: String
      email: String!
    ) : Person
    editNumber (
      firstName: String!
      phone: String!
    ) : Person
  }
`

/* Resolvers */
/* Como sacamos estos datos */
const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: (root, args) => {
      /* if (!args.phone) return persons */
      /* const byPhone = (person) =>
      args.phone === 'YES' ? person.phone : !person.phone */

      /* return persons.filter(byPhone) */
      if (!args.limit) return persons
      return persons.slice(0, args.limit)
    },
    findPerson: (root, args) => {
      const { name } = args
      return persons.find((person) => person.firstName === name)
    }
  },
  Mutation: {
    addPerson: (root, args) => {
      if (persons.find((p) => p.firstName === args.firstName)) {
        throw new UserInputError('Name must be unique', {
          invalidArgs: args.firstName
        })
      }
      const person = { ...args, id: uuid() }
      persons.push(person)
      return person
    },
    editNumber: (root, args) => {
      const personIndex = persons.findIndex(p => p.firstName === args.firstName)
      if (personIndex === -1) return null

      const person = persons[personIndex]

      const updatePerson = { ...person, phone: args.phone }
      persons[personIndex] = updatePerson
      return updatePerson
    }
  },
  Person: {
    enterName: (root) => `${root.firstName} ${root.lastName}`,
    fullName: (root) => ({ first: root.firstName, last: root.lastName })
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log('Server', url)
})
