FROM namesmt/images-alpine:node-aws-dev_pnpm10.0.0-alpha.0 AS base

RUN pnpm install -g turbo
WORKDIR /usr/home/plura
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --no-frozen-lockfile

FROM base AS builder

WORKDIR /usr/home/plura
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --no-frozen-lockfile
COPY . .
ENV TURBO_REMOTE_CACHE=false
RUN turbo prune www --docker

FROM base AS installer

WORKDIR /usr/home/plura

COPY --from=builder /usr/home/plura/out/json/ .
RUN pnpm install --no-frozen-lockfile
COPY --from=builder /usr/home/plura/out/full/ .
RUN pnpm run build
RUN turbo build --filter=www...

FROM base AS runner

# Don't run production as root
# RUN addgroup --system --gid 4444 nextjs
# RUN adduser --system --uid 4444 skidgod

WORKDIR /usr/home/plura

RUN pnpm install --no-frozen-lockfile
# RUN chown -R skidgod:nextjs /root/.local/share/pnpm

# USER skidgod

COPY --from=installer /usr/home/plura .

# Run the application
CMD ["pnpm", "start"]
