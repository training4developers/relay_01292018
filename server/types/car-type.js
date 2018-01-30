import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { nodeInterface } from '../utils/node-definitions';
import { registerType } from '../utils/resolve-type';

import { Car } from '../models/graphql-models';
import { CarData } from '../models/car-data';

export const carType = new GraphQLObjectType({

  name: 'Car',

  fields: () => ({
    id: globalIdField('Car'),
    make: { type: GraphQLString },
    model: { type: GraphQLString },
    year: { type: GraphQLInt },
    color: { type: GraphQLString },
    price: { type: GraphQLFloat },
  }),

  interfaces: () => ([ nodeInterface ]),

});

const carData = new CarData('http://localhost:3010');
registerType(Car, carType, id =>
  carData.one(id).then(w => Object.assign(new Car(), w)));