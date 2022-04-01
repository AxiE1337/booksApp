import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
export default function useFetchFindBook() {
  const [data, setData] = useState<any>([])
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const paramsPage = useParams()
  const fetchFindBook = async (searchTerm: any) => {
    setIsFetching(true)
    try {
      const data = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=intitle:${searchTerm}&maxResults=40&key=${process.env.REACT_APP_API_KEY}`
      )
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
