export const users: Array<{
  id: number;
  name: string;
  timezone: string;
  availableTimes: { [key: string]: string[] };
  img: string;
}> = [
  {
    id: 1,
    name: "Alice",
    timezone: "America/New_York",
    availableTimes: { "2024-12-20": ["11:00", "14:00", "16:00"] },
    img: "/img/11.jpg",
  },
  {
    id: 2,
    name: "Bob",
    timezone: "Europe/London",
    availableTimes: { "2024-12-18": ["10:00", "13:00", "15:00"] },
    img: "/img/22.jpg",
  },
  {
    id: 3,
    name: "Charlie",
    timezone: "Asia/Tokyo",
    availableTimes: { "2024-12-10": ["07:00", "12:00", "16:00"] },
    img: "/img/33.jpg",
  },
];
