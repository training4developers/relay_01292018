import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { nodeInterface } from '../utils/node-definitions';
import { registerType } from '../utils/resolve-type';

import { Widget } from '../models/graphql-models';
import { WidgetData } from '../models/widget-data';

export const widgetType = new GraphQLObjectType({

  name: 'Widget',

  fields: () => ({
    id: globalIdField('Widget'),
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    color: { type: GraphQLString },
    size: { type: GraphQLString },
    quantity: { type: GraphQLInt },
  }),

  interfaces: () => ([ nodeInterface ]),

});

const widgetData = new WidgetData('http://localhost:3010');
registerType(Widget, widgetType, id =>
  widgetData.one(id).then(w => Object.assign(new Widget(), w)));