#!/usr/bin/env bash
# Rebuild y redeploy LOCAL del portfolio (mismo artefacto que irá a la Pi).
# Uso: ./scripts/rebuild-local.sh   (o bash scripts/rebuild-local.sh)
set -euo pipefail

cd "$(dirname "$0")/.."

echo "==> Parando el contenedor anterior..."
docker compose down

echo "==> Build de la imagen..."
# --network=host: esquina el bridge de Docker mientras su NAT de salida esté roto.
# Cuando lo arregles (sudo systemctl restart docker), puedes sustituir esta línea
# por: docker compose build
docker build --network=host -t portfolio:latest .

echo "==> Arrancando en 127.0.0.1:18081..."
docker compose up -d --no-build

echo "==> Verificando..."
sleep 1
if curl -sf -o /dev/null --max-time 5 http://127.0.0.1:18081/; then
  echo "✅ Listo → http://127.0.0.1:18081"
else
  echo "⚠️  El contenedor arrancó pero no responde. Logs: docker logs portfolio"
  exit 1
fi
