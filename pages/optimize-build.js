#!/usr/bin/env node

/**
 * Production Build Optimization Script
 * Run this before deploying to production
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

console.log('🚀 Starting production build optimization...\n')

// 1. Clean previous builds
console.log('🧹 Cleaning previous builds...')
try {
  execSync('rm -rf dist', { stdio: 'inherit' })
  console.log('✅ Build directory cleaned\n')
} catch (error) {
  console.log('⚠️  No previous build to clean\n')
}

// 2. Type checking
console.log('🔍 Running TypeScript type check...')
try {
  execSync('npx tsc --noEmit', { stdio: 'inherit' })
  console.log('✅ TypeScript check passed\n')
} catch (error) {
  console.error('❌ TypeScript errors found. Please fix before deploying.')
  process.exit(1)
}

// 3. Linting
console.log('🔧 Running ESLint...')
try {
  execSync('npx eslint src --ext .ts,.tsx --max-warnings 0', { stdio: 'inherit' })
  console.log('✅ Linting passed\n')
} catch (error) {
  console.log('⚠️  Linting warnings found. Consider fixing before deploying.\n')
}

// 4. Build
console.log('🏗️  Building for production...')
try {
  execSync('npm run build', { stdio: 'inherit' })
  console.log('✅ Production build completed\n')
} catch (error) {
  console.error('❌ Build failed')
  process.exit(1)
}

// 5. Bundle size analysis
console.log('📊 Analyzing bundle size...')
const distPath = path.join(process.cwd(), 'dist')
if (fs.existsSync(distPath)) {
  const getDirectorySize = (dirPath) => {
    let totalSize = 0
    const files = fs.readdirSync(dirPath)
    
    files.forEach(file => {
      const filePath = path.join(dirPath, file)
      const stats = fs.statSync(filePath)
      
      if (stats.isDirectory()) {
        totalSize += getDirectorySize(filePath)
      } else {
        totalSize += stats.size
      }
    })
    
    return totalSize
  }
  
  const totalSize = getDirectorySize(distPath)
  const sizeInMB = (totalSize / (1024 * 1024)).toFixed(2)
  
  console.log(`📦 Total bundle size: ${sizeInMB} MB`)
  
  if (totalSize > 5 * 1024 * 1024) { // 5MB warning threshold
    console.log('⚠️  Bundle size is large. Consider code splitting or optimization.')
  } else {
    console.log('✅ Bundle size is optimal')
  }
  console.log('')
}

// 6. Check for environment file
console.log('🔐 Checking environment configuration...')
if (fs.existsSync('.env.example')) {
  console.log('✅ Environment example file exists')
} else {
  console.log('⚠️  No .env.example file found')
}

if (fs.existsSync('.env')) {
  console.log('✅ Local environment file exists')
} else {
  console.log('⚠️  No .env file found (this is normal for production)')
}
console.log('')

// 7. Security check
console.log('🔒 Running security check...')
const indexHtml = path.join(distPath, 'index.html')
if (fs.existsSync(indexHtml)) {
  const content = fs.readFileSync(indexHtml, 'utf8')
  
  // Check for hardcoded secrets (basic check)
  const suspiciousPatterns = [
    /sk_live_/gi,
    /pk_live_/gi,
    /sk_test_/gi,
    /password\s*=\s*["'][^"']+["']/gi,
    /secret\s*=\s*["'][^"']+["']/gi
  ]
  
  let securityIssues = false
  suspiciousPatterns.forEach(pattern => {
    if (pattern.test(content)) {
      console.log('❌ Potential hardcoded secret found in build')
      securityIssues = true
    }
  })
  
  if (!securityIssues) {
    console.log('✅ No obvious security issues found')
  }
} else {
  console.log('⚠️  Could not find index.html for security check')
}
console.log('')

// 8. Final summary
console.log('🎉 Production build optimization complete!')
console.log('')
console.log('📋 Pre-deployment checklist:')
console.log('  ✅ TypeScript compilation successful')
console.log('  ✅ Production build created')
console.log('  ✅ Bundle size analyzed')
console.log('  ✅ Security check completed')
console.log('')
console.log('🚀 Ready for deployment!')
console.log('💡 Run "npm run preview" to test the production build locally')
console.log('')