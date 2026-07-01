export interface Brand {
  id: string;
  name: string;
  logoText: string;
  description: string;
  bannerUrl: string;
}

export interface Location {
  id: string;
  name: string;
  state: string;
}

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

export interface Benefit {
  title: string;
  description: string;
  icon: string; // Tailwind icon reference or label
}

export const BRANDS: Brand[] = [
  { id: "rathi", name: "Rathi", logoText: "R", description: "Rathi Steel - A legacy of trust and high ductility rebars", bannerUrl: "/brand-creative.png" },
  { id: "tata-tiscon", name: "Tata Tiscon", logoText: "TT", description: "Tata Tiscon - India's premium Fe 550D grade steel", bannerUrl: "/tata-creative.png" },
  { id: "jindal-panther", name: "Jindal Panther", logoText: "JP", description: "Jindal Panther - High strength and seismic resistant rebars", bannerUrl: "/jindal-creative.png" },
  { id: "jsw-neosteel", name: "JSW Neosteel", logoText: "JSW", description: "JSW Neosteel - Premium Thermo-Mechanically Treated bars", bannerUrl: "/jsw-creative.png" },
  { id: "sail", name: "SAIL", logoText: "SAIL", description: "Steel Authority of India - Government trusted durability", bannerUrl: "/brand-creative.png" },
  { id: "kamdhenu", name: "Kamdhenu", logoText: "K", description: "Kamdhenu Next - Double rib patterns for superior concrete grip", bannerUrl: "/brand-creative.png" }
];

export const LOCATIONS: Location[] = [
  { id: "delhi-ncr", name: "Delhi NCR", state: "Delhi/Haryana/UP" },
  { id: "bangalore", name: "Bangalore", state: "Karnataka" },
  { id: "mumbai", name: "Mumbai", state: "Maharashtra" },
  { id: "pune", name: "Pune", state: "Maharashtra" },
  { id: "chennai", name: "Chennai", state: "Tamil Nadu" },
  { id: "hyderabad", name: "Hyderabad", state: "Telangana" },
  { id: "kolkata", name: "Kolkata", state: "West Bengal" },
  { id: "ahmedabad", name: "Ahmedabad", state: "Gujarat" }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: 1,
    title: "POST TMT REQUIREMENT",
    description: "Select your preferred brand, required quantity in tons, and delivery location in our secure form."
  },
  {
    number: 2,
    title: "GET LIVE QUOTES",
    description: "EaseInfra matches your requirement with authorized, verified distributors in your city to compile quotes."
  },
  {
    number: 3,
    title: "CLOSE DIRECT DEAL",
    description: "Compare bids, choose the best quote, and coordinate delivery directly with the seller—no middlemen."
  }
];

export const BUYER_BENEFITS: Benefit[] = [
  {
    title: "Verified Sellers",
    description: "We vet every seller so you connect only with trusted, authorized steel distributors.",
    icon: "shield"
  },
  {
    title: "Live Steel Prices",
    description: "Track real-time steel prices across brands and locations to stay ahead of market trends.",
    icon: "currency"
  },
  {
    title: "Faster Procurement",
    description: "Get quotes fast and connect directly with verified suppliers. No middlemen, no delays.",
    icon: "clock"
  },
  {
    title: "Pan India Network",
    description: "Access a wide network of verified sellers across key cities and industrial hubs.",
    icon: "globe"
  }
];

export const SELLER_BENEFITS: Benefit[] = [
  {
    title: "Verified Buyer Leads",
    description: "Receive direct purchase requirements and connect with genuine, phone-verified buyers.",
    icon: "verify"
  },
  {
    title: "Live Market Insights",
    description: "Track real-time steel prices and market trends to quote smarter and close deals faster.",
    icon: "trend"
  },
  {
    title: "Zero Transaction Cost",
    description: "List your steel products and connect with buyers for free. No commission or listing fees.",
    icon: "percent"
  },
  {
    title: "Pan India Reach",
    description: "Expand your dealership network and reach construction buyers across all regions of India.",
    icon: "globe"
  }
];
