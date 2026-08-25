# Andersen Project

IT'S HIGHLY RECOMMENDED USING PNPM, **DO NOT USE NPM** because I wouldn't think it would work easily because I dealt many errors by using npm and ended up in a dead end, so then I decided to use pnpm.

p.s. this is all writen manually, so you may find some mistakes or incomplete sentences.

## How to Setup

### What to Do After Creating New Collection

First of all, once you configure or create new collections, you should generate its types
So you should run this following code into your terminal

```
pnpm run generate:types
```

THEN you should create new migration

```
pnpm run payload migrate:create
```

### What to Do After Implementing New Library (integrated with Payloadcms)

Let's say you just add new library integration into payloadcms configuration, you should then run this following code into your terminal before you build / deploy:

```
pnpm run generate:importmap
```

Fix any issues you find after running the command above.

### Development (Local)

Just run pnpm run dev, use Nodejs v24.18.0

### Cloudflare Worker
