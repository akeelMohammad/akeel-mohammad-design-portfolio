import { CHUNK_W, CHUNK_H } from '../utils/gridMath';

export type ProjectSlug =
  | 'ceylon-teanora'
  | 'reality-reimagined'
  | 'youtube-thumbnails'
  | 'bst-educational-campaign'
  | 'posters-and-campaigns';

export interface ProjectFigure {
  id: string;
  label: string;
  description: string;
  dimensions: string;
  aspectRatio: number; // width / height
  gridClass: string;
  variant: number;
  imageSrc: string;
  alt: string;
}

export interface ProjectData {
  slug: ProjectSlug;
  number: string; // "001" .. "005"
  title: string;
  subtitle: string;
  year: string;
  sector: string;
  projectType: string;
  services: string[];
  imagesCount: string;
  coverDimensions: string;
  coverAspectRatio: number;
  coverImage: string;
  coverAlt: string;
  description: string[];
  figures: ProjectFigure[];
  nextSlug: ProjectSlug;
}

export interface GridTileData {
  id: number; // 1 .. 88
  num: string; // "N°001" .. "N°088"
  slug: ProjectSlug;
  title: string;
  artworkTitle: string;
  imageSrc: string;
  alt: string;
  x: number;
  y: number;
  w: number;
  h: number;
  dim: string;
  variant: number;
}

export interface WorldTileInstance extends GridTileData {
  instanceId: string;
  worldX: number;
  worldY: number;
  quadrant: number;
}

export interface VerifiedArtworkAsset {
  id: number;
  slug: ProjectSlug;
  projectTitle: string;
  artworkTitle: string;
  src: string;
  width: number;
  height: number;
  dimensionsLabel: string;
  figureIndexLabel: string;
  variant: number;
  alt: string;
}

/**
 * All 41 verified original portfolio artworks supplied by Akeel Mohammad:
 * - 8 Packaging & Brand Identity designs in `/assets/aistudio/` (Project 01: Ceylon Teanora)
 * - 6 Digital Art & Photo Manipulation works in `/assets/aistudio/` (Project 02: Reality Reimagined)
 * - 7 YouTube Thumbnail Designs in `/assets/aistudio/` (Project 03: YouTube Thumbnail Design)
 * - 4 Educational Promotional designs in `/assets/aistudio/` & `/src/assets/portfolio/` (Project 04: BST Educational Campaign)
 * - 16 Poster & Campaign Graphics in `/src/assets/portfolio/` (Project 05: Posters & Campaign Graphics)
 * Zero AI-generated or stock images are used.
 */
