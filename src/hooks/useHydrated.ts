import { useEffect, useState } from 'react'

/** Keep controls disabled until React can receive the visitor's first interaction. */
export function useHydrated() {
  const [ready, setReady] = useState(false)
  useEffect(() => setReady(true), [])
  return ready
}
