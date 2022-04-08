import { useState } from 'react'
import '../styles/settings.css'
import { Drawer, Button, Checkbox, Switch } from 'antd'
import { Snackbar, Slider } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setSetting, theme } from '../redux/slices/settings'
export default function Settings() {
  const [visible, setVisible] = useState(false)
  const [menuPosition, setMenuPosition] = useState<any>('left')
  const [sliderValue, setSliderValue] = useState<number>(30)
  const [notification, setNotification] = useState<any>({
    isOpen: false,
    message: '',
  })
  const themeState = useSelector((state: any) => state.settings.theme)
  const dispatch = useDispatch()

  const handleCloseNotification = (reason: any) => {
    if (reason === 'clickaway') {
      return
    }
    setNotification(false)
  }
  const onClose = () => {
    setVisible(false)
  }
  const slider = (newValue: any) => {
    setSliderValue(newValue)
  }
  const save = () => {
    let obj = {
      menuPosition: menuPosition,
      menuWidth: sliderValue,
    }
    dispatch(setSetting(obj))
    setNotification({
      isOpen: true,
      message: `Menu position: ${menuPosition}, Menu width: ${sliderValue}.  Changes saved`,
    })
  }

  const themeFunction = () => {
    dispatch(theme())
    setNotification({
      isOpen: true,
      message: `Theme changed to ${themeState === 'dark' ? 'light' : 'dark'}`,
    })
  }

  const positionSet = (position: string) => {
    setMenuPosition(position)
    setVisible(true)
  }

  return (
    <div className='settings'>
      <h1>Settings</h1>

      <div className='sideMenuSettings'>
        <h1>Side menu settings</h1>
        <p>Menu width:</p>
        <Slider
          min={15}
          max={100}
          value={sliderValue}
          onChange={(e: any) => slider(e.target.value)}
          size='small'
          valueLabelDisplay='auto'
        />
        <p>Menu position:</p>
        <Checkbox
          onClick={() => positionSet('left')}
          checked={menuPosition === 'left' ? true : false}
        >
          Left
        </Checkbox>
        <Checkbox
          onClick={() => positionSet('right')}
          checked={menuPosition === 'right' ? true : false}
        >
          right
        </Checkbox>
        <Checkbox
          onClick={() => positionSet('top')}
          checked={menuPosition === 'top' ? true : false}
        >
          top
        </Checkbox>
        <Checkbox
          onClick={() => positionSet('bottom')}
          checked={menuPosition === 'bottom' ? true : false}
        >
          bottom
        </Checkbox>

        <Drawer
          placement={menuPosition}
          title='Menu'
          width={sliderValue * 10}
          onClose={onClose}
          visible={visible}
        />
        <Button type='default' onClick={save}>
          Save changes
        </Button>
      </div>
      <div className='themeSwither'>
        <h1>Theme swither</h1>
        <div>
          <Switch
            onClick={themeFunction}
            checked={themeState === 'dark' ? true : false}
          />
          <p>{themeState + ' theme'}</p>
        </div>
      </div>
      <Snackbar
        open={notification.isOpen}
        autoHideDuration={3500}
        onClose={handleCloseNotification}
        message={notification.message}
      />
    </div>
  )
}
