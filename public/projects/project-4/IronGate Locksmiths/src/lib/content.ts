export type ServiceCategory = "Emergency" | "Doors" | "Security";

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  category: ServiceCategory;
  price: string;
  description: string;
  details: string;
  highlights: string[];
};

export type LandingPage = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heroTitle: string;
  heroSummary: string;
  sections: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readTime: string;
  content: string[];
};

export const siteConfig = {
  name: "Irongate Locksmiths",
  title: "Emergency Locksmith South Shields | 24hr Locksmith Near Me",
  description:
    "24/7 emergency locksmith in South Shields with local rapid response, low cost pricing from £44.99, lock changes from £19.99, UPVC door servicing from £29.99, and trusted family-run service across the North East.",
  url: "https://www.irongatelocksmiths.co.uk",
  phoneDisplay: "07546 126613",
  phoneHref: "tel:07546126613",
  email: "irongatelocksmiths@gmail.com",
  addressLine1: "134 Dean Road",
  city: "South Shields",
  region: "Tyne and Wear",
  postcode: "NE33 4AW",
  country: "GB",
  openingHours: "Open 24 hours, 7 days a week",
  serviceRadius: "South Shields, South Tyneside, Jarrow, Hebburn, Boldon, Sunderland, Newcastle, Durham and the wider North East",
  mapEmbed:
    "https://www.google.com/maps?q=134%20Dean%20Road%2C%20South%20Shields%2C%20NE33%204AW&z=14&output=embed",
  heroImage:
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
  secondaryImage:
    "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1400&q=80",
  serviceImage:
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=80",
};

export const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/coverage", label: "Areas" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export const trustBadges = [
  { title: "30 min response", description: "Rapid local response in South Shields and nearby areas." },
  { title: "DBS checked", description: "Fully DBS checked locksmiths for trusted callouts." },
  { title: "Fully insured", description: "Work completed with full insurance cover in place." },
  { title: "No VAT", description: "No VAT added to your quote and no hidden fees." },
];

export const services: Service[] = [
  {
    slug: "emergency-lockout",
    title: "Emergency Lockout",
    shortTitle: "Lockout",
    category: "Emergency",
    price: "From £44.99",
    description: "Rapid entry for homes, flats and businesses with 24 hour emergency locksmith cover.",
    details:
      "For all emergency lockouts in South Shields, Boldon, Jarrow, Hebburn and Sunderland, 24 hours each day from just £44.99 per hour labour fee. We aim to price jobs per job and not by the hour wherever possible.",
    highlights: ["24/7 attendance", "No call centre", "Non-destructive entry where possible"],
  },
  {
    slug: "lock-changes",
    title: "Lock Changes",
    shortTitle: "Lock Changes",
    category: "Security",
    price: "Locks from £19.99",
    description: "British Standard lock packages fitted for homes, rentals and insurance compliance.",
    details:
      "New locks from as little as £19.99 for new British Standard lock packages with 2 - 3 keys, fitting kits and low cost labour charges from just £44.99.",
    highlights: ["Yale, euro cylinder and mortice locks", "Insurance-ready options", "Same-day fitting"],
  },
  {
    slug: "upvc-door-repair",
    title: "UPVC Door Repair",
    shortTitle: "UPVC Repair",
    category: "Doors",
    price: "Door servicing from £29.99",
    description: "UPVC door servicing, lifting, alignment, mechanism repair and full strip-down services.",
    details:
      "UPVC door servicing and lifting from £29.99, full services from £59.99 including servicing materials, internal cleaning and labour.",
    highlights: ["Handles that will not turn", "Doors that will not lock", "Mechanism diagnostics and repair"],
  },
  {
    slug: "van-locks",
    title: "Van Locks",
    shortTitle: "Van Locks",
    category: "Security",
    price: "Custom quote",
    description: "High security van locks, slam locks and armour plate solutions for working vehicles.",
    details:
      "We fit high security locks to vehicles such as van locks, slam locks, armoured plate locks and more, with tailored advice based on how you use your van day to day.",
    highlights: ["Slam locks", "Deadlocks", "Armour plate protection"],
  },
  {
    slug: "garage-door-repairs",
    title: "Garage Door Repairs",
    shortTitle: "Garage Doors",
    category: "Doors",
    price: "Custom quote",
    description: "Garage door access repairs and lock replacements for stuck or insecure garage doors.",
    details:
      "If your garage door is jammed, not opening, or the lock is damaged, we provide repair and replacement options to restore access and security quickly.",
    highlights: ["Jammed garage doors", "Lock replacement", "Improved security"],
  },
  {
    slug: "composite-doors",
    title: "Composite Doors",
    shortTitle: "Composite Doors",
    category: "Doors",
    price: "Custom quote",
    description: "Composite door adjustments, locking faults, handle issues and full hardware replacement.",
    details:
      "From composite doors locked behind you to doors that will not open or lock correctly, we diagnose the fault and repair or replace the failed parts with quality hardware.",
    highlights: ["Door realignment", "Multi-point mechanism repair", "Handle replacement"],
  },
  {
    slug: "lock-repairs",
    title: "Lock Repairs",
    shortTitle: "Lock Repairs",
    category: "Security",
    price: "From £44.99 labour",
    description: "Repair snapped keys, failed mechanisms, stiff locks and doors that will not open safely.",
    details:
      "If the lock will not turn, the handle will not work, or you have snapped a key in the lock, Irongate Locksmiths can repair the problem and explain exactly what has failed.",
    highlights: ["Snapped keys removed", "Failed lock cases repaired", "Honest fault diagnosis"],
  },
  {
    slug: "boarding-up",
    title: "Emergency Boarding Up",
    shortTitle: "Boarding Up",
    category: "Emergency",
    price: "Out of hours service",
    description: "Emergency boarding up service for break-ins, damaged doors and urgent property security.",
    details:
      "We also provide an out of hours emergency boarding up service to help secure damaged doors, broken entry points and vulnerable properties while permanent repairs are arranged.",
    highlights: ["24/7 response", "Home and commercial properties", "Temporary security solutions"],
  },
];

