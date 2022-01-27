import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { InMemoryCache, ApolloLink } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';
import * as Realm from 'realm-web';

const APP_ID = 'designers-app-mzpkz';
const uri =
  'https://eu-west-1.aws.realm.mongodb.com/api/client/v2.0/app/designers-app-mzpkz/graphql';

const realmApp = new Realm.App(APP_ID);

export function createApollo(httpLink: HttpLink) {
  const user = Realm.Credentials.anonymous();
  const loggedInUser = realmApp.logIn(user);

  if (loggedInUser) {
    realmApp.currentUser.refreshCustomData();
  }

  console.log(realmApp.currentUser, '#current user 2');

  const authToken = setContext((operation, context) => ({
    headers: {
      authorization: `Bearer ${realmApp.currentUser.accessToken}`,
    },
  }));

  const link = ApolloLink.from([
    authToken,
    httpLink.create({
      uri,
    }),
  ]);

  const cache = new InMemoryCache();

  return {
    link,
    cache,
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
