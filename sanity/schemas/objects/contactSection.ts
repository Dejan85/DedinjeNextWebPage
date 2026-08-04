import { defineType, defineField } from "sanity";

export default defineType({
  name: "contactSection",
  title: "Contact Section",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "localeText",
    }),
    defineField({
      name: "contactInfo",
      title: "Contact Information",
      type: "object",
      fields: [
        defineField({
          name: "phone",
          title: "Phone Number",
          type: "string",
        }),
        defineField({
          name: "email",
          title: "Email Address",
          type: "string",
          validation: (Rule) => Rule.email(),
        }),
        defineField({
          name: "address",
          title: "Address",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "formFields",
      title: "Form Configuration",
      type: "object",
      description: "Labels for form fields",
      fields: [
        defineField({
          name: "namePlaceholder",
          title: "Name Field Placeholder",
          type: "localeString",
          initialValue: { sr: "Име и презиме", en: "Full name" },
        }),
        defineField({
          name: "emailPlaceholder",
          title: "Email Field Placeholder",
          type: "localeString",
          initialValue: { sr: "E-пошта", en: "Email" },
        }),
        defineField({
          name: "phonePlaceholder",
          title: "Phone Field Placeholder",
          type: "localeString",
          initialValue: { sr: "Телефон", en: "Phone" },
        }),
        defineField({
          name: "departmentLabel",
          title: "Department Field Label",
          type: "localeString",
          initialValue: { sr: "Одељење", en: "Department" },
        }),
        defineField({
          name: "dateLabel",
          title: "Date Field Label",
          type: "localeString",
          initialValue: { sr: "Датум", en: "Date" },
        }),
        defineField({
          name: "timeLabel",
          title: "Time Field Label",
          type: "localeString",
          initialValue: { sr: "Време", en: "Time" },
        }),
        defineField({
          name: "notesPlaceholder",
          title: "Additional Notes Placeholder",
          type: "localeString",
          initialValue: { sr: "Додатне напомене", en: "Additional notes" },
        }),
        defineField({
          name: "submitButtonText",
          title: "Submit Button Text",
          type: "localeString",
          initialValue: { sr: "ПОШАЉИТЕ ПОРУКУ", en: "SEND MESSAGE" },
        }),
      ],
    }),
    defineField({
      name: "departments",
      title: "Available Departments",
      type: "array",
      of: [{ type: "localeString" }],
      description: "List of departments for the dropdown",
    }),
  ],
  preview: {
    select: {
      title: "heading.sr",
      subtitle: "subheading.sr",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Contact Section",
        subtitle: subtitle,
      };
    },
  },
});
