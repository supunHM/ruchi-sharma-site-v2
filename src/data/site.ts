/**
 * All copy on the site lives here. Every fact below is taken from
 * https://ruchisharma.com (about, resume, portfolio, contact pages).
 * Items marked REVIEW were inferred from file names / image text and should be
 * confirmed by Ruchi before launch.
 */

export const site = {
  name: 'Ruchi Sharma',
  url: 'https://ruchisharma.com',
  roles: ['Writer', 'Creative Director', 'Speaker', 'Mentor'],
  tagline: 'Brand storytelling that builds emotional connections in a human-centric world.',
  description:
    'Ruchi Sharma is an awarded Writer and Creative Director adept at brand storytelling that builds emotional connections in a human-centric world. Founder & CCO of HumanSense, Colombo.',
  email: 'ruchigucci@gmail.com',
  phone: '+94 766 444 428',
  phoneHref: '+94766444428',
  cv: 'https://ruchisharma.com/whyrdams/2024/01/Ruchi-Sharma_CV_2024.pdf',
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ruchis/' },
    { label: 'Instagram', href: 'https://www.instagram.com/ruchi.gucci/' },
    { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=629070285' },
    { label: 'X', href: 'https://twitter.com/ruchi_gucci' },
  ],
} as const;

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about/' },
  { label: 'Work', href: '/work/' },
  { label: 'Resume', href: '/resume/' },
  { label: "Let's Talk", href: '/contact/' },
] as const;

export const bio = [
  'Ruchi Sharma is an awarded Writer and Creative Director, adept at brand storytelling that builds emotional connections in a human-centric world.',
  'She understands the strategic complexities, cultural diversity and value of brands across global, regional and local structures, and implements a unified voice across every communication platform.',
  'Having held leadership roles in most large agency networks, Ruchi has grown and repositioned her clients’ businesses in New York, Bangkok, Southeast Asia, India and Sri Lanka.',
  'A staunch supporter of DEI values, she has studied Human Rights and co-created the first digitally-led global campaign on Human Rights for the UNHRC.',
  'She volunteers as a Personal Growth Officer with Women Empowered Global, sits on the D&AD Impact Council, and serves on the advisory boards of the New York Festival, the American Marketing Awards and the Family Planning Association of Sri Lanka.',
];

export const places = ['New York', 'Bangkok', 'Southeast Asia', 'India', 'Sri Lanka'];

export const awards =
  'Cannes, Spikes, Clios, London International, Adstars, New York Festival: World Gold medal. Most awarded South Asia agency at Abbies, Sri Lanka Agency of the Year, Best of Ogilvy Worldwide. Guest of the UN for the Human Rights campaign.';

export const awardsMarquee = [
  'Cannes',
  'Spikes',
  'Clios',
  'London International',
  'Adstars',
  'New York Festival — World Gold',
  'Abbies',
  'Best of Ogilvy Worldwide',
];

export const jury: { year: string; title: string; note?: string }[] = [
  { year: '2021–2023', title: 'D&AD Impact Council & Jury' },
  { year: '2021', title: 'ADC Fusion Cube Jury', note: 'DEI category' },
  { year: '2021', title: 'WARC Chinese Strategy' },
  { year: '2020', title: 'WARC Asian Strategy' },
  { year: '2021', title: 'Gerety Awards', note: 'Executive Jury, Singapore' },
  { year: '2021', title: 'Adstars Final Jury', note: 'Diverse Insights, Outdoor, PSA, Pivot, Brand, Radio & Audio' },
  { year: '2021', title: 'Shots Asia Pacific' },
  { year: '2020–2021', title: 'Adfest', note: 'Brand Experience Lotus & Direct Lotus' },
  { year: '2020', title: 'AME Awards', note: 'Advisory Board & Asia Pacific Jury' },
  { year: '2019', title: 'New York Festival', note: 'Executive Jury' },
  { year: '2019', title: 'Spikes Asia', note: 'Speaker, inaugural See It Be It programme' },
  { year: '2018', title: 'Spikes Asia', note: 'Creative Effectiveness' },
  { year: '2019', title: 'Dubai Lynx', note: 'Film, Print, Publishing, Radio, Direct & inaugural Glass Jury' },
];

