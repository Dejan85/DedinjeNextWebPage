import { defineType, defineField } from "sanity";
import { LocaleTabInput } from "../../components/LocaleTabInput";

export default defineType({
  name: "localePortableText",
  title: "Rich text (SR/EN)",
  type: "object",
  fields: [
    defineField({
      name: "sr",
      title: "Српски",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "en",
      title: "English",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  components: {
    input: LocaleTabInput,
  },
});
