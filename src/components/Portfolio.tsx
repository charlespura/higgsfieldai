import { useState } from 'react'
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  Braces,
  Check,
  ChevronRight,
  Code2,
  Cpu,
  GraduationCap,
  Menu,
  ShieldCheck,
  Sparkles,
  Terminal,
  X,
} from 'lucide-react'
import { HeroMedia } from './NetworkScene'
import { useMotion } from '../hooks/useMotion'
import { ProjectArchive } from './ProjectArchive'
import { Contact } from './Contact'
import { Dialog } from './Dialog'
import { credentials, profile, projects } from '../data/portfolio'
import { media } from '../data/media'
import { useHydrated } from '../hooks/useHydrated'

const navigation = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'Approach' },
  { href: '#learning', label: 'Learning' },
]

function Navigation() {
  const ready = useHydrated()
  const [open, setOpen] = useState(false)
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label={`${profile.name} example portfolio home`}>
        <span className="brand-symbol">
          <Code2 size={24} />
        </span>
        <span>
          {profile.firstName.toLowerCase()}
          <span className="brand-light">{profile.lastName.toLowerCase()}</span>
          <span className="cyan">.</span>
        </span>
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map((item) => (
          <a href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <a href="#contact" className="header-contact">
        Let’s talk <ArrowUpRight size={16} />
      </a>
      <button
        disabled={!ready}
        type="button"
        className="mobile-menu-button icon-button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? 'Close navigation' : 'Open navigation'}
      >
        {open ? <X size={23} /> : <Menu size={23} />}
      </button>
      {open && (
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
          {[...navigation, { href: '#contact', label: 'Let’s talk' }].map((item) => (
            <a href={item.href} key={item.href} onClick={() => setOpen(false)}>
              {item.label}
              <ArrowUpRight size={18} />
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-noise" />
      <HeroMedia />
      <div className="hero-content">
        <p className="eyebrow hero-eyebrow">
          <span className="status-dot" /> EXAMPLE PROFILE / DEVELOPER & DESIGNER
        </p>
        <h1>
          Complex problems.
          <br />
          Elegant <span className="hero-outline">systems.</span>
          <span className="hero-period">_</span>
        </h1>
        <p className="hero-description">
          I’m {profile.name}, a fictional developer.
          <br className="desktop-break" /> Explore example web, mobile, and AI projects.
          <br className="desktop-break" />
          <span>A portfolio template with sample content throughout.</span>
        </p>
        <div className="hero-actions">
          <a href="#work" className="button button-primary">
            Explore example work <ArrowDownRight size={18} />
          </a>
          <a href="#about" className="button button-quiet">
            The example approach <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="hero-caption">
          <span className="tiny-cross">+</span>
          <p>
            EXAMPLE CONTENT ONLY
            <br />
            <strong>MAKE IT YOUR OWN.</strong>
          </p>
        </div>
      </div>
      <div className="hero-terminal">
        <div className="terminal-bar">
          <span className="terminal-dots">
            <i />
            <i />
            <i />
          </span>
          <span>example / workspace</span>
          <span className="terminal-live">DEMO</span>
        </div>
        <div className="terminal-body">
          <p>
            <span className="cyan">const</span> approach = {'{'}
          </p>
          <p className="terminal-indent">
            problem: <span>"understand it"</span>,
          </p>
          <p className="terminal-indent">
            system: <span>"make it work"</span>,
          </p>
          <p className="terminal-indent">
            details: <span>"make it matter"</span>
          </p>
          <p>
            {'}'}
            <span className="terminal-cursor">▌</span>
          </p>
        </div>
        <div className="terminal-footer">
          <span className="status-dot" /> HUMAN IDEAS. ENGINEERED WELL.
        </div>
      </div>
      <div className="hero-bottom">
        <span>
          {profile.location.toUpperCase()} / SAMPLE LOCATION <span className="cyan">↗</span>
        </span>
        <a href="#work">
          SCROLL TO DISCOVER <ArrowDown size={13} />
        </a>
        <span>DESIGN × DEVELOPMENT</span>
      </div>
    </section>
  )
}

function ProofStrip() {
  return (
    <div className="proof-strip">
      <div className="proof-item">
        <strong>
          {String(projects.length).padStart(2, '0')}
          <span>/</span>
        </strong>
        <span>
          EXAMPLE
          <br />
          PROJECTS
        </span>
      </div>
      <div className="proof-item">
        <strong>
          {String(credentials.length).padStart(2, '0')}
          <span>/</span>
        </strong>
        <span>
          SAMPLE
          <br />
          LEARNING ENTRIES
        </span>
      </div>
      <div className="proof-item proof-education">
        <GraduationCap size={28} strokeWidth={1.2} />
        <div>
          <strong>Example Education</strong>
          <span>{profile.education.institution.toUpperCase()}</span>
        </div>
      </div>
      <div className="proof-philosophy">
        <span className="tiny-cross">+</span>
        <p>
          Built with intention.
          <br />
          <strong>Delivered end to end.</strong>
        </p>
      </div>
    </div>
  )
}

function Approach() {
  const [featureLoaded, setFeatureLoaded] = useState(false)
  return (
    <section className="section approach-section" id="about">
      <div className="approach-visual" data-reveal>
        <div className="feature-background" />
        <div className="feature-dashboard">
          <div className="terminal-bar">
            <span className="terminal-dots">
              <i />
              <i />
              <i />
            </span>
            <span>workflow / architecture</span>
            <Cpu size={13} />
          </div>
          <div className="flow-diagram">
            <div className="flow-node">
              <span>01</span> THE PROBLEM
              <Braces size={16} />
            </div>
            <div className="flow-connector" />
            <div className="flow-node featured">
              <span>02</span> THE SYSTEM
              <WorkflowIcon />
            </div>
            <div className="flow-branches">
              <span />
              <span />
            </div>
            <div className="flow-pair">
              <div className="flow-node">WEB & MOBILE</div>
              <div className="flow-node">AI WORKFLOWS</div>
            </div>
            <div className="flow-connector" />
            <div className="flow-result">
              <Check size={14} /> A BETTER WAY TO WORK
            </div>
          </div>
          <div className="dashboard-log">
            <p>
              <span>→</span> understanding the context
            </p>
            <p>
              <span>→</span> connecting the moving parts
            </p>
            <p>
              <span>✓</span> building with purpose<span className="terminal-cursor">_</span>
            </p>
          </div>
        </div>
        {media.feature.src && (
          <img
            src={media.feature.src}
            alt=""
            loading="lazy"
            decoding="async"
            className={`feature-generated ${featureLoaded ? 'is-loaded' : ''}`}
            onLoad={() => setFeatureLoaded(true)}
            onError={(event) => {
              event.currentTarget.style.display = 'none'
            }}
          />
        )}
        <div className="feature-label">
          <span className="status-dot" /> THE METHOD BEHIND THE BUILD
        </div>
      </div>
      <div className="approach-copy" data-reveal>
        <p className="eyebrow">
          <span>02</span> / THE APPROACH
        </p>
        <h2>
          Problem first.
          <br />
          <span className="muted">Technology second.</span>
        </h2>
        <p>
          This fictional profile shows how a developer might describe turning a complicated process
          into a useful system. Replace it with your own story.
        </p>
        <p>
          In this example, <strong>{profile.name}</strong> works as an{' '}
          <strong>
            {profile.jobTitle} at {profile.employer}
          </strong>
          . The projects, employment, education, and credentials on this page are all fictional
          sample data.
        </p>
        <div className="approach-principles">
          <div>
            <span>01 /</span>
            <h3>Understand the real need</h3>
            <p>Start with people, context, and the problem.</p>
          </div>
          <div>
            <span>02 /</span>
            <h3>Connect the whole system</h3>
            <p>Thoughtful interfaces. Practical architecture.</p>
          </div>
          <div>
            <span>03 /</span>
            <h3>Build, refine, keep learning</h3>
            <p>Make it useful. Then make it better.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
function WorkflowIcon() {
  return <Cpu size={16} />
}

function Learning() {
  const ready = useHydrated()
  const [selected, setSelected] = useState<(typeof credentials)[number] | null>(null)
  return (
    <section className="section learning-section" id="learning">
      <div className="section-heading" data-reveal>
        <div>
          <p className="eyebrow">
            <span>03</span> / ALWAYS A STUDENT
          </p>
          <h2>
            Curiosity is
            <br />
            <span className="muted">part of the stack.</span>
          </h2>
        </div>
        <div className="learning-total">
          <strong>
            {String(credentials.length).padStart(2, '0')}
            <span>/</span>
          </strong>
          <p>
            SAMPLE ENTRIES.
            <br />
            EXAMPLE DATA ONLY.
          </p>
        </div>
      </div>
      <div className="credentials-grid">
        {credentials.map((credential, index) => {
          const Icon = [Sparkles, ShieldCheck, Cpu][index]
          return (
            <button
              disabled={!ready}
              className="credential-card"
              type="button"
              key={credential.title}
              onClick={() => setSelected(credential)}
              data-reveal
            >
              <div className="credential-top">
                <span>{credential.code}</span>
                <ArrowUpRight size={17} />
              </div>
              <Icon className="credential-icon" size={29} strokeWidth={1.3} />
              <p>{credential.issuer}</p>
              <h3>{credential.title}</h3>
              <div className="credential-bottom">
                <span>{credential.type}</span>
                <ChevronRight size={14} />
              </div>
            </button>
          )
        })}
      </div>
      <div className="education-row">
        <GraduationCap size={23} strokeWidth={1.3} />
        <div>
          <strong>{profile.education.degree}</strong>
          <p>
            {profile.education.specialization} · {profile.education.institution}
          </p>
        </div>
        <span className="honor-badge">
          <span className="status-dot" /> EXAMPLE ONLY
        </span>
      </div>
      {selected && (
        <Dialog title={selected.title} onClose={() => setSelected(null)}>
          <p className="dialog-subtitle">
            {selected.issuer} / {selected.type}
          </p>
          <p>{selected.description}</p>
          <p>One of {credentials.length} fictional learning entries in this example portfolio.</p>
          <p className="small-note">
            This credential and its issuer are fictional. Replace them with your own course details
            and real verification links before presenting them as achievements.
          </p>
        </Dialog>
      )}
    </section>
  )
}

export function Portfolio() {
  useMotion()
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation />
      <main id="main">
        <Hero />
        <ProofStrip />
        <ProjectArchive />
        <Approach />
        <Learning />
        <Contact />
      </main>
      <footer className="site-footer">
        <a className="brand footer-brand" href="#home">
          <Code2 size={22} />
          <span>
            {profile.firstName.toLowerCase()}
            <span className="brand-light">{profile.lastName.toLowerCase()}</span>
            <span className="cyan">.</span>
          </span>
        </a>
        <p>{new Date().getFullYear()} / EXAMPLE PORTFOLIO TEMPLATE</p>
        <span>FICTIONAL PROFILE. EXAMPLE DATA ONLY.</span>
        <a href="#home">
          BACK TO TOP <ArrowUpRight size={14} />
        </a>
      </footer>
    </>
  )
}
