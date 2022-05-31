import React from 'react'

export default function useInput(initialValue: string) {
  const [state, setState] = React.useState(initialValue)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value)
  }

  return {
    state,
    setState,
    reset: () => setState(initialValue),
    bindings: {
      state,
      onChange,
    },
  }
}
