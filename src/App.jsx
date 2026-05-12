import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Routes, Route, Navigate, useNavigate, useLocation, useParams, Link } from "react-router-dom";

// ─── Config ──────────────────────────────────────────────────────────────────
const PHONE = "(772) 882-7663";
const PHONE_HREF = "tel:7728827663";
const EMAIL = "stormproofroofinginc@gmail.com";
const COMPANY = "Roofing St. Lucie";

const PHOTOS = {
  waterfrontMetalRoofs: "/images/2022-05-11.jpg",
  beachfrontMetalRoof:  "/images/2022-05-11%20(1).jpg",
  aerialMetalRoof:      "/images/2022-05-11%20(2).jpg",
  floridaHomeMetal:     "/images/Photo_1080295440_DJI_16_jpg_4897821_0_202210610102_photo_preview.jpg",
  underlaymentInstall:  "/images/4192D5FB-CD32-4BE4-AD9D-1FBF96137005.jpeg",
  companyBuilding:      "/images/2023-03-04.jpg",
  teamPhoto:            "/images/2023-03-22.jpg",
  tealHomeMetal:        "/images/2023-03-22%20(1).jpg",
  stormDamageAerial:    "/images/2024-05-16.jpg",
  whiteHomeMetal:       "/images/2024-07-16.jpg",
  metalRoofInstall:     "/images/new%20photo%201.webp",
  waterfrontDroneRoofs: "/images/new%20photo%202.webp",
  shingleRoofCloseup:   "/images/new%20photo%203.webp",
  shingleHomeCharcoal:  "/images/new%20photo%204.webp",
  shingleHomeSunset:    "/images/new%20photo%205.webp",
  metalRoofDroneHome:   "/images/new%20photo%206.webp",
  tealHome2StoryMetal:  "/images/new%20photo%207.webp",
  tileRoofing:          "/images/Tile%20roofing.jpg",
  shingleRoofing:       "/images/shingle%20roof.jpg",
  shingleRoofingHero:   "/images/shingle%20roof%20service%20page.jpg",
  shingleRoofBefore:    "/images/shingle%20roof%20before.jpg",
  shingleRoofAfter:     "/images/shingle%20roof%20after.jpg",
};

const SERVICE_PHOTOS = {
  "roof-inspection":   { src: PHOTOS.companyBuilding,      alt: "Roofing St. Lucie company vehicle at a completed roofing project in Port St. Lucie Florida – professional roof inspection service" },
  "roof-installation": { src: PHOTOS.underlaymentInstall,  alt: "New roof installation with premium underlayment by Roofing St. Lucie – licensed roofing contractor St. Lucie County Florida" },
  "roof-repair":       { src: PHOTOS.whiteHomeMetal,       alt: "Completed metal roof on a residential home in Port St. Lucie Florida – Roofing St. Lucie expert roof repair" },
  "storm-damage":      { src: PHOTOS.stormDamageAerial,    alt: "Aerial view of emergency storm damage roof tarping on Treasure Coast Florida homes – Roofing St. Lucie 24/7 storm response" },
  "shingle-roofing":   { src: PHOTOS.shingleRoofingHero,   alt: "Shingle roof installation on a residential home in Port St. Lucie Florida – Roofing St. Lucie shingle roofing contractor" },
  "tile-roofing":      { src: PHOTOS.tileRoofing,          alt: "Tile roof installation on a Florida home by Roofing St. Lucie – licensed tile roofing contractor Port St. Lucie" },
  "metal-roofing":     { src: PHOTOS.aerialMetalRoof,      alt: "Aerial drone view of standing seam metal roof installation in Port St. Lucie Florida – Roofing St. Lucie metal roofing contractor" },
};

