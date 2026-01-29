import { defineType, defineField } from "sanity";

export default defineType({
  name: "contactSection",
  title: "Contact Section",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 3,
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
          type: "string",
          initialValue: "Име и презиме",
        }),
        defineField({
          name: "emailPlaceholder",
          title: "Email Field Placeholder",
          type: "string",
          initialValue: "E-пошта",
        }),
        defineField({
          name: "phonePlaceholder",
          title: "Phone Field Placeholder",
          type: "string",
          initialValue: "Телефон",
        }),
        defineField({
          name: "departmentLabel",
          title: "Department Field Label",
          type: "string",
          initialValue: "Одељење",
        }),
        defineField({
          name: "dateLabel",
          title: "Date Field Label",
          type: "string",
          initialValue: "Датум",
        }),
        defineField({
          name: "timeLabel",
          title: "Time Field Label",
          type: "string",
          initialValue: "Време",
        }),
        defineField({
          name: "notesPlaceholder",
          title: "Additional Notes Placeholder",
          type: "string",
          initialValue: "Додатне напомене",
        }),
        defineField({
          name: "submitButtonText",
          title: "Submit Button Text",
          type: "string",
          initialValue: "ПОШАЉИТЕ ПОРУКУ",
        }),
      ],
    }),
    defineField({
      name: "departments",
      title: "Available Departments",
      type: "array",
      of: [{ type: "string" }],
      description: "List of departments for the dropdown",
    }),
  ],
  preview: {
    select: {
      title: "heading",
      subtitle: "subheading",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Contact Section",
        subtitle: subtitle,
      };
    },
  },
});
