import { GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { Viewer } from '../models/graphql-models';
import { nodeInterface } from '../utils/node-definitions';
import { registerType } from '../utils/resolve-type';

export const viewerType = new GraphQLObjectType({

  name: 'Viewer',
  description: 'User of the application',
  fields: () => ({
    id: globalIdField('Viewer'),
    message: {
      type: GraphQLString,
      resolve: () => 'Hello World!',
    },
  }),

  interfaces: () => [ nodeInterface ],
});

registerType(Viewer, viewerType, id => {
  return Object.assign(new Viewer(), { id });
});