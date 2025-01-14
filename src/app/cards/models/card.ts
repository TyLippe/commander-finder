export interface Card {
  name: string;
  image_url: string;
  set_name: string;
  description: string;
  canBeFlipped: boolean;
  alt_image_url?: string;
  alt_description?: string;
  alt_name?: string;
}
