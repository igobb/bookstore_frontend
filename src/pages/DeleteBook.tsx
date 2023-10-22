import { useState, useEffect } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import ActionButton from '../components/ActionButton'
import { BsGear } from 'react-icons/bs'

const DeleteBook = () => {
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { id } = useParams()

  useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:5555/books/id/${id}`).then((res) => {
      setTitle(res.data.title)
      setTimeout(() => {
        setLoading(false)
      }, 300)
    })
  }, [])

  const handleDeleteBook = () => {
    setLoading(true)

    axios
      .delete(`http://localhost:5555/books/id/${id}`)
      .then(() => {
        setTimeout(() => {
          setLoading(false)
        }, 300)
        navigate('/')
      })
      .catch((error) => {
        setLoading(false)
        console.error(error)
      })
  }

  const handleBack = () => {
    navigate('/')
  }

  return (
    <div className="p-4 h-screen">
      <BackButton
        color={{ bgColor: 'bg-red-600', hoverBgColor: 'hover:bg-red-700' }}
      />
      <h1 className="text-3xl my-4">Delete book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col items-center w-[600px] p-8 mx-auto">
          <h3>Are you sure You want to delete "{title}"?</h3>
          <div className="flex justify-between gap-3 my-8">
            <ActionButton
              handleFunction={handleDeleteBook}
              children="YES"
              color={{
                bgColor: 'bg-red-600',
                hoverBgColor: 'hover:bg-red-700',
              }}
            />
            <ActionButton
              handleFunction={handleBack}
              children="NO, GET ME BACK"
              color={{
                bgColor: 'bg-green-600',
                hoverBgColor: 'hover:bg-green-700',
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default DeleteBook
