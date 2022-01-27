import { Rating } from "./Rating";

export interface Opinion {
    artist_id: number,
    client_name: string,
    comment: string,
    rating: Rating
}