export interface Review {
  id: number;
  author: string;
  comment: string;
  stars: number;
}

export interface Restaurant {
  id: string;
  businessname: string;
  image: string;
  restauranttype: string;
  phone?: string;
  email?: string;
  address?: string;
  parkinglot?: boolean;
  isFavorite?: boolean;
  reviewsList?: Review[];
}