export const VERIFIED_ARTWORKS: VerifiedArtworkAsset[] = [
  // Project 01: Ceylon Teanora — Packaging & Brand Identity (8 designs)
  {
    id: 1,
    slug: 'ceylon-teanora',
    projectTitle: 'Ceylon Teanora',
    artworkTitle: 'Pure Ceylon Tea Cubes — Packaging Label',
    src: '/assets/aistudio/Pur_tea_59a5ef5c.jpg',
    width: 609,
    height: 425,
    dimensionsLabel: '609 × 425 px',
    figureIndexLabel: '01 / 08 — 609 × 425',
    variant: 1,
    alt: 'Ceylon Teanora Pure Ceylon Tea Instant Tea Cubes 100g packaging label featuring deep emerald green palette, gold botanical tea leaf illustrations, and refined serif typography',
  },
  {
    id: 2,
    slug: 'ceylon-teanora',
    projectTitle: 'Ceylon Teanora',
    artworkTitle: 'Cardamom Tea Cubes — Packaging Label',
    src: '/assets/aistudio/Cardamon_7ed6a0d8.jpg',
    width: 609,
    height: 425,
    dimensionsLabel: '609 × 425 px',
    figureIndexLabel: '02 / 08 — 609 × 425',
    variant: 2,
    alt: 'Ceylon Teanora Cardamom Tea Cubes 100g packaging label with rich espresso brown background and gold cardamom pod botanical illustrations',
  },
  {
    id: 3,
    slug: 'ceylon-teanora',
    projectTitle: 'Ceylon Teanora',
    artworkTitle: 'Ginger Tea Cubes — Packaging Label',
    src: '/assets/aistudio/Ginger_73872834.jpg',
    width: 609,
    height: 425,
    dimensionsLabel: '609 × 425 px',
    figureIndexLabel: '03 / 08 — 609 × 425',
    variant: 3,
    alt: 'Ceylon Teanora Ginger Tea Cubes 100g packaging label featuring warm earth-brown tones and gold ginger root botanical line art',
  },
  {
    id: 4,
    slug: 'ceylon-teanora',
    projectTitle: 'Ceylon Teanora',
    artworkTitle: 'Vanilla Tea Cubes — Packaging Label',
    src: '/assets/aistudio/Vanilla_3eccf5c9.jpg',
    width: 609,
    height: 425,
    dimensionsLabel: '609 × 425 px',
    figureIndexLabel: '04 / 08 — 609 × 425',
    variant: 4,
    alt: 'Ceylon Teanora Vanilla Tea Cubes 100g packaging label on an ivory cream background with gold vanilla orchid botanical illustrations',
  },
  {
    id: 5,
    slug: 'ceylon-teanora',
    projectTitle: 'Ceylon Teanora',
    artworkTitle: 'Chai Tea Cubes — Packaging Label',
    src: '/assets/aistudio/Chai_tea_9953e4e5.jpg',
    width: 609,
    height: 425,
    dimensionsLabel: '609 × 425 px',
    figureIndexLabel: '05 / 08 — 609 × 425',
    variant: 5,
    alt: 'Ceylon Teanora Chai Tea Cubes 100g packaging label featuring soft lavender-blush tones, metallic gold header band, and botanical tea leaves',
  },
  {
    id: 6,
    slug: 'ceylon-teanora',
    projectTitle: 'Ceylon Teanora',
    artworkTitle: 'Cinnamon Tea Cubes — Packaging Label',
    src: '/assets/aistudio/Cinamon_c55d068e.jpg',
    width: 609,
    height: 425,
    dimensionsLabel: '609 × 425 px',
    figureIndexLabel: '06 / 08 — 609 × 425',
    variant: 6,
    alt: 'Ceylon Teanora Cinnamon Tea Cubes 100g packaging label with warm cinnamon-bark brown palette, star anise, and cinnamon stick illustrations',
  },
  {
    id: 7,
    slug: 'ceylon-teanora',
    projectTitle: 'Ceylon Teanora',
    artworkTitle: 'Pure Ceylon Instant Cubes — Promotional Graphic (9 × 12)',
    src: '/assets/aistudio/9_x_12_800cdd6a.jpg',
    width: 340,
    height: 255,
    dimensionsLabel: '340 × 255 px',
    figureIndexLabel: '07 / 08 — 340 × 255',
    variant: 7,
    alt: 'Ceylon Teanora Pure Ceylon Instant Cubes promotional brand application (9 × 12 format) with intricate botanical foliage pattern and gold emblem',
  },
  {
    id: 8,
    slug: 'ceylon-teanora',
    projectTitle: 'Ceylon Teanora',
    artworkTitle: 'Pure Ceylon Instant Cubes — Promotional Graphic (12 × 14)',
    src: '/assets/aistudio/12_x_14_7383d06f.jpg',
    width: 397,
    height: 340,
    dimensionsLabel: '397 × 340 px',
    figureIndexLabel: '08 / 08 — 397 × 340',
    variant: 8,
    alt: 'Ceylon Teanora Pure Ceylon Instant Cubes promotional brand application (12 × 14 format) with dark forest green and gold brand crest',
  },

  // Project 02: Reality Reimagined — Digital Art & Creative Exploration (6 artworks using original file names)
  {
    id: 9,
    slug: 'reality-reimagined',
    projectTitle: 'Reality Reimagined',
    artworkTitle: 'ඇස්වහ කටවහ දුරු වේවා!',
    src: '/assets/aistudio/______________________0bab716f.jpg',
    width: 1080,
    height: 1080,
    dimensionsLabel: '1080 × 1080 px',
    figureIndexLabel: '01 / 06 — 1080 × 1080',
    variant: 1,
    alt: 'ඇස්වහ කටවහ දුරු වේවා! — Surreal pop-art portrait manipulation featuring lime halves over the eyes and green chili peppers forming the lips against a vibrant yellow circle and red backdrop',
  },
  {
    id: 10,
    slug: 'reality-reimagined',
    projectTitle: 'Reality Reimagined',
    artworkTitle: 'පුරහඳ කලුවර',
    src: '/assets/aistudio/____________cb85931b.jpg',
    width: 1080,
    height: 1080,
    dimensionsLabel: '1080 × 1080 px',
    figureIndexLabel: '02 / 06 — 1080 × 1080',
    variant: 2,
    alt: 'පුරහඳ කලුවර — Conceptual photo manipulation blending an expressive portrait with a classical carved white marble bearded bust against a yellow sun and slate-blue background',
  },
  {
    id: 11,
    slug: 'reality-reimagined',
    projectTitle: 'Reality Reimagined',
    artworkTitle: 'සිගරට් ඇත ගින්දර නැත',
    src: '/assets/aistudio/_____________________ebe730f7.jpg',
    width: 1080,
    height: 1080,
    dimensionsLabel: '1080 × 1080 px',
    figureIndexLabel: '03 / 06 — 1080 × 1080',
    variant: 3,
    alt: 'සිගරට් ඇත ගින්දර නැත — Surreal mixed-media composition of a monochrome street violinist leaning against a giant cigarette pillar inside a hand-drawn ink cityscape with Sinhala calligraphy',
  },
  {
    id: 12,
    slug: 'reality-reimagined',
    projectTitle: 'Reality Reimagined',
    artworkTitle: 'A Little Longer',
    src: '/assets/aistudio/A_Little_Longer_dd7f2394.jpg',
    width: 1080,
    height: 1080,
    dimensionsLabel: '1080 × 1080 px',
    figureIndexLabel: '04 / 06 — 1080 × 1080',
    variant: 4,
    alt: 'A Little Longer — Conceptual digital artwork showing worn black flip-flop sandals held together by a giant golden safety pin on a deep red background',
  },
  {
    id: 13,
    slug: 'reality-reimagined',
    projectTitle: 'Reality Reimagined',
    artworkTitle: 'Just Do it',
    src: '/assets/aistudio/Just_Do_it_016f2954.jpg',
    width: 1080,
    height: 1080,
    dimensionsLabel: '1080 × 1080 px',
    figureIndexLabel: '05 / 06 — 1080 × 1080',
    variant: 5,
    alt: 'Just Do it — Experimental pop-art illustration featuring a high-contrast engraved honey badger emblem on a cyan, yellow, and red frame',
  },
  {
    id: 14,
    slug: 'reality-reimagined',
    projectTitle: 'Reality Reimagined',
    artworkTitle: 'ශාපලත් ජීවිත දෙවියන්ට භාරය',
    src: '/assets/aistudio/___________________________646bc580.jpg',
    width: 488,
    height: 648,
    dimensionsLabel: '488 × 648 px',
    figureIndexLabel: '06 / 06 — 488 × 648',
    variant: 6,
    alt: 'ශාපලත් ජීවිත දෙවියන්ට භාරය — Experimental digital collage overlaying Vincent van Gogh self-portrait with a blue sky painting, crimson halo, and circular Sinhala typography',
  },

  // Project 03: YouTube Thumbnail Design — Digital Media & Creator Graphics (7 thumbnails)
  {
    id: 15,
    slug: 'youtube-thumbnails',
    projectTitle: 'YouTube Thumbnail Design',
    artworkTitle: 'GCE A/L Arduino — Educational Thumbnail',
    src: '/assets/aistudio/Hirusha_Arduino_0fb14746.jpg',
    width: 1280,
    height: 720,
    dimensionsLabel: '1280 × 720 px',
    figureIndexLabel: '01 / 07 — 1280 × 720',
    variant: 1,
    alt: 'GCE A/L Arduino YouTube thumbnail featuring dramatic lantern lighting in darkness and glowing 3D ARDUINO typography',
  },
  {
    id: 16,
    slug: 'youtube-thumbnails',
    projectTitle: 'YouTube Thumbnail Design',
    artworkTitle: 'Python Past Papers — A/L ICT Thumbnail',
    src: '/assets/aistudio/_____________past_papers_13623767.jpg',
    width: 1280,
    height: 720,
    dimensionsLabel: '1280 × 720 px',
    figureIndexLabel: '02 / 07 — 1280 × 720',
    variant: 2,
    alt: 'Python Past Papers YouTube thumbnail featuring instructor profile face-to-face with a giant python snake and 3D Python emblem',
  },
  {
    id: 17,
    slug: 'youtube-thumbnails',
    projectTitle: 'YouTube Thumbnail Design',
    artworkTitle: 'Networking Part 1 (ජාලකරණය) — A/L ICT Thumbnail',
    src: '/assets/aistudio/Frame_10_58597883.jpg',
    width: 1280,
    height: 720,
    dimensionsLabel: '1280 × 720 px',
    figureIndexLabel: '03 / 07 — 1280 × 720',
    variant: 3,
    alt: 'Networking Part 1 Introduction and Medium YouTube thumbnail with multi-armed instructor holding a Wi-Fi router, network switches, Ethernet cable, and MacBook',
  },
  {
    id: 18,
    slug: 'youtube-thumbnails',
    projectTitle: 'YouTube Thumbnail Design',
    artworkTitle: 'Number Systems Part 1 (සංඛ්‍යා පද්ධති) — A/L ICT Thumbnail',
    src: '/assets/aistudio/Frame_19_60cbefd1.jpg',
    width: 1280,
    height: 720,
    dimensionsLabel: '1280 × 720 px',
    figureIndexLabel: '04 / 07 — 1280 × 720',
    variant: 4,
    alt: 'Number Systems Part 1 YouTube thumbnail featuring instructor seated on a giant cracked concrete die embedded in a shattered white floor',
  },
  {
    id: 19,
    slug: 'youtube-thumbnails',
    projectTitle: 'YouTube Thumbnail Design',
    artworkTitle: 'Operating Systems Part 1 (මෙහෙයුම් පද්ධති) — A/L ICT Thumbnail',
    src: '/assets/aistudio/________________947c40c1.jpg',
    width: 1280,
    height: 720,
    dimensionsLabel: '1280 × 720 px',
    figureIndexLabel: '05 / 07 — 1280 × 720',
    variant: 5,
    alt: 'Operating Systems Part 1 A/L ICT YouTube thumbnail for Hirusha Lakshan featuring layered Sinhala and English display typography',
  },
  {
    id: 20,
    slug: 'youtube-thumbnails',
    projectTitle: 'YouTube Thumbnail Design',
    artworkTitle: 'Mechanization Lesson 12 (යාන්ත්‍රීකරණය) — BST Thumbnail',
    src: '/assets/aistudio/PUBUDU_yanthrikaranaya_0327262a.jpg',
    width: 1280,
    height: 720,
    dimensionsLabel: '1280 × 720 px',
    figureIndexLabel: '06 / 07 — 1280 × 720',
    variant: 6,
    alt: 'BST From J’Pura Lesson 12 Mechanization YouTube thumbnail for Pubudu Erandika seated on a tractor with a technical blueprint wireframe engine cutaway',
  },
  {
    id: 21,
    slug: 'youtube-thumbnails',
    projectTitle: 'YouTube Thumbnail Design',
    artworkTitle: 'Climate Lesson 01 (දේශගුණය) — BST Thumbnail',
    src: '/assets/aistudio/PUBUDU_6c6efc36.jpg',
    width: 1280,
    height: 720,
    dimensionsLabel: '1280 × 720 px',
    figureIndexLabel: '07 / 07 — 1280 × 720',
    variant: 7,
    alt: 'BST From J’Pura Lesson 1 Climate YouTube thumbnail for Pubudu Erandika holding a floating Earth globe against bold red Sinhala typography',
  },

  // Project 04: BST Educational Campaign — Social Media & Promotional Design (4 designs paired by matching sizes in 2 rows of 2)
  // Note: COVER image for BST Educational Campaign remains dileepa_4d1dc9aa.png (1080 × 1350 px) so the intro section is unchanged.
  {
    id: 22,
    slug: 'bst-educational-campaign',
    projectTitle: 'BST Educational Campaign',
    artworkTitle: 'BST 2028 Advanced Level Tuition Class Promotion',
    src: '/assets/aistudio/__dae0c82c.png',
    width: 1587,
    height: 2245,
    dimensionsLabel: '1587 × 2245 px',
    figureIndexLabel: '01 / 04 — 1587 × 2245',
    variant: 1,
    alt: 'BST 2028 Advanced Level Tuition Class Promotion poster featuring a bold black number 1 wearing a crown inside a golden-yellow circle for Madhushan Basnayaka (Kekirawa, Galewela, and Eppawala classes).',
  },
  {
    id: 23,
    slug: 'bst-educational-campaign',
    projectTitle: 'BST Educational Campaign',
    artworkTitle: 'O/L Mathematics Video Pack Promotion',
    src: '/src/assets/portfolio/poster-02-img-20250910-080400-140.jpg',
    width: 904,
    height: 1280,
    dimensionsLabel: '904 × 1280 px',
    figureIndexLabel: '02 / 04 — 904 × 1280',
    variant: 2,
    alt: 'Educational Video Pack Promotion graphic featuring Sinhala academic course modules, clear typographic hierarchy, and instructor portrait.',
  },
  {
    id: 24,
    slug: 'bst-educational-campaign',
    projectTitle: 'BST Educational Campaign',
    artworkTitle: 'BST Educational Video Pack Promotion',
    src: '/assets/aistudio/dileepa_4d1dc9aa.png',
    width: 1080,
    height: 1350,
    dimensionsLabel: '1080 × 1350 px',
    figureIndexLabel: '03 / 04 — 1080 × 1350',
    variant: 3,
    alt: 'Bio System Technology BST Educational Video Pack Promotion graphic featuring instructor Madhushan Basnayaka holding the BST MCQ workbook against oversized yellow BST typography.',
  },
  {
    id: 25,
    slug: 'bst-educational-campaign',
    projectTitle: 'BST Educational Campaign',
    artworkTitle: 'BST 2027 Tuition Class Promotion',
    src: '/src/assets/portfolio/poster-03-img-20250910-080421-783.jpg',
    width: 1080,
    height: 1080,
    dimensionsLabel: '1080 × 1080 px',
    figureIndexLabel: '04 / 04 — 1080 × 1080',
    variant: 4,
    alt: 'BST 2027 Bio System Technology Tuition Class Promotion graphic for Madhushan Basnayaka at Ceylon Opera Higher Education Center.',
  },

  // Project 05: Posters & Campaign Graphics (16 designs paired into 8 rows of 2 matching-size images)
  // Row 1: 853 × 1066 px pair
  {
    id: 26,
    slug: 'posters-and-campaigns',
    projectTitle: 'Posters & Campaign Graphics',
    artworkTitle: 'Wetland Cleanup — Beddagama Wetland Park',
    src: '/src/assets/portfolio/poster-18-wetland-cleanup-8-.jpg',
    width: 853,
    height: 1066,
    dimensionsLabel: '853 × 1066 px',
    figureIndexLabel: '01 / 16 — 853 × 1066',
    variant: 1,
    alt: 'Wetland Cleanup Register Now environmental campaign poster for Beddagama Wetland Park by Rotaract Club of University of Sri Jayewardenepura.',
  },
  {
    id: 27,
    slug: 'posters-and-campaigns',
    projectTitle: 'Posters & Campaign Graphics',
    artworkTitle: 'Wetland Cleanup — Community Action',
    src: '/src/assets/portfolio/poster-17-wetland-cleanup-2-.jpg',
    width: 853,
    height: 1066,
    dimensionsLabel: '853 × 1066 px',
    figureIndexLabel: '02 / 16 — 853 × 1066',
    variant: 2,
    alt: 'Wetland Cleanup Successfully Concluded campaign poster featuring Rotaract District 3220 volunteers in environmental community action.',
  },
  // Row 2: 4:5 (0.800 aspect ratio) pair (853 × 1066 px & 768 × 960 px)
  {
    id: 28,
    slug: 'posters-and-campaigns',
    projectTitle: 'Posters & Campaign Graphics',
    artworkTitle: 'Wetland Cleanup — Aerial Wetland Series',
    src: '/src/assets/portfolio/poster-16-wetland-cleanup-1-.jpg',
    width: 853,
    height: 1066,
    dimensionsLabel: '853 × 1066 px',
    figureIndexLabel: '03 / 16 — 853 × 1066',
    variant: 3,
    alt: 'Wetland Cleanup aerial wetland environmental awareness campaign poster for Rotaract District 3220.',
  },
  {
    id: 29,
    slug: 'posters-and-campaigns',
    projectTitle: 'Posters & Campaign Graphics',
    artworkTitle: "Mind Maze '25 — Book The Date",
    src: '/src/assets/portfolio/poster-08-img-20250913-113205-409.jpg',
    width: 768,
    height: 960,
    dimensionsLabel: '768 × 960 px',
    figureIndexLabel: '04 / 16 — 768 × 960',
    variant: 4,
    alt: "Mind Maze '25 Book the Date event teaser poster for Rotaract Club of University of Sri Jayewardenepura.",
  },
  // Row 3: 1024 × 1280 px pair
  {
    id: 30,
    slug: 'posters-and-campaigns',
    projectTitle: 'Posters & Campaign Graphics',
    artworkTitle: "Someone's Daughter — Podcast Series",
    src: '/src/assets/portfolio/poster-15-someone-s-daughter-0-.jpg',
    width: 1024,
    height: 1280,
    dimensionsLabel: '1024 × 1280 px',
    figureIndexLabel: '05 / 16 — 1024 × 1280',
    variant: 5,
    alt: "Someone's Daughter Podcast Series promotional key art poster featuring three illustrated women and expressive display typography.",
  },
  {
    id: 31,
    slug: 'posters-and-campaigns',
    projectTitle: 'Posters & Campaign Graphics',
    artworkTitle: 'Donate Happiness — Deepavali Charity Drive',
    src: '/src/assets/portfolio/poster-01-1-.jpg',
    width: 1024,
    height: 1280,
    dimensionsLabel: '1024 × 1280 px',
    figureIndexLabel: '06 / 16 — 1024 × 1280',
    variant: 6,
    alt: 'Donate Happiness Deepavali charity campaign poster for CSDS and CGU University of Sri Jayewardenepura.',
  },
  // Row 4: 853 × 1280 px pair (Marine Wisdom Part 1)
  {
    id: 32,
    slug: 'posters-and-campaigns',
    projectTitle: 'Posters & Campaign Graphics',
    artworkTitle: 'Shark — Marine Wisdom Illustrated Series',
    src: '/src/assets/portfolio/poster-04-img-20250912-195911-653.jpg',
    width: 853,
    height: 1280,
    dimensionsLabel: '853 × 1280 px',
    figureIndexLabel: '07 / 16 — 853 × 1280',
    variant: 7,
    alt: 'Shark illustrated typographic poster: "Every scar tells a story; wear your trials with pride."',
  },
  {
    id: 33,
    slug: 'posters-and-campaigns',
    projectTitle: 'Posters & Campaign Graphics',
    artworkTitle: 'Jelly Fish — Marine Wisdom Illustrated Series',
    src: '/src/assets/portfolio/poster-05-img-20250912-195911-702.jpg',
    width: 853,
    height: 1280,
    dimensionsLabel: '853 × 1280 px',
    figureIndexLabel: '08 / 16 — 853 × 1280',
    variant: 8,
    alt: 'Jelly Fish illustrated typographic poster: "Rise without resistance; life\'s currents carry the wise."',
  },
  // Row 5: 853 × 1280 px pair (Marine Wisdom Part 2)
  {
    id: 34,
    slug: 'posters-and-campaigns',
    projectTitle: 'Posters & Campaign Graphics',
    artworkTitle: 'Whale — Marine Wisdom Illustrated Series',
    src: '/src/assets/portfolio/poster-06-img-20250912-195911-844.jpg',
    width: 853,
    height: 1280,
    dimensionsLabel: '853 × 1280 px',
    figureIndexLabel: '09 / 16 — 853 × 1280',
    variant: 9,
    alt: 'Whale illustrated typographic poster: "Sing your truth, even if it echoes only in the depths."',
  },
  {
    id: 35,
    slug: 'posters-and-campaigns',
    projectTitle: 'Posters & Campaign Graphics',
    artworkTitle: 'Turtle — Marine Wisdom Illustrated Series',
    src: '/src/assets/portfolio/poster-07-img-20250912-195911-997.jpg',
    width: 853,
    height: 1280,
    dimensionsLabel: '853 × 1280 px',
    figureIndexLabel: '10 / 16 — 853 × 1280',
    variant: 10,
    alt: 'Turtle illustrated typographic poster: "Don\'t Rush, Good Things Take Time."',
  },
  // Row 6: 853 × 1066 px pair (Mind Maze '25 Part 1)
  {
    id: 36,
    slug: 'posters-and-campaigns',
    projectTitle: 'Posters & Campaign Graphics',
    artworkTitle: "Mind Maze '25 — Event Overview",
    src: '/src/assets/portfolio/poster-10-img-20250905-wa0012.jpg',
    width: 853,
    height: 1066,
    dimensionsLabel: '853 × 1066 px',
    figureIndexLabel: '11 / 16 — 853 × 1066',
    variant: 11,
    alt: "What is Mind Maze '25 event overview poster for Rotaract Club of University of Sri Jayewardenepura.",
  },
  {
    id: 37,
    slug: 'posters-and-campaigns',
    projectTitle: 'Posters & Campaign Graphics',
    artworkTitle: "Mind Maze '25 — Word Grid Teaser",
    src: '/src/assets/portfolio/poster-12-img-20250908-wa0003.jpg',
    width: 853,
    height: 1066,
    dimensionsLabel: '853 × 1066 px',
    figureIndexLabel: '12 / 16 — 853 × 1066',
    variant: 12,
    alt: "Mind Maze '25 Registration Opening Soon word search puzzle campaign poster.",
  },
  // Row 7: 853 × 1066 px pair (Mind Maze '25 Part 2)
  {
    id: 38,
    slug: 'posters-and-campaigns',
    projectTitle: 'Posters & Campaign Graphics',
    artworkTitle: "Mind Maze '25 — Prizes & Perks",
    src: '/src/assets/portfolio/poster-13-img-20250909-wa0075.jpg',
    width: 853,
    height: 1066,
    dimensionsLabel: '853 × 1066 px',
    figureIndexLabel: '13 / 16 — 853 × 1066',
    variant: 13,
    alt: "At Mind Maze '25 cash prizes and participant benefits promotional poster.",
  },
  {
    id: 39,
    slug: 'posters-and-campaigns',
    projectTitle: 'Posters & Campaign Graphics',
    artworkTitle: "Mind Maze '25 — Register Now",
    src: '/src/assets/portfolio/poster-14-img-20250909-wa0078.jpg',
    width: 853,
    height: 1066,
    dimensionsLabel: '853 × 1066 px',
    figureIndexLabel: '14 / 16 — 853 × 1066',
    variant: 14,
    alt: "Mind Maze '25 Register Now labyrinth silhouette campaign poster.",
  },
  // Row 8: Final campaign pair
  {
    id: 40,
    slug: 'posters-and-campaigns',
    projectTitle: 'Posters & Campaign Graphics',
    artworkTitle: "Mind Maze '25 — Treasure Map Teaser",
    src: '/src/assets/portfolio/poster-11-img-20250908-wa0002.jpg',
    width: 1080,
    height: 1257,
    dimensionsLabel: '1080 × 1257 px',
    figureIndexLabel: '15 / 16 — 1080 × 1257',
    variant: 15,
    alt: "Mind Maze '25 Registration Opening Soon illustrated treasure map teaser poster.",
  },
  {
    id: 41,
    slug: 'posters-and-campaigns',
    projectTitle: 'Posters & Campaign Graphics',
    artworkTitle: 'BioByte — Bioinformatics Symposium',
    src: '/src/assets/portfolio/poster-09-img-20250829-wa0000.jpg',
    width: 1563,
    height: 1563,
    dimensionsLabel: '1563 × 1563 px',
    figureIndexLabel: '16 / 16 — 1563 × 1563',
    variant: 16,
    alt: 'BioByte Unlock the Code of Life with Bioinformatics promotional poster for IEEE EMBS University of Sri Jayewardenepura.',
  },
];