// ─── Services Data ───────────────────────────────────────────────────────────
const SERVICES = [
  {
    slug: "roof-inspection",
    name: "Roof Inspection",
    short: "Catch problems early with a thorough professional inspection.",
    icon: "search",
    description: "A professional roof inspection is the foundation of good roof health. Our certified inspectors examine every inch of your roof, from shingles and flashing to gutters, soffits, and underlayment, and provide a detailed report with honest recommendations.",
    longDesc: [
      "Regular roof inspections are one of the smartest investments a Port St. Lucie homeowner can make. Florida's harsh climate, including intense UV radiation, high humidity, tropical storms, and hurricane-force winds, accelerates roof wear far faster than in other parts of the country. Roofing St. Lucie recommends annual inspections for all Treasure Coast homes, especially those 10 years or older.",
      "Our certified roof inspectors in Port St. Lucie examine every component of your roofing system: shingles, tiles, or metal panels; flashing at chimneys, vents, and valleys; gutters, soffits, fascia, and drip edges; underlayment integrity; and attic ventilation. We document everything with photos and provide a written report with honest findings. No pressure sales tactics, ever.",
      "An inspection is also critical before and after hurricane season. Many insurance claims require documented proof of pre-storm roof condition. Our reports are detailed enough to satisfy insurance underwriters and support claims. If you're buying or selling a home in St. Lucie County, a licensed roof inspection is an essential part of due diligence.",
    ],
    bullets: [
      "Complete visual inspection of all roof components",
      "Identification of leaks, cracks, and damaged materials",
      "Flashing, gutters, soffits, and fascia assessment",
      "Detailed written report with photo documentation",
      "Honest recommendations, no pressure upsells",
      "Pre- and post-hurricane season inspections",
      "Insurance documentation reports",
    ],
    process: [
      { title: "Schedule", desc: "Call or email to book your free inspection at a time that works for you." },
      { title: "Inspect", desc: "Our certified inspector examines your entire roof system inside and out." },
      { title: "Report", desc: "You receive a full written report with photos and our honest recommendation." },
    ],
    faqs: [
      { q: "How much does a roof inspection cost in Port St. Lucie?", a: "Roofing St. Lucie offers free basic roof inspections for Port St. Lucie and St. Lucie County homeowners. Detailed insurance-documentation reports are available, so contact us for pricing." },
      { q: "How often should I have my roof inspected in Florida?", a: "We recommend annual inspections for all Florida homes, plus an additional inspection after any major storm. Roofs 15+ years old should be inspected every 6 months due to Florida's accelerated weathering." },
      { q: "Can a roof inspection help with my homeowner's insurance claim?", a: "Absolutely. Our written reports include photo documentation formatted specifically to support Florida homeowner insurance claims. We can also coordinate directly with your insurance adjuster." },
      { q: "What does a roof inspection include for Port St. Lucie homes?", a: "We cover all roofing materials (shingles, tiles, or metal), all flashings, gutters and drainage, soffits and fascia, and visible underlayment. Attic ventilation is inspected where accessible." },
    ],
  },
  {
    slug: "roof-installation",
    name: "Roof Installation",
    short: "New construction and full replacement done right the first time.",
    icon: "home",
    description: "Whether you're building a new home or replacing an aging roof, Roofing St. Lucie delivers expert installation backed by 30+ years of experience. We work with all major roofing materials and ensure every project meets Florida building codes.",
    longDesc: [
      "A new roof installation is one of the largest investments you'll make in your Port St. Lucie home, and one where quality truly matters. Our installation crews have completed hundreds of roofs across St. Lucie, Martin, and Indian River Counties. We know Florida building codes, local HOA requirements, and the specific demands of the Treasure Coast's coastal climate inside and out.",
      "We offer complete roof replacement services: tear-off and disposal of the old roofing system, full deck inspection and repair, premium underlayment installation, and material installation using manufacturer-spec fastening patterns required for Florida wind ratings. Every roof we install is inspected before, during, and after installation.",
      "Our most popular materials for Port St. Lucie homes are architectural asphalt shingles (cost-effective, 25–30 year lifespan), standing seam metal (40–50 year lifespan, exceptional storm resistance), and concrete tile (durable, classic Florida aesthetic). We help you choose the right material for your home, your HOA, and your budget.",
    ],
    bullets: [
      "New construction and full replacement",
      "Tear-off and disposal included",
      "All materials: shingle, tile, metal",
      "Florida Building Code compliant",
      "Licensed, bonded, and fully insured crew",
      "Manufacturer warranty + workmanship guarantee",
      "We handle all St. Lucie County permits",
      "HOA submission documentation provided",
    ],
    process: [
      { title: "Assessment", desc: "We evaluate your home and discuss material options and pricing." },
      { title: "Permit & Plan", desc: "We handle all permits and schedule your installation date." },
      { title: "Installation", desc: "Experienced crew completes your roof efficiently and cleanly." },
      { title: "Final Walkthrough", desc: "We walk through the finished job with you to ensure complete satisfaction." },
    ],
    faqs: [
      { q: "How long does a roof replacement take in Port St. Lucie?", a: "Most residential replacements take 1–3 days for shingles, 3–5 days for metal or tile, depending on home size. We always secure the roof before leaving each day." },
      { q: "Do I need a permit for a roof replacement in St. Lucie County?", a: "Yes, all roof replacements require a building permit. Roofing St. Lucie handles the entire permit process on your behalf at no extra charge." },
      { q: "What is the best roofing material for Port St. Lucie, FL?", a: "Metal roofing is our top recommendation: 40–50 year lifespan, superior hurricane resistance, and energy efficiency in Florida heat. Shingles are the budget-friendly option; tile is ideal for HOA communities with aesthetic requirements." },
      { q: "How much does a new roof cost in Port St. Lucie?", a: "Replacement ranges from $8,000–$15,000 for shingles, $18,000–$40,000+ for metal or tile, depending on size and material. Contact us for a free accurate estimate." },
    ],
  },
  {
    slug: "roof-repair",
    name: "Roof Repair",
    short: "Fast, reliable repairs to stop leaks and prevent further damage.",
    icon: "tool",
    description: "From a few missing shingles to active leaks, our repair team responds quickly to stop damage in its tracks. Small problems become big expenses when ignored, so we fix issues right the first time so you don't face costly repairs down the road.",
    longDesc: [
      "Roof repairs in Port St. Lucie require speed and accuracy. Florida's frequent afternoon thunderstorms and hurricane season mean a small leak can become major interior water damage within hours. Roofing St. Lucie's repair crews are locally based and can typically respond to emergency calls the same day anywhere in St. Lucie County.",
      "We repair all roofing systems common to the Treasure Coast: asphalt shingles, tile, metal, and flat roofs. Common repairs include missing or cracked shingles, failed flashing at skylights and chimneys, damaged soffit and fascia, ponding water on flat roofs, and re-sealing around vent pipes and HVAC penetrations. Our technicians find the root cause, not just patch the visible symptom.",
      "Many Port St. Lucie homeowners are surprised to learn that small repairs caught early save thousands. A $300 flashing repair can prevent a $15,000 deck replacement. We offer free repair estimates and are always honest about whether a repair or full replacement is the smarter answer for your situation.",
    ],
    bullets: [
      "Leak detection and repair",
      "Missing, cracked, or curling shingle replacement",
      "Flashing repair and re-sealing",
      "Soffit, fascia, and gutter repair",
      "Flat roof patching and coating",
      "Emergency tarping and temporary protection",
      "Same-day response throughout St. Lucie County",
    ],
    process: [
      { title: "Diagnosis", desc: "We locate the source of the problem, not just the symptom." },
      { title: "Estimate", desc: "You receive a clear, itemized estimate before any work begins." },
      { title: "Repair", desc: "We complete the repair efficiently with quality materials." },
      { title: "Follow-Up", desc: "We confirm the repair is holding and answer any questions." },
    ],
    faqs: [
      { q: "How quickly can you respond to a roof leak in Port St. Lucie?", a: "For emergency leaks in Port St. Lucie and St. Lucie County, we typically respond the same day. For non-emergency repairs, we usually schedule within 1–3 business days." },
      { q: "Can I repair just part of my roof instead of replacing it?", a: "Many roofs can be successfully repaired, especially when damage is isolated. We'll give you an honest assessment, and if a repair makes more sense than replacement, we'll tell you." },
      { q: "Will my homeowner's insurance cover roof repairs in Florida?", a: "Florida homeowner's insurance typically covers sudden damage from storms, wind, or falling objects. Gradual deterioration from age is usually not covered. We work with all major carriers and provide documentation to support your claim." },
      { q: "What causes most roof leaks in Port St. Lucie homes?", a: "The most common causes are failed flashing (especially around skylights, vents, and chimneys), storm-damaged or missing shingles, cracked tile, clogged gutters, and aging underlayment. We find the actual source, not just patch what's visible." },
    ],
  },
  {
    slug: "storm-damage",
    name: "Storm & Wind Damage",
    short: "Emergency storm response and insurance claim assistance.",
    icon: "storm",
    description: "Florida storms are serious, and so are we. Roofing St. Lucie provides rapid emergency response after hurricanes, tropical storms, and high-wind events. We document all damage thoroughly to support your insurance claim and restore your roof fast.",
    longDesc: [
      "The Treasure Coast is one of the most storm-prone regions in the United States. Port St. Lucie and surrounding communities in St. Lucie, Martin, and Indian River Counties experience direct hurricane hits and significant tropical storm impacts regularly. When a storm damages your roof, the window to prevent interior water damage is measured in hours, not days.",
      "Roofing St. Lucie maintains 24/7 storm response operations staffed by local crews who know every Treasure Coast community. We tarp your roof to stop water intrusion immediately, then provide complete photo and written documentation of all damage. That's exactly what Florida insurance adjusters need to process your claim quickly. We've helped hundreds of local homeowners navigate the insurance process.",
      "We work with all major Florida insurance carriers including Citizens Property Insurance, Universal Property, Heritage, Kin, and others. Our documentation standards meet or exceed adjuster requirements. We can be present during your adjuster visit to make sure all damage is captured, so you receive the full coverage you're entitled to.",
    ],
    bullets: [
      "24/7 emergency storm response, call anytime",
      "Emergency tarping to prevent interior damage",
      "Full storm damage documentation with photos",
      "Insurance claim support and adjuster coordination",
      "Complete repair or replacement as needed",
      "Florida wind damage code compliance",
      "Works with all Florida insurance carriers",
    ],
    process: [
      { title: "Emergency Call", desc: "Call us immediately. We're available 24/7 after storms." },
      { title: "Tarp & Secure", desc: "We tarp your roof fast to prevent water from entering your home." },
      { title: "Documentation", desc: "Full photo and written documentation of all storm damage." },
      { title: "Restore", desc: "Complete repair or replacement coordinated with your insurer." },
    ],
    faqs: [
      { q: "What should I do first after a storm damages my roof in Port St. Lucie?", a: "Call Roofing St. Lucie immediately at (772) 882-7663. We'll dispatch a crew to tarp your roof and stop water intrusion. Don't wait, because interior damage begins within hours. Then call your insurance company to open a claim." },
      { q: "How do I know if my roof was damaged after a hurricane?", a: "Signs include missing shingles or tiles, granules in gutters, daylight through the attic, water stains on interior ceilings, damaged gutters, and lifted metal panels. Even without visible signs, have a professional inspect after any major storm, because some damage is only visible up close." },
      { q: "Will my insurance cover hurricane roof damage in Florida?", a: "Yes. Florida homeowner's insurance covers hurricane and wind damage. However, most policies carry a separate hurricane deductible of 2–5% of your insured value. We help you understand your coverage and work with your adjuster to ensure all damage is captured." },
      { q: "How long does storm damage roof repair take in St. Lucie County?", a: "Emergency tarping happens within hours of your call. Full repairs or replacement after insurance approval typically take 2–7 days depending on damage extent. We work as fast as possible to restore your home." },
    ],
  },
  {
    slug: "metal-roofing",
    name: "Metal Roofing",
    short: "The most durable, storm-resistant roofing choice for Florida homes.",
    icon: "shield",
    description: "Metal roofing is the fastest-growing choice on the Treasure Coast. With a 40–50 year lifespan, exceptional hurricane resistance, and significant energy savings, it delivers outstanding long-term value for Port St. Lucie homeowners.",
    longDesc: [
      "Metal roofing has become the #1 choice for homeowners across Port St. Lucie, Fort Pierce, and the Treasure Coast who want the absolute best protection for their home. Standing seam metal roofs, which are the most popular style we install, feature concealed fasteners, snap-lock panels, and rated wind resistance well above 150 mph. In a region that sees direct hurricane impacts, that performance matters every single year.",
      "Roofing St. Lucie specializes in metal roofing installation across St. Lucie, Martin, and Indian River Counties. Our crews are trained on standing seam, corrugated metal, and metal shingle systems from top manufacturers including Fabral, McElroy Metal, and ATAS. Every installation follows Florida Building Code requirements for wind uplift and is engineered to withstand our coastal salt-air environment.",
      "Beyond storm protection, metal roofing delivers significant energy savings for Port St. Lucie homeowners. Metal roofs reflect solar heat rather than absorbing it, reducing cooling loads by 25–40% during Florida's intense summers. Over the roof's lifetime these savings are substantial, and many Florida insurance carriers offer 20–35% premium discounts for homes with qualifying metal roofing systems.",
    ],
    bullets: [
      "Standing seam and corrugated metal available",
      "40–50 year manufacturer warranties",
      "Wind resistance rated 160+ mph",
      "25–40% energy savings in Florida heat",
      "Salt-air and coastal corrosion resistant",
      "20+ colors to match any home style",
      "Insurance discount eligible in Florida",
      "Qualifies for Florida green energy incentives",
    ],
    process: [
      { title: "Consultation", desc: "We assess your home, discuss metal options, and provide a free detailed estimate." },
      { title: "Material Selection", desc: "Choose your panel profile, color, and gauge with our expert guidance." },
      { title: "Installation", desc: "Our certified metal roofing crew installs to manufacturer specifications." },
      { title: "Inspection & Warranty", desc: "Final walkthrough, permit close-out, and manufacturer warranty registration." },
    ],
    faqs: [
      { q: "Is metal roofing a good choice for Port St. Lucie, FL?", a: "Metal roofing is one of the best choices available. It offers outstanding hurricane resistance (rated 150+ mph), 40–50 year lifespans, excellent energy efficiency, and strong resistance to the salt-air corrosion common on the Treasure Coast." },
      { q: "How much does metal roofing cost in Port St. Lucie?", a: "Metal roof installation typically ranges from $18,000 to $40,000+ depending on home size, panel profile, and existing roof condition. The 40–50 year lifespan and energy savings make it extremely cost-effective over time." },
      { q: "Does metal roofing lower my homeowner's insurance in Florida?", a: "Yes. Many Florida carriers offer discounts of 20–35% for homes with qualifying metal roofing. Standing seam metal often receives the highest wind mitigation credits, substantially reducing your annual premium." },
      { q: "Will my Port St. Lucie HOA approve a metal roof?", a: "Many HOA communities in Port St. Lucie now approve metal roofing, especially in earth-tone colors. We prepare all HOA submission documentation and assist with the approval process." },
      { q: "Is a metal roof noisy in Florida rain?", a: "Not with proper installation. Metal installed over solid decking (standard in Florida) is no louder than shingle or tile. Many homeowners find their metal roof quieter than what it replaced." },
    ],
  },
  {
    slug: "shingle-roofing",
    name: "Shingle Roofing",
    short: "The most popular and cost-effective roofing solution in Florida.",
    icon: "layers",
    description: "Asphalt shingle roofing is the most widely used roofing material in Florida. It's durable, cost-effective, and available in dozens of styles and colors. We install architectural and dimensional shingles from top manufacturers with full warranty coverage.",
    longDesc: [
      "Asphalt shingles remain the most popular roofing choice for Port St. Lucie and St. Lucie County homeowners, offering an excellent balance of durability, aesthetics, and cost. Modern architectural shingles from GAF, Owens Corning, and CertainTeed are engineered to withstand Florida's wind speeds and UV exposure when properly installed.",
      "For Treasure Coast homes we specifically recommend impact-resistant Class 4 shingles rated for high-wind zones. Florida building codes require shingles to meet specific wind uplift ratings, and we ensure every installation is fully compliant. The right shingle installation also requires premium underlayment; we use Sharkskin SA for maximum waterproofing beneath every shingle.",
      "Shingle roofs in Port St. Lucie typically last 20–30 years with proper maintenance. The key factors affecting longevity in our climate are attic ventilation (critical in Florida heat), underlayment quality, and precise installation technique. Our crews are manufacturer-certified and install to exact specification, which is required to keep your manufacturer warranty valid.",
    ],
    bullets: [
      "Architectural and 3-tab shingle options",
      "Impact-resistant shingles for hurricane zones",
      "Wide variety of colors and styles",
      "15–30 year manufacturer warranties",
      "Premium underlayment and proper ventilation",
      "Florida wind rating compliance",
      "GAF, Owens Corning, CertainTeed brands",
    ],
    process: [
      { title: "Consultation", desc: "Choose your shingle style, color, and grade with our guidance." },
      { title: "Old Roof Removal", desc: "We safely remove and dispose of your existing roofing material." },
      { title: "Deck Prep", desc: "Deck inspection, underlayment, and drip edge installation." },
      { title: "Installation", desc: "Professional shingle installation per manufacturer specifications." },
    ],
    faqs: [
      { q: "How long do shingle roofs last in Port St. Lucie, FL?", a: "With proper installation and ventilation, architectural shingles last 20–30 years in Port St. Lucie. Florida's intense sun can shorten lifespan compared to cooler climates, which is why proper ridge ventilation and annual inspections are essential." },
      { q: "What shingles are best for hurricane-prone areas like the Treasure Coast?", a: "We recommend impact-resistant architectural shingles rated for 130+ mph winds. GAF Timberline HDZ and Owens Corning Duration are top choices for St. Lucie County and often qualify for insurance discounts." },
      { q: "Can I get an insurance discount for impact-resistant shingles in Florida?", a: "Yes. Many Florida carriers offer 10–25% premium discounts for homes with qualifying Class 4 impact-resistant shingles. The discount can significantly offset the slightly higher product cost over time." },
      { q: "How much does shingle roofing cost in Port St. Lucie?", a: "Shingle roof replacement in Port St. Lucie typically ranges from $8,000 to $15,000 for a standard home depending on size, pitch, and grade. Contact us for a free accurate estimate." },
    ],
    beforeAfter: {
      before: { src: PHOTOS.shingleRoofBefore, alt: "Old damaged shingle roof before replacement by Roofing St. Lucie in Port St. Lucie Florida" },
      after:  { src: PHOTOS.shingleRoofAfter,  alt: "Completed new shingle roof installation by Roofing St. Lucie in Port St. Lucie Florida" },
    },
  },
  {
    slug: "tile-roofing",
    name: "Tile Roofing Systems",
    short: "Classic beauty and long-lasting durability for Florida homes.",
    icon: "grid",
    description: "Tile roofing is a premium choice prized for its longevity, beauty, and excellent performance in Florida's climate. Whether you prefer concrete or clay tile, our crew has the specialized skills to install and repair tile roofs to the highest standard.",
    longDesc: [
      "Tile roofing is synonymous with Florida architecture, and for homes across Port St. Lucie, Fort Pierce, and the Treasure Coast it remains a premium and popular choice. Concrete and clay tile roofs offer lifespans of 40–50+ years, exceptional fire resistance, and outstanding thermal performance. That matters a lot when Florida summers push attic temperatures well past 140°F.",
      "Roofing St. Lucie has specialized tile crews with the skills tile installation requires. Unlike shingle or metal, tile demands precise structural load assessment (tile weighs significantly more than other materials), a tile-rated underlayment system, and a specific fastening method to meet Florida's strict wind uplift requirements. We handle every step correctly, ensuring your tile roof performs through decades of Florida weather.",
      "Tile is also the preferred or required material for many HOAs and planned communities across St. Lucie County and Martin County. If your community requires tile, we'll help you select the right profile and color, navigate the HOA approval process, and deliver a finished product that enhances your home's curb appeal and market value.",
    ],
    bullets: [
      "Concrete and clay tile installation",
      "Tile-specific underlayment systems",
      "Superior wind and impact resistance",
      "Excellent thermal performance in Florida heat",
      "50+ year lifespan with proper maintenance",
      "Tile repair and re-pointing available",
      "HOA submission documentation included",
    ],
    process: [
      { title: "Structural Review", desc: "We verify your roof structure can support the tile weight." },
      { title: "Underlayment", desc: "Tile-rated underlayment installed for maximum waterproofing." },
      { title: "Tile Installation", desc: "Each tile is expertly set and secured to withstand Florida winds." },
      { title: "Final Inspection", desc: "Quality check to ensure every tile is properly set and sealed." },
    ],
    faqs: [
      { q: "How long does tile roofing last in Port St. Lucie, FL?", a: "Concrete and clay tile can last 40–50 years or more. The tile itself often outlasts the underlayment, which typically needs replacement every 20–25 years. We offer tile-off underlayment replacement to extend the life of your existing tile." },
      { q: "Can my home in St. Lucie County support tile roofing?", a: "Most homes built after 1990 can support tile. Older homes may need structural reinforcement. We perform a structural assessment before every tile installation to confirm your home can safely support the added weight." },
      { q: "My HOA requires tile. What are my options in Port St. Lucie?", a: "We work with homeowners throughout Port St. Lucie, Tradition, and other HOA communities to select compliant tile profiles and colors. We prepare all submission documentation and handle the approval process on your behalf." },
      { q: "How much does tile roofing cost in Port St. Lucie?", a: "Tile installation ranges from $18,000 to $35,000+ depending on home size, tile type, and structural requirements. Tile's 50+ year lifespan makes it a cost-effective long-term investment." },
    ],
  },
];

