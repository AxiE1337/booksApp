import '../styles/mainPage.css'
import useFetchBooks from '../hooks/useFetchBooks'
import { useNavigate } from 'react-router-dom'
import { Image, Popover, BackTop, Button } from 'antd'
import { UpOutlined } from '@ant-design/icons'
import Loading from '../components/Loading'
import PaginationUI from '../components/PaginationUI'
import Error from '../components/Error'

export const MainPage = () => {
  const { data, isFetching, error } = useFetchBooks()
  const navigate = useNavigate()

  const previewParams = {
    visible: false,
  }

  if (error !== '') {
    return <Error text={error} />
  }

  return (
    <div className='mainPage'>
      <div className='books'>
        {!isFetching ? (
          data.items?.map((item: any, index: any) => {
            return (
              <div className='book' key={index}>
                <Image
                  width={200}
                  preview={previewParams}
                  alt={item.volumeInfo.title}
                  src={'https' + item.volumeInfo.imageLinks.thumbnail.slice(4)}
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
          <Loading />
        )}
      </div>
      <BackTop visibilityHeight={900}>
        <Button type='default'>
          <UpOutlined />
        </Button>
      </BackTop>
      <PaginationUI />
    </div>
  )
}