export const experience: {
  period: string;
  role: string;
  org: string;
  place: string;
  summary: string;
}[] = [
  {
    period: 'Nov 2020 – present',
    role: 'Founder & CCO',
    org: 'HumanSense',
    place: 'Colombo, Sri Lanka',
    summary:
      'An independent collective of creative and strategic solutions, rooted in the vision to impact social change.',
  },
  {
    period: 'Jun 2019 – Aug 2020',
    role: 'Creative & Culture Officer (CCO)',
    org: 'Brands for Humans',
    place: 'Bangkok, Thailand',
    summary:
      'Built the creative culture and guided the creative output of BFH, an independent, digitally integrated agency.',
  },
  {
    period: 'Nov 2017 – Apr 2019',
    role: 'Creative Chairperson',
    org: 'BBDO',
    place: 'Colombo, Sri Lanka',
    summary:
      'Led creative output across the agency’s clients, with the main focus on its largest client, Fonterra, and on new business wins.',
  },
  {
    period: 'Jun 2015 – Oct 2017',
    role: 'Group Chief Creative Officer',
    org: 'Ogilvy Group',
    place: 'Colombo, Sri Lanka',
    summary:
      'Led and guided the creative output of the Ogilvy group companies: Phoenix O&M, Neo@Ogilvy, Ogilvy Media and Ogilvy PR.',
  },
  {
    period: 'Jan 2014 – Jan 2015',
    role: 'Creative Director, North America',
    org: 'Saatchi & Saatchi',
    place: 'New York, USA',
    summary:
      'Led creative communication for P&G’s Head & Shoulders, the No. 1 anti-dandruff shampoo in the world, with Sofia Vergara as brand ambassador.',
  },
  {
    period: 'Jun 2006 – Jul 2013',
    role: 'Regional Creative Director, Unilever',
    org: 'MullenLowe',
    place: 'Bangkok, Thailand',
    summary:
      'Led country launches and campaigns for regional and global Unilever brands across Asia and the world, ensuring each brand spoke in one voice across cultures and languages.',
  },
  {
    period: 'Jun 2003 – May 2006',
    role: 'Executive Creative Director',
    org: 'Phoenix Ogilvy',
    place: 'Colombo, Sri Lanka',
    summary:
      'National head of the creative department. Led a team of 30+ creatives serving 40+ clients.',
  },
  {
    period: 'May 2001 – May 2003',
    role: 'Associate Creative Director, Colgate-Palmolive',
    org: 'Rediffusion Y&R',
    place: 'Mumbai, India',
    summary:
      'Responsible for strategic and creative communication for the agency’s multinational client, helping grow the brand nationally.',
  },
  {
    period: 'Nov 2000 – Jan 2001',
    role: 'Executive Agency Producer',
    org: 'Admerasia Advertising',
    place: 'New York, USA',
    summary:
      'A three-month freelance assignment producing a campaign targeted at Non-Resident Indians in the United States.',
  },
  {
    period: 'Jun 1995 – Oct 2000',
    role: 'Films Manager & Art Director',
    org: 'FCB Ulka',
    place: 'Mumbai, India',
    summary:
      'Headed and managed the entire AV department, creating films for the agency’s clients. Before that, worked as an Art Director in the same agency.',
  },
];

export const voluntary = [
  {
    period: 'Oct 2017 – present',
    role: 'Personal Growth Officer',
    org: 'Women Empowered Global',
    summary:
      'A voluntary position with the not-for-profit platform dedicated to empowering female professionals to shatter the glass ceiling, unlock their potential and achieve greater career success.',
  },
  {
    period: 'Oct 2018 – 2022',
    role: 'Vice President',
    org: '4As Sri Lanka',
    summary:
      'The advertising body of Sri Lanka, representing its agencies and dedicated to raising the bar for the industry.',
  },
];

export const skills = [
  'Integrated Marketing',
  'Creative Direction',
  'Marketing Communications',
  'Creative Strategy',
  'Digital Strategy',
  'Brand Development',
  'Video Production',
  'Art Direction',
];

