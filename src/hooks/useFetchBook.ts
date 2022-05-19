import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
const APIKEY: string = process.env.REACT_APP_API_KEY || ''

export default function useFetchBook() {
  const [data, setData] = useState<any>('')
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const paramsBookId = useParams()

  const fetchBook = async (id: any) => {
    const url = `https://www.googleapis.com/books/v1/volumes/${id}`
    setIsFetching(true)
    try {
      const data = await axios(url, {
        headers: {
          'Content-Type': 'application/json',
          authorization: APIKEY,
        },
      })
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
