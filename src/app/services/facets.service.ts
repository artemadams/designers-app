import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacetsService {
  private API_URL: string = environment.getFacetsHook;
  private para: string = '?facet=';

  constructor(
    private http: HttpClient
  ) { }

  getFacets(facet: string) {
    return this.http.get<string[]>(
      `${this.API_URL}${this.para}${facet}`
    )
  }
}
