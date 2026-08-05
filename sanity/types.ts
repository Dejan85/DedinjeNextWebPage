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
  subtitle?: string;
  section?: "za-pacijente" | "edukacija" | "nauka-istrazivanje" | "ostalo";
  seo?: SeoMetadata;
  pageBuilder?: any[]; // Page builder blocks
  publishedAt: string;
}

// Page builder block tipovi dodati za generičku "info-stranicu" (za-pacijente,
// edukacija, nauka-istrazivanje) — vidi docs/MIGRACIJA.md

export interface IntroSectionBlock {
  _type: "introSection";
  icon?: string;
  heading: string;
  paragraphs: string[];
  badges?: { icon?: string; label: string }[];
  stats?: { value: string; label: string }[];
}

export interface BannerBlockData {
  _type: "bannerBlock";
  variant: "info" | "alert" | "warning" | "motto" | "highlight";
  icon?: string;
  title?: string;
  text: string;
}

export interface CardGridBlockData {
  _type: "cardGridBlock";
  heading?: string;
  subtitle?: string;
  intro?: string;
  numbered?: boolean;
  cards: {
    icon?: string;
    title?: string;
    value?: string;
    description?: string;
    href?: string;
    date?: string;
    category?: string;
    contactPerson?: string;
    phone?: string;
    email?: string;
  }[];
}

export interface ChecklistBlockData {
  _type: "checklistBlock";
  heading?: string;
  intro?: string;
  items: string[];
}

export interface ContactDirectoryContact {
  title: string;
  note?: string;
  phone: string;
  href: string;
  time: string;
}

export interface ContactDirectoryBlockData {
  _type: "contactDirectoryBlock";
  heading?: string;
  subtitle?: string;
  categories: {
    title: string;
    icon?: string;
    contacts: ContactDirectoryContact[];
  }[];
}

export interface AccordionSection {
  title?: string;
  kind: "text" | "list";
  text?: string[];
  list?: string[];
}

export interface AccordionBlockItem {
  itemId: string;
  title?: string;
  icon?: string;
  sections: AccordionSection[];
}

export interface AccordionBlockData {
  _type: "accordionBlock";
  title?: string;
  subtitle?: string;
  defaultOpenId?: string;
  items: AccordionBlockItem[];
}

export interface FaqBlockItem {
  question: string;
  answer: string;
  category: string;
}

export interface FaqBlockData {
  _type: "faqBlock";
  title?: string;
  subtitle?: string;
  items: FaqBlockItem[];
}

export interface TabsBlockInfoItem {
  icon?: string;
  question?: string;
  answerParagraphs?: string[];
}

export interface TabsBlockFocusCard {
  title: string;
  text?: string;
  items?: string[];
}

export interface TabsBlockTab {
  tabId: string;
  label: string;
  image?: string;
  imageAlt?: string;
  introHeading?: string;
  introParagraphs?: string[];
  infoBlocks?: TabsBlockInfoItem[];
  introList?: string[];
  focusCards?: TabsBlockFocusCard[];
  outroParagraphs?: string[];
}

export interface TabsBlockData {
  _type: "tabsBlock";
  defaultTabId?: string;
  tabs: TabsBlockTab[];
}

export interface TimelineBlockItem {
  year: string;
  title: string;
  subtitle?: string;
  description?: string;
}

export interface TimelineBlockData {
  _type: "timelineBlock";
  heading?: string;
  intro?: string;
  items: TimelineBlockItem[];
}

export interface LectureItem {
  date?: string;
  title: string;
  lecturer: string;
}

export interface LectureScheduleSection {
  title: string;
  items: LectureItem[];
}

export interface LectureScheduleTab {
  tabId: string;
  label: string;
  items?: LectureItem[];
  sections?: LectureScheduleSection[];
}

export interface LectureScheduleBlockData {
  _type: "lectureScheduleBlock";
  heading?: string;
  subtitle?: string;
  defaultTabId?: string;
  tabs: LectureScheduleTab[];
}

export interface DocumentListItem {
  icon?: string;
  label: string;
  href: string;
  year?: string;
}

export interface DocumentListBlockData {
  _type: "documentListBlock";
  heading?: string;
  subtitle?: string;
  items: DocumentListItem[];
}

export interface BoardMemberData {
  name: string;
  role?: string;
}

