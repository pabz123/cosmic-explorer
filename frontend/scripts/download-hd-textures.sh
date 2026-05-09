#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_DIR="$ROOT_DIR/public/textures"
mkdir -p "$OUT_DIR"

fetch() {
  local url="$1"
  local out="$2"
  echo "Downloading $out"
  curl -fL "$url" -o "$OUT_DIR/$out"
}

fetch "https://solartextures.b-cdn.net/2k_mercury.jpg" "mercury.jpg"
fetch "https://solartextures.b-cdn.net/2k_venus_atmosphere.jpg" "venus.jpg"
fetch "https://solartextures.b-cdn.net/2k_earth_daymap.jpg" "earth.jpg"
fetch "https://solartextures.b-cdn.net/2k_earth_normal_map.jpg" "earth_normal.jpg"
fetch "https://solartextures.b-cdn.net/2k_earth_specular_map.jpg" "earth_specular.jpg"
fetch "https://solartextures.b-cdn.net/2k_earth_clouds.jpg" "earth_clouds.jpg"
fetch "https://solartextures.b-cdn.net/2k_mars.jpg" "mars.jpg"
fetch "https://solartextures.b-cdn.net/2k_jupiter.jpg" "jupiter.jpg"
fetch "https://solartextures.b-cdn.net/2k_saturn.jpg" "saturn.jpg"
fetch "https://solartextures.b-cdn.net/2k_saturn_ring_alpha.png" "saturn_ring.png"
fetch "https://solartextures.b-cdn.net/2k_uranus.jpg" "uranus.jpg"
fetch "https://solartextures.b-cdn.net/2k_neptune.jpg" "neptune.jpg"

echo "Done. Textures saved to $OUT_DIR"
