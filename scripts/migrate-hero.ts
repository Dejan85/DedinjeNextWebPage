import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'haygvfxq',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const heroSlides = [
  {
    _type: 'hero',
    heading: 'Ваш национални институт за срце и крвне судове',
    subheading:
      'Водећа здравствена установа у региону са преко 65 година искуства у кардиоваскуларној медицини',
    image: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-unsplash-1', // Biće zamenjeno pravim image reference-om
      },
    },
  },
  {
    _type: 'hero',
    heading: 'Најсавременија дијагностика',
    subheading:
      'Користимо најновију технологију и опрему за прецизну дијагностику и лечење кардиоваскуларних обољења',
    image: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-unsplash-2',
      },
    },
    cta: {
      text: 'ПОГЛЕДАЈ УСЛУГЕ',
      link: '#services',
    },
  },
  {
    _type: 'hero',
    heading: 'Тим стручњака на вашој услузи',
    subheading:
      'Преко 200 лекара специјалиста посвећених вашем здрављу и опоравку',
    image: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-unsplash-3',
      },
    },
  },
]

// Kreiraj Homepage document sa hero slajdovima
async function migrateHeroSlider() {
  try {
    console.log('🚀 Migracija Hero Slider-a...\n')

    // Kreiraj homepage dokument
    const homepage = {
      _type: 'page',
      _id: 'homepage',
      title: 'Početna strana',
      slug: {
        _type: 'slug',
        current: '/',
      },
      pageBuilder: heroSlides,
      publishedAt: new Date().toISOString(),
    }

    const result = await client.createOrReplace(homepage)
    console.log('✅ Homepage kreirana sa Hero slider-om!')
    console.log(`📄 Document ID: ${result._id}\n`)

    console.log('📋 Kreirana 3 hero slide-a:')
    heroSlides.forEach((slide, index) => {
      console.log(`  ${index + 1}. ${slide.heading}`)
    })

    console.log('\n⚠️  NAPOMENA: Slike su placeholder references.')
    console.log('   Možeš ih promeniti preko Sanity Studio-a.\n')
    console.log('🎉 Migracija završena!')
  } catch (error) {
    console.error('❌ Greška pri migraciji:', error)
  }
}

migrateHeroSlider()
