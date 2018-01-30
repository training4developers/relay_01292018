import { GraphQLString } from 'graphql'; 
import { mutationWithClientMutationId, offsetToCursor } from 'graphql-relay';

import { insertWidgetType } from '../types/widget-input-types';
import { viewerType } from '../types/viewer-type';
import { widgetEdgeType} from '../connections/widgets';
import { WidgetData } from '../models/widget-data';
import { Widget, Viewer } from '../models/graphql-models';

export const insertWidgetMutationType = mutationWithClientMutationId({

  name: 'InsertWidget',

  inputFields: {
    widget: { type: insertWidgetType },
    clientMutationId: { type: GraphQLString },
  },

  mutateAndGetPayload: ({ widget }, { baseUrl }) => {
    const widgetData = new WidgetData(baseUrl);
    return widgetData.insert(widget).then(widget => Object.assign(new Widget(), widget));
  },

  outputFields: {
    viewer: {
      type: viewerType,
      resolve: () => Object.assign(new Viewer(), { id: 1 }),
    },
    widgetEdge: {
      type: widgetEdgeType,
      resolve: (widgetModel, _, { baseUrl }) => {

        const widgetData = new WidgetData(baseUrl);
        return widgetData.all().then(widgets => {

          const widgetIndex = widgets.findIndex(w => w.id === widgetModel.id);

          return {
            cursor: offsetToCursor(widgetIndex),
            node: widgetModel
          };
            
        });

      },
    },
  },

});

