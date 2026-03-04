import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-pages'

const app = new Hono()

app.use('/static/*', serveStatic())

app.get('/', (c) => {
  return c.html(getMainHTML())
})

app.get('*', (c) => {
  return c.html(getMainHTML())
})

function getMainHTML(): string {
  return `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The Neurodivergent Brain</title>
  <meta name="description" content="Understand how different brains work. Explore neurotype profiles, take a self-assessment, and discover how brains interact in relationships.">
  <meta property="og:title" content="The Neurodivergent Brain">
  <meta property="og:description" content="Understand how different brains work. Research-informed neurotype profiles, self-assessment, and relationship dynamics.">
  <meta property="og:type" content="website">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=Newsreader:ital,wght@0,400;1,400&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.js"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            'deep-navy': '#0F1923',
            'mid-navy': '#1A2A3A',
            'light-navy': '#243447',
            'warm-white': '#E8E6E1',
            'steel-blue': '#A0B4C8',
            'electric-teal': '#64DFDF',
            'muted-purple': '#8B5CF6',
            'warm-amber': '#F59E0B',
            'soft-green': '#34D399',
            'soft-coral': '#FB7185',
            'nt-neurotypical': '#8B9DAF',
            'nt-adhd-c': '#F97316',
            'nt-adhd-i': '#FBBF24',
            'nt-adhd-dys': '#FB923C',
            'nt-dyslexia': '#A78BFA',
            'nt-asd1': '#2DD4BF',
            'nt-asd2': '#22D3EE',
            'nt-asd3': '#818CF8',
            'nt-audhd': '#EC4899',
            'nt-overfocused': '#E11D48',
            'nt-temporal': '#DC2626',
            'nt-limbic': '#4338CA',
            'nt-ringoffire': '#EF4444',
            'nt-anxious': '#7C3AED',
          },
          fontFamily: {
            display: ['Space Grotesk', 'sans-serif'],
            body: ['Inter', 'sans-serif'],
            accent: ['Newsreader', 'serif'],
          }
        }
      }
    }
  </script>
  <link href="/static/styles.css" rel="stylesheet">
</head>
<body class="bg-deep-navy text-warm-white font-body min-h-screen">
  <!-- Navigation -->
  <nav id="main-nav" class="fixed top-0 left-0 right-0 z-50 bg-deep-navy/95 backdrop-blur-sm border-b border-light-navy/50 transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <a href="#" onclick="navigateTo('home')" class="flex items-center gap-3 group cursor-pointer">
          <div class="w-8 h-8 rounded-full bg-gradient-to-br from-electric-teal to-muted-purple flex items-center justify-center">
            <i class="fas fa-brain text-deep-navy text-sm"></i>
          </div>
          <span class="font-display font-bold text-lg text-warm-white group-hover:text-electric-teal transition-colors">The Neurodivergent Brain</span>
        </a>
        <div class="hidden md:flex items-center gap-1">
          <button onclick="navigateTo('home')" class="nav-link px-4 py-2 rounded-lg text-sm font-medium text-steel-blue hover:text-warm-white hover:bg-light-navy/50 transition-all" data-section="home">Home</button>
          <button onclick="navigateTo('profiles')" class="nav-link px-4 py-2 rounded-lg text-sm font-medium text-steel-blue hover:text-warm-white hover:bg-light-navy/50 transition-all" data-section="profiles">Neurotypes</button>
          <button onclick="navigateTo('assessment')" class="nav-link px-4 py-2 rounded-lg text-sm font-medium text-steel-blue hover:text-warm-white hover:bg-light-navy/50 transition-all" data-section="assessment">Discover Your Brain</button>
          <button onclick="navigateTo('explorer')" class="nav-link px-4 py-2 rounded-lg text-sm font-medium text-steel-blue hover:text-warm-white hover:bg-light-navy/50 transition-all" data-section="explorer">Brain Pair Explorer</button>
          <button onclick="navigateTo('about')" class="nav-link px-4 py-2 rounded-lg text-sm font-medium text-steel-blue hover:text-warm-white hover:bg-light-navy/50 transition-all" data-section="about">About</button>
        </div>
        <button id="mobile-menu-btn" onclick="toggleMobileMenu()" class="md:hidden p-2 text-steel-blue hover:text-warm-white">
          <i class="fas fa-bars text-xl"></i>
        </button>
      </div>
    </div>
    <!-- Mobile menu -->
    <div id="mobile-menu" class="hidden md:hidden bg-mid-navy border-t border-light-navy/50">
      <div class="px-4 py-3 space-y-1">
        <button onclick="navigateTo('home');toggleMobileMenu()" class="block w-full text-left px-4 py-2 rounded-lg text-sm text-steel-blue hover:text-warm-white hover:bg-light-navy/50">Home</button>
        <button onclick="navigateTo('profiles');toggleMobileMenu()" class="block w-full text-left px-4 py-2 rounded-lg text-sm text-steel-blue hover:text-warm-white hover:bg-light-navy/50">Neurotypes</button>
        <button onclick="navigateTo('assessment');toggleMobileMenu()" class="block w-full text-left px-4 py-2 rounded-lg text-sm text-steel-blue hover:text-warm-white hover:bg-light-navy/50">Discover Your Brain</button>
        <button onclick="navigateTo('explorer');toggleMobileMenu()" class="block w-full text-left px-4 py-2 rounded-lg text-sm text-steel-blue hover:text-warm-white hover:bg-light-navy/50">Brain Pair Explorer</button>
        <button onclick="navigateTo('about');toggleMobileMenu()" class="block w-full text-left px-4 py-2 rounded-lg text-sm text-steel-blue hover:text-warm-white hover:bg-light-navy/50">About</button>
      </div>
    </div>
  </nav>

  <!-- Main Content Container -->
  <main id="app" class="pt-16">
  </main>

  <!-- Footer -->
  <footer class="bg-mid-navy border-t border-light-navy/50 py-8 mt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p class="text-steel-blue text-sm">The Neurodivergent Brain &mdash; Research-informed. Identity-affirming. Privacy-first.</p>
      <p class="text-steel-blue/60 text-xs mt-2">This tool is educational, not diagnostic. Always consult a qualified professional for clinical evaluation.</p>
      <p class="text-steel-blue/40 text-xs mt-2">Sources: PMC/NIH, DSM-5-TR, APA, Barkley (2015), Willcutt et al. (2012), Weiss et al. (2014), Rong et al. (2021), Pennington (2006)</p>
    </div>
  </footer>

  <script src="/static/data.js"></script>
  <script src="/static/assessment.js"></script>
  <script src="/static/pairings.js"></script>
  <script src="/static/app.js"></script>
</body>
</html>`
}

export default app
