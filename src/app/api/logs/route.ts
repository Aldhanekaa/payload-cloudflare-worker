import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')

  if (authHeader?.startsWith('Basic ')) {
    const base64 = authHeader.slice('Basic '.length)
    const decoded = Buffer.from(base64, 'base64').toString('utf-8')
    const password = decoded.split(':')[1] // format is "username:password"
    // console.log("password", password);
    // console.log("decoded", decoded);

    if (password === '123') {
      return NextResponse.json({
        PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
        S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
        S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
        S3_ENDPOINT: process.env.S3_ENDPOINT,
      })
      // return new NextResponse("Invalid");
    }
  }

  // Prompt the browser to show a native credential dialog
  return new NextResponse('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Logs"',
    },
  })
}