// ─── Locations Data ──────────────────────────────────────────────────────────
const LOCATIONS = [
  {
    slug: "port-st-lucie",
    name: "Port St. Lucie",
    county: "St. Lucie County",
    desc: "Serving all neighborhoods in Port St. Lucie from Tradition to the Treasure Coast waterfront.",
    detail: "Port St. Lucie is one of the fastest-growing cities in Florida, and Roofing St. Lucie has been protecting its homes for decades. From Tradition and Torino to River Park and the Crosstown Parkway corridor, our crews know the area and understand the local building requirements.",
    neighborhoods: ["Tradition","Torino","St. Lucie West","River Park","Floresta","Gatlin","Crossroads","Sandpiper Bay","Lake Charles","Tesoro","The Verano","Legacy"],
    paragraphs: [
      "Port St. Lucie has grown from a small retirement community into one of Florida's most populous cities, with over 230,000 residents and thousands of new homes being built every year in communities like Tradition, Verano, and Legacy. Roofing St. Lucie has grown alongside the city, and our crews are intimately familiar with the specific roofing requirements and challenges of every Port St. Lucie neighborhood.",
      "One of the key challenges for Port St. Lucie homeowners is Florida's high wind zone designation. All roofing work in St. Lucie County must meet strict wind uplift requirements that exceed the rest of the country. Our crews are trained and certified for Florida's high wind zone requirements, and every installation we complete is fully code-compliant and permit-inspected.",
      "Whether you're in a new home in Tradition, an established neighborhood off Port St. Lucie Blvd, or a waterfront property near the North Fork or South Fork of the St. Lucie River, our team is familiar with your community and ready to deliver a roof that lasts.",
    ],
    faqs: [
      { q: "What is the best roofing company in Port St. Lucie, FL?", a: "Roofing St. Lucie has served Port St. Lucie homeowners for 30+ years. We're locally based, fully licensed and insured in Florida, and have completed hundreds of roofing projects across every Port St. Lucie neighborhood from Tradition to River Park." },
      { q: "How much does a new roof cost in Port St. Lucie?", a: "New roof costs range from $8,000–$15,000 for shingles, $18,000–$40,000 for metal, and $18,000–$35,000 for tile on a standard home. Contact us for a free estimate tailored to your specific home." },
      { q: "Do I need a permit for a roof replacement in Port St. Lucie?", a: "Yes, all roof replacements in Port St. Lucie require a building permit from St. Lucie County. We handle the entire permit process on your behalf at no additional charge." },
      { q: "How long does it take to replace a roof in Port St. Lucie?", a: "Most residential replacements take 1–3 days for shingles, 3–5 days for metal or tile depending on home size and complexity." },
    ],
  },
  {
    slug: "st-lucie-county",
    name: "St. Lucie County",
    county: "St. Lucie County",
    desc: "Complete roofing services throughout St. Lucie County including Fort Pierce and surrounding communities.",
    detail: "We serve all of St. Lucie County with the same quality and care. From the barrier islands to western communities, our licensed team handles inspections, installations, repairs, and storm damage restoration across the entire county.",
    neighborhoods: ["Fort Pierce","White City","Lakewood Park","Walton","Indrio","Tropical Farms","Southbend","Savanna Club","Midway","Hutchinson Island"],
    paragraphs: [
      "St. Lucie County is home to over 330,000 residents across a diverse mix of urban, suburban, and rural communities. From the coastal communities along Hutchinson Island and Fort Pierce Inlet to the growing western suburbs around Tradition and the agricultural areas of White City and Walton, Roofing St. Lucie serves the entire county.",
      "Roofing requirements vary across St. Lucie County based on proximity to the coast. Properties within the High Velocity Hurricane Zone near the shore have additional requirements that our crews are trained and equipped to meet. Inland properties still require strict wind uplift compliance under Florida Building Code.",
      "Our team understands the demands of each part of St. Lucie County: the salt air exposure of barrier island homes, the age of housing stock in historic Fort Pierce neighborhoods, and the new construction requirements of the rapidly growing western communities.",
    ],
    faqs: [
      { q: "Does Roofing St. Lucie serve all of St. Lucie County?", a: "Yes. We serve all communities including Fort Pierce, Port St. Lucie, White City, Lakewood Park, Walton, Indrio, Hutchinson Island, and all unincorporated areas of the county." },
      { q: "What are the roofing permit requirements in St. Lucie County?", a: "All roofing work (repair or replacement) in St. Lucie County requires a permit. We handle all permit applications and inspections on your behalf through the St. Lucie County Building Department." },
      { q: "Are there special roofing requirements for coastal homes in St. Lucie County?", a: "Yes. Homes in the High Velocity Hurricane Zone near the coast have stricter requirements for wind uplift, fastening patterns, and underlayment. All of our crews are certified for HVHZ work." },
    ],
  },
  {
    slug: "martin-county",
    name: "Martin County",
    county: "Martin County",
    desc: "Serving Stuart, Hobe Sound, Palm City, Jensen Beach, and all of Martin County.",
    detail: "Martin County homeowners trust Roofing St. Lucie for expert service in Stuart, Palm City, Jensen Beach, Hobe Sound, and beyond. We understand the unique roofing challenges of coastal and inland Martin County properties.",
    neighborhoods: ["Stuart","Palm City","Jensen Beach","Hobe Sound","Indiantown","Rio","Sewall's Point","Ocean Breeze Park","Hutchinson Island (Martin County)"],
    paragraphs: [
      "Martin County is known as the Treasure Coast's crown jewel, a community that has deliberately managed growth to preserve its natural beauty and quality of life. The roofing challenges here are unique: coastal salt air from the Atlantic and Indian River Lagoon, premium waterfront properties along the St. Lucie River and Intracoastal, and historic homes in downtown Stuart that require materials matching the character of the neighborhood.",
      "Roofing St. Lucie has been serving Martin County for over 30 years. We understand the specific requirements of Martin County Building and Permitting, the coastal zone considerations for Hutchinson Island and ocean-facing properties, and the aesthetic sensibilities of upscale communities in Palm City and Sewall's Point.",
      "From emergency storm repairs after hurricane season to complete tile roof replacements on Palm City estate homes, our Martin County crews deliver the same quality and care that has made us the Treasure Coast's trusted roofing contractor.",
    ],
    faqs: [
      { q: "What roofing services does Roofing St. Lucie offer in Martin County?", a: "We offer the full range of roofing services in Martin County: inspection, installation, repair, storm damage response, metal roofing, tile roofing, and shingle roofing. We serve Stuart, Palm City, Jensen Beach, Hobe Sound, and all of Martin County." },
      { q: "Does Roofing St. Lucie pull permits in Martin County?", a: "Yes. We are fully licensed for Martin County and handle all permit applications and inspections through Martin County's permitting office on your behalf." },
    ],
  },
  {
    slug: "indian-river-county",
    name: "Indian River County",
    county: "Indian River County",
    desc: "Expert roofing for Vero Beach, Sebastian, and all of Indian River County.",
    detail: "From Vero Beach to Sebastian and Fellsmere, Roofing St. Lucie brings the same 30+ years of expertise to Indian River County homeowners. Licensed, insured, and ready to protect your investment.",
    neighborhoods: ["Vero Beach","Sebastian","Fellsmere","Gifford","Wabasso","Orchid Island","Indian River Shores","Oslo","Windsor"],
    paragraphs: [
      "Indian River County stretches from the barrier islands of Orchid Island and Wabasso along the Atlantic coast to the western communities of Fellsmere and Gifford. The county's roofing environment is dominated by two factors: coastal exposure to salt air and Atlantic weather systems, and the premium property values that make quality materials and craftsmanship essential.",
      "Vero Beach and the barrier island communities of Indian River Shores and Orchid Island represent some of the most demanding coastal roofing environments in Florida. Properties here require materials and installation methods specifically rated for High Velocity Hurricane Zone conditions. Our crews are certified for HVHZ work throughout Indian River County.",
      "Sebastian homeowners trust us for everything from storm damage repair after nor'easters to complete metal roof replacements on waterfront properties along the Sebastian River and Indian River Lagoon.",
    ],
    faqs: [
      { q: "Does Roofing St. Lucie serve Vero Beach and Sebastian, FL?", a: "Yes. We serve all of Indian River County including Vero Beach, Sebastian, Indian River Shores, Orchid Island, Fellsmere, and all unincorporated areas. Call (772) 882-7663 for a free estimate." },
      { q: "What roofing materials work best for Vero Beach coastal homes?", a: "Standing seam metal roofing is our top recommendation for Vero Beach and coastal Indian River County properties. It offers superior salt-air corrosion resistance, excellent hurricane performance, and a 40–50 year lifespan. Impact-rated tile is also an excellent choice for barrier island homes." },
    ],
  },
  {
    slug: "fort-pierce",
    name: "Fort Pierce",
    county: "St. Lucie County",
    desc: "Local roofing experts serving Fort Pierce and the surrounding Treasure Coast communities.",
    detail: "Fort Pierce is home and we're proud to serve it. Roofing St. Lucie handles everything from historic downtown area homes to newer construction throughout Fort Pierce, with quick response times and honest pricing.",
    neighborhoods: ["Downtown Fort Pierce","White City","Lakewood Park","Weatherbee","Fort Pierce Inlet area","North Fort Pierce","Lincoln Park","Indian Hills"],
    paragraphs: [
      "Fort Pierce is the county seat of St. Lucie County and one of the Treasure Coast's most historic cities. Its housing stock ranges from pre-WWII bungalows in Lincoln Park and downtown to mid-century ranch homes in Lakewood Park and newer construction in North Fort Pierce. Roofing St. Lucie has worked on every type of Fort Pierce home for decades.",
      "Fort Pierce's location on the Treasure Coast makes it particularly vulnerable to both Atlantic hurricanes and the salt air corrosion that comes with proximity to Fort Pierce Inlet and the Indian River Lagoon. Our Fort Pierce customers frequently need materials with enhanced corrosion resistance, and we always recommend this for properties within 5 miles of the coast.",
      "We're a local company based right here on the Treasure Coast. When Fort Pierce homeowners call us after a storm, we're not driving from Miami or Orlando. We're your neighbors, and we respond fast.",
    ],
    faqs: [
      { q: "What roofing contractors serve Fort Pierce, FL?", a: "Roofing St. Lucie is a locally based contractor serving Fort Pierce and all of St. Lucie County for 30+ years. We offer free estimates for all roofing services in Fort Pierce including inspections, repairs, storm damage response, and full replacement." },
      { q: "How do I file a roof insurance claim in Fort Pierce after a storm?", a: "Call Roofing St. Lucie at (772) 882-7663 for emergency tarping and damage documentation. Then contact your insurance company to open a claim. We provide detailed photo documentation that Florida adjusters require." },
    ],
  },
  {
    slug: "tradition",
    name: "Tradition, FL",
    county: "St. Lucie County",
    desc: "New home and master-planned community roofing in Tradition, Port St. Lucie's premier development.",
    detail: "Tradition is Port St. Lucie's premier master-planned community featuring thousands of homes with HOA requirements and Florida Building Code needs that require a knowledgeable local contractor.",
    neighborhoods: ["Tradition Town Center","Copper Creek","Manderlie","Heritage Oaks","Telaro","Victoria Parc","The Estates at Tradition","Town Park"],
    paragraphs: [
      "Tradition is one of St. Lucie County's most desirable and fastest-growing communities, with thousands of homes ranging from townhomes to luxury estate properties. Many Tradition homeowners are dealing with their first major roofing service, whether a post-storm inspection, a repair, or an early replacement on a builder-grade roof installed 10–15 years ago.",
      "Roofing St. Lucie is experienced with Tradition's HOA requirements. Most Tradition neighborhoods maintain specific approved roofing material lists, color palettes, and installation requirements. We prepare all HOA documentation, submit on your behalf, and ensure your new roof meets the community's aesthetic standards.",
      "New construction in Tradition continues at a rapid pace. For builders and developers we offer competitive new construction roofing services with fast scheduling and the craftsmanship that protects your project and your reputation.",
    ],
    faqs: [
      { q: "Does Roofing St. Lucie work in the Tradition community in Port St. Lucie?", a: "Yes. We are fully familiar with Tradition's HOA requirements and serve all Tradition neighborhoods including Copper Creek, Manderlie, Heritage Oaks, Telaro, and others. We handle all HOA submissions and approvals." },
      { q: "What roofing materials are HOA-approved in Tradition, Port St. Lucie?", a: "Approved materials vary by neighborhood. Common options include architectural shingles in specific color families, concrete tile in HOA-approved profiles, and in some areas metal roofing in approved earth tones. We verify your specific neighborhood's requirements before recommending materials." },
    ],
  },
  {
    slug: "stuart",
    name: "Stuart, FL",
    county: "Martin County",
    desc: "Premier roofing services for Stuart, Florida, Martin County's historic Treasure Coast hub.",
    detail: "Stuart is Martin County's historic downtown hub featuring a diverse mix of architecture from bungalows to modern waterfront estates. Roofing St. Lucie serves all of Stuart with expert installation, repair, and storm damage services.",
    neighborhoods: ["Downtown Stuart","Rio","Rocky Point","North Stuart","South Fork area","Sewall's Point","St. Lucie Inlet area"],
    paragraphs: [
      "Stuart, FL is the heart of Martin County and one of the Treasure Coast's most distinctive communities. Known for its historic downtown, its position at the confluence of the St. Lucie River and Intracoastal Waterway, and its coastal lifestyle, Stuart is home to a wide range of properties, from historic bungalows to high-end waterfront estates.",
      "Roofing in Stuart comes with unique considerations. Proximity to the water means salt air corrosion is a constant factor. Historic properties in downtown Stuart may have requirements from Martin County's Historic Preservation office. Waterfront properties along the St. Lucie River face additional wind exposure. Roofing St. Lucie understands every one of these factors.",
      "We've served Stuart homeowners for over 30 years and have completed projects throughout every Stuart neighborhood. Our team is fully licensed for Martin County work and pulls all required permits through Martin County's permitting office.",
    ],
    faqs: [
      { q: "What roofing companies serve Stuart, FL?", a: "Roofing St. Lucie serves Stuart and all of Martin County. We've been the Treasure Coast's trusted roofing contractor for 30+ years. Call (772) 882-7663 for a free estimate in Stuart." },
      { q: "Do you handle roofing permits in Stuart, FL?", a: "Yes. We handle all permit applications and inspections through Martin County's permitting office for all Stuart roofing projects." },
    ],
  },
  {
    slug: "jensen-beach",
    name: "Jensen Beach, FL",
    county: "Martin County",
    desc: "Expert roofing services for Jensen Beach and Hutchinson Island, Martin County.",
    detail: "Jensen Beach is one of the Treasure Coast's most beloved communities, featuring barrier island living on Hutchinson Island and mainland neighborhoods along the Indian River Lagoon.",
    neighborhoods: ["Hutchinson Island (Jensen Beach)","Jensen Beach Blvd area","Mangrove Bay","Jensen Beach downtown","Rio","Indian Pines"],
    paragraphs: [
      "Jensen Beach occupies some of the most beautiful real estate on the Treasure Coast, with barrier island living on Hutchinson Island and waterfront properties along the Indian River Lagoon. This coastal environment places exceptional demands on roofing materials: salt air exposure, hurricane-force winds, and intense UV radiation year-round.",
      "Hutchinson Island properties in particular require materials and installation methods certified for High Velocity Hurricane Zone conditions. Our crews are HVHZ-certified and experienced with the unique requirements of barrier island homes. We've installed and repaired roofs on some of Jensen Beach's most beautiful oceanfront properties.",
      "For mainland Jensen Beach neighborhoods we provide the full range of residential roofing services, from routine inspections and repairs to complete metal and tile roof replacements backed by our 30-year track record on the Treasure Coast.",
    ],
    faqs: [
      { q: "Does Roofing St. Lucie serve Jensen Beach and Hutchinson Island?", a: "Yes. We serve all of Jensen Beach including Hutchinson Island properties. We are HVHZ-certified for coastal barrier island work. Call (772) 882-7663 for a free estimate." },
    ],
  },
  {
    slug: "palm-city",
    name: "Palm City, FL",
    county: "Martin County",
    desc: "Quality roofing services for Palm City's upscale communities and waterfront estates.",
    detail: "Palm City is one of Martin County's most upscale communities, featuring estate homes, gated communities, and properties along the St. Lucie River and Indian River Lagoon.",
    neighborhoods: ["Crane Creek Country Club","Harbour Ridge","Cobblestone","Palm Cove Golf & Yacht Club","Martin Downs","Stuart West","Rustic Hills"],
    paragraphs: [
      "Palm City is Martin County's premier residential community, featuring gated communities, waterfront estates, golf course homes, and equestrian properties that represent some of the highest-value real estate on the Treasure Coast. Homeowners here expect premium materials and premium service, and that's exactly what Roofing St. Lucie delivers.",
      "Metal roofing and tile roofing are the materials of choice for many Palm City estate homes. We specialize in premium standing seam metal and clay tile installation for Palm City's luxury properties, with the attention to detail that high-value homes demand.",
      "Storm damage is a serious concern for Palm City homeowners, particularly for waterfront properties along the St. Lucie River and Intracoastal Waterway. Our 24/7 storm response team is always ready to protect your home.",
    ],
    faqs: [
      { q: "What roofing services are available in Palm City, FL?", a: "We provide all roofing services in Palm City including inspection, installation, repair, storm damage response, metal roofing, tile roofing, and shingle roofing. Call (772) 882-7663 for a free estimate." },
    ],
  },
  {
    slug: "vero-beach",
    name: "Vero Beach, FL",
    county: "Indian River County",
    desc: "Trusted roofing services for Vero Beach and Indian River County homeowners.",
    detail: "Vero Beach is Indian River County's premier destination, an affluent coastal community with a mix of historic homes, barrier island estates, and inland neighborhoods.",
    neighborhoods: ["Vero Beach Barrier Island","Indian River Shores","The Moorings","John's Island","Orchid Island","Central Beach","Downtown Vero Beach","Sebastian","Wabasso"],
    paragraphs: [
      "Vero Beach is one of Florida's most beloved coastal communities, sophisticated, beautiful, and home to some of the best beaches on the Atlantic coast. It's also one of the most demanding roofing environments: oceanfront exposure, hurricane seasons, and premium property values that make the stakes of any roofing failure very high.",
      "Our Indian River County crews have extensive experience with Vero Beach's barrier island properties on Orchid Island, the exclusive communities of John's Island and The Moorings, and the residential neighborhoods of the mainland. We work within all Indian River County building and permit requirements.",
      "Metal roofing is increasingly popular in Vero Beach for its combination of hurricane resistance, salt air corrosion resistance, and premium appearance that complements the aesthetic sensibilities of Vero's upscale communities.",
    ],
    faqs: [
      { q: "Does Roofing St. Lucie serve Vero Beach, FL?", a: "Yes. We serve all of Vero Beach and Indian River County including barrier island properties on Orchid Island and Indian River Shores, as well as mainland Vero Beach, Sebastian, and Fellsmere. Call (772) 882-7663." },
      { q: "What roofing materials are best for Vero Beach oceanfront homes?", a: "Standing seam metal roofing is our top recommendation for Vero Beach oceanfront properties. It offers superior salt-air corrosion resistance, excellent hurricane performance, and a 40–50 year lifespan." },
    ],
  },
];

