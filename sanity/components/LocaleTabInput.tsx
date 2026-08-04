import { useState } from "react";
import { Box, Tab, TabList, TabPanel } from "@sanity/ui";
import type { FieldProps, ObjectInputProps, ObjectMember } from "sanity";

const LOCALE_TABS = [
  { name: "sr", label: "Српски" },
  { name: "en", label: "English" },
] as const;

function isFieldMember(
  member: ObjectMember
): member is Extract<ObjectMember, { kind: "field" }> {
  return member.kind === "field";
}

/**
 * Deljeni Studio input za localeString/localeText/localePortableText —
 * renderuje sr/en podpolja kao tabove umesto stack-ovanih polja.
 * Delegira stvarno renderovanje inputa na `renderField` (Sanity i dalje
 * upravlja patch-evima/validacijom), ovaj komponenta samo menja layout.
 */
export function LocaleTabInput(props: ObjectInputProps) {
  const [activeTab, setActiveTab] = useState<(typeof LOCALE_TABS)[number]["name"]>("sr");
  const fieldMembers = props.members.filter(isFieldMember);

  return (
    <Box>
      <TabList space={1} style={{ marginBottom: "0.75rem" }}>
        {LOCALE_TABS.map((tab) => (
          <Tab
            key={tab.name}
            id={`${props.id}-${tab.name}-tab`}
            aria-controls={`${props.id}-${tab.name}-panel`}
            label={tab.label}
            selected={activeTab === tab.name}
            onClick={() => setActiveTab(tab.name)}
          />
        ))}
      </TabList>
      {LOCALE_TABS.map((tab) => {
        const member = fieldMembers.find((m) => m.name === tab.name);
        if (!member) return null;
        return (
          <TabPanel
            key={tab.name}
            id={`${props.id}-${tab.name}-panel`}
            aria-labelledby={`${props.id}-${tab.name}-tab`}
            hidden={activeTab !== tab.name}
          >
            {props.renderField(member.field as unknown as FieldProps)}
          </TabPanel>
        );
      })}
    </Box>
  );
}
