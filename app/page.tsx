import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { XStudioStory } from "@/components/xstudio-story";

const xstudioFacts = [
  { term: "Kimin için", detail: "Kalite kontrolünü hat üzerine taşımak isteyen üretim ve kalite ekipleri." },
  { term: "Ne kontrol eder", detail: "Ölçü ve tolerans, parça konumu, eksik bileşen ve yüzey farklılıkları." },
  { term: "Nereye bağlanır", detail: "Endüstriyel kamera, aydınlatma, PLC ve tesisin üretim ağı." },
];

const xstudioIntegrations = [
  { title: "Görüntüleme donanımı", detail: "Endüstriyel kamera, objektif ve aydınlatma; kontrol edilecek parçaya göre seçilir." },
  { title: "Hat kontrolü", detail: "Tetikleme, durdurma ve ayırma sinyalleri için hattaki PLC ve saha otomasyonu." },
  { title: "Tesis ağı", detail: "Sonuçların üretim ağı üzerinden kayıt ve raporlama tarafına aktarılması." },
  { title: "Mevcut istasyon", detail: "Konveyör, fikstür ve mevcut istasyon düzeni; hattı yeniden kurmadan konumlandırma." },
];

const useCases = [
  { title: "Ölçü ve tolerans", detail: "Kritik ölçüler tanımlı toleransla karşılaştırılır; sonuç uygun ya da uygun değil olarak kaydedilir." },
  { title: "Eksik veya yanlış parça", detail: "Montajda eksik, fazla ya da yanlış yerleştirilmiş bileşen bir sonraki istasyona geçmeden yakalanır." },
  { title: "Konum ve yön doğrulama", detail: "Parçanın doğru yerde ve doğru yönde olduğu, üretim devam etmeden doğrulanır." },
  { title: "Yüzey farklılıkları", detail: "Kural tabanlı yöntemin yetmediği değişken yüzeylerde AI destekli kontrol değerlendirilir." },
];

const boltFlow = [
  { title: "Bağlantıda", detail: "Sensör, civatadaki ön yük değişimini ölçer; düşük güç elektroniği ölçümü kaydeder." },
  { title: "Ağ üzerinde", detail: "Veri LoRaWAN ile sahadan çıkar. Ölçüm noktasına kablo çekmek gerekmez." },
  { title: "Bakım ekibinde", detail: "Platform eğilimi ve öncelikli kontrol noktasını gösterir; ekip nereye bakacağını önceden bilir." },
];

const boltIntegrations = [
  { scope: "Bağlantı elemanı", detail: "M22–M27 aralığındaki metrik bağlantılar", note: "Bağlantı tipi kurulum öncesi birlikte belirlenir" },
  { scope: "Ölçüm", detail: "Cıvata gövdesindeki ön yük değişimi", note: "Bağlantı sökülmeden yerinde ölçüm" },
  { scope: "Haberleşme", detail: "LoRaWAN kablosuz bağlantı", note: "Ölçüm noktasına kablo çekilmesi gerekmez" },
  { scope: "Ağ geçidi", detail: "Sahadaki LoRaWAN ağ geçidi üzerinden merkez", note: "Kapsama kurulumda yerinde doğrulanır" },
  { scope: "Enerji", detail: "Servis edilebilir, değiştirilebilir pil modülü", note: "Ölçüm sıklığına göre planlanır" },
  { scope: "Erişim", detail: "Web ve mobil arayüzden izleme platformu", note: "Bakım ekibi için bağlantı bazında görünüm" },
];

