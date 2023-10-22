import { useState, useEffect } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'

interface Book {
  title: string
  author: string
  publishYear: number
  _id: string
}

function Home() {
  const [books, setBooks] = useState<[] | Array<Book>>([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios
      .get('http://localhost:5555/books')
      .then((res) => {
        setBooks(res.data.data)
        setTimeout(() => {
          setLoading(false)
        }, 300)
      })
      .catch((error) => {
        console.error(error)
        setLoading(false)
      })
  }, [])

  return (
    <div className="p-4 h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books list</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr className="border-b border-primary-200 bg-primary-100 text-neutral-800">
              <th scope="col" className="px-6 py-4 max-md:hidden">
                #
              </th>
              <th scope="col" className="px-6 py-4">
                Title
              </th>
              <th scope="col" className="px-6 py-4">
                Author
              </th>
              <th scope="col" className="px-6 py-4 max-md:hidden">
                Publish Year
              </th>
              <th scope="col" className="px-6 py-4">
                Operations
              </th>
            </tr>
          </thead>
          <tbody className="overflow-y-scroll" style={{ height: '50vh' }}>
            {books.map((book, index) => (
              <tr
                className={
                  index % 2 === 0
                    ? 'border-b transition duration-300 ease-in-out hover:bg-neutral-100'
                    : 'border-b transition duration-300 ease-in-out hover:bg-neutral-50'
                }
                key={book._id}
              >
                <td className="whitespace-nowrap px-6 py-4 font-medium max-md:hidden">
                  {index + 1}
                </td>
                <td className="whitespace-nowrap px-6 py-4">{book.title}</td>
                <td className="whitespace-nowrap px-6 py-4">{book.author}</td>
                <td className="whitespace-nowrap px-6 py-4 max-md:hidden">
                  {book.publishYear}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/books/details/${book._id}`}>
                      <BsInfoCircle className="text-2xl text-green-600" />
                    </Link>
                    <Link to={`/books/edit/${book._id}`}>
                      <AiOutlineEdit className="text-2xl text-yellow-400" />
                    </Link>
                    <Link to={`/books/delete/${book._id}`}>
                      <MdOutlineDelete className="text-2xl text-red-600" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Home
