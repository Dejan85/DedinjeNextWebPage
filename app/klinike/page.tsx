import Link from "next/link";
import { DepartmentCard, HeroSection } from "@/components/shared";
import { Heading, Text } from "@/components/typography";
import { client } from "@/sanity/lib/client";
import type { Department } from "@/sanity/types";

const DEPARTMENTS_QUERY = `*[_type == "department"] | order(name asc) {
  _id,
  name,
  slug,
  description,
  image,
  icon,
  services,
  contactInfo
}`;

export default async function KlinikePage() {
  // Fetch departments from Sanity
  const departments = await client.fetch<Department[]>(DEPARTMENTS_QUERY);

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        img="/images/klinike-slika.jpg"
        imgAlt="Клинике института"
        badge="Наше клинике"
        title="Клинике института"
        subtitle="Савремене клинике опремљене најновијом медицинском технологијом, са тимом стручњака посвећених вашем здрављу и благостању"
        showScrollIndicator={true}
      />

      {/* Departments Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {departments && departments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {departments.map((department) => (
                <DepartmentCard 
                  key={department._id}
                  title={department.name}
                  description={department.description || ""}
                  icon={department.icon}
                  linkHref={`/klinike/${department.slug?.current}`}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Text variant="body" text="Тренутно нема доступних података о клиникама." className="text-gray-500" />
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <Heading variant="h2" text="Потребне су вам додатне информације?" />
          <Text variant="body" text="Контактирајте нас за више информација о нашим клиникама и одељењима или закажите преглед" className="mb-8 text-gray-600 max-w-2xl mx-auto" />
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/kontakt"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Контактирајте нас
            </Link>
            <Link
              href="/o-institutu"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors"
            >
              О Институту
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
