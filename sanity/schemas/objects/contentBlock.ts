import { defineType, defineField } from "sanity";

export default defineType({
  name: "contentBlock",
  title: "Sadržaj blok",
  type: "object",
  icon: () => "📝",
  fields: [
    defineField({
      name: "heading",
      title: "Naslov",
      type: "string",
    }),
    defineField({
      name: "content",
      title: "Sadržaj",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { title: "Tekst samo", value: "text-only" },
          { title: "Tekst + slika desno", value: "text-image-right" },
          { title: "Tekst + slika levo", value: "text-image-left" },
          { title: "2 kolone", value: "two-columns" },
        ],
      },
      initialValue: "text-only",
    }),
  ],
  preview: {
    select: {
      title: "heading",
      layout: "layout",
      content: "content",
    },
    prepare({ title, layout, content }) {
      const layoutLabels: Record<string, string> = {
        "text-only": "Samo tekst",
        "text-image-right": "Tekst + slika desno",
        "text-image-left": "Tekst + slika levo",
        "two-columns": "2 kolone",
      };

      // Izvuci tekst iz content-a ako postoji
      let contentPreview = "";
      if (content && content.length > 0) {
        const firstBlock = content.find(
          (block: any) => block._type === "block",
        );
        if (firstBlock && firstBlock.children && firstBlock.children[0]) {
          contentPreview = firstBlock.children[0].text?.substring(0, 60) || "";
          if (contentPreview.length >= 60) contentPreview += "...";
        }
      }

      const subtitle = contentPreview
        ? `${layoutLabels[layout] || layout} • ${contentPreview}`
        : layoutLabels[layout] || layout || "Layout nije definisan";

      return {
        title: `📝 ${title || "Sadržaj blok"}`,
        subtitle: subtitle,
      };
    },
  },
});
