import { Avatar, Menu, Dropdown, Button } from 'antd'
import useAuth from '../hooks/useAuth'
import { useSelector } from 'react-redux'

export default function UserMenu() {
  const { authenticationFunc } = useAuth()
  const userData = useSelector((state: any) => state.userData.value)
  const menu = (
    <Menu>
      <Menu.Item key='1'>
        <Button type='default' onClick={authenticationFunc}>
          Log out
        </Button>
      </Menu.Item>
    </Menu>
  )
  return (
    <div className='userMenu'>
      <h2 style={{ cursor: 'default', textAlign: 'center' }}>
        {userData.userName}
      </h2>
      <Dropdown overlay={menu} trigger={['click']}>
        <Avatar size={35} className='userAvatar' src={userData.userPhoto} />
      </Dropdown>
    </div>
  )
}
