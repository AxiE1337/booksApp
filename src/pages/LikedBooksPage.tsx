import { Button, Empty, Image, Popconfirm, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import Moment from 'react-moment'
import useFetchLikedBooks from '../hooks/useFetchLikedBooks'
import Loading from '../components/Loading'
import '../styles/likedBooksPage.css'

export default function LikedBooksPage() {
  const { isFetching, likedBooks, unlinkBook } = useFetchLikedBooks()
  const navigate = useNavigate()

  function confirm(id: string) {
    unlinkBook(id)
    message.success('Confirmed')
  }

  function cancel() {
    message.error('cancelled')
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
                <Popconfirm
                  title='Unlike this book?'
                  onConfirm={() => confirm(book.id)}
                  onCancel={cancel}
                  okText='Yes'
                  cancelText='No'
                >
                  <Button>Unlike</Button>
                </Popconfirm>
                <Moment fromNow>{book.data.time}</Moment>
              </div>
            )
          })
      ) : (
        <div className='likedBooks'>
          <Empty />
        </div>
      )}
    </div>
  )
}
