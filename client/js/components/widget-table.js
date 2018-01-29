import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

export class WidgetTable extends React.Component {

  render() {

    return <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Color</th>
          <th>Size</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {this.props.viewer.widgets.edges.map( ({ node: widget }) =>
          <tr key={widget.id}>
            <td>{widget.name}</td>
            <td>{widget.description}</td>
            <td>{widget.color}</td>
            <td>{widget.size}</td>
            <td>{widget.quantity}</td>
          </tr>
        )}
      </tbody>
    </table>;

  }

}

export const WidgetTableContainer = createFragmentContainer(
  WidgetTable,
  graphql`
    fragment widgetTable_viewer on Viewer {
      widgets {
        edges {
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
  `
);