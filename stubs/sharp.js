const sharp = () => {
  throw new Error('Sharp is not supported in Cloudflare Workers runtime')
}
sharp.cache = () => {}
sharp.simd = () => {}
sharp.concurrency = () => {}

export default sharp
