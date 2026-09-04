"use client";

import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  Crosshair,
  Gauge,
  Pause,
  Play,
  RotateCcw,
  ScanLine,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    label: "Kamera",
    short: "Görüntü alındı",
    detail: "Kontrol edilecek parça görüntüsü çalışma alanına aktarıldı.",
    Icon: Camera,
  },
  {
    label: "İnceleme alanı",
    short: "Kontrol bölgesi seçildi",
    detail: "Parçanın değerlendirilecek bölgesi görünür şekilde tanımlandı.",
    Icon: Crosshair,
  },
  {
    label: "Ölçüm",
    short: "Kontrol uygulanıyor",
    detail: "Seçilen yöntem, tanımlanan bölge üzerinde çalıştırılıyor.",
    Icon: Gauge,
  },
  {
    label: "Sonuç",
    short: "Üretim kararı hazır",
    detail: "Örnek akış tamamlandı ve operatör için anlaşılır sonuç oluşturuldu.",
    Icon: Check,
  },
];

const metrics = [
  ["Kamera", "Bağlı", 0],
  ["Görüntü", "Canlı", 0],
  ["Kontrol alanı", "Seçildi", 1],
  ["İşlem", "Uygulandı", 2],
  ["Değerlendirme", "Tamamlandı", 2],
  ["Sonuç", "Uygun", 3],
];

export function UcersoftPreview() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const hasEntered = useRef(false);
  const ActiveIcon = steps[active].Icon;

  useEffect(() => {
    const element = previewRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && !hasEntered.current) {
          hasEntered.current = true;
          setActive(0);
          setPlaying(true);
        }
      },
      { threshold: 0.24 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || !inView) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % steps.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [inView, playing]);

  const selectStep = (index: number) => {
    setActive(index);
    setPlaying(false);
  };

  const move = (direction: number) => {
    setActive((current) => (current + direction + steps.length) % steps.length);
    setPlaying(false);
  };

  return (
    <div
      ref={previewRef}
      className={`preview-app preview-state-${active} ${playing ? "is-playing" : "is-paused"} ${inView ? "is-in-view" : "is-idle"}`}
    >
      <div className="preview-workbench">
        <aside className="preview-steps" aria-label="Önizleme adımları">
          <header>
            <span>AKIŞ</span>
            <strong>01—04</strong>
          </header>
          <div className="preview-step-list">
            {steps.map(({ label, Icon }, index) => (
              <button
                type="button"
                key={label}
                className={active === index ? "is-active" : ""}
                onClick={() => selectStep(index)}
                aria-current={active === index ? "step" : undefined}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <Icon aria-hidden="true" />
                <strong>{label}</strong>
                <i aria-hidden="true" />
              </button>
            ))}
          </div>
          <div className="preview-mode">
            <span>MOD</span>
            <strong>{playing ? "OTOMATİK" : "MANUEL"}</strong>
          </div>
        </aside>

        <section className="preview-stage-panel" aria-label="XStudio çalışma önizlemesi">
          <header className="preview-stage-header">
            <div><span>GÖRSEL AKIŞ</span><strong>KONTROL / ÖRNEK</strong></div>
            <div><i /><span>KAMERA</span><strong>BAĞLI</strong></div>
          </header>

          <div className="preview-stage">
            <Image
              src="/images/xstudio-workflow-original-2026.png"
              alt="Endüstriyel kamera altında incelenen metal parça"
              fill
              sizes="(max-width: 820px) 100vw, 62vw"
              priority
            />
            <div className="preview-stage-shade" aria-hidden="true" />
            <div className="preview-stage-grid" aria-hidden="true" />
            <div className="preview-camera-pulse" aria-hidden="true" />
            <div className="preview-scan-line" aria-hidden="true" />
            <div className="preview-roi" aria-hidden="true"><span>KONTROL ALANI</span><i /><i /><i /><i /></div>
            <div className="preview-measure" aria-hidden="true"><span /><span /><strong>ÖLÇÜM AKTİF</strong></div>
            <div className="preview-result" aria-hidden="true"><Check /><span>UYGUN</span><small>ÖRNEK SONUÇ</small></div>

            <div className="preview-flow" aria-hidden="true">
              {steps.map(({ label, Icon }, index) => (
                <div key={label} className={index <= active ? "is-complete" : ""}>
                  <Icon />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <div className="preview-stage-caption" aria-live="polite">
              <span>{String(active + 1).padStart(2, "0")} / 04</span>
              <div><strong>{steps[active].short}</strong><p>{steps[active].detail}</p></div>
            </div>
          </div>

          <footer className="preview-controls" aria-label="Önizleme kontrolleri">
            <button type="button" onClick={() => move(-1)} aria-label="Önceki adım" title="Önceki adım"><ArrowLeft aria-hidden="true" /></button>
            <button
              type="button"
              className="preview-play"
              onClick={() => setPlaying((current) => !current)}
              aria-label={playing ? "Otomatik oynatmayı durdur" : "Otomatik oynat"}
              title={playing ? "Durdur" : "Oynat"}
            >
              {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
              <span>{playing ? "Durdur" : "Oynat"}</span>
            </button>
            <button type="button" onClick={() => move(1)} aria-label="Sonraki adım" title="Sonraki adım"><ArrowRight aria-hidden="true" /></button>
            <button type="button" onClick={() => { setActive(0); setPlaying(true); }} aria-label="Akışı yeniden başlat" title="Yeniden başlat"><RotateCcw aria-hidden="true" /></button>
            <div className="preview-progress" aria-hidden="true"><span key={active} /></div>
          </footer>
        </section>

        <aside className="preview-inspector">
          <header><span>SONUÇ PANELİ</span><strong>CANLI</strong></header>
          <div className="preview-inspector-state" aria-live="polite">
            <span>{String(active + 1).padStart(2, "0")}</span>
            <ActiveIcon aria-hidden="true" />
            <div><small>AKTİF ADIM</small><strong>{steps[active].label}</strong></div>
          </div>
          <dl>
            {metrics.map(([label, value, readyAt]) => (
              <div key={String(label)} className={active >= Number(readyAt) ? "is-ready" : ""}>
                <dt>{label}</dt><dd>{value}</dd>
              </div>
            ))}
          </dl>
          <div className="preview-inspector-note">
            <ScanLine aria-hidden="true" />
            <p>Bu ekran, XStudio çalışma prensibini açıklamak için hazırlanmış etkileşimli bir görselleştirmedir.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
