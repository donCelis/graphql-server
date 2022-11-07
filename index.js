import { ApolloServer, gql } from 'apollo-server'

import { v4 as uuid } from 'uuid'

export const persons = [
  {
    id: 1,
    firstName: 'Terry',
    lastName: 'Medhurst',
    phone: '+63 791 675 8914',
    email: 'atuny0@sohu.com',
    bank: {
      cardExpire: '06/22',
      cardNumber: '50380955204220685',
      cardType: 'maestro',
      currency: 'Peso',
      iban: 'NO17 0695 2754 967'
    }
  },
  {
    id: 2,
    firstName: 'Sheldon',
    lastName: 'Quigley',
    phone: '+7 813 117 7139',
    email: 'hbingley1@plala.or.jp',
    bank: {
      cardExpire: '10/23',
      cardNumber: '5355920631952404',
      cardType: 'mastercard',
      currency: 'Ruble',
      iban: 'MD63 L6YC 8YH4 QVQB XHIK MTML'
    }
  },
  {
    id: 3,
    firstName: 'Terrill',
    lastName: 'Hills',
    phone: '+63 739 292 7942',
    email: 'rshawe2@51.la',
    bank: {
      cardExpire: '10/23',
      cardNumber: '3586082982526703',
      cardType: 'jcb',
      currency: 'Peso',
      iban: 'AT24 1095 9625 1434 9703'
    }
  },
  {
    id: 4,
    firstName: 'Miles',
    lastName: 'Cummerata',
    phone: '+86 461 145 4186',
    email: 'yraigatt3@nature.com',
    bank: {
      cardExpire: '07/24',
      cardNumber: '3580047879369323',
      cardType: 'jcb',
      currency: 'Yuan Renminbi',
      iban: 'KZ43 658B M6VS TZOU OXSO'
    }
  },
  {
    id: 5,
    firstName: 'Mavis',
    lastName: 'Schultz',
    phone: '+372 285 771 1911',
    email: 'kmeus4@upenn.edu',
    bank: {
      cardExpire: '01/24',
      cardNumber: '4917245076693618',
      cardType: 'visa-electron',
      currency: 'Euro',
      iban: 'IT41 T114 5127 716J RGYB ZRUX DSJ'
    }
  }
]

/* Definición de los datos */
const typeDefs = gql`
  type Bank {
    cardExpire: String!
    cardNumber: String!
    cardType: String!
    currency: String!
    iban: String!
  }

  type FullNameObj {
    name: String!
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
    allPersons: [Person]!
    findPerson(name: String!): Person
  }

  type Mutation {
    addPerson (
      firstName: String!
      lastName: String!
      phone: String
      email: String!
    ) : Person
  }
`

/* Resolvers */
/* Como sacamos estos datos */
const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: () => persons,
    findPerson: (root, args) => {
      const { name } = args
      return persons.find((person) => person.firstName === name)
    }
  },
  Mutation: {
    addPerson: (root, args) => {
      const person = { ...args, id: uuid() }
      persons.push(person)
      return person
    }
  },
  Person: {
    enterName: (root) => `${root.firstName} ${root.lastName}`,
    fullName: (root) => ({ name: root.firstName, last: root.lastName })
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log('Server', url)
})
