import React from 'react'

type Props = {
  children: string
  handleFunction: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void
  color?: {
    bgColor: string
    hoverBgColor: string
  }
}

export default function ActionButton({
  children,
  handleFunction,
  color = { bgColor: 'bg-blue-700', hoverBgColor: 'hover:bg-blue-800' },
}: Props) {
  return (
    <button
      onClick={(event) => handleFunction(event)}
      className={`text-white ${color.bgColor} ${color.hoverBgColor} focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
    >
      {children}
    </button>
  )
}
