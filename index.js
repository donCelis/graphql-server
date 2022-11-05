import { ApolloServer, gql } from 'apollo-server'

export const persons = [
  {
    id: 1,
    firstName: 'Terry',
    lastName: 'Medhurst',
    phone: '+63 791 675 8914',
    email: 'atuny0@sohu.com'
  },
  {
    id: 2,
    firstName: 'Sheldon',
    lastName: 'Quigley',
    phone: '+7 813 117 7139',
    email: 'hbingley1@plala.or.jp'
  },
  {
    id: 3,
    firstName: 'Terrill',
    lastName: 'Hills',
    phone: '+63 739 292 7942',
    email: 'rshawe2@51.la'
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
    email: 'kmeus4@upenn.edu'
  }
]

/* Definición de los datos */
const typeDefs = gql`
type Person {
  id: ID!
  firstName: String!
  lastName: String!
  phone: String
  email: String!
}

type Query {
  personCount: Int!
  allPersons: [Person]!
}
`

/* Resolvers */
/* Como sacamos estos datos */
const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: () => persons
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log('Server', url)
})
