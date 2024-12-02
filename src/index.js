import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { timing } from 'hono/timing'
import { randomUUID } from 'crypto'

const app = new Hono()

// Trust proxy headers middleware
app.use('*', async (c, next) => {
  // Trust X-Forwarded-* headers
  c.req.raw.headers.set('x-forwarded-proto', c.req.raw.headers.get('x-forwarded-proto') || 'http')
  c.req.raw.headers.set('x-forwarded-host', c.req.raw.headers.get('x-forwarded-host') || c.req.raw.headers.get('host'))
  await next()
})

// Custom extreme logging middleware
app.use('*', async (c, next) => {
  const requestId = randomUUID()
  const startTime = Date.now()
  
  // Log request details
  console.log('\n=== INCOMING REQUEST ===')
  console.log(`[${requestId}] ${new Date().toISOString()}`)
  console.log(`Method: ${c.req.method}`)
  console.log(`URL: ${c.req.url}`)
  
  // Log headers
  console.log('\nHeaders:')
  const headers = {}
  c.req.raw.headers.forEach((value, key) => {
    headers[key] = value
    console.log(`${key}: ${value}`)
  })

  // Log body if exists
  try {
    const clonedRequest = c.req.raw.clone()
    const body = await clonedRequest.text()
    if (body) {
      console.log('\nRequest Body:')
      console.log(body)
    }
  } catch (e) {
    console.log('No request body or unable to read')
  }

  // Process the request
  await next()

  // Log response details
  const duration = Date.now() - startTime
  console.log('\n=== RESPONSE ===')
  console.log(`[${requestId}] Response Time: ${duration}ms`)
  console.log(`Status: ${c.res.status}`)
  
  console.log('\n=== END REQUEST ===\n')
})

// Enable pretty JSON formatting
app.use('*', prettyJSON())

// Enable timing header
app.use('*', timing())

// Root route
app.get('/', (c) => {
  console.log('Accessing root route')
  return c.json({
    status: 'success',
    message: 'Welcome to the Test API',
    timestamp: new Date().toISOString()
  })
})

// Version route
app.get('/version', (c) => {
  console.log('Accessing version route')
  return c.json({
    version: '1.0.0',
    framework: 'Hono v4',
    node: process.version
  })
})

// Error handling
app.onError((err, c) => {
  console.error('Error occurred:', err)
  return c.json({
    status: 'error',
    message: err.message
  }, 500)
})

// Start the server
const port = process.env.PORT || 3000
console.log(`Server starting on port ${port}...`)

serve({
  fetch: app.fetch,
  port: parseInt(port, 10)
})
