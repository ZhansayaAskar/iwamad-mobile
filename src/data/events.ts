export type CampusEvent = {
    id: number;
    title: string;
    date: string;
    place: string;
    seats: number;
  };
  
  export const events: CampusEvent[] = [
    {
      id: 1,
      title: 'Cupcake Decorating Masterclass',
      date: '2026-11-12',
      place: 'Culinary Studio',
      seats: 20,
    },
    {
      id: 2,
      title: 'DIY Macrame Keychain Workshop',
      date: '2026-11-18',
      place: 'Student Lounge',
      seats: 15,
    },
    {
      id: 3,
      title: 'Clay Evening',
      date: '2026-11-22',
      place: 'Art Room 2',
      seats: 3, 
    },
    {
      id: 4,
      title: 'Watercolor Painting ',
      date: '2026-11-28',
      place: 'Art Room 1',
      seats: 25,
    },
  ];