/** Client names as listed on the existing /portfolio/ page. Detail pages live on the current site. */
export const clients = [
  { name: 'Head & Shoulders', slug: 'head-and-shoulders' },
  { name: 'Fonterra', slug: 'fonterra' },
  { name: 'Cornetto', slug: 'cornetto' },
  { name: 'Pepsodent', slug: 'pepsodent' },
  { name: 'Close Up', slug: 'closeup' },
  { name: 'Colgate', slug: 'colgate' },
  { name: 'United Nations', slug: 'united-nations' },
  { name: 'Nestlé', slug: 'nestle' },
  { name: 'Energiser', slug: 'energiser' },
  { name: 'OMO', slug: 'omo' },
  { name: 'Citra', slug: 'citra' },
  { name: 'Velvet', slug: 'velvet' },
  { name: 'Autism', slug: 'autism' },
  { name: 'Causes', slug: 'causes' },
  { name: 'UNHCR', slug: 'unhcr' },
].map((c) => ({ ...c, href: `https://ruchisharma.com/portfolio/${c.slug}/` }));

/** REVIEW: titles inferred from URL slugs / file names on the current site. */
export const press = [
  {
    title: 'At the end of the day, we’re talking to humans',
    source: 'The Morning',
    href: 'https://www.themorning.lk/articles/129546',
  },
  {
    title: 'Interview',
    source: 'Branding in Asia',
    href: 'https://brandinginasia.com/ruchit-sharma-interview/',
  },
];

export type Recommendation = { name: string; role: string; quote: string[] };

