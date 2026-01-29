# Миграција странице "Реч директора" на Sanity CMS

## Шта је урађено

### 1. Sanity Schema (`sanity/schemas/singletons/directorPage.ts`)
Креиран singleton schema који дефинише структуру странице:
- **Hero секција**: слика, badge, наслов, поднаслов
- **Info картице**: до 3 картице са иконицама и линковима
- **Порука директора**: badge, наслов, параграфи, потпис, видео
- **Цитат**: текст и аутор
- **Партнери**: heading и листа партнера
- **SEO**: meta title и description

### 2. Миграциони скрипт (`scripts/migrate-director.ts`)
Креиран скрипт који:
- Пребацује све хард-кодиране податке у Sanity
- Користи исту структуру као постојеће миграције
- Додат у `package.json` као `npm run migrate:director`

### 3. TypeScript типови (`sanity/types.ts`)
Додати интерфејси:
- `DirectorHero`
- `DirectorInfoCard`
- `DirectorMessageParagraph`
- `DirectorMessage`
- `DirectorQuote`
- `DirectorPartners`
- `DirectorPage`

### 4. Sanity Query (`sanity/lib/queries.ts`)
Додат `DIRECTOR_PAGE_QUERY` који повлачи све податке за страницу.

### 5. Metadata (`app/rec-direktora/metadata.ts`)
Ажуриран да динамички повлачи SEO податке из Sanity-ја са fallback-ом.

### 6. Page компонента (`app/rec-direktora/page.tsx`)
Конвертована из client у **server component**:
- Fetch-ује податке из Sanity-ја
- Има fallback податке ако Sanity није доступан
- Динамички рендерује све секције на основу CMS података
- Користи `.map()` за листе уместо хард-кодираних компоненти

## Како покренути миграцију

```bash
# 1. Покрени миграцију
npm run migrate:director

# 2. Отвори Sanity Studio
npm run sanity:dev
# Или иди на http://localhost:3000/studio

# 3. Иди на "Реч директора" singleton
# 4. Upload слику директора у Hero > Image
# 5. Publish промене
```

## Предности Sanity интеграције

✅ **Лако уређивање** - садржај се мења кроз UI, без кода  
✅ **Типска сигурност** - TypeScript типови за све податке  
✅ **Fallback** - страница ради и ако Sanity није доступан  
✅ **SEO** - динамички metadata из CMS-а  
✅ **Server Component** - боље перформансе, нема "use client"  
✅ **Verzionisanje** - Sanity чува историју промена  
✅ **Image optimization** - аутоматска оптимизација слика  

## Шта се може даље уређивати кроз CMS

- Текст hero секције
- Слика директора
- Све info картице (иконице, текст, линкови)
- Порука директора (параграфи, потпис)
- Видео линк и caption
- Цитат
- Партнери и сертификати
- SEO мета подаци

## Структура фајлова

```
sanity/
  schemas/
    singletons/
      directorPage.ts          # SchemaDefinicija
  lib/
    queries.ts                 # DIRECTOR_PAGE_QUERY
  types.ts                     # TypeScript интерфејси

app/
  rec-direktora/
    page.tsx                   # Server component
    metadata.ts                # Dynamic SEO

scripts/
  migrate-director.ts          # Миграциони скрипт
```

## Следећи кораци

Исти процес треба применити на:
- [ ] Биографија (`/biografija`)
- [ ] Библиографија (`/bibliografija`)
- [ ] О институту (`/o-institutu`)
