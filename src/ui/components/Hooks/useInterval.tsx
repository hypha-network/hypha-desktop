import { useEffect, useRef } from "react"

const noop = () => {}

const useInterval = (callback, delay) => {
  const savedCallback = useRef(noop)

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    if (delay === null) {
      return undefined
    }
    savedCallback.current()
  }, [])

  useEffect(() => {
    if (delay === null) {
      return undefined
    }

    const tick = () => savedCallback.current()
    const id = setInterval(tick, delay)
    return () => clearInterval(id)
  }, [delay])
}

export default useInterval
