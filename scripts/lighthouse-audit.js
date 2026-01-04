const lighthouse = require('lighthouse').default
const chromeLauncher = require('chrome-launcher')
const fs = require('fs')
const path = require('path')

const URLs = [
  'http://localhost:3000/',
  'http://localhost:3000/explore/therapies',
  'http://localhost:3000/auth/signin',
]

async function runLighthouse(url) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] })
  
  const options = {
    logLevel: 'info',
    output: 'json',
    port: chrome.port,
    disableFullPageScreenshot: true,
  }

  const runnerResult = await lighthouse(url, options)
  await chrome.kill()

  return runnerResult
}

async function main() {
  console.log('🚀 Starting Lighthouse Performance Audit...\n')
  
  const results = []
  
  for (const url of URLs) {
    console.log(`📊 Auditing: ${url}`)
    
    try {
      const result = await runLighthouse(url)
      const json = JSON.parse(result.report)
      
      const scores = {
        url,
        performance: json.categories.performance.score * 100,
        accessibility: json.categories.accessibility.score * 100,
        bestPractices: json.categories['best-practices'].score * 100,
        seo: json.categories.seo.score * 100,
        pwa: json.categories.pwa ? json.categories.pwa.score * 100 : 'N/A',
      }
      
      results.push(scores)
      
      console.log(`  ✓ Performance:     ${scores.performance.toFixed(0)}/100`)
      console.log(`  ✓ Accessibility:   ${scores.accessibility.toFixed(0)}/100`)
      console.log(`  ✓ Best Practices:  ${scores.bestPractices.toFixed(0)}/100`)
      console.log(`  ✓ SEO:             ${scores.seo.toFixed(0)}/100\n`)
      
    } catch (err) {
      console.error(`  ✗ Error auditing ${url}:`, err.message)
    }
  }
  
  // Save results
  const reportPath = path.join(__dirname, '..', 'lighthouse-report.json')
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2))
  
  console.log('📁 Report saved to: lighthouse-report.json')
  console.log('\n✅ Lighthouse audit complete!')
  
  // Print summary
  console.log('\n📈 SUMMARY:')
  results.forEach(r => {
    console.log(`  ${r.url}`)
    console.log(`    Performance: ${r.performance.toFixed(0)}/100`)
    console.log(`    Accessibility: ${r.accessibility.toFixed(0)}/100`)
    console.log(`    Best Practices: ${r.bestPractices.toFixed(0)}/100`)
    console.log(`    SEO: ${r.seo.toFixed(0)}/100`)
  })
}

main().catch(console.error)