export const recommendations: Recommendation[] = [
  {
    name: 'Vipul Chawla',
    role: 'President, Pizza Hut International',
    quote: [
      'Ruchi is one of the most creative, business minded and passionate brand thinkers I’ve had the privilege of working with. Her contribution to the brand agenda was timeless and insightful, and work was inspiring. She is a real star!',
    ],
  },
  {
    name: 'Nicole Sparshott',
    role: 'CEO Unilever ANZ & Global CEO T2',
    quote: [
      'Ruchi brings a passion and commitment to serving real people… not just abstract consumers or demanding clients. As a result she seeks to explore beyond the surface to unlock insight and create impact. She is a believer and deliverer of big ideas that cut through, connect and drive value for the end customer and the business.',
    ],
  },
  {
    name: 'Tom Markham',
    role: 'Head of Creative, Facebook, USA',
    quote: [
      'I was lucky enough to work with Ruchi on a number of projects when I was at Lowe. She’s a very talented and passionate creative, and a great person to boot.',
      'At one point we ran a global creative competition through 75 offices and Ruchi and her partner won with an excellent idea. She then worked her ass off to get it made, on top of her busy schedule, remaining upbeat throughout. She has that rare skill of pushing projects to better places and pushing people to better things without even raising her voice. Ruchi is a tremendous asset to any agency.',
    ],
  },
  {
    name: 'Harjot Singh',
    role: 'Global Chief Strategy Officer, McCann Worldgroup',
    quote: [
      'Ruchi is a delight to work with. She is passionate and involved with the entire communication development process, and is hence an invaluable partner for a strategic planner. When we worked together, it was this level of passion and involvement from her side that helped us bring an enviable level of rigour and imagination to strategy. She is receptive, intuitive and very collaborative. She sets very high standards for herself and for the work, which she invariably meets and exceeds. I have noticed how working with her brings out the best in people.',
      'Clients love her; as do her peers.',
    ],
  },
  {
    name: 'Paul Grubb',
    role: 'Regional Creative Director, GTB',
    quote: [
      'Ruchi is a star. She is a great creative writer and creative director, of course. But she’s also extremely disciplined, calm and professional, all of which make her good with clients and a delight to work with. But she also has that rare commodity in this business: integrity. What more do you need…',
    ],
  },
  {
    name: 'Tham Khai Meng',
    role: 'Fmr Co-Chairman, Worldwide Chief Creative Officer, Ogilvy & Mather',
    quote: [
      'Ruchi cares. Armed with this rare asset and coupled with her resourcefulness, it was little wonder that shortly after she took over the creative leadership of the small country office with even smaller budgets, Ogilvy Sri Lanka, she led them to win Agency of the Year in the local awards.',
      'Spurred on by this accolade, she went on to write a palpable radio spot that won the country’s first Cannes, Clio and LIA Finalist.',
      'Her film for the Disabled, advocating for access to public places, made the first entry that was featured in the Best of Ogilvy worldwide reel.',
      'With her kind of talent, tenacity and focus, I was not surprised when Ruchi landed a job as Creative Director on Head & Shoulders at Saatchis in New York in 2014. This opportunity allowed her to flex her wings and she went on to tell compelling brand stories on small and large global brands.',
      'It is her likeable personality, her industriousness and talent to solve challenging business problems that makes her stand out from her peers. Ruchi gets it. This gift, combined with her optics and constant drive to raise the creative bar in today’s ever-changing world, makes Ruchi a formidable ally for any agency.',
    ],
  },
  {
    name: 'Anindya Dasgupta',
    role: 'Global P&L Leader, CEO, CMO, Business Strategist',
    quote: [
      'Ruchi is one of the TOP Creative thinkers I have ever worked with. What makes her unique is that not only does she think creatively, but more often than not, provides a highly strategic perspective to the problem at hand. The other quality that sets Ruchi apart is that she takes personal ownership of every project that she works on, much beyond her professional requirement. So when one works with her, one can rest assured that the work will not only get done, but would get done to the highest quality possible. Unlike most other Creative brains who still think TV / Cinema first, Ruchi is one of the few who approaches a Creative problem with a full ecosystem solution, including a strong leaning towards digital platforms. That allows a lot of experimentation, something that I have always preferred as a learning approach to consumer engagement.',
    ],
  },
  {
    name: 'Danny Searle',
    role: 'Former Chief Creative Officer & Vice Chairman, BBDO Asia',
    quote: [
      'Ruchi is very good at winning trust and creating relationships of mutual respect with senior clients.',
      'She presents well and is a born leader.',
      'She is a contemporary thinker, adept at social media, activation, purpose driven brand building and all things digital.',
      'And you’ll find all these skills reflected in her work. She has spoken on important industry issues like ethics, collaboration and equality.',
    ],
  },
  {
    name: 'Saby Mishra',
    role: 'Group CEO, MullenLowe Mishra',
    quote: [
      'Ruchi Sharma is an experienced Creative leader who brings together strategic clarity, passion, pragmatism and strong work on big brands on big clients. While doing that she’s able to effortlessly mobilize teams, resources, clients and consensus to drive results. Great asset at a leadership level.',
    ],
  },
  {
    name: 'Sanjai Srivastava',
    role: 'Global Business Leadership',
    quote: [
      'One of the most mature, hardworking and passionate creative people I have had the pleasure and privilege of working with.',
      'In addition to her fantastic work ethic, Ruchi has a keen understanding of what it takes for brands and businesses to succeed across multiple markets, geographies and cultures, a rare trait!',
      'Coupled with her obvious creative skills, Ruchi is also a fabulous team player and manager, often going out of her way to nurture, guide and help the entire agency team, not just her creative colleagues.',
      'In spite of having been in the industry for a long time, Ruchi is constantly trying to reinvent herself, whether it’s in new categories, geographies or media. It has been a pleasure and a privilege working alongside Ruchi. Any organisation or team should consider themselves lucky to have Ruchi on board.',
    ],
  },
  {
    name: 'Ambi Parameswaran',
    role: 'Independent Brand Strategist, Author, TEDx Speaker',
    quote: [
      'Ruchi started with FCB Ulka as Star One trainee from Sophia College of Arts, was one of the brightest young visualisers in the agency. Her interest in the video medium motivated her to move to films and she took on the role of Films Manager at a very young age. As a film manager not only did she build great rapport with some of the best film makers in India, but played an active role in adding value to the script and the visual treatment of the films made by the agency. Her integrity, commitment and passion was widely appreciated by all the colleagues.',
    ],
  },
];

/** Homepage pull-quotes (verbatim excerpts, by index into `recommendations`). */
export const featuredQuotes = [
  { text: 'Ruchi cares.', who: 'Tham Khai Meng', role: 'Fmr Worldwide Chief Creative Officer, Ogilvy & Mather' },
  { text: 'Ruchi is a star… she also has that rare commodity in this business: integrity.', who: 'Paul Grubb', role: 'Regional Creative Director, GTB' },
  { text: 'I have noticed how working with her brings out the best in people.', who: 'Harjot Singh', role: 'Global Chief Strategy Officer, McCann Worldgroup' },
];
