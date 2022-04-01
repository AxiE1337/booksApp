import { Button, Empty, Image, Popconfirm, message } from 'antd'
import { useNavigate } from 'react-router-dom'
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
        likedBooks.map((book: any, index: any) => {
          return (
            <div key={book.data.id} className='likedBooks'>
              <Image src={book.data.image} alt={book.data.title} />
              <h1>{book.data.title}</h1>
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
              <p>{index + 1}</p>
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
