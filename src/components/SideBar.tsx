import '../styles/sideMenu.css'
import { useState } from 'react'
import { Drawer, Button, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import { MenuOutlined, SettingOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import useAuth from '../hooks/useAuth'

export default function SideBar() {
  const [visible, setVisible] = useState(false)
  const [isHover, setIsHover] = useState<boolean>(false)
  const { isLoggedIn } = useAuth()
  const settings = useSelector((state: any) => state.settings.value)
  const navigate = useNavigate()

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  const settingsFunction = () => {
    setVisible(false)
    navigate('/settings')
  }

  return (
    <>
      <Button type='text' onClick={showDrawer}>
        <MenuOutlined />
      </Button>
      <Drawer
        title='Menu'
        placement={settings.menuPosition}
        data-theme={settings.theme}
        width={settings.menuWidth * 10}
        onClose={onClose}
        visible={visible}
      >
        <Space direction='vertical' size={20}>
          <Button
            type='primary'
            onClick={() => {
              navigate(`/page/1`)
              onClose()
            }}
          >
            To all books
          </Button>
          <Button
            type='primary'
            onClick={() => {
              navigate(`/page/1/free-ebooks`)
              onClose()
            }}
          >
            Free ebooks
          </Button>
          <Button
            type='primary'
            onClick={() => {
              navigate(`/page/1/paid-ebooks`)
              onClose()
            }}
          >
            Paid ebooks
          </Button>
          {isLoggedIn && (
            <Button
              type='primary'
              onClick={() => {
                navigate(`/likedBooks`)
                onClose()
              }}
            >
              Liked Books
            </Button>
          )}
        </Space>
        <Button
          type='default'
          shape='circle'
          className='settingsBtn'
          onClick={settingsFunction}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <SettingOutlined
            size={10}
            spin={isHover}
            style={{ fontSize: '22px' }}
          />
        </Button>
      </Drawer>
    </>
  )
}
