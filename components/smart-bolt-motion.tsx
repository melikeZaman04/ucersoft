"use client";

import Image from "next/image";
import { Activity, BellRing, Pause, Play, RadioTower, ScanLine } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type SmartBoltStageIndex = 0 | 1 | 2 | 3;

export const smartBoltStages = [
  { short: "Algıla", title: "Bağlantı davranışı ölçülür", detail: "Sensör, ön yükteki değişimi izler.", Icon: ScanLine },
  { short: "İşle", title: "Ölçüm anlamlı veriye dönüşür", detail: "Düşük güç elektroniği sinyali işler.", Icon: Activity },
  { short: "İlet", title: "Veri sahadan kablosuz çıkar", detail: "LoRaWAN uzak noktaları merkeze bağlar.", Icon: RadioTower },
  { short: "Uyar", title: "Değişim bakım kararına dönüşür", detail: "Platform, öncelikli bağlantıyı görünür kılar.", Icon: BellRing },
] as const;

type SmartBoltSceneProps = {
  stage: SmartBoltStageIndex;
  showCaption?: boolean;
  className?: string;
  priority?: boolean;
};

export function SmartBoltScene({ stage, showCaption = true, className = "", priority = false }: SmartBoltSceneProps) {
  const current = smartBoltStages[stage];

  return (
    <div className={`sb-scene sb-motion-stage-${stage} ${className}`}>
      <div className="sb-motion-stage">
        <div className="sb-motion-grid" aria-hidden="true" />
        <div className="sb-motion-track" aria-hidden="true"><i /><i /><i /></div>
        <div className="sb-motion-product">
          <span className="sb-motion-contact" aria-hidden="true" />
          <span className="sb-motion-halo" aria-hidden="true" />
          <span className="sb-motion-pulse sb-motion-pulse-a" aria-hidden="true" />
          <span className="sb-motion-pulse sb-motion-pulse-b" aria-hidden="true" />
          <Image
            src="/images/graded/smart-bolt-motion-cutout.webp"
            alt="Sensör kapsülü entegre edilmiş temsili akıllı ray bağlantı civatası"
            width={1536}
            height={1024}
            priority={priority}
            sizes="(max-width: 900px) 94vw, 58vw"
          />
          <span className="sb-motion-scan" aria-hidden="true" />
          <span className="sb-motion-anchor" aria-hidden="true"><i /></span>
        </div>
        <div className="sb-motion-wave" aria-hidden="true">
          <svg viewBox="0 0 360 100" preserveAspectRatio="none"><path d="M0 58 C24 58 29 57 46 58 S68 60 84 58 S101 23 118 58 S140 74 156 58 S177 52 194 58 S217 60 234 58 S257 28 274 58 S304 64 322 58 S342 58 360 58" /></svg>
          <span>Δ ÖN YÜK</span>
        </div>
        <div className="sb-motion-signal" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        <div className="sb-motion-gateway" aria-hidden="true"><RadioTower /><span>LORAWAN</span><strong>VERİ ALINDI</strong></div>
        <div className="sb-motion-alert" aria-hidden="true"><div><BellRing /><span>ÖNCELİKLİ KONTROL</span></div><strong>SB—024</strong><p>Ön yük eğiliminde değişim</p><i><span /></i></div>
        {showCaption && (
          <div className="sb-motion-caption" aria-atomic="true"><span>0{stage + 1} / 04</span><div><strong>{current.title}</strong><p>{current.detail}</p></div></div>
        )}
      </div>
    </div>
  );
}

export function SmartBoltMotion() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<SmartBoltStageIndex>(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [visible, setVisible] = useState(true);
  const [compact, setCompact] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => {
      setReducedMotion(media.matches);
      if (media.matches) setStage(3);
    };
    syncPreference();
    media.addEventListener("change", syncPreference);
    return () => media.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 640px)");
    const syncViewport = () => setCompact(media.matches);
    syncViewport();
    media.addEventListener("change", syncViewport);
    return () => media.removeEventListener("change", syncViewport);
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.08 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion || !visible || paused) return;
    if (compact && stage === smartBoltStages.length - 1) {
      const stopTimer = window.setTimeout(() => setPaused(true), 1100);
      return () => window.clearTimeout(stopTimer);
    }
    const timer = window.setTimeout(() => {
      setStage((current) => ((current + 1) % smartBoltStages.length) as SmartBoltStageIndex);
    }, compact ? 1100 : 2000);
    return () => window.clearTimeout(timer);
  }, [compact, paused, reducedMotion, stage, visible]);

  const selectStage = (nextStage: SmartBoltStageIndex) => {
    setStage(nextStage);
    setPaused(true);
  };

  const togglePlayback = () => {
    if (paused && stage === smartBoltStages.length - 1) setStage(0);
    setPaused((current) => !current);
  };

  return (
    <div ref={rootRef} className={`sb-motion ${paused ? "is-paused" : ""} ${reducedMotion ? "is-reduced" : ""}`} aria-label="Akıllı Civata ölçümden erken uyarıya çalışma döngüsü">
      <div className="sb-motion-topline">
        <span><i /> CANLI ÖLÇÜM DÖNGÜSÜ</span>
        <div>
          <span>SB—024 · 04 AŞAMA</span>
          <button type="button" className="sb-motion-toggle" onClick={togglePlayback} disabled={reducedMotion} aria-label={paused ? "Ürün animasyonunu yeniden oynat" : "Ürün animasyonunu durdur"}>
            {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
            <span>{reducedMotion ? "HAREKET AZALTILDI" : paused ? "YENİDEN OYNAT" : "DURDUR"}</span>
          </button>
        </div>
      </div>
      <SmartBoltScene stage={stage} priority />
      <div className="sb-motion-controls" aria-label="Animasyon aşamaları">
        {smartBoltStages.map(({ short, Icon }, index) => (
          <button type="button" className={stage === index ? "is-active" : ""} aria-pressed={stage === index} onClick={() => selectStage(index as SmartBoltStageIndex)} key={short}>
            <span>0{index + 1}</span><Icon aria-hidden="true" />{short}
          </button>
        ))}
      </div>
    </div>
  );
}