const TEANORA_ARTWORKS = VERIFIED_ARTWORKS.filter((a) => a.slug === 'ceylon-teanora');
const REALITY_ARTWORKS = VERIFIED_ARTWORKS.filter((a) => a.slug === 'reality-reimagined');
const YOUTUBE_ARTWORKS = VERIFIED_ARTWORKS.filter((a) => a.slug === 'youtube-thumbnails');
const BST_ARTWORKS = VERIFIED_ARTWORKS.filter((a) => a.slug === 'bst-educational-campaign');
const POSTER_ARTWORKS = VERIFIED_ARTWORKS.filter((a) => a.slug === 'posters-and-campaigns');

/**
 * Organizes project artworks into a clean 2-images-per-row layout (`col-span-12 md:col-span-6`)
 * where both images in each row share the exact same container aspect ratio (`rowAspectRatio`)
 * so paired images always render at matching height and width without cropping.
 */
function buildPairedTwoColumnFigures(artworks: VerifiedArtworkAsset[]): ProjectFigure[] {
  return artworks.map((art, idx) => {
    const figNum = String(idx + 1).padStart(2, '0');
    const rowLead = artworks[idx - (idx % 2)] || art;
    const rowAspectRatio = rowLead.width / rowLead.height;

    return {
      id: `fig-${figNum}`,
      label: `Fig. ${figNum} — ${art.artworkTitle}`,
      description: art.alt,
      dimensions: art.dimensionsLabel,
      aspectRatio: rowAspectRatio,
      gridClass: 'col-span-12 md:col-span-6',
      variant: art.variant,
      imageSrc: art.src,
      alt: art.alt,
    };
  });
}

