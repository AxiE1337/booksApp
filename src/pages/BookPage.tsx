import Loading from '../components/Loading'
import useFetchBook from '../hooks/useFetchBook'
import useFetchLikedBooks from '../hooks/useFetchLikedBooks'
import { Image, Button, notification, Collapse } from 'antd'
import { useSelector } from 'react-redux'
import '../styles/bookPage.css'

export default function BookPage() {
  const userData = useSelector((state: any) => state.userData?.value)
  const { data, isFetching } = useFetchBook()
  const { likeBook, likedBooks } = useFetchLikedBooks()
  const { Panel } = Collapse
  const isForSale = data.saleInfo?.saleability
  const isLiked = likedBooks?.some((book: any) => book.data.id === data.id)

  const addbook = (bookId: string, bookTitle: string, bookImage: string) => {
    if (!isLiked) {
      notification.open({
        message: 'Book added to liked',
      })
    }
    likeBook(bookId, bookTitle, bookImage)
  }
  const panelHandler = () => {}
  if (isFetching) {
    return <Loading />
  }

  return (
    <div className='bookPage'>
      {data.volumeInfo.imageLinks?.thumbnail !== undefined ? (
        <Image
          width={300}
          alt={data.volumeInfo.title}
          src={data.volumeInfo.imageLinks.thumbnail}
        />
      ) : (
        <h1>no image</h1>
      )}

      <h1>{data.volumeInfo.authors}</h1>
      <p>{'Publish date ' + data.volumeInfo.publishedDate}</p>
      <p>{data.volumeInfo.publisher}</p>
      {data.volumeInfo.description !== undefined && (
        <Collapse onChange={panelHandler}>
          <Panel header='description' key='1'>
            <p>{data.volumeInfo.description}</p>
          </Panel>
        </Collapse>
      )}
      <h1>{data.volumeInfo.title}</h1>
      <h1>
        {isForSale !== 'NOT_FOR_SALE'
          ? data.saleInfo.listPrice?.amount +
            ' ' +
            data.saleInfo.listPrice?.currencyCode
          : 'Not for sale'}
      </h1>

      {userData.userUid === null ? (
        <h1>Log in to like the book</h1>
      ) : (
        <Button
          type='default'
          disabled={isLiked}
          onClick={() =>
            addbook(
              data.id,
              data.volumeInfo.title,
              data.volumeInfo.imageLinks?.thumbnail || null
            )
          }
        >
          {isLiked ? 'liked' : 'like'}
        </Button>
      )}

      {isForSale !== 'NOT_FOR_SALE' && (
        <Button type='default'>
          <a href={data.saleInfo.buyLink} target='_blank' rel='noreferrer'>
            Buy
          </a>
        </Button>
      )}
    </div>
  )
}
