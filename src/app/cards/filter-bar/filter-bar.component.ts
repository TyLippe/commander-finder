import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { Set } from '../set';
import { CardsService } from '../cards.service';

@Component({
  selector: 'app-filter-bar',
  imports: [CommonModule],
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css'],
})
export class FilterBarComponent implements OnInit {
  sets: Set[] = [];

  constructor(private cardsService: CardsService) {}

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
}
