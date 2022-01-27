import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { GetArtistAutocompleteResponse } from '../models/ArtistAutocompleteResponse';

const GetArtists = gql`
  query GetAutocompleteResolver($name: String!) {
    autocompleteResolver(input: $name) {
      name
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {
  
  constructor(
    private apollo: Apollo
  ) {}

  getNames = (term: string) => {
    return this.apollo.watchQuery<GetArtistAutocompleteResponse>({
      query: GetArtists,
      variables: {
        name: term
      }
    })
  }
}
