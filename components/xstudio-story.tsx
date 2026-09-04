"use client";

import Image from "next/image";
import { Check, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { setMotionOff } from "@/lib/motion";
import { useMediaQuery, useMotionOff } from "@/lib/use-motion";

/* Adımlar XStudio'daki düğüm zincirinin karşılığıdır: her adım bir düğüm,
   her düğümün tipli bir çıkışı var ve akış sırayla yürütülüyor. */
const steps = [
  {
    eyebrow: "Görüntüleme",
    title: "Parça kararlı bir görüntüye dönüşür.",
    description: "Kamera ve aydınlatma, kontrol edilecek yüzeyi her çevrimde aynı koşullarda görüntüler. Tekrarlanabilir görüntü, güvenilir kontrolün ön şartıdır.",
  },
  {
    eyebrow: "Kontrol alanı",
    title: "Bakılacak bölge parça üzerinde tanımlanır.",
    description: "İncelenecek alan görüntü üzerinde işaretlenir. Operatör, sistemin nereye ve neden baktığını ekranda doğrudan görür.",
  },
  {
    eyebrow: "Ölçüm",
    title: "Ölçüm, üretim kuralıyla karşılaştırılır.",
    description: "Seçilen yöntem görüntüyü işler; bulunan değer tanımlı toleransla karşılaştırılır. Akış mühendis için izlenebilir kalır.",
  },
  {
    eyebrow: "Üretim kararı",
    title: "Sonuç ekranda ve hatta görünür.",
    description: "Uygun ya da uygun değil kararı operatöre yalın biçimde gösterilir; saha entegrasyonu kapsamında PLC'ye veya üretim sistemine aktarılabilir.",
  },
];

/* Sahnenin altındaki ray, akışın kendisidir. Son düğüm kararı hatta taşır,
   bu yüzden dördüncü adımda birlikte tamamlanır. */
const nodes = [
  { label: "Görüntü Al", port: "frame" },
  { label: "Kontrol Alanı", port: "output" },
  { label: "Ölçüm", port: "outDistance" },
  { label: "Tolerans", port: "outPass" },
  { label: "Hat Sonucu", port: "PLC" },
];

const CYCLE_MS = [6, 13, 28, 36];
const MEASURE = 24.82;
const AUTO_MS = 2800;
const MANUAL_HOLD_MS = 9000;

const format = (value: number) => value.toFixed(2).replace(".", ",");

type Mode = "scroll" | "auto" | "static";

export function XStudioStory() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<Array<HTMLElement | null>>([]);
  const counted = useRef(false);
  const [active, setActive] = useState(0);
  const [manual, setManual] = useState(false);
  const motionOff = useMotionOff();
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const compact = useMediaQuery("(max-width: 999px)");
  const [inView, setInView] = useState(false);
  const [measure, setMeasure] = useState("0,00");

  const isStatic = motionOff || reducedMotion;
  const mode: Mode = isStatic ? "static" : compact ? "auto" : "scroll";

  /* Masaüstü: adımlar kaydırıldıkça akış ilerler. */
  useEffect(() => {
    if (mode !== "scroll") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(Number((visible.target as HTMLElement).dataset.index));
      },
      { rootMargin: "-30% 0px -42%", threshold: [0.2, 0.5, 0.8] },
    );
    stepRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, [mode]);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  /* Tablet ve küçük pencere: akış kendiliğinden ilerler, seçim yapılınca bekler. */
  useEffect(() => {
    if (mode !== "auto" || !inView) return;
    if (manual) {
      const resume = window.setTimeout(() => setManual(false), MANUAL_HOLD_MS);
      return () => window.clearTimeout(resume);
    }
    const timer = window.setTimeout(() => setActive((current) => (current + 1) % steps.length), AUTO_MS);
    return () => window.clearTimeout(timer);
  }, [mode, inView, manual, active]);

  const phase = isStatic ? steps.length - 1 : active;

  /* Ölçüm değeri, ölçüm adımına girildiğinde bir kez sayılır. */
  useEffect(() => {
    if (phase < 2 || isStatic) {
      counted.current = false;
      return;
    }
    if (counted.current) return;
    counted.current = true;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 760);
      const eased = 1 - Math.pow(1 - t, 3);
      setMeasure(format(MEASURE * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [phase, isStatic]);

  const shownMeasure = phase < 2 ? "0,00" : isStatic ? format(MEASURE) : measure;
  const current = steps[phase];

  return (
    <div ref={rootRef} className={`xs-story xs-mode-${mode}`}>
      <ol className="xs-story-steps">
        {steps.map((step, index) => (
          <li
            key={step.eyebrow}
            ref={(node) => { stepRefs.current[index] = node; }}
            data-index={index}
            className={`xs-story-step ${phase === index ? "is-active" : ""} ${index < phase ? "is-done" : ""}`}
          >
            <span>{String(index + 1).padStart(2, "0")} · {step.eyebrow}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>

      <div className="xs-story-visual">
        <div className="xs-story-topline">
          <span>Kontrol çevrimi</span>
          <span className="xs-cycle" aria-hidden="true">Çevrim <b>{CYCLE_MS[phase]} ms</b></span>
          <button
            type="button"
            className="xs-story-toggle"
            onClick={() => setMotionOff(!motionOff)}
            aria-pressed={isStatic}
            disabled={reducedMotion}
          >
            {isStatic ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
            {reducedMotion ? "Hareket azaltıldı" : isStatic ? "Hareketi oynat" : "Hareketi durdur"}
          </button>
        </div>

        <figure className={`xs-story-frame xs-phase-${phase}`} aria-live="polite" aria-label={`Kontrol çevrimi: ${current.title}`}>
          <div className="xs-story-zoom">
            <Image
              src="/images/graded/xstudio-workflow.webp"
              alt="Konveyördeki işlenmiş alüminyum parçayı halka ışıklı kamerayla inceleyen endüstriyel kontrol istasyonu"
              fill
              sizes="(max-width: 999px) calc(100vw - 32px), 760px"
              className="xs-story-image"
            />
            <span className="xs-ov xs-ov-flash" aria-hidden="true" />
            <span className="xs-ov xs-ov-roi" aria-hidden="true">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
                <rect x="1.5" y="1.5" width="97" height="97" pathLength={100} />
              </svg>
              <b>Kontrol alanı</b>
            </span>
            <span className="xs-ov xs-ov-measure" aria-hidden="true"><i /><b>{shownMeasure} mm</b></span>
          </div>

          <span className="xs-ov xs-ov-result" aria-hidden="true">
            <Check /><small>Kontrol sonucu</small><strong>Uygun</strong>
          </span>
          <span className="xs-ov xs-ov-plc" aria-hidden="true"><i /><b>PLC · sinyal gönderildi</b></span>

          <figcaption className="xs-story-phase">
            <b>{isStatic ? "Tüm adımlar" : `${String(phase + 1).padStart(2, "0")} · ${current.eyebrow}`}</b>
          </figcaption>
        </figure>

        <ol className="xs-nodes" aria-hidden="true" style={{ "--node-pos": phase } as React.CSSProperties}>
          <span className="xs-nodes-cursor" />
          {nodes.map((node, index) => (
            <li
              key={node.label}
              className={`xs-node ${index === phase ? "is-active" : ""} ${index < phase || (phase === 3 && index === 4) ? "is-done" : ""}`}
            >
              <b>{node.label}</b>
              <small>{node.port}</small>
            </li>
          ))}
        </ol>

        <div className="xs-story-tabs" aria-label="Kontrol çevrimi adımları">
          {steps.map((step, index) => (
            <button
              type="button"
              key={step.eyebrow}
              className={phase === index ? "is-active" : ""}
              aria-pressed={phase === index}
              onClick={() => { setActive(index); setManual(true); }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>{step.eyebrow}
            </button>
          ))}
        </div>
        <div className="xs-story-current" aria-live="polite">
          <h3>{steps[active].title}</h3>
          <p>{steps[active].description}</p>
        </div>
        <p className="xs-story-note">Temsili kontrol sahnesi. Akış XStudio&apos;daki düğüm zincirinin karşılığıdır; değerler örnektir.</p>
      </div>
    </div>
  );
}
