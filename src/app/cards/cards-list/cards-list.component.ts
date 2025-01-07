import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { CardsService } from '../cards.service';
import { Card } from '../card';

@Component({
  selector: 'app-cards-list',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './cards-list.component.html',
  styleUrl: './cards-list.component.css',
})
export class CardsListComponent implements OnInit {
  cards: Card[] = [];
  next_page: string | null = null;

  constructor(private cardsService: CardsService) {}

  ngOnInit(): void {
    this.cardsService.getCommanders().subscribe((cards) => {
      this.cards = cards.data
        .filter((card: any) => card?.image_uris?.png)
        .map((card: any) => {
          return {
            name: card.name,
            image_url: card?.image_uris?.png || '',
            set_name: card.set_name,
            description: card.oracle_text,
          };
        });
      this.next_page = cards.next_page;
    });
  }

  loadMore(): void {
    if (this.next_page) {
      this.cardsService.getCommanders(this.next_page).subscribe((cards) => {
        this.cards = this.cards.concat(
          cards.data
            .filter((card: any) => card?.image_uris?.png)
            .map((card: any) => {
              return {
                name: card.name,
                image_url: card?.image_uris?.png || '',
                set_name: card.set_name,
                description: card.oracle_text,
              };
            })
        );
        this.next_page = cards.next_page;
      });
    }
  }
}
