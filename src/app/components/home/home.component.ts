import { Component, OnInit, Input } from '@angular/core';
import { ArtistsService } from 'src/app/services/artists.service';
import { AutocompleteService } from 'src/app/services/autocomplete.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Artist } from 'src/app/models/Artist';
import { SearchQuery } from 'src/app/models/SearchQuery.d';
import { Name } from 'src/app/models/Name.d';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Input() chipsList: string[] = [];
  @Input() country?: string;
  @Input() rating?: number;

  facets: any[];
  countries: any[];
  searchForm!: FormGroup;
  searchTerm: FormControl = new FormControl();
  term: string = '';
  artists: Artist[] = [];
  noresults: boolean = false;
  isLoading: boolean = false;
  names: Name[] = [];
  isMultiple: boolean = true;

  constructor(
    private artistsService: ArtistsService,
    private autocomplete: AutocompleteService
  ) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      term: new FormControl('', Validators.minLength(2))
    });

    this.searchForm.controls['term']
    .valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
    )
    .subscribe(term => {
      if (!term) { return; }
      this.autocomplete.getNames(term)
        .valueChanges
        .subscribe(({ data, loading }) => {
          this.isLoading = loading;
          this.names = data.autocompleteResolver;
          console.log(JSON.stringify(data), '####### logging the names');
      });
      console.log(term, '>>>> term now');
    })
  }

  fetchArtists(): void {
    console.log('I am on submit!!! 1');
    this.term = this.searchForm.value.term || '';
    if (this.chipsList.length >= 1) {
      this.facets = this.chipsList;
    }
    let queryTerms: SearchQuery = { term: this.term, facets: this.facets, country: this.country, rating: this.rating };
    this.artistsService.getArtists(queryTerms)
    .valueChanges
    .subscribe(({ data, loading }) => {
      console.log('I am on submit!!! 3');
      this.isLoading = loading;
      this.artists = data.allArtistsResolver;
      this.getFacets(this.artists);
      this.getCountries(this.artists);
      console.log(JSON.stringify(data), '####### logging the names');
    });
  }

  getCountries(artists: Artist[]) {
    let countries = [];
    artists.map(artist =>{
      countries.push(artist.country);
    });
    console.log(countries, 'countries');
    this.countries = [...new Set(countries)];
  }

  getFacets(artists: Artist[]) {
    let tmpStyles = [];
    artists.map(artist =>{
      tmpStyles = [...tmpStyles, ...artist.styles];
    });
    console.log(tmpStyles, 'tmpstyles');
    this.facets = [...new Set(tmpStyles)];
  }

  updatedChipsHandler(chips: string[]): void {
    this.chipsList = chips;
    console.log(chips, this.chipsList, 'This are the chips in the app component');
  }

  updatedRatingHandler(rt: number): void {
    if (rt && rt !== 0 || rt !== 90) {
      this.rating = rt;
    }
    console.log(this.rating, 'This is the selected rating');
  }

  updatedCountryHandler(country: string): void {
    if (country.length > 0) {
      this.country = country;
    }
    console.log(this.country, 'This is the selected rating');
  }

  onSubmit(): void {
    // test the value you get from the input
    console.log(this.searchForm.value);
    this.isLoading = true;
    this.noresults = false;
    // get movies from Atlas
    this.fetchArtists();
    // reset the form
    this.searchForm.reset();
  }
}
