import '../styles/mainPage.css'
import SearchBar from './SearchBar'
import SideBar from './SideBar'
import { Space } from 'antd'
import AuthenticationPage from '../pages/AuthenticationPage'

export default function NavBar() {
  return (
    <div className='navbar'>
      <Space>
        <SideBar />
        <SearchBar />
      </Space>
      <AuthenticationPage />
    </div>
  )
}