export const PROJECTS: Record<ProjectSlug, ProjectData> = {
  'ceylon-teanora': {
    slug: 'ceylon-teanora',
    number: '001',
    title: 'Ceylon Teanora',
    subtitle: 'Premium Ceylon Tea Product Collection',
    year: '2025',
    sector: 'Packaging & Brand Identity',
    projectType: 'Packaging Design / Product Branding',
    services: [
      'Packaging & Label Design',
      'Brand Identity',
      'Botanical Illustration',
      'Product Line Art Direction',
    ],
    imagesCount: String(TEANORA_ARTWORKS.length).padStart(2, '0'),
    coverDimensions: TEANORA_ARTWORKS[0].dimensionsLabel,
    coverAspectRatio: TEANORA_ARTWORKS[0].width / TEANORA_ARTWORKS[0].height,
    coverImage: TEANORA_ARTWORKS[0].src,
    coverAlt: TEANORA_ARTWORKS[0].alt,
    description: [
      'Ceylon Teanora is a premium tea packaging project featuring a coordinated series of instant tea cube product labels.',
      'The collection uses elegant gold accents, botanical illustrations, refined typography, and flavor-specific color palettes to establish a consistent visual identity across the product range.',
    ],
    figures: buildPairedTwoColumnFigures(TEANORA_ARTWORKS),
    nextSlug: 'reality-reimagined',
  },
  'reality-reimagined': {
    slug: 'reality-reimagined',
    number: '002',
    title: 'Reality Reimagined',
    subtitle: 'Surrealism, Photo Manipulation & Experimental Art',
    year: '2025',
    sector: 'Digital Art & Creative Exploration',
    projectType: 'Personal Creative Collection',
    services: [
      'Photo Manipulation',
      'Digital Art',
      'Surrealist Composition',
      'Visual Storytelling',
    ],
    imagesCount: String(REALITY_ARTWORKS.length).padStart(2, '0'),
    coverDimensions: REALITY_ARTWORKS[0].dimensionsLabel,
    coverAspectRatio: REALITY_ARTWORKS[0].width / REALITY_ARTWORKS[0].height,
    coverImage: REALITY_ARTWORKS[0].src,
    coverAlt: REALITY_ARTWORKS[0].alt,
    description: [
      'A personal collection of digital artworks exploring surrealism, atmosphere, scale, mood, and conceptual storytelling.',
      'These pieces combine photo manipulation, lighting effects, color grading, and visual symbolism to create imaginative scenes beyond everyday reality.',
    ],
    figures: buildPairedTwoColumnFigures(REALITY_ARTWORKS),
    nextSlug: 'youtube-thumbnails',
  },
  'youtube-thumbnails': {
    slug: 'youtube-thumbnails',
    number: '003',
    title: 'YouTube Thumbnail Design',
    subtitle: 'High-Impact Educational & Creator Thumbnails',
    year: '2025',
    sector: 'YouTube & Content Creator Graphics',
    projectType: 'Digital Media & Content Thumbnails',
    services: [
      'YouTube Thumbnail Design',
      'Photo Manipulation & Compositing',
      'Sinhala & English Typography',
      'Visual Hierarchy & Click Appeal',
    ],
    imagesCount: String(YOUTUBE_ARTWORKS.length).padStart(2, '0'),
    coverDimensions: YOUTUBE_ARTWORKS[0].dimensionsLabel,
    coverAspectRatio: YOUTUBE_ARTWORKS[0].width / YOUTUBE_ARTWORKS[0].height,
    coverImage: YOUTUBE_ARTWORKS[0].src,
    coverAlt: YOUTUBE_ARTWORKS[0].alt,
    description: [
      'A collection of high-impact YouTube thumbnails created for educational instructors and digital content series across GCE A/L ICT, Bio System Technology (BST), Arduino, and Python programming.',
      'Each thumbnail blends expressive subject compositing, dramatic lighting, bold Sinhala and English display typography, and conceptual visual metaphors engineered to capture viewer attention immediately.',
    ],
    figures: buildPairedTwoColumnFigures(YOUTUBE_ARTWORKS),
    nextSlug: 'bst-educational-campaign',
  },
  'bst-educational-campaign': {
    slug: 'bst-educational-campaign',
    number: '004',
    title: 'BST Educational Campaign',
    subtitle: 'Educational Marketing & Tuition Promotions',
    year: '2025',
    sector: 'Social Media & Promotional Design',
    projectType: 'Educational Advertising Graphics',
    services: [
      'Social Media Design',
      'Educational Advertising Graphics',
      'Sinhala & English Typography',
      'Promotional Layout Design',
    ],
    imagesCount: String(BST_ARTWORKS.length).padStart(2, '0'),
    coverDimensions: BST_ARTWORKS[2].dimensionsLabel,
    coverAspectRatio: BST_ARTWORKS[2].width / BST_ARTWORKS[2].height,
    coverImage: BST_ARTWORKS[2].src,
    coverAlt: BST_ARTWORKS[2].alt,
    description: [
      'Promotional graphics created for educational classes and video learning packages.',
      'The designs focus on strong information hierarchy, instructor branding, readable Sinhala typography, and social-media-friendly layouts.',
    ],
    figures: buildPairedTwoColumnFigures(BST_ARTWORKS),
    nextSlug: 'posters-and-campaigns',
  },
  'posters-and-campaigns': {
    slug: 'posters-and-campaigns',
    number: '005',
    title: 'Posters & Campaign Graphics',
    subtitle: 'Awareness Campaigns & Visual Communication',
    year: '2025',
    sector: 'Poster & Promotional Design',
    projectType: 'Awareness Campaigns & Visual Communication',
    services: [
      'Poster & Promotional Design',
      'Awareness Campaigns',
      'Event Branding',
      'Visual Storytelling',
    ],
    imagesCount: String(POSTER_ARTWORKS.length).padStart(2, '0'),
    coverDimensions: POSTER_ARTWORKS[0].dimensionsLabel,
    coverAspectRatio: POSTER_ARTWORKS[0].width / POSTER_ARTWORKS[0].height,
    coverImage: POSTER_ARTWORKS[0].src,
    coverAlt: POSTER_ARTWORKS[0].alt,
    description: [
      'A curated collection of awareness campaign posters, university symposium branding, and conceptual graphic series designed for community initiatives and digital distribution.',
      'Spanning environmental action campaigns (Wetland Cleanup), podcast key art (Someone’s Daughter), charitable drives (Donate Happiness), bioinformatics identity (BioByte), illustrated typographic posters (Marine Wisdom series), and multi-phase event campaigns (Mind Maze ’25).',
    ],
    figures: buildPairedTwoColumnFigures(POSTER_ARTWORKS),
    nextSlug: 'ceylon-teanora',
  },
};

