import { ArtistHighlights } from './ArtistHighlights';
import { JoinedNetwork } from './JoinedNetwork';
import { Opinion } from './Opinion';

export interface Artist {
  name: string;
  artist_id: Opinion;
  email: string;
  styles: string[];
  image: string;
  country: string;
  joined_network: JoinedNetwork;
  location: number[];
  payment_method: string;
  slug: string;
  highlights: ArtistHighlights;
}
