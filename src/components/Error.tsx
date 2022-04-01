import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import '../styles/errorPage.css'
interface Props {
  text?: string
}
export default function Error({ text }: Props) {
  const navigate = useNavigate()
  const refreshPage = () => {
    navigate('/page/1')
    window.location.reload()
  }
  return (
    <div className='errorPage'>
      <h1>{text}</h1>
      <Button onClick={refreshPage}>Back</Button>
    </div>
  )
}
