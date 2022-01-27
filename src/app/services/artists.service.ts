import { Injectable } from '@angular/core';
import { SearchQuery } from '../models/SearchQuery.d';
import { Apollo, gql } from 'apollo-angular';
import { GetArtistsResponse } from '../models/ArtistsResponse';
import { GetArtistResponse } from '../models/ArtistResponse';

const GetArtists = gql`
  query GetAllArtistsResolver($allArtistsInput: AllArtistsInput!) {
    allArtistsResolver(input: $allArtistsInput) {
      name
      image
      joined_network
      styles
      country
      slug
      highlights {
        score
        texts {
          value
          type
        }
      }
    }
  }
`;

const GetArtistBySlug = gql`
  query artist($artistQueryInput: ArtistQueryInput!) {
    artist(query: $artistQueryInput) {
      name
      image
      joined_network
      styles
      slug
      country
      email
      payment_method
      artist_id 
      highlights {
        score
        texts {
          value
          type
        }
      }
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {
  
  constructor(
    private apollo: Apollo
  ) { }

  getArtists = (searchQuery: SearchQuery) => {
    console.log(searchQuery, '####search Query');
    let { term, facets, country, rating } = searchQuery;
    if (!facets) { facets = [] };
    return this.apollo.watchQuery<GetArtistsResponse>({
      query: GetArtists,
      variables: {
        allArtistsInput: {
          term: term,
          facets: [...facets],
          country: country,
          rating: rating
        }
      }
    })
  }

  getArtistSlug = (slug: string) => {
    return this.apollo.watchQuery<GetArtistResponse>({
      query: GetArtistBySlug,
      variables: {
        artistQueryInput: {
          slug: slug
        }
      }
    })
  }
}
