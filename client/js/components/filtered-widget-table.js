import * as React from 'react';
import * as PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';

import { WidgetViewRowContainer } from './widget-view-row';

export class FilteredWidgetTable extends React.Component {

  static propTypes = {
    relay: PropTypes.object.isRequired,
    viewer: PropTypes.object.isRequired,
    onDeleteWidget: PropTypes.func.isRequired,
  };

  render() {

    console.log(this.props.relay);

    return <table className="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Color</th>
          <th>Size</th>
          <th>Quantity</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {this.props.viewer.widgets.edges.map(({ node: widget }) =>
          <WidgetViewRowContainer key={widget.id} widget={widget} onDeleteWidget={this.props.onDeleteWidget} />)}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="6">
            Count: {this.props.viewer.widgets.totalCount}
          </td>
        </tr>
      </tfoot>
    </table>;

  }

}

export const FilteredWidgetTableContainer = createFragmentContainer(
  FilteredWidgetTable,
  graphql`
    fragment filteredWidgetTable_viewer on Viewer @argumentDefinitions(
        first: { type: "Int", defaultValue: 1 }
      ) {
      widgets(first: $first) @connection(key: "WidgetTable_widgets") {
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