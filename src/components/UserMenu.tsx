import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Menu, MenuItem, Avatar } from '@mui/material'

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const { authenticationFunc } = useAuth()
  const navigate = useNavigate()
  const userData = useSelector((state: any) => state.userData.value)

  const handleClick = (e: any) => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className='userMenu'>
      <h2 style={{ cursor: 'default', textAlign: 'center' }}>
        {userData.userName}
      </h2>
      <Button id='basic-button' aria-haspopup='true' onClick={handleClick}>
        <Avatar
          className='userAvatar'
          alt={userData.userName}
          src={userData.userPhoto}
        />
      </Button>
      <Menu
        id='menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose()
            navigate(`/likedBooks`)
          }}
        >
          Liked books
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose()
            authenticationFunc()
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  )
}