export interface BoardItemData {
  icon?: string;
  title: string;
  chairman: BoardMemberData;
  viceChairman?: BoardMemberData;
  membersLabel?: string;
  members: BoardMemberData[];
}

export interface BoardListBlockData {
  _type: "boardListBlock";
  heading?: string;
  subtitle?: string;
  boards: BoardItemData[];
}

export type PatientPageBlock =
  | IntroSectionBlock
  | BannerBlockData
  | CardGridBlockData
  | ChecklistBlockData
  | ContactDirectoryBlockData
  | AccordionBlockData
  | FaqBlockData
  | TabsBlockData
  | TimelineBlockData
  | LectureScheduleBlockData
  | DocumentListBlockData
  | BoardListBlockData;

export interface PatientPage {
  _id?: string;
  title: string;
  subtitle?: string;
  pageBuilder: PatientPageBlock[];
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
  fullText?: string;
  mainImage: SanityImage;
  category?: string;
  author?: string;
  publishedAt: string;
  featured?: boolean;
  seo?: SeoMetadata;
}

export interface VideoItem {
  _id: string;
  _type: "video";
  title: string;
  slug: { current: string };
  youtubeId: string;
  source?: string;
  date?: string;
  description?: string;
  fullText?: string;
  isNew?: boolean;
}

export interface EventItem {
  _id: string;
  _type: "event";
  title: string;
  date: string;
  image: SanityImage;
  location?: string;
  link?: string;
}

export interface Announcement {
  _id: string;
  _type: "announcement";
  title: string;
  date?: string;
  icon?: string;
  type?: string;
  text?: string;
  important?: boolean;
}

export interface JobPosting {
  _id: string;
  _type: "jobPosting";
  title: string;
  date?: string;
  type?: string;
  icon?: string;
  text?: string;
  active?: boolean;
  deadline?: string;
}

export interface MagazineIssue {
  _id: string;
  _type: "magazineIssue";
  volume?: string;
  number?: string;
  year?: string;
  title: string;
  topics?: string[];
  pdfUrl?: string;
  coverColor?: string;
}

export interface InformatorSection {
  icon?: string;
  title: string;
  description?: string;
}

export interface InformatorPage {
  heroHeading?: string;
  heroText?: string;
  publishDate?: string;
  updatedDate?: string;
  pdfUrl?: string;
  sections?: InformatorSection[];
  contactHeading?: string;
  contactText?: string;
  contactPerson?: string;
  contactPhone?: string;
  contactEmail?: string;
  contactAddress?: string;
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
    _key?: string;
    title: string;
    link?: string;
    submenu?: Array<{
      _key?: string;
      title: string;
      link?: string;
      icon?: string;
      items?: Array<{
        _key?: string;
        title: string;
        link: string;
        icon?: string;
      }>;
    }>;
  }>;
  footerMenu?: Array<{
    title: string;
    link: string;
  }>;
}

export interface FooterLink {
  _key: string;
  title: string;
  href: string;
}

export interface FooterLocation {
  _key: string;
  title?: string;
  mapEmbedUrl?: string;
  address?: string;
  city?: string;
}

export interface FooterSocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
}

