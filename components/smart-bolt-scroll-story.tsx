"use client";

import Image from "next/image";
import { Activity, BellRing, Cpu, RadioTower } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SmartBoltScene, type SmartBoltStageIndex } from "@/components/smart-bolt-motion";

const chapters = [
  {
    overline: "SAHADA",
    title: "Görünmeyen değişim başlar.",
    detail: "Darbe, titreşim ve çevresel koşullar bağlantının ön yükünü zaman içinde etkileyebilir. Manuel kontrol yalnızca ziyaret anını gösterir.",
    outcome: "Bağlantının iki kontrol arasındaki davranışı izlenir.",
    Icon: Activity,
  },
  {
    overline: "BAĞLANTIDA",
    title: "Cıvata bir ölçüm noktasına dönüşür.",
    detail: "Sensör, bağlantı davranışındaki değişimi düşük güç elektroniğinin işleyebileceği ölçüm verisine dönüştürür.",
    outcome: "Değişim, yorumlanabilir bir eğilim olarak kaydedilir.",
    Icon: Cpu,
  },
  {
    overline: "AĞ ÜZERİNDE",
    title: "Veri sahadan merkeze hareket eder.",
    detail: "LoRaWAN, uzak ölçüm noktalarını kablo yükü oluşturmadan merkezi izleme platformuna bağlar.",
    outcome: "Dağınık bağlantılar tek bir dijital akışta buluşur.",
    Icon: RadioTower,
  },
  {
    overline: "BAKIM EKİBİNDE",
    title: "Değişim, anlaşılır bir karara dönüşür.",
    detail: "Platform yalnızca alarm üretmez; geçmiş eğilimi ve öncelikli kontrol noktasını bakım ekibinin önüne getirir.",
    outcome: "Ekip nereye ve neden bakacağını önceden bilir.",
    Icon: BellRing,
  },
] as const;

export function SmartBoltScrollStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const chapterRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeStage, setActiveStage] = useState<SmartBoltStageIndex>(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => {
      setReducedMotion(media.matches);
    };
    syncPreference();
    media.addEventListener("change", syncPreference);
    return () => media.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.chapter) as SmartBoltStageIndex;
        setActiveStage(index);
      },
      { rootMargin: "-30% 0px -30% 0px", threshold: [0, 0.25, 0.55, 0.85] },
    );
    chapterRefs.current.forEach((chapter) => chapter && observer.observe(chapter));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / distance));
      section.style.setProperty("--story-progress", String(progress));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };
    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  const activeChapter = chapters[activeStage];

  return (
    <section ref={sectionRef} id="sistem" className={`sb-scroll-story ${reducedMotion ? "is-reduced" : ""}`}>
      <div className="page-shell sb-scroll-intro">
        <span className="sb-index">01 / BAĞLANTIDAN KARARA</span>
        <h2>Tek bağlantı.<br />Dört görünür an.</h2>
        <p>Sayfa boyunca yeni kutular açmak yerine aynı bağlantıyı izleyin; sahadaki küçük değişimin nasıl bakım kararına dönüştüğünü görün.</p>
      </div>

      <div className="page-shell sb-scroll-layout">
        <div className="sb-scroll-visual-column">
          <div className="sb-scroll-sticky">
            <div className="sb-scroll-image">
              <Image className="sb-scroll-environment" src="/images/graded/smart-bolt-rail-hero.webp" alt="Ray bağlantısındaki Akıllı Civata uygulaması" fill sizes="(max-width: 900px) 100vw, 64vw" />
              <div className="sb-scroll-shade" aria-hidden="true" />
            </div>
            <div className="sb-scroll-visual-top"><span><i /> SAHA / SB—024</span><span>CANLI HİKÂYE</span></div>
            <SmartBoltScene stage={activeStage} showCaption={false} className="sb-scroll-product-scene" />
            <div className="sb-scroll-stage-copy">
              <span>0{activeStage + 1} / 04 · {activeChapter.overline}</span>
              <strong>{activeChapter.title}</strong>
            </div>
            <div className="sb-scroll-progress" aria-hidden="true"><i /></div>
          </div>
        </div>

        <div className="sb-scroll-chapters">
          {chapters.map(({ overline, title, detail, outcome, Icon }, index) => (
            <article
              ref={(node) => { chapterRefs.current[index] = node; }}
              data-chapter={index}
              className={activeStage === index ? "is-active" : ""}
              aria-current={activeStage === index ? "step" : undefined}
              key={title}
            >
              <div><span>0{index + 1}</span><Icon aria-hidden="true" /></div>
              <small>{overline}</small>
              <h3>{title}</h3>
              <p>{detail}</p>
              <strong><i /> {outcome}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
