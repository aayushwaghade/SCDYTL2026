export interface Ticket {
  id: string;
  name: string;
  price: string;
  badge: string;
  description: string;
  benefits: string[];
  featured?: boolean;
  buttonText: string;
  buttonLink: string;
  displayOrder: number;
  originalPrice?: string;
  discountPercentage?: number;
}

export const SHARED_BENEFITS = [
  "Official AWS Swags (Standard)",
  "Conference Access",
  "Event Badge",
  "Participation Certificate",
  "Breakfast & Lunch",
  "Refreshments",
  "Networking Opportunities",
  "AWS & Sponsor Giveaways",
  "Community Booth Access"
];

export const TICKETS: Ticket[] = [
  {
    id: "super-early-bird",
    name: "Super Early Bird",
    price: "₹200",
    originalPrice: "₹300",
    discountPercentage: 33,
    badge: "🔥 Best Value",
    description: "Extremely limited tickets for early decision makers.",
    benefits: SHARED_BENEFITS,
    buttonText: "Book Now",
    buttonLink: "#register",
    displayOrder: 1
  },
  {
    id: "standard",
    name: "Standard Pass",
    price: "₹250",
    badge: "⭐ Popular Choice",
    description: "Discounted pricing for community members.",
    benefits: SHARED_BENEFITS,
    featured: true,
    buttonText: "Book Now",
    buttonLink: "#register",
    displayOrder: 2
  },
  {
    id: "professional",
    name: "Professional Pass",
    price: "₹400",
    badge: "🎯 Premium Experience",
    description: "For professionals seeking VIP perks and comfort.",
    benefits: SHARED_BENEFITS,
    buttonText: "Book Now",
    buttonLink: "#register",
    displayOrder: 3
  }
];