const evaluationSteps = [
  {
    title: "Problem ve numune",
    you: "Kontrol problemi, örnek parçalar ya da saha fotoğrafları, hat hızı ve tolerans bilgisi sizden gelir.",
    us: "Üçersoft ilk görüşmede uygulanabilirlik görüşünü ve açık soruları paylaşır.",
  },
  {
    title: "Yöntem ve kurulum önerisi",
    you: "Kamera, aydınlatma, kontrol yöntemi ve tesise bağlantı yaklaşımı birlikte belirlenir.",
    us: "Kabul kriterleri kurulumdan önce yazılır; klasik yöntem mi, AI destekli yöntem mi kullanılacağı bu aşamada netleşir.",
  },
  {
    title: "Kurulum ve kabul",
    you: "Kurulum tek hat, tanımlı bir kontrol ve gerçek üretim koşuluyla devreye alınır.",
    us: "Sonuçlar önceden belirlenen kabul kriterlerine göre birlikte değerlendirilir; yaygınlaştırma bu veriyle planlanır.",
  },
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#icerik">İçeriğe geç</a>
      <SiteHeader />

      <main id="icerik" className="home">
        <section id="genel-bakis" className="corporate-hero">
          <div className="page-shell corporate-hero-intro">
            <p>Üçersoft / Endüstriyel teknoloji</p>
            <h1>Sahadaki veriyi,<br /><span>görünür karara</span> dönüştürüyoruz.</h1>
            <div>
              <p>Görüntü işleme ve bağlantı izleme ürünlerini gerçek üretim ihtiyaçları için geliştiriyoruz.</p>
              <a href="#iletisim">Birlikte değerlendirelim <ArrowUpRight aria-hidden="true" /></a>
            </div>
          </div>

          <div id="urunler" className="corporate-product-stage">
            <Link className="corporate-product-panel" href="#xstudio">
              <Image src="/images/xstudio-enterprise-hero-2026.webp" alt="Konveyör üzerindeki alüminyum parçayı halka ışıkla inceleyen endüstriyel kamera" fill priority sizes="(max-width: 900px) 100vw, 50vw" />
              <span className="corporate-product-shade" aria-hidden="true" />
              <div><small>01 / Görüntü işleme</small><h2>XStudio</h2><p>Görüntüden üretim kararına uzanan kontrol platformu.</p><strong>İnceleyin <ArrowDown aria-hidden="true" /></strong></div>
            </Link>
            <Link className="corporate-product-panel" href="#akilli-civata">
              <Image src="/images/graded/smart-bolt-rail-hero.webp" alt="Sensör kapsüllü Akıllı Civata takılmış demiryolu ray bağlantısı" fill priority sizes="(max-width: 900px) 100vw, 50vw" />
              <span className="corporate-product-shade" aria-hidden="true" />
              <div><small>02 / Bağlantı izleme</small><h2>Akıllı Civata</h2><p>Ray bağlantılarındaki değişimi izleyen kablosuz bağlantı izleme ürünü.</p><strong>İnceleyin <ArrowDown aria-hidden="true" /></strong></div>
            </Link>
          </div>
        </section>

        <section id="xstudio" className="hs hs-light">
          <div className="bleed-split">
            <Reveal className="bleed-copy">
              <span className="hs-label">XStudio / Endüstriyel görüntü işleme</span>
              <h2 className="hs-title hs-title-display">XStudio: görüntüden üretim kararına.</h2>
              <p className="hs-lead">Mühendis kontrol akışını kurar: kamera, aydınlatma, ölçüm ve karar adımları aynı çalışma alanında yer alır. Operatör ise akışın iç yapısını değil; parçanın durumunu, sonucu ve gerekiyorsa yapılacak işlemi görür.</p>
              <dl className="xs-facts">
                {xstudioFacts.map((fact) => (
                  <div key={fact.term}><dt>{fact.term}</dt><dd>{fact.detail}</dd></div>
                ))}
              </dl>
              <p className="hs-status"><span>Durum</span><span><b>Geliştirme aşamasında.</b> Pilot kurulum ve uygulanabilirlik değerlendirmesi için görüşmeye açıktır; kurulum ve devreye alma Üçersoft mühendisliği tarafından tesis koşullarına göre yapılır.</span></p>
            </Reveal>
            <Reveal className="bleed-fig" delay={120}>
              <figure className="hs-figure xs-intro-figure xs-editorial-figure">
                <Image src="/images/xstudio-editorial-camera-2026.webp" alt="İşlenmiş metal parçanın yanında konumlandırılmış endüstriyel kamera" fill sizes="(max-width: 999px) 100vw, 60vw" />
                <figcaption className="xs-editorial-label">
                  <span>Görüntüleme sistemi</span>
                  <strong>Kamera · optik · parça</strong>
                </figcaption>
              </figure>
              <p className="hs-figcaption">Temsili ürün sahnesi. Kamera, optik ve aydınlatma seçimi kontrol edilecek parçaya ve saha koşullarına göre yapılır.</p>
            </Reveal>
          </div>

          <div className="page-shell">
            <div id="uygulamalar" className="xs-usecases">
              <Reveal className="hs-head">
                <div>
                  <h2 className="hs-title">Her parça aynı şekilde görünmez.</h2>
                </div>
                <p className="hs-lead">Yüzey, tolerans ve hat hızı; kullanılacak kamera, ışık ve kontrol yöntemini birlikte belirler. XStudio bu seçimleri tek bir kontrol akışında bir araya getirir.</p>
              </Reveal>
              <ul className="xs-usecase-grid">
                {useCases.map((useCase, index) => (
                  <li key={useCase.title}>
                    <Reveal className="xs-usecase-item" delay={index * 90}><h3>{useCase.title}</h3><p>{useCase.detail}</p></Reveal>
                  </li>
                ))}
              </ul>

              <Reveal className="hs-head xs-integration-head">
                <div>
                  <span className="hs-label">Hattaki yeri</span>
                  <h2 className="hs-title">Mevcut hattınızın üzerine oturur.</h2>
                </div>
                <p className="hs-lead">Yeni bir hat kurmanız gerekmez. XStudio, tesiste hâlihazırda bulunan donanım ve otomasyon katmanlarıyla birlikte çalışacak şekilde konumlandırılır.</p>
              </Reveal>
              <ul className="xs-usecase-grid">
                {xstudioIntegrations.map((item, index) => (
                  <li key={item.title}>
                    <Reveal className="xs-usecase-item" delay={index * 90}><h3>{item.title}</h3><p>{item.detail}</p></Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="nasil-calisir" className="hs hs-dark">
          <div className="page-shell">
            <Reveal className="hs-head">
              <div>
                <span className="hs-label">Üretimde kullanım</span>
                <h2 className="hs-title">Kameradan üretim kararına, dört adımda.</h2>
              </div>
              <p className="hs-lead">Aşağıdaki sahne bir kontrol çevriminin nasıl ilerlediğini gösterir. Kaydırdıkça her adımın hat üzerinde neye karşılık geldiğini görürsünüz.</p>
            </Reveal>
            <XStudioStory />
          </div>
        </section>

        <section id="akilli-civata" className="hs hs-dark">
          <div className="bleed-split is-reverse">
            <Reveal className="bleed-copy">
              <span className="hs-label">Akıllı Civata / Bağlantı izleme</span>
              <h2 className="hs-title hs-title-display">Bakım turundan önce nereye bakacağınızı bilin.</h2>
              <p className="hs-lead">Ray bağlantılarındaki civatalar titreşim ve darbe yükü altında zamanla gevşeyebilir; manuel kontrol yalnızca ziyaret anını gösterir. Akıllı Civata, bağlantıdaki ön yük değişimini yerinde ölçer ve bakım ekibinin önüne öncelik sırasıyla getirir.</p>
              <p className="hs-status is-ready"><span>Durum</span><span><b>Siparişe hazır.</b> Kurulum, kalibrasyon ve merkezi izleme platformu Üçersoft tarafından sağlanır.</span></p>
              <div className="hb-actions">
                <a className="hs-button hs-button-dark" href="mailto:info@ucersoft.com.tr?subject=Akıllı%20Civata%20teknik%20görüşme%20talebi">Teknik görüşme <ArrowUpRight aria-hidden="true" /></a>
              </div>
            </Reveal>
            <Reveal className="bleed-fig" delay={120}>
              <figure className="hs-figure hb-intro-figure hb-assemble">
                <Image src="/images/graded/smart-bolt-exploded.webp" alt="Koruyucu kapsül, pil, elektronik kart, sensör ve civatadan oluşan temsili Akıllı Civata ürün mimarisi" fill sizes="(max-width: 999px) 100vw, 60vw" className="hb-assemble-base" />
                <Image src="/images/graded/smart-bolt-exploded.webp" alt="" aria-hidden="true" fill sizes="(max-width: 999px) 100vw, 60vw" className="hb-assemble-top" />
                <span className="hb-assemble-tag" aria-hidden="true">Kapsül · pil · elektronik · sensör</span>
              </figure>
              <p className="hs-figcaption">Temsili ürün mimarisi; nihai mekanik tasarım değildir.</p>
            </Reveal>
          </div>
        </section>

        <section id="baglanti-izleme" className="hb-field">
          <figure className="hb-field-figure is-parallax">
            <Image src="/images/smart-bolt-maintenance-editorial-2026.webp" alt="Ray bağlantısına monte edilmiş sensör kapsüllü Akıllı Civata ve yanında el tipi ölçüm cihazı" fill sizes="100vw" />
            <figcaption><div className="page-shell"><span className="hs-label">Bağlantı izleme / LoRaWAN</span><strong>Kablo çekilemeyen noktadan merkeze.</strong></div></figcaption>
          </figure>
          <div className="page-shell hb-field-body">
            <Reveal className="hs-head">
              <div>
                <h2 className="hs-title">Dağınık bağlantılar, tek bir bakım görünümünde.</h2>
              </div>
              <p className="hs-lead">LoRaWAN, uzak ölçüm noktalarını düşük güçle merkezi izleme platformuna bağlar. Kapsama ve bağlantı güvenilirliği saha koşullarına bağlıdır; kurulumda yerinde doğrulanır.</p>
            </Reveal>
            <Reveal className="hb-path" delay={200}>
              <span className="hb-path-node" aria-hidden="true" /><span className="hb-path-node" aria-hidden="true" /><span className="hb-path-node" aria-hidden="true" />
              <span className="hb-path-arcs" aria-hidden="true"><i /><i /><i /></span>
              <i className="hb-path-dot" aria-hidden="true" />
            </Reveal>
            <div className="hb-field-cols">
              {boltFlow.map((step, index) => (
                <Reveal delay={index * 110} key={step.title}><h3>{step.title}</h3><p>{step.detail}</p></Reveal>
              ))}
            </div>

          </div>
        </section>

        <section id="dogrulama" className="hs hs-light">
          <div className="page-shell">
            <Reveal className="hs-head">
              <div>
                <span className="hs-label">Uyumluluk ve entegrasyon</span>
                <h2 className="hs-title">Sahanızda neye takılır, neyle konuşur?</h2>
              </div>
              <p className="hs-lead">Akıllı Cıvata mevcut bağlantınızın yerine takılır ve sahadaki kablosuz ağ üzerinden merkeze bağlanır. Aşağıdaki tablo sistemin nereye oturduğunu gösterir.</p>
            </Reveal>
            <Reveal>
              <table className="hb-table">
                <thead><tr><th scope="col">Katman</th><th scope="col">Neyle çalışır</th><th scope="col">Not</th></tr></thead>
                <tbody>
                  {boltIntegrations.map((row) => (
                    <tr key={row.scope}><td>{row.scope}</td><td>{row.detail}</td><td>{row.note}</td></tr>
                  ))}
                </tbody>
              </table>
              <p className="hs-note">Kurulum planı, bağlantı tipi ve saha kapsaması teknik görüşmede birlikte netleştirilir; kabul değerleri sözleşmede tanımlanır.</p>
            </Reveal>
          </div>
        </section>

        <section id="muhendislik" className="hs hs-light hs-light-2">
          <div className="page-shell">
            <Reveal className="hs-head">
              <div>
                <span className="hs-label">Teknik değerlendirme</span>
                <h2 className="hs-title">Değerlendirme gerçek numuneyle başlar.</h2>
              </div>
              <p className="hs-lead">Ürün anlatımı sade tutulur. Karar için gereken teknik ayrıntı, değerlendirme sürecinde sizin verinizle birlikte oluşturulur.</p>
            </Reveal>
            <ol className="ev-steps">
              {evaluationSteps.map((step, index) => (
                <li key={step.title}>
                  <Reveal className="ev-step" delay={index * 60}><h3>{step.title}</h3><div><p>{step.you}</p><p>{step.us}</p></div></Reveal>
                </li>
              ))}
            </ol>
            <p className="hs-note">Akıllı Civata için değerlendirme; bağlantı tipi, saha kapsaması ve kurulum planı üzerinden ilerler.</p>
          </div>
        </section>

        <section id="iletisim" className="hs hs-dark">
          <div className="page-shell ct-grid">
            <Reveal>
              <span className="hs-label">İletişim</span>
              <h2 className="hs-title">Kontrol probleminizi ya da izleme ihtiyacınızı yazın.</h2>
              <p className="hs-lead">Örnek parça, saha koşulu veya mevcut üretim verisiyle başlamak yeterli. İlk görüşmede uygulanabilirliği birlikte değerlendiririz.</p>
              <a className="hs-button hs-button-dark ct-primary" href="mailto:info@ucersoft.com.tr?subject=Üçersoft%20teknik%20görüşme%20talebi">Teknik görüşme talebi <ArrowUpRight aria-hidden="true" /></a>
            </Reveal>
            <Reveal className="ct-blocks" delay={70}>
              <div className="ct-block"><span>E-posta</span><a href="mailto:info@ucersoft.com.tr">info@ucersoft.com.tr</a></div>
              <div className="ct-block"><span>Adres</span><address>Çaydaçıra Mah. Hacı Ömer Bilginoğlu Cad.<br />Fırat TGB 61/207, Merkez / Elazığ</address></div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="site-footer home-footer">
        <div className="page-shell footer-grid">
          <div className="footer-brand">
            <Image src="/brand/ucersoft-logo-full.webp" alt="Üçersoft" width={420} height={339} />
            <p>Yazılım, görüntü işleme ve dijital dönüşüm.</p>
          </div>
          <div>
            <span>Ürünler</span>
            <Link href="#xstudio">XStudio</Link>
            <Link href="#akilli-civata">Akıllı Civata</Link>
          </div>
          <div>
            <span>İletişim</span>
            <a href="mailto:info@ucersoft.com.tr">info@ucersoft.com.tr</a>
            <address>Çaydaçıra Mah. Hacı Ömer Bilginoğlu Cad.<br />Fırat TGB 61/207, Merkez / Elazığ</address>
          </div>
          <div className="footer-legal">
            <span>Kurumsal</span>
            <p><strong>ÜÇERSOFT Yazılım Ltd. Şti.</strong></p>
            <p>Fırat Teknokent, Elazığ / Türkiye</p>
            <p>MERSİS: <span data-pending="true">—</span></p>
          </div>
        </div>

        <div className="page-shell footer-kvkk">
          <details id="aydinlatma-metni">
            <summary>KVKK Aydınlatma Metni</summary>
            <div>
              <p><strong>Veri sorumlusu.</strong> ÜÇERSOFT Yazılım Ltd. Şti. (&ldquo;Üçersoft&rdquo;), Çaydaçıra Mah. Hacı Ömer Bilginoğlu Cad., Fırat TGB 61/207, Merkez / Elazığ.</p>
              <p><strong>Hangi veriler işlenir.</strong> Bu web sitesinde form, üyelik, çerez tabanlı takip veya analitik ölçüm bulunmamaktadır. Site üzerinden yalnızca e-posta bağlantıları sunulur. Bize e-posta gönderdiğinizde, mesajınızda ilettiğiniz ad-soyad, kurum, e-posta adresi, telefon ve talebinizin içeriği işlenir.</p>
              <p><strong>İşleme amacı ve hukuki sebebi.</strong> Bu veriler yalnızca talebinizi yanıtlamak, teknik değerlendirme yapmak ve sözleşme öncesi görüşmeleri yürütmek amacıyla; KVKK m.5/2-(c) (sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması) ve m.5/2-(f) (meşru menfaat) hukuki sebeplerine dayanarak işlenir.</p>
              <p><strong>Aktarım.</strong> Verileriniz, yasal yükümlülük hâlleri dışında üçüncü kişilerle paylaşılmaz ve yurt dışına aktarılmaz. E-posta altyapımızın hizmet sağlayıcısı, veri işleyen sıfatıyla teknik olarak erişebilir.</p>
              <p><strong>Saklama süresi.</strong> Yazışmalar, ilgili görüşme veya sözleşme ilişkisi sona erdikten sonra ilgili mevzuatta öngörülen zamanaşımı süreleri boyunca saklanır; sürenin sonunda silinir veya anonim hâle getirilir.</p>
              <p><strong>Haklarınız.</strong> KVKK m.11 uyarınca kişisel verilerinizin işlenip işlenmediğini öğrenme, bilgi talep etme, düzeltilmesini veya silinmesini isteme ve işlemeye itiraz etme haklarına sahipsiniz. Taleplerinizi <a href="mailto:info@ucersoft.com.tr?subject=KVKK%20başvurusu">info@ucersoft.com.tr</a> adresine iletebilirsiniz.</p>
            </div>
          </details>
        </div>

        <div className="page-shell footer-bottom">
          <span>© 2026 ÜÇERSOFT Yazılım Ltd. Şti.</span>
          <div>
            <a href="#aydinlatma-metni">KVKK Aydınlatma Metni</a>
            <a href="#genel-bakis">Yukarı dön ↑</a>
          </div>
        </div>
      </footer>
    </>
  );
}
