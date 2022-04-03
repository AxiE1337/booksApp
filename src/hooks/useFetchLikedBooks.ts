import { useEffect, useState } from 'react'
import { db } from '../firebase/firebase-config'
import { collection, getDocs, doc, deleteDoc, addDoc } from 'firebase/firestore'
import { useSelector } from 'react-redux'

export default function useFetchLikedBooks() {
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const userData = useSelector((state: any) => state.userData.value)
  const [likedBooks, setLikedBooks] = useState<any>()

  const fetchBooks = async (uid: string) => {
    setIsFetching(true)
    if (uid !== undefined) {
      try {
        const collectionRef = collection(db, uid)
        const booksData = await getDocs(collectionRef)
        const firebaseData = booksData.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }))
        setLikedBooks(firebaseData)
        setIsFetching(false)
      } catch (err: any) {
        console.log(err.message)
      }
    }
  }
  const likeBook = async (
    bookId: string,
    bookTitle: string,
    bookImage: string,
    authors: any,
    time: number
  ) => {
    const isLiked = likedBooks.some((book: any) => book.data.id === bookId)
    if (!isLiked) {
      const collectionRef = collection(db, userData.userUid)
      try {
        await addDoc(collectionRef, {
          title: bookTitle,
          id: bookId,
          image: bookImage,
          authors: authors || 'No author',
          time: time,
        })
      } catch (err: any) {
        console.log(err.message)
      }
    }
  }
  const unlinkBook = async (bookId: string) => {
    try {
      await deleteDoc(doc(db, userData.userUid, bookId))
      fetchBooks(userData.userUid)
    } catch (err: any) {
      console.log(err.message)
    }
  }
  useEffect(() => {
    fetchBooks(userData.userUid || '0')
  }, [userData.userUid])
  return { likedBooks, isFetching, unlinkBook, likeBook }
}
