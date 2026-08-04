import { defineType, defineField } from "sanity";
import { LocaleTabInput } from "../../components/LocaleTabInput";

export default defineType({
  name: "localeText",
  title: "Duži tekst (SR/EN)",
  type: "object",
  fields: [
    defineField({ name: "sr", title: "Српски", type: "text", rows: 3 }),
    defineField({ name: "en", title: "English", type: "text", rows: 3 }),
  ],
  components: {
    input: LocaleTabInput,
  },
  preview: {
    select: { title: "sr" },
  },
});
