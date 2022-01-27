import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { GetOpinionsResponse } from '../models/OpinionsResponse';

const GetOpinions = gql`
  query GetAllOpinionsResolver($input: Int!) {
    allOpinionsResolver(input: $input) {
      client_name
      comment,
      artist_id
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(
    private apollo: Apollo
  ) { }

  getComments = (id: number) => {
    return this.apollo.watchQuery<GetOpinionsResponse>({
      query: GetOpinions,
      variables: {
        input: id
      }
    })
  }
}
