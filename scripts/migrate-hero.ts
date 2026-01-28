import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import https from "https";

// Učitaj .env.local
dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: "haygvfxq",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const imageUrls = [
  "https://images.unsplash.com/photo-1551076805-e1869033e561?w=1920",
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1920",
  "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1920",
];

// Helper funkcija za download slike
function downloadImage(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      const chunks: Buffer[] = [];
      response.on("data", (chunk) => chunks.push(chunk));
      response.on("end", () => resolve(Buffer.concat(chunks)));
      response.on("error", reject);
    });
  });
}

// Upload slika u Sanity
async function uploadImage(url: string, index: number): Promise<string> {
  console.log(`📥 Preuzimam sliku ${index + 1}...`);
  const imageBuffer = await downloadImage(url);

  console.log(`📤 Upload-ujem sliku ${index + 1} u Sanity...`);
  const asset = await client.assets.upload("image", imageBuffer, {
    filename: `hero-${index + 1}.jpg`,
  });

  console.log(`✅ Slika ${index + 1} upload-ovana! ID: ${asset._id}`);
  return asset._id;
}

async function migrateHeroSlider() {
  try {
    console.log("🚀 Migracija Hero Slider-a sa slikama...\n");

    // Upload svih slika
    console.log("📸 Upload-ujem slike...\n");
    const imageIds = await Promise.all(
      imageUrls.map((url, index) => uploadImage(url, index)),
    );

    console.log("\n✅ Sve slike upload-ovane!\n");

    // Kreiraj hero slides sa slikama
    const heroSlides = [
      {
        _type: "hero",
        heading: "Ваш национални институт за срце и крвне судове",
        subheading:
          "Водећа здравствена установа у региону са преко 65 година искуства у кардиоваскуларној медицини",
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageIds[0],
          },
        },
      },
      {
        _type: "hero",
        heading: "Најсавременија дијагностика",
        subheading:
          "Користимо најновију технологију и опрему за прецизну дијагностику и лечење кардиоваскуларних обољења",
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageIds[1],
          },
        },
        cta: {
          text: "ПОГЛЕДАЈ УСЛУГЕ",
          link: "#services",
        },
      },
      {
        _type: "hero",
        heading: "Тим стручњака на вашој услузи",
        subheading:
          "Преко 200 лекара специјалиста посвећених вашем здрављу и опоравку",
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageIds[2],
          },
        },
      },
    ];

    // Kreiraj homepage dokument
    const homepage = {
      _type: "page",
      _id: "homepage",
      title: "Početna strana",
      slug: {
        _type: "slug",
        current: "/",
      },
      pageBuilder: heroSlides,
      publishedAt: new Date().toISOString(),
    };

    console.log("📝 Kreiram Homepage dokument...\n");
    const result = await client.createOrReplace(homepage);

    console.log("✅ Homepage kreirana sa Hero slider-om!");
    console.log(`📄 Document ID: ${result._id}\n`);

    console.log("📋 Kreirano:");
    console.log(`  • 3 hero slide-a sa tekstom`);
    console.log(`  • 3 slike upload-ovane u Sanity\n`);

    console.log("🎉 Migracija uspešno završena!");
    console.log("\n👉 Otvori: http://localhost:3000/studio");
    console.log('   Proveri "Stranice" → "Početna strana"\n');
  } catch (error) {
    console.error("❌ Greška pri migraciji:", error);
  }
}

migrateHeroSlider();
