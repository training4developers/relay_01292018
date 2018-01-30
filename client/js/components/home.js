import * as React from 'react';
import { QueryRenderer, graphql } from 'react-relay';

import { environment } from '../environment';

import { WidgetTableContainer } from './widget-table';
import { CarTableContainer } from './car-table';


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
              ...widgetTable_viewer
              ...carTable_viewer
            }
          }
        `}
        variables={{}}
        render={ ({ props }) => {


          if (props) {
            console.dir(props.viewer);
            return <div>
              <h1>{props.viewer.message}</h1>
              <WidgetTableContainer viewer={props.viewer} />
              <CarTableContainer viewer={props.viewer} />
            </div>;
          } else {
            return <div>Loading...</div>;
          }


        } } />
    </section>;

  }

}