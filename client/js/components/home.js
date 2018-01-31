import * as React from 'react';
import { QueryRenderer, graphql } from 'react-relay';

import { environment } from '../environment';

import { PaginatedWidgetTableContainer } from './paginated-widget-table';
import { WidgetForm } from './widget-form';
import { insertWidget as relayInsertWidget } from '../mutations/insert-widget';
import { deleteWidget as relayDeleteWidget } from '../mutations/delete-widget';




export class Home extends React.Component {

  render() {

    return <section>
      <QueryRenderer
        environment={environment}
        query={graphql`
          query homeQuery {
            viewer {
              id
              ...paginatedWidgetTable_viewer
            }
          }
        `}
        variables={{
          // first: 2
        }}
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
                props.viewer.id,
                widget,
              );
            };

            const reactDeleteWidget = widgetId => {
              console.log(widgetId);
              return relayDeleteWidget(
                environment,
                props.viewer.id,
                widgetId,
              );
            };

            return <div>
              <PaginatedWidgetTableContainer viewer={props.viewer} onDeleteWidget={reactDeleteWidget} />
              <WidgetForm onSubmitWidget={reactInsertWidget} />
            </div>;
          } else {
            return <div>Loading...</div>;
          }

        } } />
    </section>;

  }

}