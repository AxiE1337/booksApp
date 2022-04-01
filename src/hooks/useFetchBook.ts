import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function useFetchBook() {
  const [data, setData] = useState<any>('')
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const paramsBookId = useParams()

  const fetchBook = async (id: any) => {
    setIsFetching(true)
    try {
      const data = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${id}?key=${process.env.REACT_APP_API_KEY}`
      )
      setData(data.data)
      setIsFetching(false)
    } catch (e: any) {
      console.log(e.message)
    }
  }
  useEffect(() => {
    fetchBook(paramsBookId.id)
    return () => {
      setData('')
    }
  }, [paramsBookId.id])
  return { data, isFetching }
}
