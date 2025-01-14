import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
} from '@angular/forms';

import { Set } from '../set';
import { CardsService } from '../cards.service';

@Component({
  selector: 'app-filter-bar',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css'],
})
export class FilterBarComponent implements OnInit {
  filterForm: FormGroup;
  colors: any = [
    { name: 'White', value: 'W' },
    { name: 'Blue', value: 'U' },
    { name: 'Black', value: 'B' },
    { name: 'Red', value: 'R' },
    { name: 'Green', value: 'G' },
    { name: 'Colorless', value: 'C' },
  ];
  selectedColors: any = [];
  costs: any = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  sets: Set[] = [];

  constructor(
    private cardsService: CardsService,
    private formBuilder: FormBuilder
  ) {
    this.filterForm = this.formBuilder.group({
      colors: [''],
      max_cost: [''],
      set: [''],
    });
  }

  ngOnInit(): void {
    this.cardsService.getCardSets().subscribe((sets) => {
      this.sets = sets.data
        .map((set: Set) => {
          return this.shapeSetData(set);
        })
        .sort((a: Set, b: Set) => {
          return a.name.localeCompare(b.name);
        });
    });
  }

  shapeSetData(set: Set): Set {
    return {
      name: set.name,
      set_type: set.set_type,
      code: set.code,
    };
  }

  onColorChange(event: Event, color: string) {
    const checkbox = event.target as HTMLInputElement;
    const colorsArray = this.selectedColors;

    if (checkbox.checked) {
      colorsArray.push(color);
    } else {
      const index = colorsArray.indexOf(color);
      if (index > -1) {
        colorsArray.splice(index, 1);
      }
    }

    this.filterForm.get('colors')?.setValue(colorsArray);
  }

  applyFilters(): void {
    const filters = this.filterForm.value;
    console.log('Filter applied:', filters);
  }
}
