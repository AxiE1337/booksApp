import { useState, useEffect } from 'react'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/slices/userData'
const provider = new GoogleAuthProvider()

export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const dispatch = useDispatch()
  const auth = getAuth()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true)
        dispatch(
          setUserData({
            userUid: user.uid,
            userEmail: user.email,
            userName: user.displayName,
            userPhoto: user.photoURL,
          })
        )
        setIsLoading(false)
      } else {
        setIsLoggedIn(false)
        setIsLoading(false)
      }
    })
  }, [auth, dispatch])

  const authenticationFunc = async () => {
    setIsLoading(true)
    if (isLoggedIn) {
      try {
        await signOut(auth)
        setIsLoading(false)
      } catch (err: any) {
        console.log(err.message)
      }
    } else {
      try {
        await signInWithPopup(auth, provider)
        setIsLoading(false)
      } catch (err: any) {
        console.log(err.message)
      }
    }
    window.location.reload()
  }
  return { isLoggedIn, isLoading, authenticationFunc }
}
