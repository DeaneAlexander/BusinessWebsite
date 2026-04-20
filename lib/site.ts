export const siteConfig = {
  name: "ALX Digital Incorporated",
  domain: "https://www.northstargrowthstudio.com",
  description:
    "Web development, app development, Unity game development, software support, and technical consulting for businesses that need practical digital solutions.",
  bookingPagePath: "/book-call",
  bookingUrl: "https://calendly.com/deaneaustenalexander/strategy-call",
  whatsappUrl:
    "https://wa.me/12687199248?text=Hi%20ALX%20Digital%20Incorporated%2C%20I%27d%20like%20to%20talk%20about%20a%20project.",
  email: "DeaneAustenAlexander@gmail.com",
  phone: "1-268-719-9248",
  location: "Based in Antigua and Barbuda, serving clients across the Caribbean and remotely",
  socialProof: {
    revenueLift: "38%",
    leadLift: "2.4x",
    launchTime: "21 days",
  },
} as const;

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/case-study", label: "Case Study" },
  { href: "/contact", label: "Contact" },
] as const;

export const services = [
  {
    name: "Web Development",
    summary:
      "Business websites, booking flows, portals",
  },
  {
    name: "App Development",
    summary:
      "Lightweight MVPs, internal tools, dashboards",
  },
  {
    name: "Game Development",
    summary:
      "Unity game development, gameplay systems, interactive experiences",
  },
  {
    name: "Software Support",
    summary:
      "Bug fixes, optimization, feature enhancements",
  },
  {
    name: "Technical Consulting",
    summary:
      "Scope definition, architecture, delivery planning",
  },
] as const;

export const proofStats = [
  { label: "Projects and products contributed to", value: "20+" },
  { label: "Typical build planning window", value: "2-4 wks" },
  { label: "Support response target", value: "< 48 hrs" },
] as const;

export const portfolioItems = [
  {
    name: "Harbor Booking Platform",
    category: "Web Development",
    result: "Responsive website with scheduling, service pages, and lead capture",
    description:
      "Built a polished business website with booking flows, clear service architecture, and conversion-ready contact paths.",
  },
  {
    name: "OpsFlow Dashboard",
    category: "App Development",
    result: "Internal tool that reduced repetitive admin work and improved reporting",
    description:
      "Designed and shipped a lightweight dashboard for task management, team visibility, and operational decision-making.",
  },
  {
    name: "Delivery Architecture Advisory",
    category: "Technical Consulting",
    result: "Clear technical plan, phased rollout, and practical delivery guidance",
    description:
      "Worked with the client to define the scope, organize the technical approach, and break the work into realistic phases so the project could move forward clearly and without confusion.",
  },
] as const;

export const testimonials = [
  {
    quote:
      "ALX delivered a clean booking website that finally matched how we actually present the business online.",
    author: "Marlon James",
    role: "Director, Harbor Services",
  },
  {
    quote:
      "The dashboard and support work gave our team a practical system we could use every day, not just a good demo.",
    author: "Alyssa Reid",
    role: "Operations Lead, OpsFlow",
  },
] as const;

export const caseStudy = {
  client: "Northline Fitness",
  industry: "Membership and Booking Services",
  challenge:
    "The client needed a modern website, a smoother class-booking journey, and a clearer technical roadmap for future member features.",
  solution: [
    "Built a cleaner web experience around schedule visibility, service clarity, and direct calls to action.",
    "Mapped the product architecture for a lightweight internal workflow and future client portal features.",
    "Provided launch support, UX refinements, and a backlog of prioritized next-step enhancements.",
  ],
  outcomes: [
    "Launched a more professional web presence aligned with current services",
    "Reduced booking friction with clearer navigation and stronger action paths",
    "Created a practical delivery roadmap covering app, support, and future expansion",
  ],
} as const;

export const marketContext = {
  heading: "In Antigua, depth of reach matters more than raw volume",
  summary:
    "Antigua has a population of just 94,000. With tourism accounting for over 50% of GDP and 176,665 stay-over visitors recorded in H1 2024 alone, the primary local client pool is hospitality and tourism businesses, not a large universe. Business development KPIs must therefore track depth of penetration, not just volume of outreach.",
  source:
    "Source: DataReportal Digital 2025: Antigua and Barbuda; U.S. State Dept Investment Climate Statement 2024",
} as const;

export const marketKpis = [
  {
    metric: "New qualified leads / week",
    target: "5-10",
    rationale:
      "Small island market means leads must be targeted and qualified, not sprayed. Tourism sector has clear seasonal peaks (Nov-Apr) that drive urgency.",
    cadence: "Weekly",
  },
  {
    metric: "Outreach contacts / week",
    target: "15-20",
    rationale:
      "Consistent pipeline seeding via WhatsApp, LinkedIn, and email is essential; referral culture in Antigua means each contact has multiplier value.",
    cadence: "Weekly",
  },
  {
    metric: "Proposals sent / week",
    target: "2-4",
    rationale:
      "Tracks conversion from conversation to commercial intent. Benchmarks consistent deal flow against market size constraints.",
    cadence: "Weekly",
  },
  {
    metric: "Proposal-to-close rate",
    target: "25-40%",
    rationale:
      "Caribbean SMEs are price-sensitive but loyalty-driven; a close rate below 20% signals a positioning or pricing mismatch.",
    cadence: "Monthly",
  },
  {
    metric: "Average days to first close",
    target: "<=30 days",
    rationale:
      "Fast closes validate the low-friction entry offer strategy and reduce cash flow risk during the studio's launch phase.",
    cadence: "Monthly",
  },
  {
    metric: "Referrals received / month",
    target: "2+",
    rationale:
      "Word-of-mouth is the dominant trust mechanism in small island markets, so referrals are a core growth signal rather than a bonus channel.",
    cadence: "Monthly",
  },
] as const;
