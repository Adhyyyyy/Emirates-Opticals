import "dotenv/config";
import prisma from "../lib/prisma";

const BRANDS = [
  { name: "Prada", slug: "prada", description: "Italian luxury fashion house." },
  { name: "Cartier", slug: "cartier", description: "French luxury goods." },
  { name: "Ray-Ban", slug: "ray-ban", description: "American-Italian brand of luxury sunglasses." },
  { name: "Gucci", slug: "gucci", description: "Italian high-end luxury fashion house." },
  { name: "Tom Ford", slug: "tom-ford", description: "Luxury fashion brand founded by Tom Ford." },
  { name: "Oakley", slug: "oakley", description: "High-performance sunglasses and sports eyewear." },
  { name: "Chanel", slug: "chanel", description: "High-end French luxury fashion house." },
  { name: "Acuvue", slug: "acuvue", description: "World leader in contact lenses by Johnson & Johnson." },
  { name: "Alcon", slug: "alcon", description: "Global leader in eye care and contact lenses." },
  { name: "Bausch & Lomb", slug: "bausch-lomb", description: "Premium vision care product brand." },
  { name: "Emirates Opticians", slug: "emirates-opticians", description: "Our bespoke house brand for exquisite eyewear care." }
];

const CATEGORIES = [
  { name: "Sunglasses", slug: "sunglasses", description: "Premium sun protection eyewear." },
  { name: "Eyeglasses", slug: "eyeglasses", description: "Luxury optical frames." },
  { name: "Contact Lenses", slug: "contact-lenses", description: "Medical grade contact lenses." },
  { name: "Accessories", slug: "accessories", description: "Luxury eyewear accessories." }
];

const BRANCHES = [
  { name: "Emirates Optician, Changanassery", slug: "changanassery", address: "Manjippuzha Tower, Mathumoola, Changanassery, Kerala 686103", location: "Changanassery", phone: "+91 96829 29968", whatsapp: "919682929968", timings: "9:30 AM - 8:30 PM", coordinates: "9.4443,76.5414" },
  { name: "Emirates Optician, Thiruvalla", slug: "thiruvalla", address: "MC Road, Thiruvalla, Kerala 689101", location: "Thiruvalla", phone: "+91 80000 00002", whatsapp: "918000000002", timings: "9:30 AM - 8:30 PM", coordinates: "9.3837,76.5786" },
  { name: "Emirates Optician, Kumbanad", slug: "kumbanad", address: "Kumbanad Junction, Kumbanad, Kerala 689547", location: "Kumbanad", phone: "+91 80000 00003", whatsapp: "918000000003", timings: "9:30 AM - 8:30 PM", coordinates: "9.3879,76.6575" },
  { name: "Emirates Optician, Kothamangalam", slug: "kothamangalam", address: "High Range Road, Kothamangalam, Kerala 686691", location: "Kothamangalam", phone: "+91 80000 00004", whatsapp: "918000000004", timings: "9:30 AM - 8:30 PM", coordinates: "10.0631,76.6219" },
  { name: "Emirates Optician, Pandalam", slug: "pandalam", address: "Near KSRTC, Pandalam, Kerala 689501", location: "Pandalam", phone: "+91 80000 00005", whatsapp: "918000000005", timings: "9:30 AM - 8:30 PM", coordinates: "9.2272,76.6806" },
  { name: "Emirates Optician, Kakkanad", slug: "kakkanad", address: "Infopark Road, Kakkanad, Kochi, Kerala 682030", location: "Kakkanad", phone: "+91 80000 00006", whatsapp: "918000000006", timings: "9:30 AM - 8:30 PM", coordinates: "10.0159,76.3419" }
];

