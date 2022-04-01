import { Pagination } from 'antd'
import useFetchBooks from '../hooks/useFetchBooks'
import { useParams, useNavigate } from 'react-router-dom'

export default function PaginationUI() {
  const paramsPage = useParams()
  const navigate = useNavigate()
  const { data } = useFetchBooks()

  return (
    <div className='pagination'>
      <Pagination
        onChange={(page) => {
          navigate(`/page/${page}/${paramsPage.filter || ''}`)
          window.scrollTo(0, 0)
        }}
        total={data?.totalItems}
        current={Number(paramsPage.page)}
      />
    </div>
  )
}
