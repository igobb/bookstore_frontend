import { useState } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ActionButton from '../components/ActionButton'

const CreateBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishYear, setPublishYear] = useState('')

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleCreateBook = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()

    const data = {
      title,
      author,
      publishYear,
    }
    setLoading(true)

    axios
      .post('http://localhost:5555/books', data)
      .then(() => {
        setTimeout(() => {
          setLoading(false)
        }, 300)
        navigate('/')
      })
      .catch((error) => {
        console.error(error)
        setLoading(false)
      })
  }

  return (
    <div className="p-4">
      <BackButton
        color={{ bgColor: 'bg-sky-700', hoverBgColor: 'hover:bg-sky-800' }}
      />

      {loading ? <Spinner /> : ''}
      <div className="flex flex-col mx-auto items-center">
        <h1 className="text-3xl my-4">Add new book</h1>
        <form className="w-[400px]">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              id="title"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Title
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              name="author"
              id="author"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Author
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              name="publishYear"
              id="publishYear"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Publish year
            </label>
          </div>

          <ActionButton
            handleFunction={(event) => handleCreateBook(event)}
            children="Add new book!"
            color={{ bgColor: 'bg-sky-700', hoverBgColor: 'hover:bg-sky-800' }}
          />
        </form>
      </div>
    </div>
  )
}

export default CreateBook