const RAW_PRODUCTS = [
  // ==================== SUNGLASSES (20 PRODUCTS) ====================
  {
    name: "Prada Cinema Shield",
    slug: "prada-cinema-shield",
    description: "Italian luxury with a bold shield silhouette and refined metallic detailing. These fashion-forward frames feature premium gradient lenses for unparalleled class.",

    brandSlug: "prada",
    categorySlug: "sunglasses",
    gender: "UNISEX",
    frameShape: "Shield",
    material: "Acetate",
    lensType: "UV400 Protected",
    color: "Rose Gold / Pink Gradient",
    size: "Standard",
    isFeatured: true,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Prada Linea Rossa Active",
    slug: "prada-linea-rossa-active",
    description: "Designed for the active lifestyle, combining technical excellence with contemporary aesthetics. Features robust rubberized hinges and high-contrast polarized sport lenses.",

    brandSlug: "prada",
    categorySlug: "sunglasses",
    gender: "MALE",
    frameShape: "Rectangular",
    material: "Nylon",
    lensType: "Polarized",
    color: "Matte Black / Red Logo",
    size: "54-18-145",
    isFeatured: false,
    isNewArrival: true,
    images: ["https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Prada Runway Oversized",
    slug: "prada-runway-oversized",
    description: "Direct from the Milan fashion show. Bold, chunky acetate styling in a dramatic cat-eye design. Features high-quality scratch-resistant organic lenses.",

    brandSlug: "prada",
    categorySlug: "sunglasses",
    gender: "FEMALE",
    frameShape: "Cat Eye",
    material: "Acetate",
    lensType: "UV400 Protected",
    color: "Tortoise Shell",
    size: "52-20-140",
    isFeatured: false,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Cartier Santos de Cartier",
    slug: "cartier-santos-de-cartier",
    description: "Exceptional craftsmanship inspired by the legendary Santos watch. Embellished with the signature gold-plated Santos screws on the bridge and temple arms.",

    brandSlug: "cartier",
    categorySlug: "sunglasses",
    gender: "MALE",
    frameShape: "Aviator",
    material: "Metal",
    lensType: "Polarized",
    color: "Brushed Platinum / Black Leather",
    size: "55-17-145",
    isFeatured: true,
    isNewArrival: true,
    images: ["https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Cartier C Décor Rimless",
    slug: "cartier-c-decor-rimless",
    description: "The pinnacle of minimalism and prestige. Features exquisite solid wood temples, rimless design, and the instantly recognizable gold-finished Cartier C monogram.",

    brandSlug: "cartier",
    categorySlug: "sunglasses",
    gender: "UNISEX",
    frameShape: "Rectangular",
    material: "Gold Plated",
    lensType: "Transitions",
    color: "18k Gold Plated / Brown",
    size: "50-21-140",
    isFeatured: true,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1511499767350-a1590fdb7307?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Cartier Panthère Aviator",
    slug: "cartier-panthere-aviator",
    description: "A feminine and powerful design featuring the iconic three-dimensional Panther head sculpted elegantly on the lens corners. Truly a masterwork of optical jewelry.",

    brandSlug: "cartier",
    categorySlug: "sunglasses",
    gender: "FEMALE",
    frameShape: "Aviator",
    material: "Metal",
    lensType: "UV400 Protected",
    color: "Champagne Gold / Gradient Grey",
    size: "54-18-145",
    isFeatured: false,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1625591438562-afb5d2c572c5?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Ray-Ban Aviator Classic",
    slug: "ray-ban-aviator-classic",
    description: "The world's most iconic sunglasses. Originally designed for U.S. aviators in 1937, featuring the classic gold metal frame and dark green G-15 mineral glass lenses.",

    brandSlug: "ray-ban",
    categorySlug: "sunglasses",
    gender: "UNISEX",
    frameShape: "Aviator",
    material: "Metal",
    lensType: "Polarized",
    color: "Gold / G-15 Green",
    size: "Standard",
    isFeatured: true,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1511499767350-a1590fdb7307?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Ray-Ban Wayfarer Ease",
    slug: "ray-ban-wayfarer-ease",
    description: "A modern, slightly more comfortable spin on the iconic 1952 original. The distinct trapezoidal shape provides immediate retro appeal and long-term wearability.",

    brandSlug: "ray-ban",
    categorySlug: "sunglasses",
    gender: "UNISEX",
    frameShape: "Wayfarer",
    material: "Acetate",
    lensType: "UV400 Protected",
    color: "Gloss Black / Crystal Green",
    size: "Standard",
    isFeatured: false,
    isNewArrival: true,
    images: ["https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Ray-Ban Clubmaster Classic",
    slug: "ray-ban-clubmaster-classic",
    description: "Retro and timeless. The Clubmaster was inspired by the counterculture of the 1960s. Combines an acetate browline with sleek metal under-rims.",

    brandSlug: "ray-ban",
    categorySlug: "sunglasses",
    gender: "UNISEX",
    frameShape: "Round",
    material: "Acetate",
    lensType: "UV400 Protected",
    color: "Black Gold / G-15 Green",
    size: "Standard",
    isFeatured: false,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Ray-Ban Hexagonal Flat Lenses",
    slug: "ray-ban-hexagonal-flat-lenses",
    description: "A striking evolution of the classic round frame, featuring geometric hexagonal metal construction and thin profile flat glass lenses.",

    brandSlug: "ray-ban",
    categorySlug: "sunglasses",
    gender: "UNISEX",
    frameShape: "Hexagonal",
    material: "Metal",
    lensType: "Polarized",
    color: "Gold / Copper Flash",
    size: "Standard",
    isFeatured: false,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Gucci Double G Round",
    slug: "gucci-double-g-round",
    description: "Vintage bohemian vibe with contemporary oversized dimensions. Accented with the iconic interlocking GG logo cast in antiqued gold-toned metal on the temples.",

    brandSlug: "gucci",
    categorySlug: "sunglasses",
    gender: "FEMALE",
    frameShape: "Round",
    material: "Acetate",
    lensType: "UV400 Protected",
    color: "Glossy Black / Grey",
    size: "Standard",
    isFeatured: true,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Gucci Oversized Square",
    slug: "gucci-oversized-square",
    description: "Statement luxury sunglasses with a thick, architectural square profile. Featuring the prestigious green and red Gucci Web stripe and gold foil logo.",

    brandSlug: "gucci",
    categorySlug: "sunglasses",
    gender: "FEMALE",
    frameShape: "Square",
    material: "Acetate",
    lensType: "UV400 Protected",
    color: "Red & Green Web Stripe / Dark Grey",
    size: "Standard",
    isFeatured: false,
    isNewArrival: true,
    images: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Gucci Aviator Metal",
    slug: "gucci-aviator-metal",
    description: "A sporty yet undeniably elegant aviator design. Lightweight metal construction with premium polarization to reduce glare in the tropical Kerala sun.",

    brandSlug: "gucci",
    categorySlug: "sunglasses",
    gender: "MALE",
    frameShape: "Aviator",
    material: "Metal",
    lensType: "Polarized",
    color: "Gold / Green Gradient",
    size: "55-17-145",
    isFeatured: false,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1625591438562-afb5d2c572c5?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Tom Ford FT0248 Henry",
    slug: "tom-ford-ft0248-henry",
    description: "As worn by James Bond. A premium browline style with a sleek metal bridge and Tom Ford's signature elegant gold 'T' temple embellishment.",

    brandSlug: "tom-ford",
    categorySlug: "sunglasses",
    gender: "UNISEX",
    frameShape: "Round",
    material: "Acetate",
    lensType: "UV400 Protected",
    color: "Dark Havana / Gold",
    size: "Standard",
    isFeatured: true,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Tom Ford FT0876 Fletcher",
    slug: "tom-ford-ft0876-fletcher",
    description: "A masculine and architectural square silhouette. Handcrafted in Italy using lightweight premium acetate, ensuring complete structural integrity and luxury style.",

    brandSlug: "tom-ford",
    categorySlug: "sunglasses",
    gender: "MALE",
    frameShape: "Square",
    material: "Acetate",
    lensType: "Polarized",
    color: "Shiny Black / Blue Smoke",
    size: "54-18-145",
    isFeatured: false,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Tom Ford FT0912 Valentina",
    slug: "tom-ford-ft0912-valentina",
    description: "Sensual, dramatic cat-eye frames with soft curves and premium acetate finishing. Provides a vintage Hollywood look to elevate any attire.",

    brandSlug: "tom-ford",
    categorySlug: "sunglasses",
    gender: "FEMALE",
    frameShape: "Cat Eye",
    material: "Acetate",
    lensType: "UV400 Protected",
    color: "Butterscotch / Brown Gradient",
    size: "52-20-140",
    isFeatured: false,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Oakley Holbrook Prizm",
    slug: "oakley-holbrook-prizm",
    description: "Classic design meets modern performance. Inspired by screen heroes from the 1940s, 50s, and 60s, outfitted with patented high-definition Prizm optics.",

    brandSlug: "oakley",
    categorySlug: "sunglasses",
    gender: "MALE",
    frameShape: "Square",
    material: "O-Matter",
    lensType: "Polarized",
    color: "Matte Black / Prizm Sapphire",
    size: "Standard",
    isFeatured: true,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Oakley Radar EV Path",
    slug: "oakley-radar-ev-path",
    description: "A milestone in athletic performance heritage. Features a taller lens shield, expanding the upper field of view. Unobtainium nosepads and earsocks ensure non-slip grip.",

    brandSlug: "oakley",
    categorySlug: "sunglasses",
    gender: "UNISEX",
    frameShape: "Sport",
    material: "O-Matter",
    lensType: "UV400 Protected",
    color: "Polished White / Prizm Road",
    size: "Standard",
    isFeatured: false,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Chanel Butterfly Pearl",
    slug: "chanel-butterfly-pearl",
    description: "Elegant clear butterfly frames. The acetate temple arms are adorned with three hand-inserted cultured pearls, capturing the signature Parisian couture aesthetics.",

    brandSlug: "chanel",
    categorySlug: "sunglasses",
    gender: "FEMALE",
    frameShape: "Cat Eye",
    material: "Acetate",
    lensType: "UV400 Protected",
    color: "Black / Cultured Pearl Details",
    size: "52-20-140",
    isFeatured: false,
    isNewArrival: true,
    images: ["https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Chanel Shield Chain",
    slug: "chanel-shield-chain",
    description: "High-fashion shield sunglasses. The temples feature an interwoven leather and gold chain detail, directly inspired by the iconic Chanel Classic Flap bag.",

    brandSlug: "chanel",
    categorySlug: "sunglasses",
    gender: "FEMALE",
    frameShape: "Shield",
    material: "Metal",
    lensType: "UV400 Protected",
    color: "Dark Ruthenium / Silver Chain",
    size: "Standard",
    isFeatured: false,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800"]
  },

  // ==================== EYEGLASSES (20 PRODUCTS) ====================
  {
    name: "Prada Heritage Optical",
    slug: "prada-heritage-optical",
    description: "Refined and intellectual. Made from thick, high-density acetate in custom matte navy blue. Fitted with premium blue-light blocking lenses.",

    brandSlug: "prada",
    categorySlug: "eyeglasses",
    gender: "MALE",
    frameShape: "Rectangular",
    material: "Acetate",
    lensType: "Blue Cut",
    color: "Matte Navy Blue",
    size: "54-18-145",
    isFeatured: false,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Prada Journal Round",
    slug: "prada-journal-round",
    description: "Vintage-inspired circle frames with a modern thin profile. Extremely lightweight and comfortable for all-day office wear and screen usage.",

    brandSlug: "prada",
    categorySlug: "eyeglasses",
    gender: "UNISEX",
    frameShape: "Round",
    material: "Acetate",
    lensType: "Demo Lens",
    color: "Honey Tortoise",
    size: "50-21-140",
    isFeatured: false,
    isNewArrival: true,
    images: ["https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Cartier Signature C Optical",
    slug: "cartier-signature-c-optical",
    description: "Pure Japanese aerospace titanium combined with precious wood temples. Hand-polished details with gold electroplated monogram hinges.",

    brandSlug: "cartier",
    categorySlug: "eyeglasses",
    gender: "MALE",
    frameShape: "Rectangular",
    material: "Titanium",
    lensType: "Blue Cut",
    color: "Brushed Silver / Wood Temples",
    size: "55-17-145",
    isFeatured: true,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Cartier Santos Dumont Optical",
    slug: "cartier-santos-dumont-optical",
    description: "Sophisticated pilot-inspired optics. Features a delicate double bridge detailed with custom screws, representing Parisian luxury in corporate spaces.",

    brandSlug: "cartier",
    categorySlug: "eyeglasses",
    gender: "UNISEX",
    frameShape: "Square",
    material: "Metal",
    lensType: "Demo Lens",
    color: "Gold / Platinum Two-Tone",
    size: "54-18-145",
    isFeatured: false,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Ray-Ban Round Metal Optics",
    slug: "ray-ban-round-metal-optics",
    description: "An absolute retro classic. Round metal prescription frames inspired by the counterculture of the 1960s, finished in timeless matte gold.",

    brandSlug: "ray-ban",
    categorySlug: "eyeglasses",
    gender: "UNISEX",
    frameShape: "Round",
    material: "Metal",
    lensType: "Blue Cut",
    color: "Matte Gold",
    size: "Standard",
    isFeatured: false,
    isNewArrival: true,
    images: ["https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Ray-Ban Clubmaster Optics",
    slug: "ray-ban-clubmaster-optics",
    description: "The intellectual choice. Combines vintage details with high-quality dark tortoise acetate and polished gold-finished rims.",

    brandSlug: "ray-ban",
    categorySlug: "eyeglasses",
    gender: "UNISEX",
    frameShape: "Round",
    material: "Acetate",
    lensType: "Demo Lens",
    color: "Tortoise & Gold",
    size: "Standard",
    isFeatured: false,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Ray-Ban Caravan Optics",
    slug: "ray-ban-caravan-optics",
    description: "A geometric, square alternative to the aviator. Sturdy, architectural metal framing that defines clean contours for a strong masculine style.",

    brandSlug: "ray-ban",
    categorySlug: "eyeglasses",
    gender: "MALE",
    frameShape: "Square",
    material: "Metal",
    lensType: "Blue Cut",
    color: "Gunmetal",
    size: "Standard",
    isFeatured: false,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Gucci GG Logo Rectangular",
    slug: "gucci-gg-logo-rectangular",
    description: "Feminine, highly polished black acetate frame. Elegant gold double-G emblem on the hinges. Professional yet high-fashion.",

    brandSlug: "gucci",
    categorySlug: "eyeglasses",
    gender: "FEMALE",
    frameShape: "Rectangular",
    material: "Acetate",
    lensType: "Demo Lens",
    color: "Shiny Black",
    size: "52-20-140",
    isFeatured: true,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Gucci Web Block Round",
    slug: "gucci-web-block-round",
    description: "Fine gold metal round spectacles featuring the iconic Gucci web pattern on the temples. Lightweight and incredibly aesthetic.",

    brandSlug: "gucci",
    categorySlug: "eyeglasses",
    gender: "UNISEX",
    frameShape: "Round",
    material: "Metal",
    lensType: "Blue Cut",
    color: "Gold with Green/Red Details",
    size: "Standard",
    isFeatured: false,
    isNewArrival: true,
    images: ["https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Tom Ford FT5634 Blue Block",
    slug: "tom-ford-ft5634-blue-block",
    description: "Thick, bold statement eyeglasses pre-fitted with blue-light filtering technology. Handcrafted in Italy with iconic shiny gold T-logos.",

    brandSlug: "tom-ford",
    categorySlug: "eyeglasses",
    gender: "UNISEX",
    frameShape: "Square",
    material: "Acetate",
    lensType: "Blue Cut",
    color: "Dark Havana",
    size: "54-18-145",
    isFeatured: true,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Tom Ford FT5542 Vintage Round",
    slug: "tom-ford-ft5542-vintage-round",
    description: "An elegant combination of polished rose gold rims and black acetate temples. Delivers an academic, highly sophisticated look.",

    brandSlug: "tom-ford",
    categorySlug: "eyeglasses",
    gender: "UNISEX",
    frameShape: "Round",
    material: "Metal",
    lensType: "Demo Lens",
    color: "Shiny Rose Gold / Black",
    size: "50-21-140",
    isFeatured: false,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Chanel Pantos Optical",
    slug: "chanel-pantos-optical",
    description: "Elegant clear pink oval frames with custom, highly detailed tweed textures embedded in the metal temples. Pure French design philosophy.",

    brandSlug: "chanel",
    categorySlug: "eyeglasses",
    gender: "FEMALE",
    frameShape: "Oval",
    material: "Acetate",
    lensType: "Demo Lens",
    color: "Transparent Pink / Tweed Temples",
    size: "Standard",
    isFeatured: false,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Chanel Square Lambskin",
    slug: "chanel-square-lambskin",
    description: "Ultra-premium rectangular frames with hand-stitched black calf lambskin wrapped around the temple arms. Provides unmatched comfort and style.",

    brandSlug: "chanel",
    categorySlug: "eyeglasses",
    gender: "FEMALE",
    frameShape: "Square",
    material: "Acetate",
    lensType: "Blue Cut",
    color: "Black / Quilted Leather",
    size: "52-20-140",
    isFeatured: true,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Oakley Pitchman R",
    slug: "oakley-pitchman-r",
    description: "Fitted with screwless Hollowpoint hinges, combining durable O-Matter material with ultra-thin steel temples for an absolute sports-luxury feel.",

    brandSlug: "oakley",
    categorySlug: "eyeglasses",
    gender: "MALE",
    frameShape: "Round",
    material: "O-Matter",
    lensType: "Demo Lens",
    color: "Satin Grey Smoke",
    size: "Standard",
    isFeatured: false,
    isNewArrival: true,
    images: ["https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Oakley Socket 5.5",
    slug: "oakley-socket-5-5",
    description: "An industrial-grade C-5 alloy frame featuring custom wire-core temples. Combines high tensile strength with comfortable, customized fits.",

    brandSlug: "oakley",
    categorySlug: "eyeglasses",
    gender: "MALE",
    frameShape: "Rectangular",
    material: "Metal",
    lensType: "Blue Cut",
    color: "Pewter",
    size: "55-17-145",
    isFeatured: false,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Prada Linea Rossa Optical",
    slug: "prada-linea-rossa-optical",
    description: "Sporty, dynamic rectangular frames crafted in Italy. Featuring the signature red Prada line accent on rubberized, non-slip temple sleeves.",

    brandSlug: "prada",
    categorySlug: "eyeglasses",
    gender: "MALE",
    frameShape: "Square",
    material: "Nylon",
    lensType: "Demo Lens",
    color: "Matte Dark Grey",
    size: "54-18-145",
    isFeatured: false,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Cartier Trinity Optical",
    slug: "cartier-trinity-optical",
    description: "A poetic masterpiece. Features three intertwined gold, white, and rose gold rings on the temples, representing love, fidelity, and friendship.",

    brandSlug: "cartier",
    categorySlug: "eyeglasses",
    gender: "FEMALE",
    frameShape: "Round",
    material: "Gold Plated",
    lensType: "Demo Lens",
    color: "Gold/White/Rose Gold Bands",
    size: "Standard",
    isFeatured: false,
    isNewArrival: true,
    images: ["https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Ray-Ban Erika Optics",
    slug: "ray-ban-erika-optics",
    description: "Extremely popular soft round shape with a rubberized front finish and fine, lightweight metallic temple arms. Effortless everyday luxury.",

    brandSlug: "ray-ban",
    categorySlug: "eyeglasses",
    gender: "FEMALE",
    frameShape: "Round",
    material: "Plastic",
    lensType: "Blue Cut",
    color: "Rubberized Black / Silver",
    size: "Standard",
    isFeatured: false,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Gucci Cat-Eye Crystal",
    slug: "gucci-cat-eye-crystal",
    description: "A gorgeous, cat-eye model featuring individually hand-set tiny Swarovski crystals along the upper acetate rims. Exudes confidence and glamor.",

    brandSlug: "gucci",
    categorySlug: "eyeglasses",
    gender: "FEMALE",
    frameShape: "Cat Eye",
    material: "Acetate",
    lensType: "Demo Lens",
    color: "Transparent Champagne / Crystals",
    size: "Standard",
    isFeatured: false,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Tom Ford FT5294 Classic",
    slug: "tom-ford-ft5294-classic",
    description: "The definitive vintage academic circle frames. Exquisitely handcrafted in Italy from rich havana-patterned acetate and polished metal.",

    brandSlug: "tom-ford",
    categorySlug: "eyeglasses",
    gender: "MALE",
    frameShape: "Round",
    material: "Acetate",
    lensType: "Blue Cut",
    color: "Light Havana",
    size: "Standard",
    isFeatured: false,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800"]
  },

  // ==================== CONTACT LENSES (5 PRODUCTS) ====================
  {
    name: "Acuvue Oasys 1-Day",
    slug: "acuvue-oasys-1-day",
    description: "Unmatched moisture and breathability. Hydraluxe technology mimics natural tears to keep eyes comfortable even through intensive digital screen work.",

    brandSlug: "acuvue",
    categorySlug: "contact-lenses",
    gender: "UNISEX",
    frameShape: "None",
    material: "None",
    lensType: "Daily Disposable",
    color: "Clear",
    size: "Pack of 30",
    isFeatured: true,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1536816579748-4fcb39a53456?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Acuvue Moist 1-Day (Multifocal)",
    slug: "acuvue-moist-1-day-multifocal",
    description: "Specifically engineered for clear presbyopic vision. Provides transition-free focus across near, intermediate, and far distances all day.",

    brandSlug: "acuvue",
    categorySlug: "contact-lenses",
    gender: "UNISEX",
    frameShape: "None",
    material: "None",
    lensType: "Daily Disposable",
    color: "Clear",
    size: "Pack of 30",
    isFeatured: false,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1536816579748-4fcb39a53456?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Alcon Air Optix Colors",
    slug: "alcon-air-optix-colors",
    description: "Stunning color enhancement with high breathability. SmartShield technology prevents deposit build-up, ensuring pristine clarity all month long.",

    brandSlug: "alcon",
    categorySlug: "contact-lenses",
    gender: "UNISEX",
    frameShape: "None",
    material: "None",
    lensType: "Monthly Disposable",
    color: "Pure Hazel / Gemstone Green",
    size: "Pack of 2",
    isFeatured: false,
    isNewArrival: true,
    images: ["https://images.unsplash.com/photo-1536816579748-4fcb39a53456?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Bausch & Lomb Ultra",
    slug: "bausch-lomb-ultra",
    description: "Features MoistureSeal technology, maintaining 95% of lens moisture for a full 16 hours. Excellent choice for heavy computer and mobile users.",

    brandSlug: "bausch-lomb",
    categorySlug: "contact-lenses",
    gender: "UNISEX",
    frameShape: "None",
    material: "None",
    lensType: "Monthly Disposable",
    color: "Clear",
    size: "Pack of 6",
    isFeatured: true,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1536816579748-4fcb39a53456?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Alcon Dailies Total 1",
    slug: "alcon-dailies-total-1",
    description: "The world's first water gradient contact lens. Reaches nearly 100% water at the outermost surface, creating a cushion of moisture that feels like nothing.",

    brandSlug: "alcon",
    categorySlug: "contact-lenses",
    gender: "UNISEX",
    frameShape: "None",
    material: "None",
    lensType: "Daily Disposable",
    color: "Clear",
    size: "Pack of 30",
    isFeatured: false,
    isNewArrival: true,
    images: ["https://images.unsplash.com/photo-1536816579748-4fcb39a53456?auto=format&fit=crop&q=80&w=800"]
  },

  // ==================== ACCESSORIES (5 PRODUCTS) ====================
  {
    name: "Cartier Leather Eyewear Case",
    slug: "cartier-leather-eyewear-case",
    description: "Exquisite case lined with premium velvet inside and finished in Cartier's iconic burgundy calfskin with gold corner detailing.",

    brandSlug: "cartier",
    categorySlug: "accessories",
    gender: "UNISEX",
    frameShape: "None",
    material: "None",
    lensType: "None",
    color: "Cartier Burgundy",
    size: "Standard",
    isFeatured: true,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1614713570650-d5573a6ac984?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Prada Saffiano Glass Cord",
    slug: "prada-saffiano-glass-cord",
    description: "A high-fashion leather glass retainer strap in textured Saffiano leather, equipped with metal loop buckles and gold lettering.",

    brandSlug: "prada",
    categorySlug: "accessories",
    gender: "UNISEX",
    frameShape: "None",
    material: "None",
    lensType: "None",
    color: "Black / Red Trim",
    size: "Standard",
    isFeatured: false,
    isNewArrival: true,
    images: ["https://images.unsplash.com/photo-1604785846291-23fc23bb8f67?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Emirates Opticians Premium Kit",
    slug: "emirates-opticians-premium-kit",
    description: "Includes an eco-friendly anti-static lens cleaning fluid, a high-density micro-fiber cloth in luxury forest emerald green, and a travel case.",

    brandSlug: "emirates-opticians",
    categorySlug: "accessories",
    gender: "UNISEX",
    frameShape: "None",
    material: "None",
    lensType: "None",
    color: "Emerald Green / Gold",
    size: "Standard",
    isFeatured: true,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1614713570650-d5573a6ac984?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Ray-Ban Vintage Leather Pouch",
    slug: "ray-ban-vintage-leather-pouch",
    description: "Distressed retro tan leather snap pouch lined with velvet. Authentic Ray-Ban vintage accessory, providing highly resilient protection.",

    brandSlug: "ray-ban",
    categorySlug: "accessories",
    gender: "UNISEX",
    frameShape: "None",
    material: "None",
    lensType: "None",
    color: "Tan Brown",
    size: "Standard",
    isFeatured: false,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1604785846291-23fc23bb8f67?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Oakley Microbag Large",
    slug: "oakley-microbag-large",
    description: "Official Oakley microfiber storage and cleaning bag. Specially formulated material prevents scratches on delicate lens coatings.",

    brandSlug: "oakley",
    categorySlug: "accessories",
    gender: "UNISEX",
    frameShape: "None",
    material: "None",
    lensType: "None",
    color: "Multi-Logo Custom Print",
    size: "Standard",
    isFeatured: false,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1614713570650-d5573a6ac984?auto=format&fit=crop&q=80&w=800"]
  }
];

async function seedCatalog() {
  console.log("⏳ Starting Catalog Initialization Protocol...");

  try {
    console.log("⏳ Injecting Luxury Brands...");
    const brandMap: Record<string, string> = {};
    for (const brand of BRANDS) {
      const b = await prisma.brand.upsert({
        where: { slug: brand.slug },
        update: { name: brand.name, description: brand.description },
        create: brand
      });
      brandMap[brand.slug] = b.id;
    }

    console.log("⏳ Injecting Collection Categories...");
    const categoryMap: Record<string, string> = {};
    for (const category of CATEGORIES) {
      const c = await prisma.category.upsert({
        where: { slug: category.slug },
        update: { name: category.name, description: category.description },
        create: category
      });
      categoryMap[category.slug] = c.id;
    }

    console.log("⏳ Injecting Malayalam Boutique Branches...");
    const branchIds: string[] = [];
    for (const branch of BRANCHES) {
      const br = await prisma.branch.upsert({
        where: { slug: branch.slug },
        update: {
          name: branch.name,
          address: branch.address,
          location: branch.location,
          phone: branch.phone,
          whatsapp: branch.whatsapp,
          timings: branch.timings,
          coordinates: branch.coordinates
        },
        create: branch
      });
      branchIds.push(br.id);
    }

    console.log("⏳ Cleaning old Catalog and Inventories to prevent collisions...");
    // Perform cleanup in a single transaction to prevent race conditions caused by PGBouncer session pooling
    await prisma.$transaction([
      prisma.enquiry.updateMany({
        where: { productId: { not: null } },
        data: { productId: null }
      }),
      prisma.inventory.deleteMany({}),
      prisma.productImage.deleteMany({}),
      prisma.product.deleteMany({})
    ]);

    console.log(`⏳ Injecting 50 Premium Products and mapping branch inventories...`);
    let count = 0;
    for (const rawProduct of RAW_PRODUCTS) {
      const brandId = brandMap[rawProduct.brandSlug];
      const categoryId = categoryMap[rawProduct.categorySlug];

      if (!brandId || !categoryId) {
        console.error(`❌ Skipping product ${rawProduct.name}: Brand/Category slug mismatch.`);
        continue;
      }

      // 1. Create Product
      const product = await prisma.product.create({
        data: {
          name: rawProduct.name,
          slug: rawProduct.slug,
          description: rawProduct.description,
          price: (rawProduct as any).price || 0,
          gender: rawProduct.gender,
          frameShape: rawProduct.frameShape,
          material: rawProduct.material,
          lensType: rawProduct.lensType,
          color: rawProduct.color,
          size: rawProduct.size,
          brandId,
          categoryId,
          isFeatured: rawProduct.isFeatured,
          isNewArrival: rawProduct.isNewArrival,
          isActive: true,
          metaTitle: `${rawProduct.name} - Authentic Luxury | Emirates Opticians`,
          metaDesc: rawProduct.description.substring(0, 155),
        }
      });

      // 2. Inject images
      for (let i = 0; i < rawProduct.images.length; i++) {
        await prisma.productImage.create({
          data: {
            url: rawProduct.images[i],
            order: i,
            productId: product.id
          }
        });
      }

      // 3. Inject inventory for each branch
      for (const branchId of branchIds) {
        // Random stock: 0 to 15
        const quantity = Math.floor(Math.random() * 16);
        let status: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK" = "IN_STOCK";
        if (quantity === 0) status = "OUT_OF_STOCK";
        else if (quantity <= 3) status = "LOW_STOCK";

        await prisma.inventory.create({
          data: {
            productId: product.id,
            branchId,
            quantity,
            status
          }
        });
      }

      count++;
    }

    console.log(`✅ Success! Successfully populated database with ${count} luxury products, mapped across all 6 branches!`);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedCatalog();