export const whyChooseUs = [
  "Local family based locksmith business in South Shields UK.",
  "Rapid response rate of 30 minutes with prices from £44.99.",
  "90% of jobs priced by the job and not the hour.",
  "No hidden costs, no added fees, and no call centres.",
  "Fully trained Master Locksmith service and part of the Guild of Master Locksmiths.",
  "DBS checked, fully insured, and British Standard hardware used where needed.",
];

export const testimonials = [
  {
    quote:
      "Big thumbs up. If you're in need of an honest, professional, and reliable low cost local locksmith service, then look no further than Irongate Locksmiths. I've relied on the friendly guys from Irongate Locksmiths on numerous occasions, and have yet to be disappointed.",
    author: "Frankie Bolder",
    location: "South Shields",
  },
  {
    quote:
      "Fast, friendly and clear on pricing. Simon arrived quickly, explained the problem with the lock and had the door secure again without any fuss.",
    author: "Placeholder Review",
    location: "Jarrow",
  },
  {
    quote:
      "Needed a UPVC door repair after the handle failed. Honest advice, proper fix, and it cost less than I expected. Would recommend locally.",
    author: "Placeholder Review",
    location: "Hebburn",
  },
];

export const areasCovered = [
  "South Shields",
  "South Tyneside",
  "Jarrow",
  "Hebburn",
  "Boldon",
  "Sunderland",
  "Newcastle",
  "Durham",
  "Hartlepool",
  "Tyne and Wear",
];

