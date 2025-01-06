import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { CardsService } from '../cards.service';
import { Card } from '../card';

@Component({
  selector: 'app-cards-list',
  imports: [MatCardModule],
  templateUrl: './cards-list.component.html',
  styleUrl: './cards-list.component.css',
})
export class CardsListComponent implements OnInit {
  cards: Card[] = [];
  next_page: string | null = null;

  constructor(private cardsService: CardsService) {}

  ngOnInit(): void {
    this.cardsService.getCommanders().subscribe((cards) => {
      this.cards = cards.data.map((card: any) => {
        return {
          name: card.name,
          image_url: card?.image_uris?.png || '',
        };
      });
      this.next_page = cards.next_page;
    });
  }

  loadMore(): void {
    if (this.next_page) {
      this.cardsService.getCommanders(this.next_page).subscribe((cards) => {
        this.cards = this.cards.concat(
          cards.data.map((card: any) => {
            return {
              name: card.name,
              image_url: card?.image_uris?.png || '',
            };
          })
        );
        this.next_page = cards.next_page;
      });
    }
  }
}
