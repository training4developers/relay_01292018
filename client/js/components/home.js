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
            }
          }
        `}
        variables={{}}
        render={ () => {

          return <h1>Hello World!</h1>;

        } } />
    </section>;

  }

}