import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { CardsService } from '../cards.service';
import { Card } from '../card';

@Component({
  selector: 'app-cards-list',
  imports: [],
  templateUrl: './cards-list.component.html',
  styleUrl: './cards-list.component.css',
})
export class CardListComponent implements OnInit {
  cards: Card[] = [];
  next_page: string | null = null;

  constructor(private cardsService: CardsService) {}

  ngOnInit(): void {
    this.cardsService.getCommanders().subscribe((cards) => {
      console.log(cards);
      this.cards = cards.data;
      this.next_page = cards.next_page;
    });
  }

  loadMore(): void {
    if (this.next_page) {
      this.cardsService.getCommanders(this.next_page).subscribe((cards) => {
        this.cards = this.cards.concat(cards.data);
        this.next_page = cards.next_page;
      });
    }
  }
}