export const PROJECT_LIST: ProjectData[] = [
  PROJECTS['ceylon-teanora'],
  PROJECTS['reality-reimagined'],
  PROJECTS['youtube-thumbnails'],
  PROJECTS['bst-educational-campaign'],
  PROJECTS['posters-and-campaigns'],
];

/**
 * Exact 88-tile coordinate slots from Studio Loum's 8×11 grid (2240×3080px chunk).
 */
const SLOT_COORDS: Array<{ x: number; y: number; w: number }> = [
  { x: 74, y: 49, w: 138 },
  { x: 341, y: 32, w: 156 },
  { x: 635, y: 50, w: 136 },
  { x: 919, y: 55, w: 128 },
  { x: 1190, y: 44, w: 142 },
  { x: 1479, y: 54, w: 130 },
  { x: 1756, y: 51, w: 134 },
  { x: 2032, y: 46, w: 138 },
  { x: 63, y: 334, w: 152 },
  { x: 345, y: 317, w: 150 },
  { x: 628, y: 321, w: 144 },
  { x: 906, y: 337, w: 148 },
  { x: 1199, y: 335, w: 128 },
  { x: 1472, y: 326, w: 138 },
  { x: 1747, y: 320, w: 146 },
  { x: 2034, y: 328, w: 134 },
  { x: 62, y: 593, w: 154 },
  { x: 342, y: 594, w: 152 },
  { x: 631, y: 604, w: 140 },
  { x: 915, y: 609, w: 134 },
  { x: 1190, y: 603, w: 142 },
  { x: 1466, y: 616, w: 148 },
  { x: 1751, y: 602, w: 138 },
  { x: 2028, y: 601, w: 144 },
  { x: 67, y: 880, w: 146 },
  { x: 358, y: 894, w: 128 },
  { x: 626, y: 897, w: 148 },
  { x: 905, y: 877, w: 150 },
  { x: 1182, y: 873, w: 154 },
  { x: 1464, y: 876, w: 150 },
  { x: 1757, y: 892, w: 130 },
  { x: 2037, y: 892, w: 130 },
  { x: 66, y: 1159, w: 148 },
  { x: 344, y: 1156, w: 150 },
  { x: 633, y: 1167, w: 136 },
  { x: 911, y: 1165, w: 138 },
  { x: 1186, y: 1177, w: 148 },
  { x: 1465, y: 1157, w: 150 },
  { x: 1744, y: 1156, w: 150 },
  { x: 2032, y: 1166, w: 136 },
  { x: 71, y: 1444, w: 140 },
  { x: 353, y: 1447, w: 136 },
  { x: 623, y: 1454, w: 152 },
  { x: 905, y: 1437, w: 148 },
  { x: 1187, y: 1440, w: 146 },
  { x: 1472, y: 1446, w: 138 },
  { x: 1754, y: 1449, w: 134 },
  { x: 2028, y: 1441, w: 144 },
  { x: 78, y: 1734, w: 128 },
  { x: 342, y: 1713, w: 154 },
  { x: 630, y: 1723, w: 142 },
  { x: 913, y: 1727, w: 136 },
  { x: 1181, y: 1732, w: 154 },
  { x: 1465, y: 1717, w: 150 },
  { x: 1746, y: 1718, w: 148 },
  { x: 2041, y: 1737, w: 124 },
  { x: 60, y: 1991, w: 156 },
  { x: 346, y: 1999, w: 148 },
  { x: 622, y: 1994, w: 152 },
  { x: 911, y: 2004, w: 140 },
  { x: 1193, y: 2007, w: 136 },
  { x: 1479, y: 2015, w: 128 },
  { x: 1742, y: 2013, w: 154 },
  { x: 2027, y: 2000, w: 146 },
  { x: 61, y: 2272, w: 154 },
  { x: 356, y: 2291, w: 132 },
  { x: 622, y: 2274, w: 152 },
  { x: 906, y: 2278, w: 148 },
  { x: 1193, y: 2287, w: 136 },
  { x: 1464, y: 2276, w: 150 },
  { x: 1759, y: 2294, w: 128 },
  { x: 2021, y: 2272, w: 154 },
  { x: 66, y: 2577, w: 148 },
  { x: 342, y: 2554, w: 152 },
  { x: 633, y: 2567, w: 136 },
  { x: 916, y: 2571, w: 132 },
  { x: 1198, y: 2574, w: 128 },
  { x: 1470, y: 2563, w: 142 },
  { x: 1746, y: 2577, w: 148 },
  { x: 2023, y: 2555, w: 152 },
  { x: 73, y: 2847, w: 136 },
  { x: 354, y: 2848, w: 134 },
  { x: 631, y: 2844, w: 140 },
  { x: 921, y: 2857, w: 124 },
  { x: 1188, y: 2841, w: 144 },
  { x: 1479, y: 2855, w: 128 },
  { x: 1745, y: 2837, w: 150 },
  { x: 2026, y: 2857, w: 148 },
];

