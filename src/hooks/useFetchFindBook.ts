import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
const APIKEY: string = process.env.REACT_APP_API_KEY || ''

export default function useFetchFindBook() {
  const [data, setData] = useState<any>([])
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const paramsPage = useParams()
  const fetchFindBook = async (searchTerm: any) => {
    const url = 'https://www.googleapis.com/books/v1/volumes'
    setIsFetching(true)
    try {
      const data = await axios(url, {
        headers: {
          authorization: APIKEY,
        },
        params: {
          q: `intitle:${searchTerm}`,
          maxResults: 40,
        },
      })
      setData(data.data)
      setIsFetching(false)
    } catch (e: any) {
      console.log(e.message)
    }
  }
  useEffect(() => {
    fetchFindBook(paramsPage.word)
    return () => {
      setData([])
    }
  }, [paramsPage.word])
  return { fetchFindBook, data, isFetching }
}
