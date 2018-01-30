import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

import { WidgetViewRowContainer } from './widget-view-row';

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
        {this.props.viewer.widgets.edges.map(({ node: widget }) =>
          <WidgetViewRowContainer key={widget.id} widget={widget} />)}
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
            ...widgetViewRow_widget
          }
        }
      }
    }
  `
);