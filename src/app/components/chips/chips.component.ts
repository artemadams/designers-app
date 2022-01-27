import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChipsService } from 'src/app/services/chips.service';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss']
})
export class ChipsComponent {
  
  constructor(
    private chipsService: ChipsService
  ) { }
  
  @Input() chips: string[] = [];
  @Output() updatedChips: EventEmitter<string[]> = new EventEmitter();

  selectable: boolean = true;
  removable: boolean = true;

  remove(chiptoRemove: string): void {
    const updatedChips = this.chips.filter(chip => {
      return chip !== chiptoRemove;
    });
    this.chips = updatedChips;
    this.updatedChips.emit(this.chips);

    this.chipsService.uncheckCheckbox(chiptoRemove);
  }
}