export interface Footer {
  _id: string;
  _type: "footer";
  logo?: SanityImage;
  instituteName?: string;
  instituteSubtitle?: string;
  description?: string;
  socialLinks?: FooterSocialLinks;
  locations?: FooterLocation[];
  copyright?: string;
  legalLinks?: FooterLink[];
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
  variant: "regular" | "schedule" | "emergency" | "contact";
  // Regular variant
  description?: string;
  linkText?: string;
  linkHref?: string;
  // Schedule variant
  schedule?: ScheduleItem[];
  // Emergency variant
  emergencyPhone?: string;
  emergencyNote?: string;
  // Contact variant
  contactPhone?: string;
  contactFax?: string;
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

export interface SocialLink {
  _key: string;
  platform: string;
  url: string;
}

export interface TeamMember {
  _key: string;
  image: SanityImage;
  name: string;
  role: string;
  description: string;
  socialLinks?: SocialLink[];
}

export interface TeamSection {
  _type: "teamSection";
  _key: string;
  badge: string;
  heading: string;
  subheading: string;
  team: TeamMember[];
  ctaButton?: {
    text: string;
    link: string;
  };
}

export interface TestimonialItem {
  _key: string;
  quote: string;
  authorName: string;
  authorRole: string;
  authorImage: SanityImage;
}

export interface TestimonialsSection {
  _type: "testimonialsSection";
  _key: string;
  badge: string;
  heading: string;
  testimonials: TestimonialItem[];
}

export interface NewsItem {
  _key: string;
  image: SanityImage;
  category: string;
  date: string;
  author?: string;
  title: string;
  description?: string;
  linkHref: string;
  size?: "large" | "small";
}

export interface NewsSection {
  _type: "newsSection";
  _key: string;
  badge: string;
  heading: string;
  subheading: string;
  news: NewsItem[];
}

export interface ContactInfo {
  phone?: string;
  email?: string;
  address?: string;
}

export interface FormFields {
  namePlaceholder?: string;
  emailPlaceholder?: string;
  phonePlaceholder?: string;
  departmentLabel?: string;
  dateLabel?: string;
  timeLabel?: string;
  notesPlaceholder?: string;
  submitButtonText?: string;
}

export interface ContactSection {
  _type: "contactSection";
  _key: string;
  heading: string;
  subheading?: string;
  contactInfo?: ContactInfo;
  formFields?: FormFields;
  departments?: string[];
}

export interface PartnerItem {
  _key: string;
  icon?: string;
  name: string;
}

export interface PartnersSection {
  _type: "partnersSection";
  _key: string;
  heading: string;
  partners: PartnerItem[];
}

export interface HeroSlideItem {
  _key: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  video?: string;
  image?: SanityImage;
}

export interface HeroSlidesSection {
  _type: "heroSlidesSection";
  _key: string;
  slides: HeroSlideItem[];
}

export interface LinkCardItem {
  _key: string;
  icon?: string;
  title: string;
  desc?: string;
  href?: string;
}

export interface ClinicsFeaturedSection {
  _type: "clinicsFeaturedSection";
  _key: string;
  icon?: string;
  heading?: string;
  subheading?: string;
  items: LinkCardItem[];
}

export interface PatientLinksSection {
  _type: "patientLinksSection";
  _key: string;
  icon?: string;
  heading?: string;
  subheading?: string;
  items: LinkCardItem[];
}

// Director Page Types
export interface DirectorHero {
  image?: SanityImage;
  badge: string;
  title: string;
  subtitle: string;
  showScrollIndicator?: boolean;
}

export interface DirectorInfoCard {
  _key: string;
  icon: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  highlight?: boolean;
}

export interface DirectorMessageParagraph {
  _key: string;
  text: string;
  variant: "lead" | "body";
}

export interface DirectorMessage {
  badge: string;
  heading: string;
  paragraphs: DirectorMessageParagraph[];
  signature: string;
  videoSrc?: string;
  videoOverlayText?: string;
  videoCaption?: string;
}

export interface DirectorQuote {
  text: string;
  author: string;
}

export interface DirectorPartnerItem {
  _key: string;
  icon: string;
  text: string;
}

export interface DirectorPartners {
  heading: string;
  items: DirectorPartnerItem[];
}

export interface DirectorSeo {
  title: string;
  description: string;
}

export interface DirectorPage {
  hero: DirectorHero;
  infoCards: DirectorInfoCard[];
  message: DirectorMessage;
  quote: DirectorQuote;
  partners: DirectorPartners;
  seo: DirectorSeo;
}

// About Page Types
export interface AboutHero {
  image?: SanityImage;
  badge: string;
  title: string;
  subtitle: string;
  showScrollIndicator?: boolean;
}

export interface AboutHighlight {
  _key: string;
  icon: string;
  title: string;
  description: string;
}

export interface AboutSection {
  badge: string;
  heading: string;
  leadText: string;
  bodyText: string;
  highlights: AboutHighlight[];
  foundedYear: string;
  videoSrc?: string;
  videoOverlayText?: string;
  videoCaption?: string;
}

export interface AboutStat {
  _key: string;
  icon: string;
  label: string;
  value: string;
  description: string;
}

export interface AboutStatistics {
  badge: string;
  heading: string;
  subtitle: string;
  stats: AboutStat[];
}

export interface AboutProfile {
  _key: string;
  id: string;
  icon: string;
  tabText: string;
  image?: SanityImage;
  name: string;
  title: string;
  bioTitle: string;
  bioParagraphs: string[];
}

export interface AboutManagement {
  badge: string;
  heading: string;
  subtitle: string;
  profiles: AboutProfile[];
}

export interface AboutValue {
  _key: string;
  icon: string;
  title: string;
  description: string;
}

export interface AboutValues {
  badge: string;
  heading: string;
  subtitle: string;
  items: AboutValue[];
}

export interface AboutCtaButton {
  _key: string;
  text: string;
  href: string;
  icon: string;
  variant: "primary" | "secondary";
}

export interface AboutCta {
  heading: string;
  text: string;
  buttons: AboutCtaButton[];
}

export interface AboutSeo {
  title: string;
  description: string;
}

export interface AboutPage {
  hero: AboutHero;
  about: AboutSection;
  statistics: AboutStatistics;
  management: AboutManagement;
  values: AboutValues;
  cta: AboutCta;
  seo: AboutSeo;
}

// Biography Page Types
export interface BiographyPageHeader {
  title: string;
  subtitle: string;
}

export interface BiographyHighlight {
  _key: string;
  icon: string;
  title: string;
  description: string;
}

export interface BiographyIntro {
  image: SanityImage;
  name: string;
  position: string;
  shortBio: string;
  highlights: BiographyHighlight[];
}

export interface BiographyTimelineItem {
  _key: string;
  year: string;
  title: string;
  institution: string;
  description: string;
}

export interface BiographyProfessionalPath {
  badge: string;
  heading: string;
  timeline: BiographyTimelineItem[];
}

export interface BiographyQualification {
  _key: string;
  icon: string;
  degree: string;
  institution: string;
  year: string;
  description: string;
}

export interface BiographyAdditionalInfo {
  _key: string;
  title: string;
  content: string;
}

export interface BiographyAcademicQualifications {
  badge: string;
  heading: string;
  qualifications: BiographyQualification[];
  additionalInfo: BiographyAdditionalInfo[];
}

export interface BiographySection {
  _key: string;
  heading: string;
  paragraphs: string[];
}

export interface BiographyFull {
  sections: BiographySection[];
  pdfDownloadUrl: string;
  pdfButtonText: string;
}

export interface BiographyCtaButton {
  _key: string;
  text: string;
  href: string;
  variant: "primary" | "outline";
}

export interface BiographyCta {
  heading: string;
  buttons: BiographyCtaButton[];
}

export interface BiographySeo {
  title: string;
  description: string;
  keywords: string[];
}

export interface BiographyPage {
  _id: string;
  _type: "biographyPage";
  pageHeader: BiographyPageHeader;
  intro: BiographyIntro;
  professionalPath: BiographyProfessionalPath;
  academicQualifications: BiographyAcademicQualifications;
  fullBiography: BiographyFull;
  cta: BiographyCta;
  seo: BiographySeo;
}

// Bibliography Page Types
export interface BibliographyPageHeader {
  breadcrumbs: { _key: string; label: string; href: string }[];
  title: string;
  subtitle: string;
}

export interface BibliographyStat {
  _key: string;
  value: string;
  label: string;
}

export interface BibliographyIntroduction {
  heading: string;
  description: string;
  stats: BibliographyStat[];
}

export interface BibliographyPublication {
  _key: string;
  number: number;
  text: string;
}

export interface BibliographyCategory {
  _key: string;
  categoryId: string;
  icon: string;
  title: string;
  description: string;
  publications: BibliographyPublication[];
  collapsible: boolean;
  initiallyExpanded: boolean;
}

export interface BibliographyDownload {
  heading: string;
  description: string;
  buttonText: string;
  fileUrl: string;
}

export interface BibliographySeo {
  title: string;
  description: string;
  keywords: string[];
}

export interface BibliographyPage {
  _id: string;
  _type: "bibliographyPage";
  pageHeader: BibliographyPageHeader;
  introduction: BibliographyIntroduction;
  categories: BibliographyCategory[];
  download: BibliographyDownload;
  seo: BibliographySeo;
}

// Clinic Page Types (multi-instance — jedan tip, ~20 dokumenata)
export interface ClinicArea {
  _key?: string;
  icon: string;
  title: string;
  desc: string;
}

export interface ClinicStaffMember {
  _key?: string;
  name: string;
  role?: string;
}

export interface ClinicStaffGroup {
  _key?: string;
  heading?: string;
  names?: string[];
  members?: ClinicStaffMember[];
}

export interface ClinicStaffList {
  title: string;
  groups: ClinicStaffGroup[];
}

export interface ClinicStat {
  _key?: string;
  value: string;
  label: string;
  icon?: string;
}

export interface ClinicHighlight {
  _key?: string;
  icon?: string;
  text: string;
}

export type ClinicUnitSection =
  | { _key?: string; type: "paragraph"; title: string; text: string }
  | { _key?: string; type: "list"; title: string; items: string[] };

export interface ClinicUnit {
  _key?: string;
  slug: string;
  title: string;
  heroImage?: string;
  heroSubtitle?: string;
  sections: ClinicUnitSection[];
}

export interface ClinicProceduresList {
  title: string;
  items: string[];
}

export interface ClinicExtraBanner {
  value: string;
  label: string;
  desc: string;
}

export interface ClinicPatientInstructions {
  title: string;
  paragraphs: string[];
}

export interface ClinicSeo {
  title?: string;
  description?: string;
}

export interface ClinicPage {
  _id: string;
  _type: "clinicPage";
  title: string;
  slug: { current: string };
  order?: number;
  breadcrumbLabel: string;
  subtitle: string;
  introIcon: string;
  introTitle: string;
  introText: string;
  introParagraphs?: string[];
  organizationalStructure?: string;
  areas: ClinicArea[];
  areasTitle?: string;
  areasSubtitle?: string;
  areasIcon?: string;
  extraBanner?: ClinicExtraBanner;
  stats?: ClinicStat[];
  highlights?: ClinicHighlight[];
  proceduresList?: ClinicProceduresList;
  staffList?: ClinicStaffList;
  patientInstructions?: ClinicPatientInstructions;
  units?: ClinicUnit[];
  seo?: ClinicSeo;
}

// School Page Types (multi-instance — edukativni programi/škole)
export interface SchoolIntro {
  heading?: string;
  paragraphs?: string[];
  images?: string[];
}

export interface SchoolProgramNavItem {
  icon?: string;
  title?: string;
  href?: string;
  buttonText?: string;
}

export interface SchoolProgramNav {
  heading?: string;
  subtitle?: string;
  items: SchoolProgramNavItem[];
}

export interface SchoolStat {
  value: string;
  label: string;
}

export interface SchoolCourseDetail {
  icon?: string;
  title?: string;
  description?: string;
}

export interface SchoolMetaLine {
  icon?: string;
  text: string;
}

export interface SchoolCourseSection {
  anchorId?: string;
  icon?: string;
  heading: string;
  paragraphs?: string[];
  details?: SchoolCourseDetail[];
  metaLines?: SchoolMetaLine[];
  highlight?: string;
  image?: string;
  contactNote?: string;
}

export interface SchoolRequirementItem {
  icon?: string;
  value?: string;
  title?: string;
  description?: string;
}

export interface SchoolRequirementsSection {
  heading?: string;
  subtitle?: string;
  variant?: "cards" | "stats";
  items: SchoolRequirementItem[];
}

export interface SchoolExamCard {
  icon?: string;
  heading?: string;
  intro?: string;
  listItems?: string[];
  outro?: string;
  badge?: string;
}

export interface SchoolExamSection {
  heading?: string;
  cards: SchoolExamCard[];
}

export interface SchoolTeamMember {
  name: string;
  role?: string;
}

export interface SchoolTeam {
  heading?: string;
  subtitle?: string;
  members: SchoolTeamMember[];
}

export interface SchoolTechTeam {
  heading?: string;
  members: string[];
  footnote?: string;
}

export interface SchoolSeo {
  title?: string;
  description?: string;
}

export interface SchoolPage {
  _id?: string;
  _type?: "schoolPage";
  title: string;
  slug?: { current: string };
  subtitle?: string;
  breadcrumbLabel: string;
  intro?: SchoolIntro;
  programNav?: SchoolProgramNav;
  stats?: SchoolStat[];
  courseSections: SchoolCourseSection[];
  requirementsSection?: SchoolRequirementsSection;
  examSection?: SchoolExamSection;
  team?: SchoolTeam;
  techTeam?: SchoolTechTeam;
  seo?: SchoolSeo;
}
