import React from 'react'

export default function useInput(defaultValue: string) {
  const [value, setValue] = React.useState(defaultValue)

  const updater = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return {
    value,
    onChange: updater,
  }
}
