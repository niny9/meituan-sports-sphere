
export interface Recommendation {
  type: 'hotel' | 'restaurant' | 'transport' | 'ticket' | 'event' | 'venue' | 'guide';
  title: string;
  description: string;
  imageUrl?: string;
  actionText?: string;
  actionLink?: string;
}

export interface Message {
  id: number;
  text: string;
  fromUser: boolean;
  recommendations?: Recommendation[];
}
