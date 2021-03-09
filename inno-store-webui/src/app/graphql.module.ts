import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import {AppConfigService} from './app-config.service';

export function createApollo(httpLink: HttpLink, appConfigServie:AppConfigService): ApolloClientOptions<any> {
  return {
    link: httpLink.create({uri: appConfigServie.appConfig.api}),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, AppConfigService],
    },
  ],
})
export class GraphQLModule {}
