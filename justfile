default: build

install:
    vx npm ci

dev:
    vx npm run docs:dev -- --host 127.0.0.1

build:
    vx npm run docs:build

motion-check:
    vx npx --yes hyperframes@0.7.87 check videos/dcc-mcp-hero-particles

motion-render:
    vx npx --yes hyperframes@0.7.87 render videos/dcc-mcp-hero-particles --format webm --quality high --crf 42 --vp9-cpu-used 4 --fps 30 --workers 2 --strict --skill motion-graphics --output docs/public/brand/dcc-mcp-hero-particles.webm

ci: install build
