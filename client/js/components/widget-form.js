import * as React from 'react';

export class WidgetForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: 'a',
      description: 'a',
      color: 'a',
      size: 'a',
      quantity: '1',
    };
  }

  onChange = e => {
    this.setState({
      [ e.target.name ]: e.target.type === 'number'
        ? Number(e.target.value)
        : e.target.value,
    });
  };

  onClick = () => {
    this.props.onSubmitWidget({ ...this.state }).then(() => {
      this.setState({
        name: '',
        description: '',
        color: '',
        size: '',
        quantity: '',
      });
    });



  };

  render() {

    return <div>
      <h3>Add Widget</h3>
      <form>
        <div>
          <label htmlFor="widget-name-input">Name</label>
          <input type="text" id="widget-name-input" name="name" value={this.state.name} onChange={this.onChange} />
        </div>
        <div>
          <label htmlFor="widget-description-input">Description</label>
          <input type="text" id="widget-description-input" name="description" value={this.state.description} onChange={this.onChange} />
        </div>
        <div>
          <label htmlFor="widget-color-input">Color</label>
          <input type="text" id="widget-color-input" name="color" value={this.state.color} onChange={this.onChange} />
        </div>
        <div>
          <label htmlFor="widget-size-input">Size</label>
          <input type="text" id="widget-size-input" name="size" value={this.state.size} onChange={this.onChange} />
        </div>
        <div>
          <label htmlFor="widget-quantity-input">Quantity</label>
          <input type="number" id="widget-quantity-input" name="quantity" value={this.state.quantity} onChange={this.onChange} />
        </div>
        <button type="button" onClick={this.onClick}>Add Widget</button>
      </form>
    </div>;


  }


}