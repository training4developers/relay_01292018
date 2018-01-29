import { GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField, connectionArgs, connectionFromArray } from 'graphql-relay';

import { Viewer } from '../models/graphql-models';
import { nodeInterface } from '../utils/node-definitions';
import { registerType } from '../utils/resolve-type';

import { widgetConnectionType } from '../connections/widgets';

import { WidgetData } from '../models/widget-data';
import { Widget } from '../models/graphql-models';

export const viewerType = new GraphQLObjectType({

  name: 'Viewer',
  description: 'User of the application',
  fields: () => ({
    id: globalIdField('Viewer'),
    message: {
      type: GraphQLString,
      resolve: () => 'Welcome to Relay!',
    },
    widgets: {
      type: widgetConnectionType,
      args: connectionArgs,
      resolve: (_, args, { baseUrl }) => {
        const widgetData = new WidgetData(baseUrl);
        return widgetData.all().then(widgets => {
          const widgetModels = widgets.map(w => Object.assign(new Widget(), w));
          return connectionFromArray(widgetModels, args);
        });

      },
    }
  }),

  interfaces: () => [ nodeInterface ],
});

registerType(Viewer, viewerType, id => {
  return Object.assign(new Viewer(), { id });
});