export const landingPages: LandingPage[] = [
  {
    slug: "locksmith-south-shields",
    metaTitle: "Locksmith South Shields | Local Locksmith Service You Can Depend On",
    metaDescription:
      "Trusted locksmith in South Shields with rapid response, low cost lock changes, UPVC door repairs and 24 hour emergency help from a real local business.",
    eyebrow: "Local Locksmith South Shields",
    heroTitle: "The South Shields Locksmith Service You Can Depend On",
    heroSummary:
      "Irongate Locksmiths have been a reliable local locksmith service throughout the region since day one, focused on personalised service, competitive rates and complete customer satisfaction.",
    sections: [
      "Being a great locksmith service provider means our customers having complete and total confidence in the locksmith services we provide, and we are proud to deliver low cost locksmithing with a constant 24 hour emergency locksmith service throughout the North East.",
      "We are an actual local business. Simon lives in South Shields and you deal directly with the locksmith, not a national call centre. That means clearer advice, quicker attendance and fairer pricing.",
      "From doors that will not open to insurance-compliant lock upgrades, Irongate Locksmiths cover residential, commercial and vehicle security work day and night.",
    ],
  },
  {
    slug: "emergency-locksmith-south-shields",
    metaTitle: "Emergency Locksmith South Shields | 24hr Locksmith Near Me",
    metaDescription:
      "24 hour emergency locksmith in South Shields with rapid local response, lockout entry from £44.99 and no call centre delays.",
    eyebrow: "24 Hour Emergency Locksmith",
    heroTitle: "Emergency Locksmith Cover Across South Shields and Nearby Areas",
    heroSummary:
      "Locked out, locked in, key snapped, or door will not secure? Irongate Locksmiths provide 24/7 emergency attendance with rapid response and straightforward pricing.",
    sections: [
      "For all emergency lockouts in South Shields, Boldon, Jarrow, Hebburn and Sunderland, labour starts from £44.99. We always aim for non-destructive entry where possible.",
      "We also provide emergency boarding up and urgent security upgrades after break-ins or failed door hardware, helping you make the property safe again quickly.",
      "Call any time of day or night and speak directly to a local locksmith who can tell you what to expect before setting off.",
    ],
  },
  {
    slug: "lock-repair-south-shields",
    metaTitle: "Lock Repair South Shields | UPVC Door and Lock Repairs",
    metaDescription:
      "Professional lock repairs in South Shields for failed mechanisms, snapped keys, stiff locks and UPVC door faults, with honest advice and low cost labour.",
    eyebrow: "Lock Repairs South Shields",
    heroTitle: "Professional Lock and Door Repairs Without the Guesswork",
    heroSummary:
      "When a lock will not turn, a key snaps, or a door handle stops working, Irongate Locksmiths diagnose the fault clearly and repair or replace only what is needed.",
    sections: [
      "We repair failed lock cases, misaligned doors, jammed mechanisms, snapped keys and damaged handles, with clear explanation of what has gone wrong before work begins.",
      "UPVC and composite door faults are a specialist area, including lifting doors, servicing hardware and restoring smooth locking without unnecessary replacement.",
      "Where replacement is the better option, we use quality hardware and British Standard options to protect your security and insurance position.",
    ],
  },
  {
    slug: "local-locksmith-south-shields",
    metaTitle: "Local Locksmith South Shields | Family Based Locksmith Business",
    metaDescription:
      "Family based local locksmith in South Shields offering honest pricing, 24/7 callouts, DBS checked service and real local coverage across the North East.",
    eyebrow: "Family Based Locksmith Business",
    heroTitle: "A Local Locksmith You Can Trust for Generations to Come",
    heroSummary:
      "We do not want to be just a locksmith, we want to be your family locksmith for generations to come, which means keeping pricing right and customers happy.",
    sections: [
      "Irongate Locksmiths have worked throughout the local area for over a decade and remain close to the local community, serving homes, landlords, businesses and tradespeople.",
      "Each locksmith is fully DBS checked, carries full insurance cover and works to the highest British locksmith standards with honest local service from start to finish.",
      "From South Shields to Newcastle, Durham to Hartlepool, we offer dependable attendance without the inflated prices and generic call-centre experience.",
    ],
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "getting-in",
    title: "Getting In: What To Do Before You Force a Locked Door",
    description:
      "A practical guide on what to check before forcing a jammed or locked door, and when to call a local emergency locksmith.",
    publishedAt: "2026-03-20",
    readTime: "4 min read",
    content: [
      "If a door suddenly will not open, forcing it can turn a simple mechanism issue into a full door repair. Start by checking whether the handle is lifting fully, whether the key is turning freely, and whether pressure on the door changes the feel of the lock.",
      "UPVC and composite doors often fail because of misalignment, gearbox wear or a failed multi-point mechanism. A local locksmith can usually tell the difference quickly and avoid unnecessary damage.",
      "If the property is unsecured or you are locked out late at night, call straight away. Emergency response matters more than experimentation when safety or access is on the line.",
    ],
  },
  {
    slug: "window-lock-tips",
    title: "4 Essential Tips for Choosing the Right Window Locks",
    description:
      "Straightforward advice on selecting window locks that improve security without complicating daily use.",
    publishedAt: "2026-03-18",
    readTime: "5 min read",
    content: [
      "Start with the opening type and the frame condition. The best lock for a timber sash is not the same as the best option for a modern UPVC window.",
      "Check insurance requirements before buying. British Standard hardware can matter when a claim is reviewed after a break-in.",
      "Think about how the lock will be used day to day. Security only helps when the hardware is simple enough that people actually use it consistently.",
    ],
  },
  {
    slug: "24hr-locksmith",
    title: "Why a Genuine 24hr Locksmith Matters in an Emergency",
    description:
      "What local rapid response really means, and why speaking directly to the locksmith is often the difference in urgent situations.",
    publishedAt: "2026-03-15",
    readTime: "3 min read",
    content: [
      "A genuine 24 hour locksmith is not just someone answering the phone. It means the person assessing the job understands access, security and the likely hardware involved before they arrive.",
      "That direct communication reduces wasted time, especially for late-night lockouts, failed UPVC doors and emergency boarding situations where the property needs securing quickly.",
      "A real local locksmith also knows the area, traffic routes and common door types, which helps keep response times down and pricing sensible.",
    ],
  },
];