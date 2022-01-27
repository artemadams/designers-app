export interface SearchQuery {
    term: string,
    facets?: string[],
    country?: string,
    rating?: number
}
