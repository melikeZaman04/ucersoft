import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Activity, ArrowDown, ArrowLeft, ArrowUpRight, BatteryCharging, BellRing, Check,
  ChevronRight, Cloud, Cpu, Mail, Nut, RadioTower, ShieldCheck, Smartphone,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { SmartBoltMotion } from "@/components/smart-bolt-motion";
import { SmartBoltScrollStory } from "@/components/smart-bolt-scroll-story";

export const metadata: Metadata = {
  title: "Akıllı Civata | Kablosuz Ray Bağlantı İzleme | Üçersoft",
  description: "Ray bağlantılarındaki ön yük değişimini izleyen, sahadan kablosuz veri taşıyan ve bakım ekiplerine erken uyarı sunan Akıllı Civata bağlantı izleme sistemini keşfedin.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

const hardware = [
  { title: "Ölçüm katmanı", detail: "Cıvata gövdesindeki ön yük değişimini bağlantı sökülmeden yerinde ölçen sensör.", Icon: Activity },
  { title: "Düşük güç mimarisi", detail: "Uzun saha kullanımı için ölçüm, uyku ve iletim döngüsü; pil modülü değiştirilebilir.", Icon: BatteryCharging },
  { title: "Kablosuz haberleşme", detail: "Ölçüm noktasına kablo çekilmesini gereksiz kılan LoRaWAN bağlantısı.", Icon: RadioTower },
  { title: "Koruyucu kapsül", detail: "Elektronik bileşenleri saha koşullarından ayıran servis edilebilir yapı.", Icon: ShieldCheck },
];

const integrations = [
  { scope: "Bağlantı elemanı", detail: "M22–M27 aralığındaki metrik bağlantılar", note: "Bağlantı tipi kurulum öncesi birlikte belirlenir" },
  { scope: "Montaj", detail: "Mevcut ray bağlantısının yerine", note: "Hattın yeniden kurulması gerekmez" },
  { scope: "Ölçüm", detail: "Cıvata gövdesindeki ön yük değişimi", note: "Bağlantı sökülmeden yerinde ölçüm" },
  { scope: "Haberleşme", detail: "LoRaWAN kablosuz bağlantı", note: "Ölçüm noktasına kablo çekilmez" },
  { scope: "Ağ geçidi", detail: "Sahadaki LoRaWAN ağ geçidi üzerinden merkez", note: "Kapsama kurulumda yerinde doğrulanır" },
  { scope: "Enerji", detail: "Servis edilebilir, değiştirilebilir pil modülü", note: "Ölçüm sıklığına göre planlanır" },
  { scope: "Erişim", detail: "Web ve mobil arayüzden izleme platformu", note: "Bağlantı bazında durum ve geçmiş eğilim" },
];

const platformFeatures = ["Bağlantı bazında güncel durum", "Ön yük değişimi ve geçmiş eğilim", "Eşik ve anomali uyarıları", "Bakım sırası için karar desteği"];

export default function SmartBoltPage() {
  return (
    <>
      <a className="skip-link" href="#akilli-civata-icerik">İçeriğe geç</a>
      <SiteHeader />
      <main id="akilli-civata-icerik" className="sb-page">
        <section className="sb-hero">
          <Image className="sb-hero-environment" src="/images/graded/smart-bolt-rail-environment.webp" alt="Mavi saat ışığında uzanan demiryolu hattı" fill priority sizes="100vw" />
          <div className="sb-hero-environment-shade" aria-hidden="true" />
          <div className="sb-hero-orbit" aria-hidden="true" />
          <div className="page-shell sb-hero-shell">
            <div className="sb-hero-copy">
              <Link className="sb-back-link" href="/#urunler"><ArrowLeft aria-hidden="true" /> Ürünlere dön</Link>
              <p className="sb-eyebrow"><i /> AKILLI CİVATA · KABLOSUZ BAĞLANTI İZLEME</p>
              <h1>Bağlantıdaki değişim, <span>görünür olsun.</span></h1>
              <p className="sb-hero-lead">Ray bağlantısındaki ön yük değişimini izleyen, veriyi kablosuz taşıyan ve bakım ekibine anlaşılır erken uyarı sunan bağlantı izleme sistemi.</p>
              <div className="sb-hero-actions">
                <a className="sb-button sb-button-primary" href="#sistem">Sistemi keşfedin <ArrowDown aria-hidden="true" /></a>
                <a className="sb-text-link" href="#teknik-gorusme">Teknik görüşme <ArrowUpRight aria-hidden="true" /></a>
              </div>
            </div>
            <SmartBoltMotion />
          </div>
          <div className="sb-hero-data-rail" aria-hidden="true"><span><Activity /> ÖN YÜK İZLEME</span><span><RadioTower /> KABLOSUZ VERİ</span><span><BellRing /> ERKEN UYARI</span></div>
          <a className="sb-scroll-cue" href="#sistem" aria-label="Sonraki bölüme geç"><span>HİKÂYEYİ İZLE</span><i /></a>
        </section>

        <SmartBoltScrollStory />

        <section id="donanim" className="sb-anatomy">
          <div className="page-shell sb-anatomy-layout">
            <Reveal className="sb-anatomy-copy">
              <span className="sb-index">02 / ÜRÜN MİMARİSİ</span><h2>Sahaya uygun, modüler bir ölçüm noktası.</h2>
              <p>Mekanik bağlantı, sensör, düşük güç elektroniği ve haberleşme birimi tek bir servis yaklaşımında ele alınıyor.</p>
              <div className="sb-anatomy-list">
                {hardware.map(({ title, detail, Icon }, index) => (
                  <div className="sb-anatomy-item" key={title}><span>0{index + 1}</span><Icon aria-hidden="true" /><div><h3>{title}</h3><p>{detail}</p></div></div>
                ))}
              </div>
            </Reveal>
            <Reveal className="sb-anatomy-visual" delay={100}>
              <div className="sb-anatomy-frame">
                <div className="sb-anatomy-grid" aria-hidden="true" />
                <Image src="/images/graded/smart-bolt-exploded.webp" alt="Koruyucu kapsül, pil, elektronik kart, sensör ve civatadan oluşan temsili Akıllı Civata ürün mimarisi" width={1448} height={1086} sizes="(max-width: 900px) 100vw, 54vw" />
                <span className="sb-anatomy-label sb-anatomy-label-a">01 · KAPSÜL</span><span className="sb-anatomy-label sb-anatomy-label-b">02 · ELEKTRONİK</span><span className="sb-anatomy-label sb-anatomy-label-c">03 · SENSÖR</span>
              </div>
              <p>Temsili ürün mimarisi — nihai mekanik tasarım değildir.</p>
            </Reveal>
          </div>
        </section>

        <section id="platform" className="sb-platform">
          <div className="page-shell sb-platform-layout">
            <Reveal className="sb-console" delay={60}>
              <div className="sb-console-bar"><span><i /> SAHA İZLEME / DEMO</span><small>SON VERİ · ŞİMDİ</small></div>
              <div className="sb-console-body">
                <aside><span className="is-active"><Activity /> Genel görünüm</span><span><Nut /> Bağlantılar</span><span><BellRing /> Uyarılar <b>1</b></span><span><Cloud /> Veri akışı</span></aside>
                <div className="sb-console-main">
                  <div className="sb-console-title"><div><small>İZLENEN BAĞLANTI</small><strong>SB—024 / Hat 01</strong></div><span><i /> VERİ AKIŞI AKTİF</span></div>
                  <div className="sb-console-summary"><div><small>DURUM</small><strong>Kontrol öneriliyor</strong></div><div><small>DEĞİŞİM</small><strong>↓ İzleniyor</strong></div><div><small>BAĞLANTI</small><strong>LoRaWAN</strong></div></div>
                  <div className="sb-console-chart">
                    <div><span>ÖN YÜK EĞİLİMİ</span><small>Temsili veri</small></div>
                    <svg viewBox="0 0 700 220" role="img" aria-label="Zaman içindeki temsili ön yük eğilimi">
                      <defs><linearGradient id="sb-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4bb4ff" stopOpacity=".32" /><stop offset="1" stopColor="#4bb4ff" stopOpacity="0" /></linearGradient></defs>
                      <path className="sb-console-gridline" d="M0 30H700M0 90H700M0 150H700M0 210H700" /><path className="sb-console-area" d="M0 48 C80 46 110 58 180 60 S280 68 340 82 S440 98 500 116 S590 142 700 158 L700 220H0Z" /><path className="sb-console-line" d="M0 48 C80 46 110 58 180 60 S280 68 340 82 S440 98 500 116 S590 142 700 158" /><circle cx="700" cy="158" r="6" />
                    </svg>
                  </div>
                  <div className="sb-console-alert"><BellRing /><span><small>ÖNERİ</small>SB—024 bağlantısını bir sonraki bakım turuna ekleyin.</span><ChevronRight /></div>
                </div>
              </div>
            </Reveal>
            <Reveal className="sb-platform-copy">
              <span className="sb-index">03 / UZAKTAN İZLEME</span><h2>Alarmdan önce eğilimi görün.</h2>
              <p>Web ve mobil platform, bağlantı durumunu teknik karmaşaya dönüştürmeden bakım ekibinin önüne getirir.</p>
              <ul>{platformFeatures.map((feature) => <li key={feature}><Check aria-hidden="true" />{feature}</li>)}</ul>
              <span className="sb-platform-devices"><Smartphone aria-hidden="true" /> WEB + MOBİL ERİŞİM</span>
            </Reveal>
          </div>
        </section>

        <section id="hedefler" className="sb-targets">
          <div className="page-shell">
            <Reveal className="sb-section-heading sb-section-heading-wide">
              <span className="sb-index">04 / UYUMLULUK VE ENTEGRASYON</span><h2>Sahanızda neye takılır, neyle konuşur?</h2>
              <p>Sistem mevcut bağlantınızın yerine takılır ve sahadaki kablosuz ağ üzerinden merkeze bağlanır. Aşağıdaki tablo, sistemin hattınızda nereye oturduğunu gösterir.</p>
            </Reveal>
            <Reveal className="sb-target-table-wrap">
              <table className="sb-target-table">
                <thead><tr><th>Katman</th><th>Neyle çalışır</th><th>Not</th></tr></thead>
                <tbody>{integrations.map((row) => <tr key={row.scope}><td><strong>{row.scope}</strong></td><td>{row.detail}</td><td>{row.note}</td></tr>)}</tbody>
              </table>
            </Reveal>
            <p className="sb-target-note"><ShieldCheck aria-hidden="true" /> Bağlantı tipi, saha kapsaması ve kurulum planı teknik görüşmede birlikte netleştirilir.</p>
          </div>
        </section>

        <section className="sb-partnership">
          <div className="page-shell">
            <Reveal className="sb-partnership-intro"><span className="sb-index">05 / KURULUM VE DESTEK</span><h2>Kutudan çıkan bir sensör değil, işletilen bir izleme hattı.</h2><p>Sahaya yerleştirmeden merkezi izlemeye kadar olan zincir Üçersoft tarafından kurulur ve desteklenir.</p></Reveal>
            <div className="sb-partner-roles">
              <Reveal className="sb-partner-role"><div><span>SAHADA</span><Nut aria-hidden="true" /></div><h3>Kurulum</h3><p>Bağlantı seçimi, montaj, kalibrasyon ve kablosuz kapsamanın yerinde doğrulanması.</p></Reveal>
              <Reveal className="sb-partner-role sb-partner-role-blue" delay={80}><div><span>MERKEZDE</span><Cpu aria-hidden="true" /></div><h3>İzleme</h3><p>LoRaWAN veri toplama, web ve mobil arayüz, eğilim takibi ve erken uyarı kurgusu.</p></Reveal>
            </div>
          </div>
        </section>

        <section id="teknik-gorusme" className="sb-contact">
          <div className="page-shell sb-contact-layout">
            <Reveal><span className="sb-index">TEKNİK GÖRÜŞME</span><h2>Sahanızdaki kritik bağlantıyı birlikte değerlendirelim.</h2></Reveal>
            <Reveal className="sb-contact-action" delay={70}>
              <p>Bağlantı tipinizi ve izleme ihtiyacınızı paylaşın; uygun pilot ve doğrulama yaklaşımını birlikte planlayalım.</p>
              <a href="mailto:info@ucersoft.com.tr?subject=Akıllı%20Civata%20teknik%20görüşme%20talebi"><Mail aria-hidden="true" /><span><small>BİZE YAZIN</small>info@ucersoft.com.tr</span><ArrowUpRight aria-hidden="true" /></a>
            </Reveal>
          </div>
        </section>
      </main>
      <footer className="sb-footer"><div className="page-shell"><span>© 2026 Üçersoft</span><div><Link href="/#urunler">Ürünler</Link><Link href="/">Ana sayfa</Link><a href="#akilli-civata-icerik">Yukarı dön ↑</a></div></div></footer>
    </>
  );
}
