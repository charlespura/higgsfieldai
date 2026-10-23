import { useState } from 'react'
import { ArrowUpRight, Box, Fingerprint, Link2, Workflow } from 'lucide-react'
import { categories, projects, type Category, type Project } from '../data/portfolio'
import { Dialog } from './Dialog'
import { media } from '../data/media'
import { useHydrated } from '../hooks/useHydrated'

const projectIcons = { hotel: Fingerprint, space: Box, links: Link2, client: Workflow }

function ProjectVisual({ project }: { project: Project }) {
  const [loaded, setLoaded] = useState(false)
  const Icon = projectIcons[project.id as keyof typeof projectIcons]
  return (
    <div className={`project-visual visual-${project.id}`}>
      <div className="visual-grid" />
      <div className="visual-orbit orbit-one" />
      <div className="visual-orbit orbit-two" />
      {project.id === 'hotel' && (
        <div className="mockup hotel-mockup">
          <div className="mockup-top">
            <span className="mockup-logo">
              S<span> / </span>STAYFLOW DEMO
            </span>
            <span>EXAMPLE / WORKSPACE</span>
          </div>
          <div className="mockup-body">
            <div className="mockup-sidebar">
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="mockup-main">
              <span className="mockup-heading">People. Connected.</span>
              <div className="mockup-metrics">
                <i />
                <i />
                <i />
              </div>
              <div className="mockup-chart">
                {[40, 70, 55, 90, 65, 100, 80, 120, 100, 140, 115, 150].map((h, i) => (
                  <i key={i} style={{ height: `${h / 2}px` }} />
                ))}
              </div>
            </div>
          </div>
          <div className="scan-badge">
            <Fingerprint size={29} />
            <span>
              DEMO DEVICE NODE
              <br />
              <small>Example integration</small>
            </span>
          </div>
        </div>
      )}
      {project.id === 'space' && (
        <div className="space-world">
          <div className="space-planet" />
          <div className="space-ring" />
          <div className="space-cube">
            <Box strokeWidth={0.7} />
          </div>
          <span className="space-coordinate">EXPLORING THE UNFAMILIAR_</span>
        </div>
      )}
      {project.id === 'links' && (
        <div className="social-graph">
          <div className="social-node node-one">
            <Link2 size={25} />
          </div>
          <div className="social-node node-two">
            <span>@</span>
          </div>
          <div className="social-node node-three">
            <span>↗</span>
          </div>
          <div className="social-profile">
            <div className="social-avatar">
              M<span>↗</span>
            </div>
            <span className="mockup-heading">One link. All of you.</span>
            <span className="social-url">links.example.com / demo</span>
            <div className="social-link-bar" />
            <div className="social-link-bar" />
            <div className="social-link-bar" />
          </div>
        </div>
      )}
      {project.id === 'client' && (
        <div className="mockup client-mockup">
          <div className="mockup-top">
            <span className="mockup-logo">PROJECT DESK / DEMO</span>
            <span>OVERVIEW ↗</span>
          </div>
          <div className="client-grid">
            <div>
              <span className="mockup-heading">Everything, in flow.</span>
              <div className="workflow-row">
                <i />
                <span />
                <b>IN PROGRESS</b>
              </div>
              <div className="workflow-row">
                <i />
                <span />
                <b>IN REVIEW</b>
              </div>
              <div className="workflow-row">
                <i />
                <span />
                <b>COMPLETE</b>
              </div>
            </div>
            <div className="payment-tile">
              <Workflow size={28} />
              <span>
                Projects.
                <br />
                Payments.
                <br />
                Connected.
              </span>
            </div>
          </div>
        </div>
      )}
      {media.projects[project.id]?.src && (
        <img
          className={`generated-project-image ${loaded ? 'is-loaded' : ''}`}
          src={media.projects[project.id].src!}
          alt=""
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={(event) => {
            event.currentTarget.style.display = 'none'
          }}
        />
      )}
      <span className="visual-index">
        <Icon size={12} /> SYSTEM_{project.number}
      </span>
      <span className="concept-label">CONCEPT VISUAL</span>
      <span className="project-open">
        <ArrowUpRight size={23} />
      </span>
    </div>
  )
}

export function ProjectArchive() {
  const ready = useHydrated()
  const [filter, setFilter] = useState<Category>('All work')
  const [selected, setSelected] = useState<Project | null>(null)
  const filtered = projects.filter(
    (project) => filter === 'All work' || project.category === filter,
  )
  return (
    <section id="work" className="section work-section">
      <div className="section-heading" data-reveal>
        <div>
          <p className="eyebrow">
            <span>01</span> / SELECTED WORK
          </p>
          <h2>
            Built for the
            <br />
            <span className="muted">real world.</span>
          </h2>
        </div>
        <p className="section-intro">
          Different challenges. One approach.
          <br />
          Thoughtful systems that make things work.
        </p>
      </div>
      <div className="archive-toolbar">
        <div className="filter-list" role="group" aria-label="Filter projects">
          {categories.map((category) => (
            <button
              disabled={!ready}
              type="button"
              key={category}
              aria-pressed={category === filter}
              onClick={() => setFilter(category)}
              className={`filter-chip ${category === filter ? 'active' : ''}`}
            >
              {category}
              {category === 'All work' && <span>04</span>}
            </button>
          ))}
        </div>
        <span className="archive-count" aria-live="polite">
          {String(filtered.length).padStart(2, '0')} PROJECTS / ARCHIVE
        </span>
      </div>
      <div className="project-grid">
        {filtered.map((project) => (
          <article className="project-card" key={project.id} data-reveal>
            <button
              disabled={!ready}
              className="project-button"
              type="button"
              onClick={() => setSelected(project)}
              aria-label={`View ${project.name} project details`}
            >
              <ProjectVisual project={project} />
              <div className="project-caption">
                <div>
                  <p className="project-category">
                    {project.category} <span>/ {project.number}</span>
                  </p>
                  <h3>
                    {project.name}
                    <ArrowUpRight size={20} />
                  </h3>
                  <p>{project.subtitle}</p>
                </div>
              </div>
            </button>
            <div className="project-tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
      <p className="archive-footnote">
        <span className="status-dot" /> {projects.length} fictional projects for demonstration. All
        names, descriptions, and visuals are example content.
      </p>
      {selected && (
        <Dialog title={selected.name} onClose={() => setSelected(null)}>
          <p className="dialog-subtitle">{selected.subtitle}</p>
          <p>{selected.detail}</p>
          <div className="dialog-tags">
            {selected.tags.map((tag) => (
              <span className="filter-chip" key={tag}>
                {tag}
              </span>
            ))}
          </div>
          <h3>Project focus</h3>
          <ul>
            {selected.focus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="small-note">
            This is a fictional example project. The descriptions and visuals are illustrative; they
            do not represent a real client or delivered product.
          </p>
          <a className="button button-primary" href="#contact" onClick={() => setSelected(null)}>
            Discuss a similar project <ArrowUpRight size={16} />
          </a>
        </Dialog>
      )}
    </section>
  )
}