/**
 * Balanced 41-item interleaved sequence of all verified artworks across the 5 projects
 * so Ceylon Teanora, Reality Reimagined, YouTube Thumbnail Design, BST Educational Campaign,
 * and Posters & Campaign Graphics appear harmoniously across every viewport neighborhood
 * of the infinite 2D canvas.
 */
const CANVAS_ARTWORK_SEQUENCE: VerifiedArtworkAsset[] = [
  TEANORA_ARTWORKS[0],
  REALITY_ARTWORKS[0],
  YOUTUBE_ARTWORKS[0],
  BST_ARTWORKS[0],
  POSTER_ARTWORKS[0],
  TEANORA_ARTWORKS[1],
  REALITY_ARTWORKS[1],
  YOUTUBE_ARTWORKS[1],
  BST_ARTWORKS[1],
  POSTER_ARTWORKS[3],
  TEANORA_ARTWORKS[6],
  REALITY_ARTWORKS[2],
  YOUTUBE_ARTWORKS[2],
  BST_ARTWORKS[2],
  POSTER_ARTWORKS[5],
  TEANORA_ARTWORKS[2],
  YOUTUBE_ARTWORKS[3],
  BST_ARTWORKS[3],
  REALITY_ARTWORKS[3],
  POSTER_ARTWORKS[6],
  TEANORA_ARTWORKS[3],
  YOUTUBE_ARTWORKS[4],
  POSTER_ARTWORKS[7],
  REALITY_ARTWORKS[4],
  TEANORA_ARTWORKS[4],
  YOUTUBE_ARTWORKS[5],
  POSTER_ARTWORKS[8],
  POSTER_ARTWORKS[9],
  TEANORA_ARTWORKS[5],
  YOUTUBE_ARTWORKS[6],
  REALITY_ARTWORKS[5],
  POSTER_ARTWORKS[4],
  TEANORA_ARTWORKS[7],
  POSTER_ARTWORKS[1],
  POSTER_ARTWORKS[2],
  POSTER_ARTWORKS[10],
  POSTER_ARTWORKS[11],
  POSTER_ARTWORKS[12],
  POSTER_ARTWORKS[13],
  POSTER_ARTWORKS[14],
  POSTER_ARTWORKS[15],
];

