import '../styles/searchForBook.css'
import { Image, Popover, BackTop, Button } from 'antd'
import useFetchFindBook from '../hooks/useFetchFindBook'
import { useNavigate } from 'react-router-dom'
import { UpOutlined } from '@ant-design/icons'
import Loading from '../components/Loading'

export default function SearchForBooks() {
  const { data, isFetching } = useFetchFindBook()
  const navigate = useNavigate()
  const previewParams = {
    visible: false,
  }
  if (isFetching) {
    return <Loading />
  }
  return (
    <div className='books'>
      {data.items !== undefined ? (
        data.items?.map((item: any, index: any) => {
          return (
            <div className='book' key={index}>
              <Image
                width={200}
                preview={previewParams}
                alt={item.volumeInfo.title}
                src={'https' + item.volumeInfo.imageLinks?.thumbnail.slice(4)}
                onClick={() => navigate(`/book/${item.id}`)}
              />
              <Popover content={<div>{item.volumeInfo.title}</div>}>
                <h1>{item.volumeInfo.title}</h1>
              </Popover>
              <h1 className='saleInfo'>
                {item.saleInfo.saleability === 'FOR_SALE'
                  ? item.saleInfo.listPrice?.amount +
                    ' ' +
                    item.saleInfo.listPrice?.currencyCode
                  : 'Not for sale'}
              </h1>
            </div>
          )
        })
      ) : (
        <div className='booksNotFound'>
          <h1>Couldnt find any books</h1>
        </div>
      )}
      <BackTop visibilityHeight={900}>
        <Button type='default'>
          <UpOutlined />
        </Button>
      </BackTop>
    </div>
  )
}
