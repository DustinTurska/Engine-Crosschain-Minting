import { Toast, ToastActionElement, ToastProps } from "@/components/ui/toast"
import {
  useCallback,
  useEffect,
  useState,
} from "react"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function generateId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

type State = {
  toasts: ToasterToast[]
}

export function useToast() {
  const [state, setState] = useState<State>({ toasts: [] })

  useEffect(() => {
    const timeouts = new Map<string, ReturnType<typeof setTimeout>>()

    state.toasts.forEach((toast) => {
      if (!timeouts.has(toast.id)) {
        timeouts.set(
          toast.id,
          setTimeout(() => {
            setState((state) => ({
              ...state,
              toasts: state.toasts.filter((t) => t.id !== toast.id),
            }))
          }, TOAST_REMOVE_DELAY)
        )
      }
    })

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout))
    }
  }, [state.toasts])

  const toast = useCallback(
    function ({ ...props }: Omit<ToasterToast, "id">) {
      const id = generateId()

      setState((state) => {
        const newToasts = [
          { ...props, id },
          ...state.toasts,
        ].slice(0, TOAST_LIMIT)

        return {
          ...state,
          toasts: newToasts,
        }
      })

      return {
        id,
        dismiss: () => setState((state) => ({
          ...state,
          toasts: state.toasts.filter((t) => t.id !== id),
        })),
      }
    },
    []
  )

  return {
    toast,
    toasts: state.toasts,
  }
}