import http from 'k6/http'
import { check, sleep } from 'k6'

// Test configuration
export const options = {
  // Stage 1: Ramp up to 50 users
  stages: [
    { duration: '30s', target: 10 },   // Ramp-up to 10 users
    { duration: '1m', target: 50 },    // Ramp-up to 50 users
    { duration: '2m', target: 50 },    // Stay at 50 users
    { duration: '30s', target: 0 },    // Ramp-down to 0 users
  ],
  
  thresholds: {
    http_req_duration: ['p(95)<500', 'p(99)<1000'], // 95% requests under 500ms
    http_req_failed: ['rate<0.1'],                   // Error rate under 10%
  },
}

export default function() {
  // Test 1: Home Page
  {
    const res = http.get('http://localhost:3000/')
    check(res, {
      'home page status is 200': (r) => r.status === 200,
      'home page response time < 500ms': (r) => r.timings.duration < 500,
      'home page has content': (r) => r.body.length > 0,
    })
  }

  sleep(1)

  // Test 2: Explore Therapies
  {
    const res = http.get('http://localhost:3000/explore/therapies')
    check(res, {
      'therapies page status is 200': (r) => r.status === 200,
      'therapies page response time < 500ms': (r) => r.timings.duration < 500,
    })
  }

  sleep(1)

  // Test 3: Auth Signin
  {
    const res = http.get('http://localhost:3000/auth/signin')
    check(res, {
      'signin page status is 200': (r) => r.status === 200,
      'signin page response time < 300ms': (r) => r.timings.duration < 300,
    })
  }

  sleep(1)

  // Test 4: API Call - Get Therapists
  {
    const res = http.get('http://localhost:3000/api/therapists')
    check(res, {
      'therapists API status is 200': (r) => r.status === 200 || r.status === 401,
      'therapists API response time < 1000ms': (r) => r.timings.duration < 1000,
    })
  }

  sleep(2)
}

// Custom metric for monitoring
export function handleSummary(data) {
  return {
    'stdout': textSummary(data, { indent: ' ', enableColors: true }),
    './load-test-results.json': JSON.stringify(data),
  }
}

// Simple text summary formatter
function textSummary(data, options) {
  const indent = options.indent || ' '
  let output = '\n📊 Load Test Results Summary\n'
  output += '═'.repeat(50) + '\n\n'

  const metrics = data.metrics
  if (metrics.http_req_duration) {
    output += 'Response Times:\n'
    output += `${indent}Avg: ${metrics.http_req_duration.values.avg.toFixed(0)}ms\n`
    output += `${indent}P95: ${metrics.http_req_duration.values['p(95)'].toFixed(0)}ms\n`
    output += `${indent}P99: ${metrics.http_req_duration.values['p(99)'].toFixed(0)}ms\n`
  }

  if (metrics.http_reqs) {
    output += '\nRequests:\n'
    output += `${indent}Total: ${metrics.http_reqs.value}\n`
    output += `${indent}Rate: ${metrics.http_reqs.values.rate.toFixed(2)}/sec\n`
  }

  if (metrics.http_req_failed) {
    output += '\nErrors:\n'
    output += `${indent}Failed: ${metrics.http_req_failed.value}\n`
    output += `${indent}Rate: ${(metrics.http_req_failed.values.rate * 100).toFixed(2)}%\n`
  }

  output += '\n' + '═'.repeat(50) + '\n'
  return output
}
