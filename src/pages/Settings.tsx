import { useState } from 'react'
import '../styles/settings.css'
import { Drawer, Button, Slider, message, Checkbox } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { setSetting, theme } from '../redux/slices/settings'
export default function Settings() {
  const [visible, setVisible] = useState(false)
  const [menuPosition, setMenuPosition] = useState<any>('')
  const [sliderValue, setSliderValue] = useState<number>(30)
  const themeState = useSelector((state: any) => state.settings.theme)
  const dispatch = useDispatch()

  const onClose = () => {
    setVisible(false)
  }
  const slider = (value: any) => {
    setSliderValue(value)
  }
  const save = () => {
    let obj = {
      menuPosition: menuPosition,
      menuWidth: sliderValue,
    }
    dispatch(setSetting(obj))
    message.info('saved')
  }

  const themeFunction = () => {
    dispatch(theme())
    message.info(`Theme changed to ${themeState}`)
  }

  const positionSet = (position: string) => {
    setMenuPosition(position)
    setVisible(true)
  }

  return (
    <div className='settings'>
      <h1>settings</h1>

      <div className='sideMenuSettings'>
        <h1>Side menu settings</h1>
        <p>Menu width</p>
        <Slider onChange={slider} value={sliderValue} />
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

      <Button type='default' onClick={themeFunction}>
        {themeState}
      </Button>
    </div>
  )
}