// ─── Reviews ─────────────────────────────────────────────────────────────────
const REVIEWS = [
  { name: "Michael T.", location: "Tradition, Port St. Lucie", service: "Metal Roof Replacement", stars: 5, text: "Roofing St. Lucie replaced our entire roof with a standing seam metal system after hurricane damage. From the first inspection to the final walkthrough the team was professional, transparent, and did exceptional work. We feel completely prepared for storm season." },
  { name: "Sandra R.", location: "River Park, Port St. Lucie", service: "Emergency Storm Repair", stars: 5, text: "Called them at 8pm after a storm tore off part of our roof. They had a crew here within 2 hours to tarp it and the full repair was done within a week. They also helped us navigate the insurance paperwork. Couldn't be more grateful." },
  { name: "James & Maria L.", location: "Palm City, Martin County", service: "Tile Roof Installation", stars: 5, text: "We needed a full tile roof replacement. Roofing St. Lucie handled everything: the permit, the HOA submission, even coordinating with our insurance company. The crew was clean, efficient, and the finished product is beautiful. Highly recommend." },
  { name: "Bob K.", location: "Fort Pierce", service: "Roof Repair", stars: 5, text: "Another company quoted me for a full replacement. Roofing St. Lucie came out, found the actual problem (failed flashing, not the whole roof) and fixed it for a fraction of the cost. It's held up through two storm seasons. Honest and skilled. Rare combination." },
  { name: "Carol M.", location: "Vero Beach", service: "Shingle Roof Replacement", stars: 5, text: "After 4 quotes I chose Roofing St. Lucie because they were the most thorough in explaining exactly what they'd do and why. The installation was done in 2 days and they cleaned up perfectly. 5 stars without hesitation." },
];

