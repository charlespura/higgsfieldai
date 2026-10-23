import { useState, type FormEvent } from 'react'
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react'
import { email, profile } from '../data/portfolio'
import { useHydrated } from '../hooks/useHydrated'

export function Contact() {
  const ready = useHydrated()
  const [copied, setCopied] = useState(false)
  const [status, setStatus] = useState('')
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setStatus('Email address copied.')
      window.setTimeout(() => setCopied(false), 2500)
    } catch {
      setStatus(`Copy this email address: ${email}`)
    }
  }
  const send = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const subject = `Example portfolio inquiry — ${String(data.get('name')).trim()}`
    const body = `Hi ${profile.firstName},\n\n${String(data.get('message')).trim()}\n\nFrom: ${String(data.get('name')).trim()}\nReply to: ${String(data.get('email')).trim()}`
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setStatus('Your email app will open with your draft. Send it there to complete your inquiry.')
  }
  return (
    <section className="section contact-section" id="contact">
      <div className="contact-copy" data-reveal>
        <p className="eyebrow">
          <span>04</span> / LET’S CONNECT
        </p>
        <h2>
          Good systems
          <br />
          start with a<br />
          <span className="cyan">conversation.</span>
        </h2>
        <p>
          An example contact panel for your next portfolio.
          <br />
          Replace the sample email with your own address.
        </p>
        <div className="contact-email">
          <a href={`mailto:${email}`}>
            {email}
            <ArrowUpRight size={17} />
          </a>
          <button
            disabled={!ready}
            className="icon-button"
            onClick={copyEmail}
            type="button"
            aria-label="Copy email address"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
        <span className="contact-context">
          <span className="status-dot" /> DEMO CONTACT / EXAMPLE ADDRESS
        </span>
      </div>
      <form className="contact-panel" onSubmit={send} data-reveal>
        <div className="terminal-bar">
          <span className="terminal-dots">
            <i />
            <i />
            <i />
          </span>
          <span>new-conversation.ts</span>
          <Mail size={13} />
        </div>
        <div className="form-content">
          <p className="code-comment">// Tell me what you’re building.</p>
          <div className="form-row">
            <label>
              Your name
              <input
                name="name"
                autoComplete="name"
                required
                maxLength={100}
                placeholder="Jamie Example"
              />
            </label>
            <label>
              Email address
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                placeholder="jamie@example.com"
              />
            </label>
          </div>
          <label>
            What’s on your mind?
            <textarea
              name="message"
              required
              minLength={10}
              maxLength={4000}
              rows={4}
              placeholder="The problem, the idea, the possibilities…"
            />
          </label>
          <button disabled={!ready} className="button button-primary send-button" type="submit">
            Start a conversation <ArrowUpRight size={18} />
          </button>
          <p className="form-note">Demo only: prepares a draft to hello@example.com.</p>
          <p className="form-status" role="status">
            {status}
          </p>
        </div>
      </form>
    </section>
  )
}
