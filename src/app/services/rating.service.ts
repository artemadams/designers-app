import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { GetAvgRatingResponse } from '../models/AvgRatingResponse';
import { RatingQuery } from '../models/RatingQuery';

const GetAvgRating = gql`
  query rating($ratingQueryInput: RatingQueryInput!) {
    rating(query: $ratingQueryInput) {
      ratingAvg
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(
    private apollo: Apollo
  ) {}

  getRating = (ratingQuery: RatingQuery) => {
    let { _id } = ratingQuery;
    return this.apollo.watchQuery<GetAvgRatingResponse>({
      query: GetAvgRating,
      variables: {
        ratingQueryInput: {
          _id: _id
        }
      }
    })
  }
}
