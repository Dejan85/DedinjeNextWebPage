// Sanity TypeScript Types

export interface SanityImage {
  _type: "image";
  asset:
    | {
        _ref: string;
        _type: "reference";
        url?: string; // Added for fetched images
      }
    | {
        _id: string;
        url: string;
      };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface SeoMetadata {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  ogImage?: SanityImage;
}

export interface Timeline {
  year: string;
  title: string;
  subtitle?: string;
  description?: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  description?: string;
}

export interface Page {
  _id: string;
  _type: "page";
  title: string;
  slug: {
    current: string;
  };
  seo?: SeoMetadata;
  pageBuilder?: any[]; // Page builder blocks
  publishedAt: string;
}

export interface Doctor {
  _id: string;
  _type: "doctor";
  name: string;
  slug: {
    current: string;
  };
  title?: string;
  position: string;
  specialization?: string;
  image: SanityImage;
  biography?: any[]; // Portable Text
  timeline?: Timeline[];
  education?: Education[];
  email?: string;
  phone?: string;
  socialLinks?: {
    facebook?: string;
    linkedin?: string;
    twitter?: string;
  };
  department?: Department;
  featured?: boolean;
  order?: number;
  seo?: SeoMetadata;
}

export interface Department {
  _id: string;
  _type: "department";
  name: string;
  slug: {
    current: string;
  };
  description?: string;
  content?: any[]; // Portable Text
  image?: SanityImage;
  icon?: string;
  features?: string[];
  services?: Service[];
  doctors?: Doctor[];
  order?: number;
  seo?: SeoMetadata;
}

export interface Service {
  _id: string;
  _type: "service";
  name: string;
  slug: {
    current: string;
  };
  description?: string;
  content?: any[]; // Portable Text
  icon?: string;
  image?: SanityImage;
  features?: string[];
  department?: Department;
  featured?: boolean;
  order?: number;
  seo?: SeoMetadata;
}

export interface News {
  _id: string;
  _type: "news";
  title: string;
  slug: {
    current: string;
  };
  excerpt?: string;
  content?: any[]; // Portable Text
  mainImage: SanityImage;
  category?:
    | "inovacije"
    | "akcije"
    | "oprema"
    | "uspeh"
    | "edukacija"
    | "obavestenje";
  author?: string;
  publishedAt: string;
  featured?: boolean;
  seo?: SeoMetadata;
}

export interface Publication {
  _id: string;
  _type: "publication";
  title: string;
  authors: string[];
  journal?: string;
  year: number;
  volume?: string;
  pages?: string;
  doi?: string;
  pmid?: string;
  abstract?: string;
  url?: string;
  category?: "m21a+" | "m21a" | "m21" | "m22" | "m23";
  impactFactor?: number;
  doctor?: Doctor;
}

export interface Testimonial {
  _id: string;
  _type: "testimonial";
  name: string;
  role?: string;
  image?: SanityImage;
  quote: string;
  rating?: number;
  featured?: boolean;
  publishedAt: string;
}

export interface SiteSettings {
  _id: string;
  _type: "siteSettings";
  siteName: string;
  siteDescription?: string;
  logo?: SanityImage;
  contact?: {
    phone1?: string;
    phone2?: string;
    emergencyPhone?: string;
    email?: string;
    address?: string;
    city?: string;
    zipCode?: string;
  };
  workingHours?: Array<{
    days: string;
    hours: string;
  }>;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
  seo?: SeoMetadata;
}

export interface Navigation {
  _id: string;
  _type: "navigation";
  mainMenu?: Array<{
    title: string;
    link: string;
    submenu?: Array<{
      title: string;
      link: string;
      icon?: string;
    }>;
  }>;
  footerMenu?: Array<{
    title: string;
    link: string;
  }>;
}

// Page Builder Block Types
export interface HeroBlock {
  _type: "hero";
  heading?: string;
  subheading?: string;
  image?: SanityImage;
  video?: string;
  cta?: {
    text: string;
    link: string;
  };
}

export interface ContentBlock {
  _type: "contentBlock";
  heading?: string;
  content?: any[]; // Portable Text
  layout?: "text-only" | "text-image-right" | "text-image-left" | "two-columns";
}

export interface ScheduleItem {
  days: string;
  hours: string;
}

export interface InfoBox {
  _type: "infoBox";
  _key?: string;
  icon: string;
  title: string;
  variant: "regular" | "schedule" | "emergency";
  // Regular variant
  description?: string;
  linkText?: string;
  linkHref?: string;
  // Schedule variant
  schedule?: ScheduleItem[];
  // Emergency variant
  emergencyPhone?: string;
  emergencyNote?: string;
}

export interface StatItem {
  _key: string;
  icon: string;
  number: string; // Changed from number to string
  label: string;
}

export interface WelcomeFeature {
  _key: string;
  icon: string;
  text: string;
}

export interface WelcomeSection {
  _type: "welcomeSection";
  _key: string;
  badge: string;
  heading: string;
  leadText: string;
  bodyText: string;
  features: WelcomeFeature[];
  ctaButton?: {
    text: string;
    link: string;
  };
  image: SanityImage;
  secondaryImage?: SanityImage;
  imageBadge?: {
    number: string;
    text: string;
  };
}

export interface StatItem {
  _key: string;
  icon: string;
  number: string;
  label: string;
}

export interface StatsSection {
  _type: "statsSection";
  _key: string;
  heading: string;
  subheading: string;
  stats: StatItem[];
}

export interface ServiceFeature {
  _key?: string;
  text: string;
  link?: string;
}

export interface ServiceCardItem {
  _key?: string;
  icon: string;
  title: string;
  description: string;
  featured: boolean;
  features?: ServiceFeature[];
  ctaText?: string;
  ctaLink?: string;
}

export interface ServicesSection {
  _type: "servicesSection";
  _key: string;
  badge: string;
  heading: string;
  subheading: string;
  services: ServiceCardItem[];
}

export interface WhyChooseUsFeature {
  _key: string;
  icon: string;
  title: string;
  description: string;
}

export interface WhyChooseUsSection {
  _type: "whyChooseUsSection";
  _key: string;
  badge: string;
  heading: string;
  subheading: string;
  features: WhyChooseUsFeature[];
  image: SanityImage;
}

export interface CtaButton {
  _key: string;
  text: string;
  link: string;
  variant?: "primary" | "secondary" | "outline";
  icon?: string;
}

export interface CtaSection {
  _type: "ctaSection";
  _key: string;
  heading: string;
  bodyText?: string;
  buttons: CtaButton[];
}

export interface DepartmentCard {
  _key: string;
  image: SanityImage;
  title: string;
  description: string;
  linkHref: string;
}

export interface DepartmentsSection {
  _type: "departmentsSection";
  _key: string;
  badge: string;
  heading: string;
  subheading: string;
  departments: DepartmentCard[];
}
