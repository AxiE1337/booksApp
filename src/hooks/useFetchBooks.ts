import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function useFetchBooks() {
  const paramsPage = useParams()
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [data, setData] = useState<any>('')
  const [error, setError] = useState<string>('')

  const fetchBooks = async (page: any, filter: any) => {
    setIsFetching(true)
    filter = paramsPage.filter ? `&filter=${paramsPage.filter}` : ''
    try {
      const data = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=time&printType=books&startIndex=${page}${filter}&key=${process.env.REACT_APP_API_KEY}`
      )
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
