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
            }
          }
        `}
        variables={{}}
        render={ ({ props }) => {

          if (props) {
            return <h1>{props.viewer.message}</h1>;
          } else {
            return <span>Loading...</span>;
          }

        } } />
    </section>;

  }

}