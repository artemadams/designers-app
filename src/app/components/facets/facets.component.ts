import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ChipsService } from 'src/app/services/chips.service';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-facets',
  templateUrl: './facets.component.html',
  styleUrls: ['./facets.component.scss']
})
export class FacetsComponent implements OnInit {
  @Input() chips: string[] = [];
  @Input() styles: string[] = [];
  @Input() countries: string[] = [];
  @Output() updatedChips: EventEmitter<string[]> = new EventEmitter();
  @Output() updatedCountry: EventEmitter<string> = new EventEmitter();
  @Output() updatedRt: EventEmitter<number> = new EventEmitter();

  categories: string[] = ['styles', 'country'];
  facets: string[] = [];
  nofacets: boolean = false;
  selectedStyles: string[] = [];
  selectedCountry: string = '';
  rating: number = 241;

  constructor(
    private chipsService: ChipsService
  ) { }

  formatSliderLabel(value: number) {
    return value;
  }

  // capture facet selection for facets in checkboxes
  onFacetChecked($event: MatCheckboxChange): void {
    if ($event.checked && $event.source.name) {
      this.selectedStyles.push($event.source.name);
    } else {
      const newStyles = this.selectedStyles.filter(genre => {
        return genre !== $event.source.name;
      });
      this.selectedStyles = newStyles;
    }
    this.updatedChips.emit(this.selectedStyles);
  }

  // capture facet selection for facets in option pulldown
  onFacetSelected(): void {
    console.log(this.selectedCountry, '##### select change');
    this.updatedCountry.emit(this.selectedCountry);
  }

  onSliderChange($event: MatSliderChange): void {
    this.rating = $event.value || 0;
    console.log(this.rating, 'current rating');
    this.updatedRt.emit(this.rating);
  }

  ngOnInit(): void {
  }
}
