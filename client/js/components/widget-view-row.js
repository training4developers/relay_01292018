import * as React from 'react';
import * as PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';

export class WidgetViewRow extends React.Component {

  static propTypes = {
    widget: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      color: PropTypes.string,
      size: PropTypes.string,
      quantity: PropTypes.number,
    }).isRequired,
    onDeleteWidget: PropTypes.func.isRequired,
  }

  render() {

    return <tr>
      <td>{this.props.widget.name}</td>
      <td>{this.props.widget.description}</td>
      <td>{this.props.widget.color}</td>
      <td>{this.props.widget.size}</td>
      <td>{this.props.widget.quantity}</td>
      <td><button type="button" onClick={() => this.props.onDeleteWidget(this.props.widget.id)}>Delete</button></td>
    </tr>;
  }

}

export const WidgetViewRowContainer = createFragmentContainer(WidgetViewRow, graphql`
  fragment widgetViewRow_widget on Widget {
    id
    name
    description
    color
    size
    quantity
  }
`);