import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router'
import stylesheet from '../styles/app.css?url'
import { profile } from '../data/portfolio'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: `${profile.name} — Example Developer Portfolio` },
      {
        name: 'description',
        content:
          'An example developer portfolio featuring a fictional profile, sample projects, and illustrative credentials. Customize this template with your own content.',
      },
      { name: 'theme-color', content: '#080b0d' },
      { property: 'og:title', content: `${profile.name} — Example Portfolio Template` },
      {
        property: 'og:description',
        content: 'A fictional developer profile with example data only.',
      },
      { property: 'og:type', content: 'website' },
    ],
    links: [
      { rel: 'stylesheet', href: stylesheet },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    ],
  }),
  component: () => (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  ),
  notFoundComponent: () => (
    <main className="error-page">
      <p className="eyebrow">404 / ROUTE NOT FOUND</p>
      <h1>Lost in the network.</h1>
      <a className="button button-primary" href="/">
        Return home ↗
      </a>
    </main>
  ),
  errorComponent: () => (
    <main className="error-page">
      <h1>Something interrupted the connection.</h1>
      <a className="button button-primary" href="/">
        Reload portfolio ↗
      </a>
    </main>
  ),
})
