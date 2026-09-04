#!/usr/bin/env bash
# Üçersoft görsel grade'i — docs/GORSEL-SANAT-YONETIMI.md brief'ini uygular.
# Kaynak dosyalara dokunmaz; public/images/graded/ altına yazar.
#
# Kural: doygunluk yalnızca ışık kaynağında kalır. Malzeme (beton, balast,
# çelik, alüminyum) nötr okunur. Mavi = sinyal, başka hiçbir yerde değil.
#
# Kullanım:  bash scripts/grade-images.sh
set -euo pipefail

SRC="public/images"
OUT="public/images/graded"
mkdir -p "$OUT"

# --- Kademe 1: AĞIR — ölçülen doygunluk > %40, mavi döküm kare geneline yayılmış
heavy() {
  magick "$1" -colorspace sRGB \
    -modulate 100,60 \
    -channel R -evaluate multiply 1.26 \
    -channel G -evaluate multiply 1.05 \
    -channel B -evaluate multiply 0.90 +channel \
    +sigmoidal-contrast 1.8,52% \
    "$2"
}

# --- Kademe 2: ORTA — doygunluk %20-40
medium() {
  magick "$1" -colorspace sRGB \
    -modulate 100,76 \
    -channel R -evaluate multiply 1.12 \
    -channel B -evaluate multiply 0.95 +channel \
    +sigmoidal-contrast 1.7,53% \
    "$2"
}

# --- Kademe 3: HAFİF — zaten dengeli, yalnız highlight yumuşat
light() {
  magick "$1" -colorspace sRGB \
    -modulate 100,86 \
    +sigmoidal-contrast 1.6,54% -level 0%,97% \
    "$2"
}

declare -A TIER=(
  [smart-bolt-rail-hero-original-2026.png]=heavy          # ölçüm: %46.6
  [smart-bolt-rail-environment-original-2026.png]=heavy   # ölçüm: %50.1
  [smart-bolt-exploded-original-2026.png]=heavy           # ölçüm: %44.0
  [xstudio-hero-original-2026.png]=heavy                  # ölçüm: %62.5 — en yüksek
  [xstudio-presentation-original-2026.png]=medium         # ölçüm: %23.8
  [xstudio-workflow-original-2026.png]=light              # ölçüm: %15.2
  [smart-bolt-motion-cutout-original-2026.png]=light      # ölçüm: %14.8
)

for f in "${!TIER[@]}"; do
  [ -f "$SRC/$f" ] || { echo "atlandı (yok): $f"; continue; }
  base="${f%-original-2026.png}"
  png="$OUT/$base.png"
  "${TIER[$f]}" "$SRC/$f" "$png"
  magick "$png" -quality 82 "$OUT/$base.webp"
  sat=$(magick "$png" -colorspace HSL -channel G -separate +channel -format "%[fx:round(mean*1000)/10]" info:)
  printf "%-10s %-42s doygunluk → %%%s\n" "${TIER[$f]}" "$base" "$sat"
done

echo
echo "Çıktı: $OUT"
