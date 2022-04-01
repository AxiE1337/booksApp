import { Button, Space } from 'antd'
import useAuth from '../hooks/useAuth'
import UserMenu from '../components/UserMenu'

export default function AuthenticationPage() {
  const { isLoading, isLoggedIn, authenticationFunc } = useAuth()

  if (isLoading) {
    return (
      <div className='signInBtn'>
        <Button type='default' loading={true}>
          loading...
        </Button>
      </div>
    )
  }

  return (
    <div className='signInBtn'>
      <Space>
        {!isLoggedIn ? (
          <Button
            type='default'
            loading={isLoading}
            onClick={authenticationFunc}
          >
            {isLoading ? 'loading...' : 'Sign in with google'}
          </Button>
        ) : (
          <UserMenu />
        )}
      </Space>
    </div>
  )
}
