import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ChipsService {
  public uncheckCheckbox(chip: string) {
    const id = `${chip}-input`;
    const el = document.getElementById(id);
    const wrapper = document.getElementById(chip);
    el?.setAttribute('aria-checked', 'false');
    el?.setAttribute('checked', 'false');
    wrapper?.classList.remove('mat-checkbox-checked');
    console.log('done cleaning!');
  }
}
