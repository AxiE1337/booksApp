import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
const APIKEY: string = process.env.REACT_APP_API_KEY || ''

export default function useFetchBooks() {
  const paramsPage = useParams()
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [data, setData] = useState<any>('')
  const [error, setError] = useState<string>('')

  const fetchBooks = async (page: any, filter: any) => {
    const url =
      'https://www.googleapis.com/books/v1/volumes?q=time&printType=books'
    setIsFetching(true)
    try {
      const data = await axios(url, {
        headers: {
          authorization: APIKEY,
        },
        params: {
          startIndex: page,
          filter: filter,
        },
      })
      setData(data.data)
      data.data.items === undefined &&
        setError(`Page ${paramsPage.page || ''} doest exist `)
      setIsFetching(false)
    } catch (e: any) {
      console.log(e.message)
      setError(e.message)
    }
  }

  useEffect(() => {
    fetchBooks(paramsPage.page + '0', paramsPage.filter)
    return () => {
      setData('')
    }
  }, [paramsPage.page, paramsPage.filter])
  return { data, isFetching, error }
}
