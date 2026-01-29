// Documents
import page from "./documents/page";
import doctor from "./documents/doctor";
import department from "./documents/department";
import service from "./documents/service";
import news from "./documents/news";
import publication from "./documents/publication";
import testimonial from "./documents/testimonial";

// Singletons
import siteSettings from "./singletons/siteSettings";
import navigation from "./singletons/navigation";

// Objects
import hero from "./objects/hero";
import contentBlock from "./objects/contentBlock";
import timeline from "./objects/timeline";
import seoMetadata from "./objects/seoMetadata";
import infoBox from "./objects/infoBox";
import statItem from "./objects/statItem";
import welcomeSection from "./objects/welcomeSection";
import statsSection from "./objects/statsSection";
import servicesSection from "./objects/servicesSection";

export const schemaTypes = [
  // Singletons
  siteSettings,
  navigation,

  // Documents
  page,
  doctor,
  department,
  service,
  news,
  publication,
  testimonial,

  // Objects
  hero,
  contentBlock,
  timeline,
  seoMetadata,
  infoBox,
  statItem,
  welcomeSection,
  statsSection,
  servicesSection,
];
