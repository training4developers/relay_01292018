import * as React from 'react';
import * as PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';

import { WidgetViewRowContainer } from './widget-view-row';

export class WidgetTable extends React.Component {

  static propTypes = {
    relay: PropTypes.object.isRequired,
    viewer: PropTypes.object.isRequired,
    onDeleteWidget: PropTypes.func.isRequired,
  };

  render() {

    return <table className="table table-striped">
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
          <WidgetViewRowContainer key={widget.id} widget={widget} onDeleteWidget={this.props.onDeleteWidget} />)}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="5">
            Count: {this.props.viewer.widgets.totalCount}
          </td>
        </tr>
      </tfoot>
    </table>;

  }

}

export const WidgetTableContainer = createFragmentContainer(
  WidgetTable,
  graphql`
    fragment widgetTable_viewer on Viewer {
      widgets(first: 100) @connection(key: "WidgetTable_widgets") {
        edges {
          node {
            id
            ...widgetViewRow_widget
          }
        }
        totalCount
      }
    }
  `
);