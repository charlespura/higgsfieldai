import { useEffect, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'

export function Dialog({
  title,
  children,
  onClose,
}: {
  title: string
  children: ReactNode
  onClose: () => void
}) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = ref.current
    const previousFocus = document.activeElement as HTMLElement | null
    dialog?.showModal()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      dialog?.close()
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [])
  return (
    <dialog
      ref={ref}
      className="detail-dialog"
      aria-labelledby="dialog-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      data-lenis-prevent
    >
      <div className="dialog-content">
        <button
          type="button"
          className="icon-button dialog-close"
          onClick={onClose}
          aria-label="Close details"
        >
          <X size={20} />
        </button>
        <p className="eyebrow">EXAMPLE PORTFOLIO / FIELD NOTES</p>
        <h2 id="dialog-title">{title}</h2>
        {children}
      </div>
    </dialog>
  )
}
