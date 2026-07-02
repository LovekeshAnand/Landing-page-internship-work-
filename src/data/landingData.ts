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
  { id: "rathi", name: "Rathi", logoText: "R", description: "Rathi Steel - A legacy of trust and high ductility rebars", bannerUrl: "/tmt_creative.jpeg" },
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
    title: "POST REQUIREMENT",
    description: "Select your product, quantity, and delivery location."
  },
  {
    number: 2,
    title: "GET QUOTES",
    description: "Our expert will contact you and connect you with verified suppliers for competitive quotes."
  },
  {
    number: 3,
    title: "CLOSE DEALS DIRECTLY",
    description: "Compare quotes, choose the best deal, and coordinate delivery directly with the seller."
  }
];

export const BUYER_BENEFITS: Benefit[] = [
  {
    title: "Verified Sellers",
    description: "We verify every seller, so you connect only with trusted suppliers. ",
    icon: "shield"
  },
  {
    title: "Live Steel Prices",
    description: "Track live steel prices and stay ahead of market trends.",
    icon: "handshake"
  },
  {
    title: "Faster Buying Process",
    description: "Get quotes faster. Connect directly. No middlemen.",
    icon: "network"
  },
  {
    title: "Pan India Network",
    description: "Access sellers across key cities and industrial hub.",
    icon: "tag"
  }
];

export const SELLER_BENEFITS: Benefit[] = [
  {
    title: "Verified Buyer Leads",
    description: "Receive direct purchase requirements from verified buyers.",
    icon: "verify"
  },
  {
    title: "Live Market Insights",
    description: "Track real-time steel prices and market trends to quote smarter and close deals faster.",
    icon: "trend"
  },
  {
    title: "Zero Transaction Cost",
    description: "No commission on successful deals.",
    icon: "percent"
  },
  {
    title: "Pan India Reach",
    description: "Expand your business and reach buyers across India..",
    icon: "globe"
  }
];
