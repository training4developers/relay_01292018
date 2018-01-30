import { GraphQLObjectType } from 'graphql';

import { insertWidgetMutationType as insertWidget } from '../mutations/insert-widget-mutation-type';

export const mutation = new GraphQLObjectType({

  name: 'Mutation',

  fields: () => ({
    insertWidget
  }),

});