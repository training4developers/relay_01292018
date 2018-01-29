import * as React from 'react';
import { QueryRenderer, graphql } from 'react-relay';

import { environment } from '../environment';

export class Home extends React.Component {

  render() {

    return <section>
      <QueryRenderer
        environment={environment}
        query={graphql`
          query homeQuery {
            viewer {
              id
              message
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
          }
        `}
        variables={{}}
        render={ ({ props }) => {

          if (props) {
            return <div>
              <h1>{props.viewer.message}</h1>
              <table>
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
                  {props.viewer.widgets.edges.map( ({ node: widget }) =>
                    <tr key={widget.id}>
                      <td>{widget.name}</td>
                      <td>{widget.description}</td>
                      <td>{widget.color}</td>
                      <td>{widget.size}</td>
                      <td>{widget.quantity}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>;
          } else {
            return <div>Loading...</div>;
          }


        } } />
    </section>;

  }

}