#!/usr/bin/env bash
# Redeploy del portfolio EN LA RASPBERRY (producción).
# Actualiza desde GitHub, construye la imagen nueva SIN parar el servicio
# y solo entonces recrea el contenedor (downtime de segundos).
# Uso: ./scripts/deploy-raspberry.sh
set -euo pipefail

cd "$(dirname "$0")/.."

echo "==> Actualizando código desde GitHub (develop)..."
git fetch origin develop
git pull --ff-only origin develop

echo "==> Build de la imagen nueva (el sitio sigue sirviendo)..."
# Sonda de bridge: si los contenedores no salen a internet, build por red del host.
if docker run --rm busybox:latest wget -q -T 5 -O /dev/null http://1.1.1.1/ 2>/dev/null; then
    echo "    bridge OK → docker compose build"
    docker compose build
else
    echo "    bridge sin salida → build con --network=host (workaround)"
    docker build --network=host -t portfolio:latest .
fi

echo "==> Recreando el contenedor con la imagen nueva..."
docker compose up -d --no-build

echo "==> Limpiando capas huérfanas (SD pequeña)..."
docker image prune -f >/dev/null

echo "==> Verificando..."
sleep 1
if curl -sf -o /dev/null --max-time 5 http://127.0.0.1:18081/ 2>/dev/null \
   || wget -q -T 5 -O /dev/null http://127.0.0.1:18081/ 2>/dev/null; then
    echo "✅ Redeploy listo → https://fransogrt.xyz (local: 127.0.0.1:18081)"
else
    echo "⚠️  Arrancó pero no responde. Logs: docker logs portfolio"
    exit 1
fi
