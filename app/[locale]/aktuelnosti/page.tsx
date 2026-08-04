import Image from "next/image";
import Link from "next/link";
import { Container, PageHeader, Section } from "@/components/shared";
import { Heading } from "@/components/typography";
import { client } from "@/sanity/lib/client";
import {
  NEWS_QUERY,
  VIDEOS_QUERY,
  ANNOUNCEMENTS_QUERY,
  JOB_POSTINGS_QUERY,
} from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { News, VideoItem, Announcement, JobPosting } from "@/sanity/types";
import { formatSrDate } from "./formatDate";
import { GOSTOVANJA } from "./gostovanja/constants";
import { VESTI } from "./constants";
import { generateMetadata } from "./metadata";
import styles from "./page.module.css";

export { generateMetadata };

interface HubVest {
  id: string;
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  image: string;
}

interface HubVideo {
  id: string;
  slug: string;
  youtubeId: string;
  title: string;
  date: string;
  source: string;
  description: string;
}

interface HubObavestenje {
  id: string;
  date: string;
  title: string;
  text: string;
}

interface HubOglas {
  id: string;
  date: string;
  title: string;
  type: string;
  active: boolean;
}

const OBAVESTENJA_FALLBACK: HubObavestenje[] = [
  {
    id: "1",
    date: "15. феб 2026.",
    title: "Радно време за време празника",
    text: "Обавештавамо пацијенте да ће Институт Дедиње радити по измењеном распореду током предстојећих празника.",
  },
  {
    id: "2",
    date: "01. феб 2026.",
    title: "Нови апарати за дијагностику",
    text: "Институт Дедиње је набавио најсавременије апарате за ехокардиографску и васкуларну дијагностику.",
  },
  {
    id: "3",
    date: "20. јан 2026.",
    title: "Позив за едукативне програме",
    text: "Отворене су пријаве за нови циклус базичне школе ехокардиографије. Курс почиње у марту 2026.",
  },
];

const OGLASI_FALLBACK: HubOglas[] = [
  {
    id: "1",
    date: "10. феб 2026.",
    title: "Конкурс за пријем лекара специјалиста кардиологије",
    type: "Запошљавање",
    active: true,
  },
  {
    id: "2",
    date: "05. феб 2026.",
    title: "Оглас за набавку медицинске опреме",
    type: "Јавна набавка",
    active: true,
  },
  {
    id: "3",
    date: "15. јан 2026.",
    title: "Конкурс за медицинске сестре/техничаре",
    type: "Запошљавање",
    active: false,
  },
];

async function getHubData() {
  const vestiFallback: HubVest[] = VESTI.map((v) => ({
    id: v.id,
    slug: v.slug,
    title: v.title,
    date: v.date,
    author: v.author,
    category: v.category,
    image: v.image,
  }));
  const videosFallback: HubVideo[] = GOSTOVANJA.map((g) => ({
    id: g.id,
    slug: g.slug,
    youtubeId: g.youtubeId,
    title: g.title,
    date: g.date,
    source: g.source,
    description: g.description,
  }));

  let vesti = vestiFallback;
  let videos = videosFallback;
  let obavestenja = OBAVESTENJA_FALLBACK;
  let oglasi = OGLASI_FALLBACK;

  try {
    const [newsRes, videosRes, announcementsRes, jobsRes] = await Promise.all([
      client.fetch<News[]>(NEWS_QUERY),
      client.fetch<VideoItem[]>(VIDEOS_QUERY),
      client.fetch<Announcement[]>(ANNOUNCEMENTS_QUERY),
      client.fetch<JobPosting[]>(JOB_POSTINGS_QUERY),
    ]);

    if (newsRes && newsRes.length > 0) {
      vesti = newsRes.map((n) => ({
        id: n._id,
        slug: n.slug.current,
        title: n.title,
        date: formatSrDate(n.publishedAt),
        author: n.author || "",
        category: n.category || "",
        image: urlFor(n.mainImage).width(800).height(450).url(),
      }));
    }
    if (videosRes && videosRes.length > 0) {
      videos = videosRes.map((v) => ({
        id: v._id,
        slug: v.slug.current,
        youtubeId: v.youtubeId,
        title: v.title,
        date: v.date || "",
        source: v.source || "",
        description: v.description || "",
      }));
    }
    if (announcementsRes && announcementsRes.length > 0) {
      obavestenja = announcementsRes.slice(0, 3).map((o) => ({
        id: o._id,
        date: o.date || "",
        title: o.title,
        text: o.text || "",
      }));
    }
    if (jobsRes && jobsRes.length > 0) {
      oglasi = jobsRes.slice(0, 3).map((o) => ({
        id: o._id,
        date: o.date || "",
        title: o.title,
        type: o.type || "",
        active: o.active ?? true,
      }));
    }
  } catch (error) {
    console.error("Error fetching aktuelnosti hub data:", error);
  }

  return { vesti, videos, obavestenja, oglasi };
}

