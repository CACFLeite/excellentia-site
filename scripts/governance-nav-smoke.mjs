#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const navbarPath = path.join(root, 'src/components/Navbar.tsx')
const navbar = fs.readFileSync(navbarPath, 'utf8')

const requiredNav = [
  { label: 'Início', href: '/' },
  { label: 'Formações', href: '/formacoes' },
  { label: 'Escolas', href: '/escolas' },
  { label: 'Inteligência Educacional', href: '/inteligencia-educacional' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Contato', href: '/contato' },
]

const requiredRoutes = [
  '/',
  '/formacoes',
  '/formacoes/lei-lucas-escolas',
  '/formacoes/nr1-escolas',
  '/cursos',
  '/cursos/lei-lucas-escolas',
  '/inteligencia-educacional',
  '/blog',
  '/sobre',
  '/contato',
  '/escolas',
  '/admin/login',
]

const failures = []

for (const item of requiredNav) {
  const hrefCount = (navbar.match(new RegExp(`href=["']${item.href === '/' ? '/' : item.href}["']`, 'g')) || []).length
  const hasHref = hrefCount > 0 || navbar.includes(`href: '${item.href}'`) || navbar.includes(`href: "${item.href}"`)
  const hasLabel = navbar.includes(`label: '${item.label}'`) || navbar.includes(`>${item.label}`) || navbar.includes(`${item.label}\n`)
  if (!hasHref) {
    failures.push(`Navbar must expose ${item.href}`)
  }
  if (!hasLabel) failures.push(`Navbar label missing: ${item.label}`)
}

if (navbar.includes('Cursos') || navbar.includes('Blog')) {
  failures.push('Navbar must use the approved public labels Formações and Inteligência Educacional, not Cursos/Blog')
}

function routeExists(route) {
  if (route === '/') return fs.existsSync(path.join(root, 'src/app/(main)/page.tsx'))
  const segments = route.split('/').filter(Boolean)
  const candidates = [
    path.join(root, 'src/app', ...segments, 'page.tsx'),
    path.join(root, 'src/app/(main)', ...segments, 'page.tsx'),
  ]
  if (route.startsWith('/cursos/') && !fs.existsSync(candidates[0]) && !fs.existsSync(candidates[1])) {
    candidates.push(path.join(root, 'src/app/cursos/[courseSlug]/page.tsx'))
  }
  if (route.startsWith('/formacoes/') && !fs.existsSync(candidates[0]) && !fs.existsSync(candidates[1])) {
    candidates.push(path.join(root, 'src/app/formacoes/[courseSlug]/page.tsx'))
  }
  return candidates.some((candidate) => fs.existsSync(candidate))
}

for (const route of requiredRoutes) {
  if (!routeExists(route)) failures.push(`Route not found for required navigation/smoke path: ${route}`)
}

if (!navbar.includes('aria-label="Abrir menu"')) {
  failures.push('Mobile menu button must keep aria-label="Abrir menu"')
}

if (failures.length) {
  console.error('Excellentia governance nav smoke: FAIL')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('Excellentia governance nav smoke: OK')
console.log(`Checked ${requiredNav.length} nav items and ${requiredRoutes.length} routes.`)