// ─── Utilities ───────────────────────────────────────────────────────────────
function cx(...args) {
  return args.filter(Boolean).join(" ");
}

const EASE = [0.22, 1, 0.36, 1];

function Reveal({ children, className, y = 36, x = 0, delay = 0, duration = 0.6 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function RevealStagger({ children, className, staggerDelay = 0.1 }) {
  return (
    <motion.div
      className={className}
      variants={{ hidden: {}, show: { transition: { staggerChildren: staggerDelay } } }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

function RevealItem({ children, className }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 28 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── SEO Hook ────────────────────────────────────────────────────────────────
function useSEO(title, description) {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", description);
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `https://www.roofingstlucie.com${pathname}`);
  }, [title, description, pathname]);
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

// ─── Count Up Hook ───────────────────────────────────────────────────────────
function useCountUp(end, duration = 1800) {
  const [val, setVal] = useState(0);
  const elemRef = React.useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const startTime = Date.now();
        const tick = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setVal(Math.floor(eased * end));
          if (progress < 1) requestAnimationFrame(tick);
          else setVal(end);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    if (elemRef.current) observer.observe(elemRef.current);
    return () => observer.disconnect();
  }, [end, duration]);
  return [val, elemRef];
}

function StatCounter({ display, label }) {
  const numPart = parseInt(display.replace(/,/g, ""), 10);
  const suffix = display.replace(/[\d,]/g, "");
  const [val, ref] = useCountUp(numPart);
  const formatted = numPart >= 1000 ? val.toLocaleString() : String(val);
  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl font-extrabold text-green-600 mb-1">{formatted}{suffix}</div>
      <div className="text-xs text-slate-500 leading-tight">{label}</div>
    </div>
  );
}

// ─── FAQ Accordion ────────────────────────────────────────────────────────────
function FAQAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full text-left px-5 py-4 flex items-center justify-between font-semibold text-blue-900 hover:bg-slate-50 transition-colors text-sm"
          >
            <span className="pr-4">{faq.q}</span>
            <motion.span animate={{ rotate: openIndex === i ? 90 : 0 }} transition={{ duration: 0.18 }} className="shrink-0">
              <Icon type="chevron" size={16} className="text-slate-400" />
            </motion.span>
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: EASE }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-4 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100">{faq.a}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// ─── Floating Call Button ─────────────────────────────────────────────────────
function FloatingCallButton() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={PHONE_HREF}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 left-5 z-50 md:hidden flex items-center gap-2 bg-green-600 text-white font-extrabold px-5 py-3.5 rounded-full shadow-xl shadow-green-900/40 text-sm"
        >
          <motion.span
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="inline-flex"
          >
            <Icon type="phone" size={16} />
          </motion.span>
          Free Estimate
        </motion.a>
      )}
    </AnimatePresence>
  );
}

