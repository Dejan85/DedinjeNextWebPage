import { groq } from "next-sanity";

// Pages
export const PAGES_QUERY = groq`*[_type == "page"] | order(publishedAt desc)`;

export const PAGE_BY_SLUG_QUERY = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    seo,
    pageBuilder[] {
      ...,
      _type == 'reference' => @->
    },
    publishedAt
  }
`;

// Homepage sa Hero slides i Info Boxes
export const HOMEPAGE_QUERY = groq`
  *[_type == "page" && _id == "homepage"][0] {
    _id,
    title,
    pageBuilder[] {
      _type,
      // Hero fields
      _type == "hero" => {
        heading,
        subheading,
        image {
          asset-> {
            _id,
            url
          }
        },
        cta {
          text,
          link
        }
      },
      // InfoBox fields
      _type == "infoBox" => {
        icon,
        title,
        variant,
        description,
        linkText,
        linkHref,
        schedule[] {
          days,
          hours
        },
        emergencyPhone,
        emergencyNote
      },
      // WelcomeSection fields
      _type == "welcomeSection" => {
        badge,
        heading,
        leadText,
        bodyText,
        features[] {
          _key,
          icon,
          text
        },
        ctaButton {
          text,
          link
        },
        image {
          asset-> {
            _id,
            url
          }
        },
        secondaryImage {
          asset-> {
            _id,
            url
          }
        },
        imageBadge {
          number,
          text
        }
      },
      // StatsSection fields
      _type == "statsSection" => {
        heading,
        subheading,
        stats[] {
          _key,
          icon,
          number,
          label
        }
      },
      // ServicesSection fields
      _type == "servicesSection" => {
        badge,
        heading,
        subheading,
        services[] {
          _key,
          icon,
          title,
          description,
          featured,
          features[] {
            _key,
            text,
            link
          },
          ctaText,
          ctaLink
        }
      },
      // WhyChooseUsSection fields
      _type == "whyChooseUsSection" => {
        badge,
        heading,
        subheading,
        features[] {
          _key,
          icon,
          title,
          description
        },
        image {
          asset-> {
            _id,
            url
          }
        }
      },
      // CtaSection fields
      _type == "ctaSection" => {
        heading,
        bodyText,
        buttons[] {
          _key,
          text,
          link,
          variant,
          icon
        }
      },
      // DepartmentsSection fields
      _type == "departmentsSection" => {
        badge,
        heading,
        subheading,
        departments[] {
          _key,
          image {
            asset-> {
              _id,
              url
            }
          },
          title,
          description,
          linkHref
        }
      },
      // TeamSection fields
      _type == "teamSection" => {
        badge,
        heading,
        subheading,
        team[] {
          _key,
          image {
            asset-> {
              _id,
              url
            }
          },
          name,
          role,
          description,
          socialLinks[] {
            _key,
            platform,
            url
          }
        },
        ctaButton {
          text,
          link
        }
      },
      // TestimonialsSection fields
      _type == "testimonialsSection" => {
        badge,
        heading,
        testimonials[] {
          _key,
          quote,
          authorName,
          authorRole,
          authorImage {
            asset-> {
              _id,
              url
            }
          }
        }
      }
    }
  }
`;

// Doctors
export const DOCTORS_QUERY = groq`
  *[_type == "doctor"] | order(order asc) {
    _id,
    name,
    slug,
    title,
    position,
    specialization,
    image,
    featured,
    department->
  }
`;

export const DOCTOR_BY_SLUG_QUERY = groq`
  *[_type == "doctor" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    title,
    position,
    specialization,
    image,
    biography,
    timeline,
    education,
    email,
    phone,
    socialLinks,
    department->,
    seo
  }
`;

// Departments
export const DEPARTMENTS_QUERY = groq`
  *[_type == "department"] | order(order asc) {
    _id,
    name,
    slug,
    description,
    image,
    icon
  }
`;

export const DEPARTMENT_BY_SLUG_QUERY = groq`
  *[_type == "department" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    content,
    image,
    icon,
    features,
    services[]->,
    doctors[]->,
    seo
  }
`;

// Services
export const SERVICES_QUERY = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    name,
    slug,
    description,
    icon,
    image,
    featured
  }
`;

export const SERVICE_BY_SLUG_QUERY = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    content,
    icon,
    image,
    features,
    department->,
    seo
  }
`;

// News
export const NEWS_QUERY = groq`
  *[_type == "news"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    category,
    author,
    publishedAt,
    featured
  }
`;

export const NEWS_BY_SLUG_QUERY = groq`
  *[_type == "news" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    mainImage,
    category,
    author,
    publishedAt,
    seo
  }
`;

// Publications
export const PUBLICATIONS_QUERY = groq`
  *[_type == "publication"] | order(year desc) {
    _id,
    title,
    authors,
    journal,
    year,
    category,
    impactFactor,
    doctor->
  }
`;

// Testimonials
export const TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial" && featured == true] | order(publishedAt desc) {
    _id,
    name,
    role,
    image,
    quote,
    rating
  }
`;

// Site Settings
export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    siteDescription,
    logo,
    contact,
    workingHours,
    socialLinks,
    seo
  }
`;

// Navigation
export const NAVIGATION_QUERY = groq`
  *[_type == "navigation"][0] {
    mainMenu,
    footerMenu
  }
`;
