#!/usr/bin/env bash
# Rebuild y redeploy LOCAL del portfolio (mismo artefacto que irá a la Pi).
# Uso: ./scripts/rebuild-local.sh   (o bash scripts/rebuild-local.sh)
set -euo pipefail

cd "$(dirname "$0")/.."

echo "==> Parando el contenedor anterior..."
docker compose down

echo "==> Build de la imagen..."
# Sonda: ¿los contenedores salen a internet por el bridge?
# (docker pull lo hace el daemon con red del host, así que la sonda funciona siempre)
if docker run --rm busybox:latest wget -q -T 5 -O /dev/null http://1.1.1.1/ 2>/dev/null; then
    echo "    bridge OK → docker compose build"
    docker compose build
else
    echo "    bridge sin salida → build con --network=host (workaround)"
    docker build --network=host -t portfolio:latest .
fi

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
