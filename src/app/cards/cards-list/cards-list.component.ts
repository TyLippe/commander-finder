import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { Card } from '../card';
import { CardsService } from '../cards.service';
import { FilterBarComponent } from '../filter-bar/filter-bar.component';

@Component({
  selector: 'app-cards-list',
  imports: [MatCardModule, MatButtonModule, FilterBarComponent, CommonModule],
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
        return this.shapeCardData(card);
      });
      this.next_page = cards.next_page;
    });
  }

  loadMore(): void {
    if (this.next_page) {
      this.cardsService.getCommanders(this.next_page).subscribe((cards) => {
        this.cards = this.cards.concat(
          cards.data.map((card: any) => {
            return this.shapeCardData(card);
          })
        );
        this.next_page = cards.next_page;
      });
    }
  }

  shapeCardData(card: any): Card {
    return {
      name: card?.card_faces?.length ? card?.card_faces[0]?.name : card.name,
      image_url:
        card?.image_uris?.png || card?.card_faces[0]?.image_uris?.png || '',
      set_name: card.set_name,
      description: card.oracle_text || card.card_faces[0]?.oracle_text,
      canBeFlipped: card.card_faces ? true : false,
      alt_image_url: card?.card_faces?.length
        ? card?.card_faces[1]?.image_uris?.png
        : '',
      alt_description: card?.card_faces?.length
        ? card?.card_faces[1]?.oracle_text
        : '',
      alt_name: card?.card_faces?.length ? card?.card_faces[1]?.name : '',
    };
  }

  flipCard(card: Card): void {
    if (card.canBeFlipped) {
      const tempImage = card.image_url;
      const tempDescription = card.description;
      const tempName = card.name;
      card.image_url = card.alt_image_url || '';
      card.description = card.alt_description || '';
      card.name = card.alt_name || '';
      card.alt_image_url = tempImage;
      card.alt_description = tempDescription;
      card.alt_name = tempName;
    }
  }
}