export default async function AktuelnostiPage() {
  const { vesti, videos, obavestenja, oglasi } = await getHubData();

  const featuredVest = vesti[0];
  const moreVesti = vesti.slice(1, 5);
  const latestVideo = videos[0];
  const moreVideos = videos.slice(1, 4);

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Актуелности" },
        ]}
        title="Актуелности"
        subtitle="Вести, обавештења, медијски наступи и публикације"
      />

      {/* ===== News: featured + grid ===== */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.sectionHeader}>
            <Heading variant="h2" text="Најновије вести" />
            <Link href="/aktuelnosti/vesti" className={styles.seeAllBtn}>
              Све вести <i className="fas fa-arrow-right" aria-hidden />
            </Link>
          </div>

          <div className={styles.newsLayout}>
            {/* Featured article */}
            <Link href={`/aktuelnosti/${featuredVest.slug}`} className={styles.newsFeatured}>
              <div className={styles.newsFeaturedImg}>
                <Image
                  src={featuredVest.image}
                  alt={featuredVest.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  style={{ objectFit: "cover" }}
                />
                <div className={styles.newsFeaturedOverlay}>
                  <span className={styles.newsCategoryBadge}>{featuredVest.category}</span>
                  <h2>{featuredVest.title}</h2>
                  <div className={styles.newsFeaturedMeta}>
                    <span><i className="fas fa-user" aria-hidden /> {featuredVest.author}</span>
                    <span><i className="fas fa-calendar-alt" aria-hidden /> {featuredVest.date}</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Side list */}
            <div className={styles.newsSideList}>
              {moreVesti.map((vest) => (
                <Link key={vest.id} href={`/aktuelnosti/${vest.slug}`} className={styles.newsSideItem}>
                  <div className={styles.newsSideImg}>
                    <Image
                      src={vest.image}
                      alt={vest.title}
                      fill
                      sizes="120px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className={styles.newsSideInfo}>
                    <span className={styles.newsSideDate}>
                      <i className="fas fa-calendar-alt" aria-hidden /> {vest.date}
                    </span>
                    <h4>{vest.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ===== Hero: Latest video + announcements ===== */}
      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.heroGrid}>
            {/* Featured video */}
            <div className={styles.heroVideo}>
              <Link href={`/aktuelnosti/gostovanja/${latestVideo.slug}`} className={styles.videoCard}>
                <div className={styles.videoThumb}>
                  <img
                    src={`https://img.youtube.com/vi/${latestVideo.youtubeId}/hqdefault.jpg`}
                    alt=""
                    className={styles.videoImg}
                  />
                  <div className={styles.videoOverlay}>
                    <div className={styles.playIcon}>
                      <i className="fas fa-play" aria-hidden />
                    </div>
                  </div>
                  <div className={styles.videoBadge}>
                    <i className="fas fa-video" aria-hidden /> НОВО ГОСТОВАЊЕ
                  </div>
                </div>
                <div className={styles.videoInfo}>
                  <div className={styles.videoMeta}>
                    <span className={styles.videoSource}>{latestVideo.source}</span>
                    <span className={styles.videoDivider}>·</span>
                    <span>{latestVideo.date}</span>
                  </div>
                  <h2>{latestVideo.title}</h2>
                  <p>{latestVideo.description}</p>
                </div>
              </Link>
            </div>

            {/* Announcements sidebar */}
            <div className={styles.heroSidebar}>
              <div className={styles.sidebarHeader}>
                <h3><i className="fas fa-bullhorn" aria-hidden /> Обавештења</h3>
                <Link href="/aktuelnosti/obavestenja" className={styles.seeAll}>
                  Сва <i className="fas fa-arrow-right" aria-hidden />
                </Link>
              </div>
              <div className={styles.announcementsList}>
                {obavestenja.map((item) => (
                  <div key={item.id} className={styles.announcementItem}>
                    <span className={styles.announcementDate}>{item.date}</span>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ===== More videos row ===== */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.sectionHeader}>
            <Heading variant="h2" text="Гостовања у медијима" />
            <Link href="/aktuelnosti/gostovanja" className={styles.seeAllBtn}>
              Сва гостовања <i className="fas fa-arrow-right" aria-hidden />
            </Link>
          </div>
          <div className={styles.videosRow}>
            {moreVideos.map((v) => (
              <Link key={v.id} href={`/aktuelnosti/gostovanja/${v.slug}`} className={styles.miniVideoCard}>
                <div className={styles.miniThumb}>
                  <img
                    src={`https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`}
                    alt=""
                    className={styles.videoImg}
                  />
                  <div className={styles.miniPlayOverlay}>
                    <div className={styles.miniPlayIcon}>
                      <i className="fas fa-play" aria-hidden />
                    </div>
                  </div>
                </div>
                <div className={styles.miniInfo}>
                  <span className={styles.miniMeta}>{v.source} · {v.date}</span>
                  <h4>{v.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* ===== Jobs + Links row ===== */}
      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.bottomGrid}>
            <div className={styles.jobsCard}>
              <div className={styles.sidebarHeader}>
                <h3><i className="fas fa-briefcase" aria-hidden /> Огласи и конкурси</h3>
                <Link href="/aktuelnosti/oglasi-konkursi" className={styles.seeAll}>
                  Сви <i className="fas fa-arrow-right" aria-hidden />
                </Link>
              </div>
              <div className={styles.jobsList}>
                {oglasi.map((item) => (
                  <div key={item.id} className={styles.jobItem}>
                    <div className={styles.jobTop}>
                      <span className={`${styles.jobBadge} ${item.active ? styles.jobActive : styles.jobClosed}`}>
                        {item.active ? "Активан" : "Затворен"}
                      </span>
                      <span className={styles.jobType}>{item.type}</span>
                    </div>
                    <h4>{item.title}</h4>
                    <span className={styles.jobDate}>{item.date}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.quickLinks}>
              <Link href="/aktuelnosti/casopis-dedinje" className={styles.quickLink}>
                <div className={styles.quickIcon}>
                  <i className="fas fa-newspaper" aria-hidden />
                </div>
                <div className={styles.quickText}>
                  <h4>Часопис Дедиње</h4>
                  <p>Стручни часопис са научним и клиничким радовима</p>
                </div>
                <i className="fas fa-chevron-right" aria-hidden />
              </Link>
              <Link href="/aktuelnosti/informator" className={styles.quickLink}>
                <div className={styles.quickIcon}>
                  <i className="fas fa-file-alt" aria-hidden />
                </div>
                <div className={styles.quickText}>
                  <h4>Информатор о раду</h4>
                  <p>Информације о раду Института у складу са Законом</p>
                </div>
                <i className="fas fa-chevron-right" aria-hidden />
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