/**
 * Builds the 88-tile chunk using Akeel Mohammad's 41 verified artworks,
 * preserving each image's exact native aspect ratio (width / height) so no artwork is cropped.
 */
export const BASE_TILES: GridTileData[] = SLOT_COORDS.map((slot, index) => {
  const id = index + 1;
  const num = `N°${String(id).padStart(3, '0')}`;
  const art = CANVAS_ARTWORK_SEQUENCE[index % CANVAS_ARTWORK_SEQUENCE.length];
  const h = Math.round(slot.w * (art.height / art.width));

  return {
    id,
    num,
    slug: art.slug,
    title: art.projectTitle,
    artworkTitle: art.artworkTitle,
    imageSrc: art.src,
    alt: art.alt,
    x: slot.x,
    y: slot.y,
    w: slot.w,
    h,
    dim: art.figureIndexLabel,
    variant: art.variant,
  };
});

/**
 * Repeats the 88-tile 2240×3080 chunk in a 2×2 period (4480×6160 = 352 tiles)
 * matching Studio Loum's exact world layout for seamless toroidal wrapping.
 */
export const WORLD_TILES: WorldTileInstance[] = [0, 1].flatMap((qy) =>
  [0, 1].flatMap((qx) => {
    const quadrant = qy * 2 + qx;
    return BASE_TILES.map((tile) => ({
      ...tile,
      instanceId: `${tile.id}-q${quadrant}`,
      worldX: tile.x + qx * CHUNK_W,
      worldY: tile.y + qy * CHUNK_H,
      quadrant,
    }));
  })
);
