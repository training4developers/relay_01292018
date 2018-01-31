import { graphql, commitMutation } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';

const mutation = graphql`
mutation insertWidgetMutation($input: InsertWidgetInput!) {
  insertWidget(input: $input) {
    viewer {
      id
      widgets {
        totalCount
      }
    }
    widgetEdge {
      cursor
      node {
        id
        name
        description
        color
        size
        quantity
      }
    }
  }
}
`;

let clientMutationId = 0;

const sharedUpdater = (source, viewerId, widgetEdge, totalCount) => {

  const viewerProxy = source.get(viewerId);
  const conn = ConnectionHandler.getConnection(viewerProxy, 'WidgetTable_widgets');
  
  if (!totalCount) {
    totalCount = Number(conn.getValue('totalCount')) + 1;
  }
  
  conn.setValue(totalCount, 'totalCount');

  ConnectionHandler.insertEdgeAfter(conn, widgetEdge);

};

export const insertWidget = (environment, viewerId, widget) => {

  return new Promise((resolve, reject) => {

    commitMutation(environment, {
      mutation,
      variables: {
        input: {
          widget,
          clientMutationId: String(clientMutationId++),
        },
      },
      updater: source => {

        const payload = source.getRootField('insertWidget');
        if (!payload) {
          return;
        }

        const widgetEdge = payload.getLinkedRecord('widgetEdge');
        const totalCount = payload
          .getLinkedRecord('viewer')
          .getLinkedRecord('widgets')
          .getValue('totalCount');

        sharedUpdater(source, viewerId, widgetEdge, totalCount);
      },
      optimisticUpdater: source => {

        const nodeId = 'client:newWidget:' + String(clientMutationId++);

        const node = source.create(nodeId, 'node');
        node.setValue(nodeId, 'id');
        node.setValue(widget.name, 'name');
        node.setValue(widget.description, 'description');
        node.setValue(widget.color, 'color');
        node.setValue(widget.size, 'size');
        node.setValue(widget.quantity, 'quantity');

        const edgeId = 'client:newWidgetEdge:' + String(clientMutationId++);

        const widgetEdge = source.create(edgeId, 'widgetEdge');
        widgetEdge.setLinkedRecord(node, 'node');

        sharedUpdater(source, viewerId, widgetEdge);
      },
      onCompleted: (results, errors) => {

        if (errors) {
          reject(errors);
          return;
        }

        resolve(results);

      },
      onError: errors => reject(errors),
    });

  });

};