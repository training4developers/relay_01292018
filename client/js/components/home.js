import * as React from 'react';
import { QueryRenderer, graphql } from 'react-relay';

import { environment } from '../environment';

import { WidgetTableContainer } from './widget-table';
import { CarTableContainer } from './car-table';
import { WidgetForm } from './widget-form';
import { insertWidget as relayInsertWidget } from '../mutations/insert-widget';

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
        render={ ({ error, props, retry}) => {

          if (error) {
            return <div>
              <div>{error.message}</div>
              <div>
                <button onClick={() => retry()}>Retry</button>
              </div>
            </div>;
          } else if (props) {

            const reactInsertWidget = widget => {
              return relayInsertWidget(
                environment,
                widget,
                props.viewer,
              );
            };

            return <div>
              <h1>{props.viewer.message}</h1>
              <WidgetTableContainer viewer={props.viewer} />
              <WidgetForm onSubmitWidget={reactInsertWidget} />
              <CarTableContainer viewer={props.viewer} />
            </div>;
          } else {
            return <div>Loading...</div>;
          }

        } } />
    </section>;

  }

}