import { Link } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'

type Props = {
  destination?: string
  color?: {
    bgColor: string
    hoverBgColor: string
  }
}

export default function BackButton({
  destination = '/',
  color = { bgColor: 'bg-blue-700', hoverBgColor: 'hover:bg-blue-800' },
}: Props) {
  return (
    <div className="flex">
      <Link
        to={destination}
        className={`text-white ${color.bgColor} ${color.hoverBgColor} focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
      >
        <BsArrowLeft className="text-2xl" />
      </Link>
    </div>
  )
}
