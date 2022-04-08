import { useState } from 'react'
import { Button, Empty, Image } from 'antd'
import { Snackbar, Dialog, DialogActions, DialogTitle } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Moment from 'react-moment'
import useFetchLikedBooks from '../hooks/useFetchLikedBooks'
import Loading from '../components/Loading'
import '../styles/likedBooksPage.css'

export default function LikedBooksPage() {
  const [notification, setNotification] = useState<any>({
    isOpen: false,
    message: '',
  })
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [dialogMessage, setDialogMessage] = useState<any>({})
  const { isFetching, likedBooks, unlinkBook } = useFetchLikedBooks()
  const navigate = useNavigate()

  const openPopUp = (bookId: string, bookTitle: string) => {
    setDialogMessage({ bookId: bookId, title: bookTitle })
    setIsOpen(true)
  }

  const closePopUp = () => {
    setIsOpen(false)
  }

  function confirm() {
    unlinkBook(dialogMessage.bookId)
    setIsOpen(false)
  }

  function cancel() {
    setIsOpen(false)
  }

  const handleCloseNotification = (reason: any) => {
    if (reason === 'clickaway') {
      return
    }
    setNotification(false)
  }

  if (isFetching) {
    return <Loading />
  }

  return (
    <div>
      {likedBooks.length > 0 ? (
        likedBooks
          .sort((a: any, b: any) => {
            return b.data.time - a.data.time
          })
          .map((book: any) => {
            return (
              <div key={book.data.id} className='likedBooks'>
                <Image
                  src={'https' + book.data.image.slice(4)}
                  alt={book.data.title}
                />
                <h1>{book.data.title}</h1>
                <p>
                  {`Author${book.data?.authors.length > 1 ? 's:' : ':'} ` +
                    book.data?.authors}
                </p>
                <Button onClick={() => navigate(`/book/${book.data.id}`)}>
                  To the book page
                </Button>
                <Button onClick={() => openPopUp(book.id, book.data.title)}>
                  unlink book
                </Button>
                <Dialog
                  open={isOpen}
                  onClose={closePopUp}
                  aria-labelledby='alert-dialog-title'
                  aria-describedby='alert-dialog-description'
                >
                  <DialogTitle id='alert-dialog-title'>
                    {`Unlike '${dialogMessage.title}' book ?`}
                  </DialogTitle>
                  <DialogActions>
                    <Button onClick={confirm}>Yes</Button>
                    <Button onClick={cancel}>No</Button>
                  </DialogActions>
                </Dialog>
                <Moment fromNow>{book.data.time}</Moment>
              </div>
            )
          })
      ) : (
        <div className='likedBooks'>
          <Empty />
        </div>
      )}
      <Snackbar
        open={notification.isOpen}
        autoHideDuration={2500}
        onClose={handleCloseNotification}
        message={notification.message}
      />
    </div>
  )
}
