export interface DiscoverPageData {
  title: string;
  subtitle: string;
  heroImage: string;
  sections: {
    heading: string;
    content: string[];
    image?: string;
  }[];
}

export const discoverContent: Record<string, DiscoverPageData> = {
  // === 1. The Midtown Story ===
  'the-midtown-story': {
    title: 'The Midtown Story',
    subtitle: 'A journey of healing and hope since our inception.',
    heroImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Our Beginnings',
        content: [
          'Midtown Hospital was founded with a singular vision: to make world-class healthcare accessible to every individual. From a small clinic to a sprawling network of multi-specialty hospitals, our story is one of relentless dedication, innovation, and compassion.',
          'Over the years, we have grown not just in size, but in the depth of our medical expertise, touching millions of lives across the country.'
        ]
      },
      {
        heading: 'Looking Ahead',
        content: [
          'As we expand to 20+ hospitals in the coming years, our foundational values remain unchanged. We continue to invest in advanced technology and the best medical minds to redefine the standard of care in India and beyond.'
        ],
        image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=1000&auto=format&fit=crop'
      }
    ]
  },
  'overview': {
    title: 'Overview',
    subtitle: 'A quick glance at Midtown Hospital\'s scale and impact.',
    heroImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Midtown at a Glance',
        content: [
          'Midtown Hospital is a premier healthcare provider in India, offering comprehensive medical services across 50+ specialties. With multiple state-of-the-art facilities, we serve thousands of patients daily with a focus on affordability and clinical excellence.'
        ]
      }
    ]
  },
  'day-at-midtown': {
    title: 'A Day at Midtown',
    subtitle: 'Experience the care, energy, and dedication inside our walls.',
    heroImage: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Compassion in Action',
        content: [
          'From the moment the doors open, Midtown Hospital is a hive of purposeful activity. Our dedicated staff works tirelessly around the clock, ensuring every patient receives immediate attention and empathetic care.'
        ]
      }
    ]
  },
  'vision-mission': {
    title: 'Vision & Mission',
    subtitle: 'The guiding principles behind everything we do.',
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Our Vision',
        content: [
          'To establish 20+ hospitals across India within the next five years — bringing world-class medical care to millions and setting a new benchmark for affordable healthcare.'
        ]
      },
      {
        heading: 'Our Mission',
        content: [
          'Healthcare is a right, not a privilege. We are working to bring the highest standard of medical care to everyday people, at a cost they can afford, without ever compromising on quality.'
        ]
      }
    ]
  },
  'careers': {
    title: 'Careers',
    subtitle: 'Join a team that makes a real difference every day.',
    heroImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Why Work With Us?',
        content: [
          'At Midtown Hospital, we offer a dynamic, supportive, and rewarding work environment. We invest in our employees\' professional growth through continuous training and development programs.',
          'Whether you are a medical professional, technician, or administrative staff, you will find a place where your skills are valued and your career can thrive.'
        ]
      }
    ]
  },
  'anthem': {
    title: 'Midtown Anthem',
    subtitle: 'The spirit and song of our healing community.',
    heroImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Our Song of Healing',
        content: [
          'The Midtown Anthem embodies our collective spirit, resilience, and unwavering commitment to healing. It is a reminder to our staff and patients alike that together, we can overcome any health challenge with hope and care.'
        ]
      }
    ]
  },
  'group-brands': {
    title: 'Our Group Brands',
    subtitle: 'A diverse portfolio of healthcare excellence.',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Expanding Our Reach',
        content: [
          'Midtown Hospital is part of a larger healthcare ecosystem that includes specialized clinics, diagnostic centers, and dedicated pharmacy chains, all working in synergy to provide complete healthcare solutions.'
        ]
      }
    ]
  },
  'awards': {
    title: 'Awards & Accolades',
    subtitle: 'Recognitions that inspire us to do better.',
    heroImage: 'https://images.unsplash.com/photo-1569429593410-b498b3fb3387?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Celebrating Excellence',
        content: [
          'Our commitment to quality care has been recognized by numerous national and international bodies. These awards are a testament to the hard work of our entire team and our dedication to patient safety and clinical excellence.'
        ]
      }
    ]
  },
  'alliances': {
    title: 'Alliances',
    subtitle: 'Strong partnerships for stronger healthcare.',
    heroImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Global & Local Partnerships',
        content: [
          'We have forged strategic alliances with leading medical technology companies, international research institutions, and local health organizations to bring the best of global healthcare to our patients.'
        ]
      }
    ]
  },
  'achievements': {
    title: 'Achievements & Milestones',
    subtitle: 'Key moments in our journey of growth.',
    heroImage: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Our Journey',
        content: [
          'From successfully performing rare surgeries to launching state-of-the-art facilities in record time, Midtown Hospital has numerous milestones that mark our rapid growth and commitment to healthcare innovation.'
        ]
      }
    ]
  },

  // === 2. Leadership ===
  // (Note: The main 'our-leadership' slug is handled by a custom page route)
  'board-of-directors': {
    title: 'Board of Directors',
    subtitle: 'Guiding the vision and strategy of Midtown.',
    heroImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Strategic Guidance',
        content: [
          'Our Board of Directors comprises distinguished leaders from healthcare, finance, and corporate governance. They provide the strategic oversight necessary to navigate the complex healthcare landscape while ensuring we stay true to our mission of affordable care.'
        ]
      }
    ]
  },
  'executive-team': {
    title: 'Executive Team',
    subtitle: 'The leadership driving our day-to-day excellence.',
    heroImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Operational Excellence',
        content: [
          'The executive team at Midtown translates our overarching vision into daily reality. From operational efficiency to clinical protocols, this team of seasoned healthcare administrators ensures that every patient interaction meets our high standards.'
        ]
      }
    ]
  },
  'medical-council': {
    title: 'Medical Council',
    subtitle: 'Setting the highest standards for clinical care.',
    heroImage: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Clinical Leadership',
        content: [
          'The Medical Council consists of our most senior and respected physicians. They are responsible for reviewing clinical outcomes, introducing new medical technologies, and establishing best-practice protocols across all Midtown facilities.'
        ]
      }
    ]
  },

  // === 3. Academics & Research ===
  'academics-research': {
    title: 'Academics & Research',
    subtitle: 'Advancing medical science through education and discovery.',
    heroImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Pioneering Research',
        content: [
          'At Midtown, we believe that today\'s research is tomorrow\'s cure. Our dedicated research wing collaborates with leading global institutions to conduct clinical trials and publish groundbreaking papers.'
        ]
      }
    ]
  },
  'medical-education': {
    title: 'Medical Education',
    subtitle: 'Training the next generation of healthcare leaders.',
    heroImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Continuous Learning',
        content: [
          'Our medical education programs offer comprehensive training for postgraduate students and established practitioners, ensuring that our medical community is always at the forefront of clinical knowledge.'
        ]
      }
    ]
  },
  'nursing-education': {
    title: 'Nursing Education',
    subtitle: 'Empowering the backbone of our hospital.',
    heroImage: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Excellence in Nursing',
        content: [
          'Midtown\'s College of Nursing provides world-class education, equipping nurses with the theoretical knowledge and practical skills required to deliver empathetic and highly competent patient care.'
        ]
      }
    ]
  },
  'research-institutes': {
    title: 'Research Institutes',
    subtitle: 'Dedicated centers for specialized medical research.',
    heroImage: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Specialized Centers',
        content: [
          'Our specialized research institutes focus on oncology, cardiology, and neurology. These centers provide our scientists with the resources needed to push the boundaries of modern medicine.'
        ]
      }
    ]
  },
  'clinical-trials': {
    title: 'Clinical Trials',
    subtitle: 'Bringing tomorrow\'s treatments to today\'s patients.',
    heroImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Innovative Therapies',
        content: [
          'We actively participate in global clinical trials, giving our patients early access to innovative therapies and advanced treatment modalities before they become widely available.'
        ]
      }
    ]
  },
  'publications': {
    title: 'Publications',
    subtitle: 'Sharing our discoveries with the global medical community.',
    heroImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Global Contributions',
        content: [
          'Our physicians and researchers regularly publish in leading peer-reviewed medical journals, contributing valuable data and case studies to the global medical literature.'
        ]
      }
    ]
  },
  'fellowships': {
    title: 'Fellowships',
    subtitle: 'Advanced training for specialized practitioners.',
    heroImage: 'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Specialized Training',
        content: [
          'Midtown offers highly competitive fellowship programs in various sub-specialties, designed to hone the skills of aspiring specialists under the mentorship of our senior medical faculty.'
        ]
      }
    ]
  },

  // === 4. CSR & Sustainability ===
  'csr-sustainability': {
    title: 'CSR & Sustainability',
    subtitle: 'Caring for our community and our planet.',
    heroImage: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Community Health Initiatives',
        content: [
          'We conduct regular free health camps, awareness drives, and mobile clinics in underserved areas. Our goal is to ensure that basic healthcare reaches the most vulnerable.'
        ]
      }
    ]
  },
  'health-camps': {
    title: 'Health Camps',
    subtitle: 'Bringing healthcare to those who need it most.',
    heroImage: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Outreach Programs',
        content: [
          'Our regular health camps provide free diagnostics, consultations, and medicines to thousands of individuals in remote and underserved rural areas.'
        ]
      }
    ]
  },
  'community-outreach': {
    title: 'Community Outreach',
    subtitle: 'Empowering society through health education.',
    heroImage: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Education & Awareness',
        content: [
          'Beyond treatment, we focus on prevention. Our community outreach programs educate the public on hygiene, nutrition, and early disease detection.'
        ]
      }
    ]
  },
  'environmental-initiatives': {
    title: 'Environmental Initiatives',
    subtitle: 'Protecting the planet for future generations.',
    heroImage: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Sustainable Practices',
        content: [
          'Midtown Hospital is committed to reducing its carbon footprint through energy-efficient infrastructure, water recycling plants, and reliance on renewable energy sources.'
        ]
      }
    ]
  },
  'waste-management': {
    title: 'Waste Management',
    subtitle: 'Safe, responsible, and compliant biomedical waste handling.',
    heroImage: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Strict Protocols',
        content: [
          'We employ state-of-the-art biomedical waste management systems to ensure that all hospital waste is segregated, treated, and disposed of in an environmentally safe manner.'
        ]
      }
    ]
  },
  'green-hospitals': {
    title: 'Green Hospitals',
    subtitle: 'Designing healthcare spaces with nature in mind.',
    heroImage: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Eco-Friendly Architecture',
        content: [
          'Our new facilities are designed to be "Green Hospitals," featuring maximum natural lighting, solar heating, and sustainable building materials to minimize environmental impact.'
        ]
      }
    ]
  },

  // === 5. Corporate Governance ===
  'corporate-governance': {
    title: 'Corporate Governance',
    subtitle: 'Transparency, ethics, and accountability at our core.',
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Our Governance Framework',
        content: [
          'Midtown Hospital operates on principles of strict corporate governance, ensuring compliance with all regulatory standards and ethical guidelines.'
        ]
      }
    ]
  },
  'board-committees': {
    title: 'Board Committees',
    subtitle: 'Specialized oversight for critical operations.',
    heroImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Focused Leadership',
        content: [
          'Our specialized board committees, including Audit, Risk Management, and Ethics, ensure that every aspect of our organization operates under strict scrutiny and high ethical standards.'
        ]
      }
    ]
  },
  'policies-guidelines': {
    title: 'Policies & Guidelines',
    subtitle: 'The rulebook that maintains our integrity.',
    heroImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Standardized Procedures',
        content: [
          'We maintain a comprehensive suite of corporate policies covering patient rights, employee conduct, anti-corruption, and data privacy to ensure absolute operational integrity.'
        ]
      }
    ]
  },
  'ethics-compliance': {
    title: 'Ethics & Compliance',
    subtitle: 'Doing the right thing, every single time.',
    heroImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Unwavering Integrity',
        content: [
          'Our compliance programs are rigorously enforced. We foster a culture where ethical behavior is rewarded and any deviation is immediately addressed through our transparent whistle-blower policies.'
        ]
      }
    ]
  },

  // === 6. Investor Relations ===
  'investor-relations': {
    title: 'Investor Relations',
    subtitle: 'Creating sustainable value for our stakeholders.',
    heroImage: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Financial Performance',
        content: [
          'Midtown Hospital has demonstrated consistent growth, driven by our patient-first approach and operational efficiency.'
        ]
      }
    ]
  },
  'financial-results': {
    title: 'Financial Results',
    subtitle: 'Transparent reporting of our economic performance.',
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Quarterly & Annual Data',
        content: [
          'We provide detailed financial statements, earnings releases, and performance metrics to give our investors a clear view of our economic health and growth trajectory.'
        ]
      }
    ]
  },
  'annual-reports': {
    title: 'Annual Reports',
    subtitle: 'Comprehensive yearly reviews of our operations.',
    heroImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'The Year in Review',
        content: [
          'Our annual reports offer an in-depth look at our clinical achievements, financial milestones, and strategic initiatives executed throughout the year.'
        ]
      }
    ]
  },
  'shareholder-info': {
    title: 'Shareholder Info',
    subtitle: 'Essential resources for our investors.',
    heroImage: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Investor Services',
        content: [
          'Information regarding shareholding patterns, dividend history, and contact details for our registrar and share transfer agents.'
        ]
      }
    ]
  },
  'corporate-announcements': {
    title: 'Corporate Announcements',
    subtitle: 'Timely updates on material developments.',
    heroImage: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Market Disclosures',
        content: [
          'Stay informed with real-time updates on our regulatory filings, major acquisitions, facility expansions, and other market-sensitive information.'
        ]
      }
    ]
  },
  'stock-information': {
    title: 'Stock Information',
    subtitle: 'Tracking Midtown\'s market performance.',
    heroImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Live Stock Data',
        content: [
          'Access historical stock prices, market capitalization trends, and interactive charts to analyze Midtown Hospital\'s performance on the stock exchange.'
        ]
      }
    ]
  },

  // === 7. Media Centre ===
  'media-centre': {
    title: 'Media Centre',
    subtitle: 'The latest news, press releases, and media resources.',
    heroImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Press Releases',
        content: [
          'Stay updated with the latest announcements from Midtown Hospital.'
        ]
      }
    ]
  },
  'press-releases': {
    title: 'Press Releases',
    subtitle: 'Official announcements from Midtown Hospital.',
    heroImage: 'https://images.unsplash.com/photo-1585241936939-f81d11ff2b6b?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Latest Updates',
        content: [
          'Read our official press releases detailing new facility launches, strategic partnerships, and major medical breakthroughs achieved by our teams.'
        ]
      }
    ]
  },
  'in-the-news': {
    title: 'In the News',
    subtitle: 'Midtown Hospital in the global spotlight.',
    heroImage: 'https://images.unsplash.com/photo-1504465039710-0f49c0a47eb7?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Media Coverage',
        content: [
          'Explore articles, television features, and print media coverage highlighting our contributions to the healthcare industry and community wellbeing.'
        ]
      }
    ]
  },
  'media-kit': {
    title: 'Media Kit',
    subtitle: 'Resources for journalists and publishers.',
    heroImage: 'https://images.unsplash.com/photo-1497032205916-ac775f0649ae?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Downloadable Assets',
        content: [
          'Access high-resolution hospital images, executive headshots, official logos, and organizational fact sheets for media use.'
        ]
      }
    ]
  },
  'brand-guidelines': {
    title: 'Brand Guidelines',
    subtitle: 'Maintaining our visual identity.',
    heroImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Visual Consistency',
        content: [
          'Guidelines for partners and media regarding the correct usage of the Midtown Hospital logo, color palette, and typography to ensure brand integrity.'
        ]
      }
    ]
  },
  'event-gallery': {
    title: 'Event Gallery',
    subtitle: 'Visuals from our conferences, camps, and milestones.',
    heroImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Moments Captured',
        content: [
          'A curated photo and video gallery of our medical conferences, health camps, award ceremonies, and facility inaugurations.'
        ]
      }
    ]
  },

  // === 8. Corporate Partnerships ===
  'corporate-partnerships': {
    title: 'Corporate Partnerships',
    subtitle: 'Collaborating for better employee health and wellness.',
    heroImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Corporate Health Programs',
        content: [
          'We partner with organizations to provide comprehensive health and wellness programs for their employees.'
        ]
      }
    ]
  },
  'corporate-tie-ups': {
    title: 'Corporate Tie-ups',
    subtitle: 'Strategic healthcare partnerships for your business.',
    heroImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Tailored Healthcare',
        content: [
          'We offer tailored healthcare packages for our corporate partners, ensuring priority access, discounted rates, and dedicated account managers for a seamless experience.'
        ]
      }
    ]
  },
  'wellness-programs': {
    title: 'Wellness Programs',
    subtitle: 'Keeping your workforce healthy and productive.',
    heroImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Preventive Care',
        content: [
          'Our corporate wellness programs include on-site executive health checks, stress management workshops, and ergonomics seminars designed to promote employee wellbeing.'
        ]
      }
    ]
  },
  'insurance-partners': {
    title: 'Insurance Partners',
    subtitle: 'Cashless treatments with leading providers.',
    heroImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Hassle-free Processing',
        content: [
          'Midtown Hospital is empanelled with all major national and international health insurance providers, ensuring smooth and cashless treatment for insured patients.'
        ]
      }
    ]
  },
  'tpa-desk': {
    title: 'TPA Desk',
    subtitle: 'Dedicated support for insurance claims.',
    heroImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: '24/7 Assistance',
        content: [
          'Our dedicated Third Party Administrator (TPA) desk operates round-the-clock to assist patients with insurance approvals, documentation, and seamless claim settlements.'
        ]
      }
    ]
  },

  // === 9. Healers' Circle ===
  'healers-circle': {
    title: 'Healers\' Circle',
    subtitle: 'Celebrating the dedication of our medical professionals.',
    heroImage: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Honoring Excellence',
        content: [
          'The Healers\' Circle is our exclusive forum for recognizing and celebrating the extraordinary dedication of our doctors, nurses, and medical staff.'
        ]
      }
    ]
  },
  'nursing-excellence': {
    title: 'Nursing Excellence',
    subtitle: 'Honoring the heartbeat of Midtown Hospital.',
    heroImage: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Compassion & Care',
        content: [
          'We recognize and reward our nursing staff who consistently go above and beyond, providing unparalleled compassionate care and clinical excellence to our patients.'
        ]
      }
    ]
  },
  'doctor-awards': {
    title: 'Doctor Awards',
    subtitle: 'Celebrating clinical brilliance and innovation.',
    heroImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Medical Marvels',
        content: [
          'Annual awards honoring our physicians and surgeons for their groundbreaking procedures, exceptional patient outcomes, and contributions to medical research.'
        ]
      }
    ]
  },
  'paramedical-staff': {
    title: 'Paramedical Staff',
    subtitle: 'The unsung heroes of healthcare.',
    heroImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Crucial Support',
        content: [
          'Celebrating our lab technicians, radiographers, and emergency responders whose rapid and precise work forms the foundation of accurate diagnoses and successful treatments.'
        ]
      }
    ]
  },
  'employee-spotlights': {
    title: 'Employee Spotlights',
    subtitle: 'Stories of dedication from across the hospital.',
    heroImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Meet the Team',
        content: [
          'Read inspiring stories of our staff members—from security personnel to senior administrators—who embody the Midtown spirit of service and empathy every single day.'
        ]
      }
    ]
  },

  // === 10. Clinical Quality & Outcomes ===
  'clinical-quality': {
    title: 'Clinical Quality & Outcomes',
    subtitle: 'Measuring success by patient recovery and safety.',
    heroImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Our Quality Standards',
        content: [
          'Clinical excellence is non-negotiable at Midtown Hospital. We adhere to the highest international standards of patient safety, infection control, and clinical protocols.'
        ]
      }
    ]
  },
  'quality-certifications': {
    title: 'Quality Certifications',
    subtitle: 'Internationally recognized healthcare standards.',
    heroImage: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'NABH & JCI Accreditations',
        content: [
          'Our facilities are accredited by premier national and international healthcare quality boards, reflecting our uncompromising commitment to patient safety and operational excellence.'
        ]
      }
    ]
  },
  'infection-control': {
    title: 'Infection Control',
    subtitle: 'Maintaining a zero-harm environment.',
    heroImage: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Rigorous Protocols',
        content: [
          'We implement stringent hospital infection control protocols, utilizing advanced sterilization technologies and continuous staff training to prevent hospital-acquired infections.'
        ]
      }
    ]
  },
  'patient-safety': {
    title: 'Patient Safety',
    subtitle: 'Your wellbeing is our highest priority.',
    heroImage: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Safety First',
        content: [
          'From barcoded medication administration to surgical safety checklists, our comprehensive patient safety programs are designed to eliminate medical errors and ensure safe recoveries.'
        ]
      }
    ]
  },
  'clinical-indicators': {
    title: 'Clinical Indicators',
    subtitle: 'Transparent reporting of medical outcomes.',
    heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Measuring Success',
        content: [
          'We track and publish our clinical outcome indicators, including surgery success rates, average length of stay, and readmission rates, ensuring transparency and continuous improvement.'
        ]
      }
    ]
  },
  'feedback-mechanism': {
    title: 'Feedback Mechanism',
    subtitle: 'Listening to our patients to serve them better.',
    heroImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Your Voice Matters',
        content: [
          'We employ robust patient feedback systems to capture your experience. Every piece of feedback is analyzed by our quality team to drive meaningful changes in our service delivery.'
        ]
      }
    ]
  }
};

