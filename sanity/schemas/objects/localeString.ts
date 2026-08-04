import { defineType, defineField } from "sanity";
import { LocaleTabInput } from "../../components/LocaleTabInput";

export default defineType({
  name: "localeString",
  title: "Tekst (SR/EN)",
  type: "object",
  fields: [
    defineField({ name: "sr", title: "Српски", type: "string" }),
    defineField({ name: "en", title: "English", type: "string" }),
  ],
  components: {
    input: LocaleTabInput,
  },
  preview: {
    select: { title: "sr" },
  },
});
