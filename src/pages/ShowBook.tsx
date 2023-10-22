import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

interface Book {
  _id: string
  author: string
  title: string
  publishYear: number
  createdAt: string
  updatedAt: string
}

const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const formattedDate = (newDate: string) => {
  const date = new Date(newDate)

  const fullDayName = daysOfWeek[date.getDay()]
  const fullMonthName = months[date.getMonth()]

  const formattedDate = `${fullDayName} ${fullMonthName} ${date.getDate()}, ${date.getFullYear()}`
  const formattedTime = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  const fullDate = `${formattedDate} at ${formattedTime}`

  return fullDate
}

function ShowBook() {
  const [book, setBook] = useState<Record<string, never> | Book>({})
  const [loading, setLoading] = useState(true)

  const { id } = useParams()

  useEffect(() => {
    axios
      .get(`http://localhost:5555/books/id/${id}`)
      .then((res) => {
        setBook(res.data)
        setTimeout(() => {
          setLoading(false)
        }, 300)
      })
      .catch((error) => {
        console.error(error)
        setLoading(false)
      })
  }, [id])

  return (
    <div className="p-4 h-screen">
      <BackButton />

      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="text=3xl my-4">
            Information about '{book.title}' by{' '}
            <span className="font-semibold">{book.author}</span>
          </h1>
          <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">
                <span className="font-semibold">ID:</span> {book._id}
              </span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">
                <span className="font-semibold">Title: </span> {book.title}
              </span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">
                <span className="font-semibold">Author:</span> {book.author}
              </span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">
                <span className="font-semibold">Publish year:</span>{' '}
                {book.publishYear}
              </span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">
                <span className="font-semibold">Book was added in</span>{' '}
                {formattedDate(book.createdAt)}
              </span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">
                <span className="font-semibold">Book was updated in</span>{' '}
                {formattedDate(book.updatedAt)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowBook
