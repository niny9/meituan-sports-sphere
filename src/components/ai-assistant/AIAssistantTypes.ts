
export interface Message {
  id: number;
  text: string;
  fromUser: boolean;
  recommendations?: Array<{
    type: 'hotel' | 'restaurant' | 'transport' | 'ticket';
    title: string;
    description: string;
  }>;
}