// ─── Icons ───────────────────────────────────────────────────────────────────
function Icon({ type, size = 24, className = "" }) {
  const s = { width: size, height: size, flexShrink: 0 };
  const map = {
    phone: (
      <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.39 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    mail: (
      <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    menu: (
      <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    ),
    x: (
      <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
    check: (
      <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    chevron: (
      <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    ),
    shield: (
      <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    star: (
      <svg {...s} viewBox="0 0 24 24" fill="currentColor">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    search: (
      <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    home: (
      <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    tool: (
      <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    storm: (
      <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9" /><polyline points="13 11 9 17 15 17 11 23" />
      </svg>
    ),
    layers: (
      <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    grid: (
      <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    clock: (
      <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    award: (
      <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
    users: (
      <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    dollar: (
      <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    "arrow-right": (
      <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
      </svg>
    ),
    location: (
      <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
    map: (
      <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
        <line x1="9" y1="3" x2="9" y2="18" /><line x1="15" y1="6" x2="15" y2="21" />
      </svg>
    ),
  };
  return (
    <span className={cx("inline-flex items-center justify-center", className)}>
      {map[type] ?? null}
    </span>
  );
}

// ─── Angle Divider ───────────────────────────────────────────────────────────
function AngleDivider({ topColor, bottomColor }) {
  return (
    <div className="relative h-14 overflow-hidden" style={{ backgroundColor: bottomColor }}>
      <svg
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        style={{ fill: topColor }}
      >
        <polygon points="0,0 1440,0 1440,56 0,0" />
      </svg>
    </div>
  );
}

// ─── Marquee ─────────────────────────────────────────────────────────────────
const MARQUEE_ITEMS = [
  "30+ Years Experience",
  "Licensed & Insured",
  "Free Estimates, No Pressure",
  "24/7 Storm Response",
  "94 Google Reviews · 5.0 Stars",
  "Serving Treasure Coast, FL",
  "Metal · Shingle · Tile Roofing",
  "Port St. Lucie · Fort Pierce · Stuart · Vero Beach",
];

function Marquee({ items = MARQUEE_ITEMS }) {
  return (
    <div className="bg-green-600 py-3 overflow-hidden select-none" aria-hidden="true">
      <style>{`@keyframes slr{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
      <div style={{ animation: "slr 32s linear infinite", display: "flex", width: "max-content" }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-white font-bold text-sm flex items-center shrink-0 px-8" style={{ gap: "10px" }}>
            <span className="text-green-200 text-xs">★</span> {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Stat Counter Large ───────────────────────────────────────────────────────
function StatCounterLarge({ display, label }) {
  const numPart = parseInt(display.replace(/,/g, ""), 10);
  const suffix = display.replace(/[\d,]/g, "");
  const [val, ref] = useCountUp(numPart);
  const formatted = numPart >= 1000 ? val.toLocaleString() : String(val);
  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-6xl font-extrabold text-white mb-2 leading-none tabular-nums">
        {formatted}{suffix}
      </div>
      <div className="w-8 h-0.5 bg-green-400 rounded-full mx-auto my-2" />
      <div className="text-blue-300 text-xs font-semibold uppercase tracking-widest">{label}</div>
    </div>
  );
}

// ─── Header ──────────────────────────────────────────────────────────────────
function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function nav(p) {
    navigate(p);
    setMenuOpen(false);
    setServicesOpen(false);
  }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-blue-900"
      animate={{
        boxShadow: scrolled
          ? "0 4px 24px rgba(0,0,0,0.4)"
          : "0 0px 0px rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Top bar */}
      <div className="hidden md:block bg-blue-950 text-blue-300 text-xs py-1.5">
        <div className="max-w-7xl mx-auto px-6 flex justify-end gap-6">
          <a href={PHONE_HREF} className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Icon type="phone" size={11} /> {PHONE}
          </a>
          <a href={`mailto:${EMAIL}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Icon type="mail" size={11} /> {EMAIL}
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto pl-2 pr-6 flex items-center justify-between h-28">
        <button onClick={() => nav("/")} className="text-left leading-tight">
          <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-white/20 shadow-lg">
            <img src="/images/roofing%20st%20lucie%20logo.png" alt="Roofing St. Lucie" className="h-full w-full object-cover" />
          </div>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-blue-200">
          <button
            onClick={() => nav("/")}
            className={cx("hover:text-white transition-colors", pathname === "/" && "text-white")}
          >
            Home
          </button>

          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              onClick={() => nav("/services")}
              className={cx(
                "flex items-center gap-1 hover:text-white transition-colors",
                pathname.startsWith("/services") && "text-white"
              )}
            >
              Services
              <motion.span animate={{ rotate: servicesOpen ? 90 : 0 }} transition={{ duration: 0.18 }}>
                <Icon type="chevron" size={13} />
              </motion.span>
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-100 py-2 overflow-hidden"
                >
                  {SERVICES.map((s) => (
                    <button
                      key={s.slug}
                      onClick={() => nav("/services/" + s.slug)}
                      className="w-full text-left px-4 py-2.5 flex items-center gap-3 text-slate-700 hover:bg-blue-50 hover:text-blue-900 text-sm transition-colors"
                    >
                      <Icon type={s.icon} size={15} className="text-blue-600 shrink-0" />
                      {s.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => nav("/areas")}
            className={cx("hover:text-white transition-colors", pathname.startsWith("/areas") && "text-white")}
          >
            Service Areas
          </button>
          <button
            onClick={() => nav("/contact")}
            className={cx("hover:text-white transition-colors", pathname === "/contact" && "text-white")}
          >
            Contact
          </button>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={PHONE_HREF}
            className="hidden md:flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold text-sm px-4 py-2.5 rounded-lg transition-colors"
          >
            <Icon type="phone" size={14} /> Free Estimate
          </a>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden text-white p-1"
            aria-label="Toggle menu"
          >
            <Icon type={menuOpen ? "x" : "menu"} size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-blue-950 border-t border-blue-800 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {[
                { label: "Home", target: "/" },
                { label: "Services", target: "/services" },
                { label: "Service Areas", target: "/areas" },
                { label: "Contact", target: "/contact" },
              ].map((item) => (
                <button
                  key={item.target}
                  onClick={() => nav(item.target)}
                  className="text-left text-blue-200 hover:text-white py-2.5 text-sm font-semibold transition-colors border-b border-blue-800/50 last:border-0"
                >
                  {item.label}
                </button>
              ))}
              <a
                href={PHONE_HREF}
                className="mt-3 flex items-center justify-center gap-2 bg-green-600 text-white font-bold px-4 py-3 rounded-lg text-sm"
              >
                <Icon type="phone" size={15} /> {PHONE}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="bg-blue-950 text-blue-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-blue-800">
          <div>
            <img src="/images/roofing%20st%20lucie%20logo.png" alt="Roofing St. Lucie, Roofing Contractor Port St. Lucie FL" className="h-28 w-auto mb-4" />
            <p className="text-sm leading-relaxed mb-4">
              30+ years of expert roofing service for Treasure Coast homeowners. Licensed, insured, and locally trusted across St. Lucie, Martin, and Indian River Counties.
            </p>
            <a href={PHONE_HREF} className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 font-bold text-sm transition-colors">
              <Icon type="phone" size={14} /> {PHONE}
            </a>
          </div>

          <div>
            <div className="text-white font-bold mb-4 text-xs uppercase tracking-widest">Our Services</div>
            <ul className="space-y-2 text-sm">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <button
                    onClick={() => navigate("/services/" + s.slug)}
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <Icon type="chevron" size={12} /> {s.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-white font-bold mb-4 text-xs uppercase tracking-widest">Service Areas</div>
            <ul className="space-y-2 text-sm">
              {LOCATIONS.map((loc) => (
                <li key={loc.slug}>
                  <button
                    onClick={() => navigate("/areas/" + loc.slug)}
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <Icon type="location" size={11} className="text-green-500 shrink-0" /> {loc.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-white font-bold mb-4 text-xs uppercase tracking-widest">Contact Us</div>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={PHONE_HREF} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Icon type="phone" size={15} /> {PHONE}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 hover:text-white transition-colors break-all">
                  <Icon type="mail" size={15} /> {EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Icon type="map" size={15} className="shrink-0 mt-0.5" />
                <span>Serving Port St. Lucie · Fort Pierce<br />Stuart · Jensen Beach · Palm City<br />Vero Beach · Treasure Coast, FL</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 text-center text-xs text-blue-500">
          © {new Date().getFullYear()} Roofing St. Lucie Inc. All rights reserved. &nbsp;|&nbsp; Licensed &amp; Insured &nbsp;|&nbsp; Roofing Contractor Port St. Lucie, FL &nbsp;|&nbsp; Serving the Treasure Coast
        </div>
      </div>
    </footer>
  );
}

// ─── Page Hero ───────────────────────────────────────────────────────────────
function PageHero({ title, subtitle, breadcrumb, bgImage }) {
  const navigate = useNavigate();
  return (
    <div className="relative bg-blue-900 pt-44 pb-20 text-white overflow-hidden">
      {bgImage ? (
        <>
          <img src={bgImage} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/80 to-blue-700/70" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700" />
      )}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 40px)" }} />
      <div className="relative max-w-7xl mx-auto px-6">
        {breadcrumb && (
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-300 hover:text-white text-sm mb-5 transition-colors"
          >
            ← {breadcrumb}
          </button>
        )}
        <Reveal>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">{title}</h1>
          {subtitle && <p className="text-blue-200 text-lg max-w-2xl mt-2">{subtitle}</p>}
        </Reveal>
      </div>
    </div>
  );
}

// ─── CTA Banner ──────────────────────────────────────────────────────────────
function CTABanner({ heading, sub }) {
  return (
    <section className="relative py-20 overflow-hidden text-white text-center">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-green-900" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 50%, #22c55e 0%, transparent 45%), radial-gradient(circle at 85% 50%, #3b82f6 0%, transparent 45%)",
        }}
      />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "repeating-linear-gradient(-45deg, #fff 0, #fff 1px, transparent 0, transparent 40px)" }} />
      <div className="relative max-w-3xl mx-auto px-6">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">{heading}</h2>
          {sub && <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">{sub}</p>}
          <a
            href={PHONE_HREF}
            className="relative inline-flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white font-bold text-xl px-10 py-5 rounded-xl transition-colors shadow-xl shadow-green-900/40 overflow-hidden"
          >
            <motion.span
              className="absolute inset-0 rounded-xl bg-green-400"
              animate={{ scale: [1, 1.6], opacity: [0.25, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut" }}
            />
            <Icon type="phone" size={22} /> {PHONE}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Home Page ───────────────────────────────────────────────────────────────
function HomePage() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroParallax = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  useSEO(
    `Roofing Contractor Port St. Lucie FL | Roofing St. Lucie | ${PHONE}`,
    `Roofing St. Lucie, Port St. Lucie's trusted roofing contractor for 30+ years. Licensed & insured. Serving St. Lucie, Martin, and Indian River Counties. Free estimates. Call ${PHONE}.`
  );
  return (
    <div>
      {/* Hero */}
      <section ref={heroRef} className="relative bg-blue-900 text-white pt-52 pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0">
            <video
              src="/videos/new%20highlight%20reel%20compressed.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-55"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/75 via-blue-900/55 to-blue-800/40" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Left: text content */}
            <div className="flex-1">
              <Reveal delay={0.05}>
                <div className="inline-flex items-center gap-2 bg-green-600/20 border border-green-500/30 rounded-full px-4 py-1.5 text-green-300 text-sm font-semibold mb-6">
                  <Icon type="award" size={14} /> Treasure Coast's Trusted Roofer, 30+ Years
                </div>
              </Reveal>
              <Reveal delay={0.12}>
                <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-5">
                  Expert Roofing<br />
                  <span className="text-green-400">Built to Last.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} type="star" size={17} className="text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-white/75 text-sm font-medium">5.0 · 94 Google Reviews</span>
                </div>
              </Reveal>
              <Reveal delay={0.22}>
                <p className="text-xl text-blue-200 leading-relaxed mb-10 max-w-2xl">
                  Serving St. Lucie, Martin, and Indian River Counties with professional roof installation, repair,
                  and storm damage restoration. Licensed, insured, and ready to protect your home.
                </p>
              </Reveal>
              <Reveal delay={0.32}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={PHONE_HREF}
                    className="relative inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold text-lg px-8 py-4 rounded-xl transition-colors shadow-lg shadow-green-900/30 overflow-hidden"
                  >
                    <motion.span
                      className="absolute inset-0 rounded-xl bg-green-400"
                      animate={{ scale: [1, 1.6], opacity: [0.3, 0] }}
                      transition={{ repeat: Infinity, duration: 2.4, ease: "easeOut" }}
                    />
                    <Icon type="phone" size={20} /> Get a Free Estimate
                  </a>
                  <button
                    onClick={() => navigate("/services")}
                    className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white/60 hover:bg-white/5 text-white font-bold text-lg px-8 py-4 rounded-xl transition-colors"
                  >
                    View Our Services <Icon type="arrow-right" size={20} />
                  </button>
                </div>
              </Reveal>
            </div>

            {/* Right: large circular logo */}
            <Reveal delay={0.2} className="hidden md:flex shrink-0 items-center justify-center">
              <div className="h-80 w-80 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl shadow-black/40 ring-8 ring-white/5">
                <img
                  src="/images/roofing%20st%20lucie%20logo.png"
                  alt="Roofing St. Lucie, All things work together for good"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-blue-950 py-7 border-b border-blue-900/60">
        <div className="max-w-7xl mx-auto px-6">
          <RevealStagger className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { icon: "award", label: "30+ Years Experience", sub: "Treasure Coast Experts" },
              { icon: "shield", label: "Licensed & Insured", sub: "Florida Certified Contractor" },
              { icon: "dollar", label: "Free Estimates", sub: "No obligation, no pressure" },
              { icon: "clock", label: "24/7 Storm Response", sub: "Call any time, day or night" },
            ].map((item) => (
              <RevealItem key={item.label}>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-green-600/15 border border-green-500/25 flex items-center justify-center shrink-0">
                    <Icon type={item.icon} size={19} className="text-green-400" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-bold leading-tight">{item.label}</div>
                    <div className="text-blue-400 text-xs mt-0.5">{item.sub}</div>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <Marquee />

      {/* Services */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-14">
            <h2 className="text-4xl font-extrabold text-blue-900 mb-3">Our Roofing Services</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto mb-4" />
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              From new installations to emergency storm repairs, we handle every roofing need across the Treasure Coast.
            </p>
          </Reveal>
          <RevealStagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <RevealItem key={s.slug}>
                <button
                  onClick={() => navigate("/services/" + s.slug)}
                  className="w-full text-left rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group relative h-72"
                >
                  {SERVICE_PHOTOS[s.slug] ? (
                    <img
                      src={SERVICE_PHOTOS[s.slug].src}
                      alt={SERVICE_PHOTOS[s.slug].alt}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-700" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/95 via-blue-900/55 to-blue-900/10" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-xl bg-green-600 flex items-center justify-center shrink-0 shadow-lg">
                        <Icon type={s.icon} size={17} className="text-white" />
                      </div>
                      <h3 className="text-white font-extrabold text-xl leading-tight">{s.name}</h3>
                    </div>
                    <p className="text-blue-200/90 text-sm leading-relaxed mb-3 line-clamp-2">{s.short}</p>
                    <span className="inline-flex items-center gap-2 text-green-400 font-semibold text-sm group-hover:gap-3 transition-all duration-200">
                      Learn More <Icon type="arrow-right" size={14} />
                    </span>
                  </div>
                </button>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="py-16 relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(34,197,94,0.25) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(59,130,246,0.25) 0%, transparent 50%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6">
          <RevealStagger className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { display: "30+", label: "Years of Expertise" },
              { display: "1,000+", label: "Roofs Completed" },
              { display: "94", label: "5-Star Reviews" },
              { display: "3", label: "Counties Served" },
            ].map((stat) => (
              <RevealItem key={stat.label}>
                <StatCounterLarge display={stat.display} label={stat.label} />
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Our Work Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-blue-900 mb-3">Our Work</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto mb-4" />
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Real roofing projects completed across St. Lucie, Martin, and Indian River Counties.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-4">
            <Reveal className="overflow-hidden rounded-2xl shadow-xl row-span-2 relative group" delay={0.05}>
              <img
                src={PHOTOS.waterfrontDroneRoofs}
                alt="Aerial drone view of standing seam metal roofs on waterfront homes in St. Lucie County Florida – Roofing St. Lucie"
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ height: "100%", minHeight: "380px" }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end pointer-events-none">
                <div className="p-6 text-white">
                  <div className="font-extrabold text-lg">Waterfront Metal Roofing</div>
                  <div className="text-blue-200 text-sm">St. Lucie County, FL</div>
                </div>
              </div>
            </Reveal>
            <div className="grid grid-cols-2 gap-3">
              {[
                { src: PHOTOS.metalRoofInstall,    alt: "Roofing St. Lucie crew installing a standing seam metal roof on a Port St. Lucie Florida home", label: "Metal Roof Installation" },
                { src: PHOTOS.shingleRoofCloseup,  alt: "New architectural asphalt shingle roof Port St. Lucie Florida – Roofing St. Lucie", label: "Shingle Roofing" },
                { src: PHOTOS.shingleHomeCharcoal, alt: "Completed charcoal shingle roof replacement on Florida home – Roofing St. Lucie Port St. Lucie", label: "Completed Shingle Roof" },
                { src: PHOTOS.tealHome2StoryMetal, alt: "Two-story teal home with new standing seam metal roof by Roofing St. Lucie Fort Pierce Florida", label: "Residential Metal Roof" },
              ].map((img, i) => (
                <Reveal key={i} delay={0.08 + i * 0.07} className="aspect-square overflow-hidden rounded-xl shadow-md relative group">
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-blue-900/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <span className="text-white font-bold text-sm text-center px-3 leading-snug">{img.label}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AngleDivider topColor="#fff" bottomColor="#1e3a8a" />

      {/* Why Choose Us */}
      <section className="py-20 relative overflow-hidden text-white">
        <div className="absolute inset-0">
          <img src={PHOTOS.teamPhoto} alt="" aria-hidden="true" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-blue-950/95" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-14">
            <h2 className="text-4xl font-extrabold mb-3">Why Choose Roofing St. Lucie?</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mx-auto mb-4" />
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              We've been protecting Treasure Coast homes for over 30 years. Here's what sets us apart.
            </p>
          </Reveal>
          <RevealStagger className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "award",
                title: "30+ Years Experience",
                desc: "Three decades of roofing expertise serving Florida homeowners and the unique demands of our coastal climate.",
              },
              {
                icon: "shield",
                title: "Fully Licensed & Insured",
                desc: "We carry all required Florida contractor licenses and full liability and workers' comp insurance for your protection.",
              },
              {
                icon: "storm",
                title: "Storm Damage Experts",
                desc: "We specialize in Florida storm response: fast tarping, thorough documentation, and insurance claim support.",
              },
              {
                icon: "users",
                title: "Local & Trusted",
                desc: "We're your neighbors. Our reputation is built one roof at a time across St. Lucie, Martin, and Indian River Counties.",
              },
            ].map((f) => (
              <RevealItem key={f.title}>
                <div className="bg-blue-800/40 rounded-2xl p-7 text-center border border-blue-700/30 hover:border-green-500/50 hover:bg-blue-800/60 transition-all group">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-green-900/30">
                    <Icon type={f.icon} size={24} className="text-white" />
                  </div>
                  <h3 className="font-extrabold text-lg mb-2">{f.title}</h3>
                  <p className="text-blue-200 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <AngleDivider topColor="#1e3a8a" bottomColor="#f8fafc" />

      {/* Service Areas */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-14">
            <h2 className="text-4xl font-extrabold text-blue-900 mb-3">Areas We Serve</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto mb-4" />
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Proudly serving homeowners and businesses across the Treasure Coast and surrounding counties.
            </p>
          </Reveal>
          <RevealStagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {LOCATIONS.map((loc) => (
              <RevealItem key={loc.slug}>
                <button
                  onClick={() => navigate("/areas/" + loc.slug)}
                  className="w-full text-left bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-slate-100 hover:border-green-300 transition-all group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center group-hover:bg-blue-900 transition-colors duration-300 shrink-0">
                      <Icon type="location" size={18} className="text-white" />
                    </div>
                    <div>
                      <div className="font-extrabold text-blue-900 text-lg leading-tight">{loc.name}</div>
                      <div className="text-slate-400 text-xs">{loc.county}</div>
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">{loc.desc}</p>
                </button>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <AngleDivider topColor="#f8fafc" bottomColor="#fff" />

      {/* About Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 bg-green-100 border border-green-200 rounded-full px-4 py-1.5 text-green-700 text-sm font-semibold mb-5">
                <Icon type="award" size={14} /> Locally Owned &amp; Operated, Treasure Coast Since 1994
              </div>
              <h2 className="text-4xl font-extrabold text-blue-900 mb-2">
                Port St. Lucie's Trusted Roofing Contractor
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mb-5" />
              <p className="text-slate-600 leading-relaxed mb-4">
                Roofing St. Lucie is a locally owned roofing company serving Port St. Lucie, Fort Pierce, Stuart, and the entire Treasure Coast for over 30 years. We're your neighbors, not a franchise from another state, and we've built our reputation one roof at a time across St. Lucie, Martin, and Indian River Counties.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                Every job we take is backed by licensed, insured roofing professionals who understand Florida's unique climate demands: hurricane winds, intense UV, salt air corrosion, and the relentless heat that accelerates wear on every roofing system. We know how to build roofs that last in Florida.
              </p>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { display: "30+", label: "Years Serving the Treasure Coast" },
                  { display: "1,000+", label: "Roofs Installed & Repaired" },
                  { display: "3", label: "Counties Served" },
                ].map((stat) => (
                  <StatCounter key={stat.label} display={stat.display} label={stat.label} />
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="grid grid-cols-2 gap-3">
                <div className="overflow-hidden rounded-2xl shadow-lg">
                  <img src={PHOTOS.teamPhoto} alt="Roofing St. Lucie crew on a Port St. Lucie FL roofing project" className="w-full object-cover h-52 hover:scale-105 transition-transform duration-700" loading="lazy" />
                </div>
                <div className="overflow-hidden rounded-2xl shadow-lg mt-6">
                  <img src={PHOTOS.companyBuilding} alt="Roofing St. Lucie company vehicle in Port St. Lucie Florida" className="w-full object-cover h-52 hover:scale-105 transition-transform duration-700" loading="lazy" />
                </div>
                <div className="overflow-hidden rounded-2xl shadow-lg col-span-2">
                  <img src={PHOTOS.metalRoofInstall} alt="Roofing St. Lucie crew installing a metal roof on a Port St. Lucie Florida home" className="w-full object-cover h-40 hover:scale-105 transition-transform duration-700" loading="lazy" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <AngleDivider topColor="#fff" bottomColor="#f8fafc" />

      {/* Reviews */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-10">
            <h2 className="text-4xl font-extrabold text-blue-900 mb-3">What Treasure Coast Homeowners Say</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto mb-4" />
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Real reviews from Port St. Lucie, Fort Pierce, Stuart, and beyond.
            </p>
          </Reveal>
          <Reveal className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-4 bg-white border border-slate-100 rounded-2xl px-7 py-4 shadow-md">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <Icon key={i} type="star" size={22} className="text-yellow-400" />)}
              </div>
              <div className="font-extrabold text-blue-900 text-lg leading-tight">5.0 Google Rating</div>
            </div>
          </Reveal>
        </div>
        <iframe
          className="lc_reviews_widget"
          src="https://reputationhub.site/reputation/widgets/review_widget/tOD8fjOJeLSOHw5TsEPJ"
          frameBorder="0"
          scrolling="no"
          style={{ minWidth: "100%", width: "100%", display: "block" }}
        />
      </section>

      <AngleDivider topColor="#fff" bottomColor="#f8fafc" />

      {/* SEO Content Block */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <h2 className="text-2xl font-extrabold text-blue-900 mb-6">
              Roofing Contractor Serving Port St. Lucie, FL and the Treasure Coast
            </h2>
            <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
              <p>
                When Port St. Lucie and Treasure Coast homeowners need roofing work done right, they call Roofing St. Lucie. We've been the Treasure Coast's roofing experts for over 30 years, serving all of St. Lucie County, Martin County, and Indian River County with professional roof installation, repair, and storm damage restoration.
              </p>
              <p>
                Our most requested services in Port St. Lucie include metal roof installation, shingle roof replacement, storm damage repair, and emergency roof tarping after hurricanes and tropical storms. We're a local company with local crews, so when you call us after a storm, we respond within hours, not days.
              </p>
              <p>
                We serve all Port St. Lucie neighborhoods including Tradition, Torino, St. Lucie West, River Park, Floresta, Sandpiper Bay, and more. From Fort Pierce to Vero Beach, and from Stuart to Palm City, the Treasure Coast trusts Roofing St. Lucie for licensed, insured, professional roofing service. Call <a href={PHONE_HREF} className="font-bold text-blue-700 hover:text-green-700 transition-colors">{PHONE}</a> for a free estimate.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="relative py-20 bg-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src={PHOTOS.stormDamageAerial} alt="" aria-hidden="true" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-blue-900/80" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/30 rounded-full px-4 py-1.5 text-orange-300 text-sm font-bold mb-5">
              <Icon type="storm" size={15} /> 24/7 Emergency Storm Response
            </div>
            <h2 className="text-4xl font-extrabold mb-4">Storm Damaged Your Roof?</h2>
            <p className="text-blue-200 text-lg mb-10 max-w-2xl mx-auto">
              Don't wait. Water damage spreads fast. Call us now for emergency tarping and a complete damage assessment.
            </p>
            <a
              href={PHONE_HREF}
              className="relative inline-flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white font-extrabold text-xl px-10 py-5 rounded-xl transition-colors shadow-xl shadow-green-900/40 overflow-hidden"
            >
              <motion.span
                className="absolute inset-0 rounded-xl bg-green-400"
                animate={{ scale: [1, 1.6], opacity: [0.3, 0] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut" }}
              />
              <Icon type="phone" size={24} /> {PHONE}
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

// ─── Services Page ────────────────────────────────────────────────────────────
function ServicesPage() {
  const navigate = useNavigate();
  useSEO(
    `Roofing Services Port St. Lucie FL | Inspection, Repair, Installation | Roofing St. Lucie`,
    `Full-service roofing contractor in Port St. Lucie FL: roof inspection, installation, repair, storm damage, metal roofing, shingle, tile. Licensed & insured. Call ${PHONE}.`
  );
  return (
    <div>
      <PageHero
        title="Roofing Services in Port St. Lucie, FL"
        subtitle="Professional roofing solutions for every need, from routine inspections to complete storm damage restoration across the Treasure Coast."
        bgImage={PHOTOS.metalRoofInstall}
      />
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <RevealStagger className="grid md:grid-cols-2 gap-8">
            {SERVICES.map((s) => (
              <RevealItem key={s.slug}>
                <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all group">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-xl bg-blue-900 flex items-center justify-center shrink-0 group-hover:bg-green-600 transition-colors duration-300">
                      <Icon type={s.icon} size={26} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-blue-900 font-extrabold text-2xl mb-2">{s.name}</h3>
                      <p className="text-slate-600 mb-5 leading-relaxed text-sm">{s.description}</p>
                      <button
                        onClick={() => navigate("/services/" + s.slug)}
                        className="inline-flex items-center gap-2 bg-blue-900 hover:bg-green-600 text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors"
                      >
                        Learn More <Icon type="arrow-right" size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>
      <CTABanner
        heading="Ready to Get Started?"
        sub="Call us for a free estimate. No obligation, no pressure."
      />
    </div>
  );
}

// ─── Service Detail Page ──────────────────────────────────────────────────────
function ServiceDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return <Navigate to="/services" replace />;
  useSEO(
    `${service.name} in Port St. Lucie, FL | Roofing St. Lucie | ${PHONE}`,
    `Expert ${service.name.toLowerCase()} in Port St. Lucie and the Treasure Coast. Roofing St. Lucie, licensed, insured, 30+ years experience. Free estimates. Call ${PHONE}.`
  );
  return (
    <div>
      <PageHero
        title={service.name}
        subtitle={service.short}
        breadcrumb="Back to Services"
        bgImage={SERVICE_PHOTOS[service.slug]?.src}
      />

      <div className="h-72 overflow-hidden">
        {SERVICE_PHOTOS[service.slug] ? (
          <img src={SERVICE_PHOTOS[service.slug].src} alt={SERVICE_PHOTOS[service.slug].alt} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="h-full bg-gradient-to-r from-blue-900 to-blue-700 flex items-center justify-center">
            <Icon type={service.icon} size={56} className="text-blue-500" />
          </div>
        )}
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            <Reveal>
              <h2 className="text-3xl font-extrabold text-blue-900 mb-6">
                {service.name} in Port St. Lucie &amp; the Treasure Coast
              </h2>
              {(service.longDesc ?? [service.description]).map((para, i) => (
                <p key={i} className="text-slate-700 leading-relaxed text-base mb-5">{para}</p>
              ))}
            </Reveal>

            <Reveal delay={0.1} className="mt-10">
              <h3 className="text-2xl font-extrabold text-blue-900 mb-5">Our Process</h3>
            </Reveal>
            <RevealStagger className="space-y-4 mb-12">
              {service.process.map((step, i) => (
                <RevealItem key={step.title}>
                  <div className="flex items-start gap-4 bg-slate-50 rounded-xl p-5 border border-slate-100">
                    <div className="w-9 h-9 rounded-full bg-blue-900 text-white flex items-center justify-center text-sm font-extrabold shrink-0">{i + 1}</div>
                    <div>
                      <div className="font-bold text-blue-900 mb-1">{step.title}</div>
                      <div className="text-slate-600 text-sm leading-relaxed">{step.desc}</div>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>

            {service.faqs && (
              <Reveal delay={0.15}>
                <h3 className="text-2xl font-extrabold text-blue-900 mb-5">
                  Frequently Asked Questions: {service.name}
                </h3>
                <FAQAccordion faqs={service.faqs} />
              </Reveal>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <Reveal>
              <div className="bg-blue-900 rounded-2xl p-7 text-white sticky top-24">
                <h3 className="font-extrabold text-xl mb-5">What's Included</h3>
                <ul className="space-y-3">
                  {service.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm">
                      <Icon type="check" size={16} className="text-green-400 shrink-0 mt-0.5" />
                      <span className="text-blue-100 leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-blue-700">
                  <a href={PHONE_HREF} className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-5 rounded-xl text-sm transition-colors w-full">
                    <Icon type="phone" size={16} /> Get a Free Estimate
                  </a>
                  <p className="text-blue-400 text-xs text-center mt-3">{PHONE}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Before / After */}
      {service.beforeAfter && (
        <section className="py-16 bg-slate-50 border-t border-slate-100">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal className="mb-10 text-center">
              <h3 className="text-2xl font-extrabold text-blue-900">Before &amp; After</h3>
              <p className="text-slate-500 mt-2 text-sm">Real results from a recent {service.name} project in Port St. Lucie</p>
            </Reveal>
            <RevealStagger className="grid md:grid-cols-2 gap-6">
              <RevealItem>
                <div className="rounded-2xl overflow-hidden shadow-md">
                  <div className="bg-red-600 text-white text-center text-xs font-extrabold uppercase tracking-widest py-2">Before</div>
                  <img src={service.beforeAfter.before.src} alt={service.beforeAfter.before.alt} className="w-full object-cover" loading="lazy" />
                </div>
              </RevealItem>
              <RevealItem>
                <div className="rounded-2xl overflow-hidden shadow-md">
                  <div className="bg-green-600 text-white text-center text-xs font-extrabold uppercase tracking-widest py-2">After</div>
                  <img src={service.beforeAfter.after.src} alt={service.beforeAfter.after.alt} className="w-full object-cover" loading="lazy" />
                </div>
              </RevealItem>
            </RevealStagger>
          </div>
        </section>
      )}

      {/* Other services */}
      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="mb-8">
            <h3 className="text-2xl font-extrabold text-blue-900">Other Services</h3>
          </Reveal>
          <RevealStagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.filter((s) => s.slug !== service.slug).map((s) => (
              <RevealItem key={s.slug}>
                <button
                  onClick={() => navigate("/services/" + s.slug)}
                  className="w-full text-left bg-white rounded-xl p-5 border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Icon type={s.icon} size={18} className="text-blue-700 shrink-0" />
                    <span className="font-bold text-blue-900 group-hover:text-green-700 transition-colors text-sm flex-1">{s.name}</span>
                    <Icon type="arrow-right" size={15} className="text-slate-300 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </button>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <CTABanner heading="Schedule Your Free Estimate" sub="No obligation. We'll assess your roof and give you an honest recommendation." />
    </div>
  );
}

// ─── Service Areas Page ───────────────────────────────────────────────────────
function ServiceAreasPage() {
  const navigate = useNavigate();
  useSEO(
    `Roofing Service Areas | Port St. Lucie, Fort Pierce, Stuart, Vero Beach | Roofing St. Lucie`,
    `Roofing St. Lucie serves Port St. Lucie, Fort Pierce, Stuart, Jensen Beach, Palm City, Vero Beach, and all of St. Lucie, Martin, and Indian River Counties. Call ${PHONE}.`
  );
  return (
    <div>
      <PageHero
        title="Roofing Service Areas, Treasure Coast, FL"
        subtitle="Serving homeowners and businesses across Port St. Lucie, Fort Pierce, Stuart, Jensen Beach, Palm City, Vero Beach, and the entire Treasure Coast."
        bgImage={PHOTOS.stormDamageAerial}
      />
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <RevealStagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LOCATIONS.map((loc) => (
              <RevealItem key={loc.slug}>
                <button
                  onClick={() => navigate("/areas/" + loc.slug)}
                  className="w-full text-left bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-green-300 hover:shadow-xl transition-all group"
                >
                  <div className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center mb-5 group-hover:bg-blue-900 transition-colors duration-300">
                    <Icon type="location" size={24} className="text-white" />
                  </div>
                  <h3 className="font-extrabold text-blue-900 text-2xl mb-1">{loc.name}</h3>
                  <p className="text-slate-400 text-sm mb-4">{loc.county}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{loc.desc}</p>
                </button>
              </RevealItem>
            ))}
          </RevealStagger>

          <Reveal className="mt-16 bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-extrabold text-blue-900 mb-3">Don't See Your Area?</h3>
            <p className="text-slate-600 mb-6">
              Give us a call. We may still be able to help, and we regularly serve communities beyond our listed areas.
            </p>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 bg-blue-900 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors"
            >
              <Icon type="phone" size={16} /> {PHONE}
            </a>
          </Reveal>
        </div>
      </section>
      <CTABanner
        heading="Roof Issues in Your Area?"
        sub="We're local, licensed, and ready. Get your free estimate today."
      />
    </div>
  );
}

// ─── Location Detail Page ─────────────────────────────────────────────────────
function LocationDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = LOCATIONS.find((l) => l.slug === slug);
  if (!location) return <Navigate to="/areas" replace />;
  useSEO(
    `Roofing Contractor ${location.name}, FL | Roofing St. Lucie | ${PHONE}`,
    `Roofing St. Lucie, expert roofing contractor serving ${location.name}, FL. Licensed & insured. Roof installation, repair, storm damage. Free estimates. Call ${PHONE}.`
  );
  return (
    <div>
      <PageHero
        title={`Roofing Contractor in ${location.name}, FL`}
        subtitle={`Expert roofing services for ${location.name} homeowners. Licensed, insured, and locally trusted for 30+ years.`}
        breadcrumb="Back to Service Areas"
        bgImage={PHOTOS.waterfrontMetalRoofs}
      />

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Reveal>
              <h2 className="text-3xl font-extrabold text-blue-900 mb-6">
                Roofing St. Lucie Serves {location.name}
              </h2>
              {(location.paragraphs ?? [location.detail]).map((para, i) => (
                <p key={i} className="text-slate-700 leading-relaxed mb-5">{para}</p>
              ))}
            </Reveal>

            {location.neighborhoods && (
              <Reveal delay={0.1} className="mt-10">
                <h3 className="text-xl font-extrabold text-blue-900 mb-4">
                  Neighborhoods &amp; Communities We Serve in {location.name}
                </h3>
                <div className="flex flex-wrap gap-2 mb-10">
                  {location.neighborhoods.map((n) => (
                    <span key={n} className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100 text-blue-800 text-xs font-semibold px-3 py-1.5 rounded-full">
                      <Icon type="location" size={11} className="text-green-600" /> {n}
                    </span>
                  ))}
                </div>
              </Reveal>
            )}

            <Reveal delay={0.15}>
              <h3 className="text-2xl font-extrabold text-blue-900 mb-5">
                Roofing Services Available in {location.name}
              </h3>
            </Reveal>
            <RevealStagger className="grid sm:grid-cols-2 gap-4 mb-12">
              {SERVICES.map((s) => (
                <RevealItem key={s.slug}>
                  <button
                    onClick={() => navigate("/services/" + s.slug)}
                    className="w-full text-left bg-slate-50 rounded-xl p-4 border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-900 flex items-center justify-center group-hover:bg-green-600 transition-colors shrink-0">
                        <Icon type={s.icon} size={16} className="text-white" />
                      </div>
                      <span className="font-bold text-blue-900 text-sm">{s.name}</span>
                      <Icon type="arrow-right" size={14} className="text-slate-300 ml-auto group-hover:text-green-600 transition-colors" />
                    </div>
                  </button>
                </RevealItem>
              ))}
            </RevealStagger>

            {location.faqs && (
              <Reveal delay={0.2}>
                <h3 className="text-2xl font-extrabold text-blue-900 mb-5">
                  Frequently Asked Questions: Roofing in {location.name}
                </h3>
                <FAQAccordion faqs={location.faqs} />
              </Reveal>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <Reveal>
              <div className="bg-blue-900 rounded-2xl p-7 text-white sticky top-24">
                <h3 className="font-extrabold text-xl mb-5">Free Estimate in {location.name}</h3>
                <p className="text-blue-200 text-sm mb-6 leading-relaxed">
                  Serving {location.name} and all of {location.county}. Call now or email us and we'll respond fast.
                </p>
                <a href={PHONE_HREF} className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-5 rounded-xl text-sm transition-colors w-full mb-3">
                  <Icon type="phone" size={16} /> {PHONE}
                </a>
                <a href={`mailto:${EMAIL}`} className="flex items-center justify-center gap-2 bg-blue-800 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded-xl text-sm transition-colors w-full">
                  <Icon type="mail" size={16} /> Email Us
                </a>
                <div className="mt-6 pt-5 border-t border-blue-700 space-y-2">
                  {[
                    { icon: "award", label: "30+ Years Experience" },
                    { icon: "shield", label: "Licensed & Insured" },
                    { icon: "dollar", label: "Free Estimates" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2 text-sm text-blue-200">
                      <Icon type={item.icon} size={14} className="text-green-400" />
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CTABanner
        heading={`Ready to Protect Your ${location.name} Home?`}
        sub="Call for a free, no-obligation roof estimate today."
      />
    </div>
  );
}

// ─── Contact Page ─────────────────────────────────────────────────────────────
function ContactPage() {
  useSEO(
    `Free Roof Estimate Port St. Lucie FL | Contact Roofing St. Lucie | ${PHONE}`,
    `Contact Roofing St. Lucie for a free roof estimate in Port St. Lucie, Fort Pierce, Stuart, and the Treasure Coast. Licensed & insured. Call ${PHONE} or send a message.`
  );
  return (
    <div>
      <PageHero
        title="Schedule Your Roof Inspection"
        subtitle="Contact us for a free estimate. We'll get back to you fast, usually same day."
        bgImage={PHOTOS.shingleHomeSunset}
      />

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-3 gap-12">
          {/* Form */}
          <Reveal className="lg:col-span-2">
            <h2 className="text-3xl font-extrabold text-blue-900 mb-8">Send Us a Message</h2>
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <iframe
                src="https://api.leadconnectorhq.com/widget/form/cTVARkqCVTXXhjJF0PzT"
                style={{ width: "100%", height: "518px", border: "none", borderRadius: "8px" }}
                id="inline-cTVARkqCVTXXhjJF0PzT"
                data-layout='{"id":"INLINE"}'
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="Form 0"
                data-height="518"
                data-layout-iframe-id="inline-cTVARkqCVTXXhjJF0PzT"
                data-form-id="cTVARkqCVTXXhjJF0PzT"
                title="Request a Free Roof Estimate"
              />
            </div>
          </Reveal>

          {/* Contact info */}
          <div>
            <Reveal delay={0.1}>
              <h2 className="text-3xl font-extrabold text-blue-900 mb-8">Contact Information</h2>
            </Reveal>
            <RevealStagger className="space-y-6">
              {[
                {
                  icon: "phone",
                  title: "Call Us",
                  content: <a href={PHONE_HREF} className="text-blue-700 font-bold hover:text-green-700 transition-colors">{PHONE}</a>,
                  sub: "Available 24/7 for storm emergencies",
                },
                {
                  icon: "mail",
                  title: "Email Us",
                  content: <a href={`mailto:${EMAIL}`} className="text-blue-700 font-bold hover:text-green-700 transition-colors break-all">{EMAIL}</a>,
                  sub: "We typically respond within a few hours",
                },
                {
                  icon: "map",
                  title: "Service Areas",
                  content: (
                    <ul className="space-y-1 text-slate-700 text-sm">
                      {LOCATIONS.map((l) => (
                        <li key={l.slug} className="flex items-center gap-2">
                          <Icon type="check" size={13} className="text-green-600" /> {l.name}
                        </li>
                      ))}
                    </ul>
                  ),
                  sub: null,
                },
              ].map((item) => (
                <RevealItem key={item.title}>
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-blue-900 flex items-center justify-center shrink-0">
                        <Icon type={item.icon} size={20} className="text-white" />
                      </div>
                      <div>
                        <div className="font-extrabold text-blue-900 mb-1">{item.title}</div>
                        <div className="mb-1">{item.content}</div>
                        {item.sub && <div className="text-slate-400 text-xs">{item.sub}</div>}
                      </div>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>

            <Reveal delay={0.3} className="mt-8 bg-orange-50 border border-orange-200 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <Icon type="storm" size={22} className="text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-extrabold text-orange-800 mb-1">Storm Emergency?</div>
                  <p className="text-orange-700 text-sm leading-relaxed mb-3">
                    Don't fill out the form. Call us immediately. We have crews on standby 24/7 for storm damage response.
                  </p>
                  <a href={PHONE_HREF} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-bold px-4 py-2 rounded-lg text-sm transition-colors">
                    <Icon type="phone" size={14} /> Call Now: {PHONE}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="pt-0"
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/areas" element={<ServiceAreasPage />} />
            <Route path="/areas/:slug" element={<LocationDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <FloatingCallButton />
    </>
  );
}
