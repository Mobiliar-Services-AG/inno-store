import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache, split } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { AppConfigService } from './app-config.service';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { OperationDefinitionNode } from 'graphql';

export function createApollo(
  httpLink: HttpLink,
  appConfigServie: AppConfigService,
): ApolloClientOptions<any> {
  return {
    link: httpLink.create({ uri: appConfigServie.appConfig.api }),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink, appConfigServie: AppConfigService) => {
        // Create an http link:
        const http = httpLink.create({
          uri: appConfigServie.appConfig.api,
        });

        // Create a WebSocket link:
        const ws = new WebSocketLink({
          uri: appConfigServie.appConfig.apiWs,
          options: {
            reconnect: true,
          },
        });

        // using the ability to split links, you can send data to each link
        // depending on what kind of operation is being sent
        const link = split(
          // split based on operation type
          ({ query }) => {
            const node = getMainDefinition(query) as OperationDefinitionNode;
            return (
              node.kind === 'OperationDefinition' &&
              node.operation === 'subscription'
            );
          },
          ws,
          http,
        );

        return {
          link,
          cache: new InMemoryCache(),
        };
      },
      deps: [HttpLink, AppConfigService],
    },
  ],
})
export class GraphQLModule {}
