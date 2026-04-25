export default async function handler(req) {
  const ip = req.headers['x-forwarded-for']?.split(',')[0] ||
             req.headers['x-real-ip'] || ''

  let detail = {}
  try {
    const resp = await fetch('https://ipwhois.app/json/' + ip + '?lang=zh-CN')
    detail = await resp.json()
  } catch (e) {}

  return new Response(JSON.stringify({
    ip: ip,
    country: detail.country || '',
    countryCode: detail.country_code || '',
    region: detail.region || '',
    city: detail.city || '',
    flagUrl: detail.flag ? detail.flag.img : '',
    flagEmoji: detail.flag ? detail.flag.emoji : '',
    isp: detail.connection ? detail.connection.isp : '',
    isChina: detail.country_code === 'CN'
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
}
