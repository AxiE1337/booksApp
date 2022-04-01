import { useEffect, useState } from 'react'

export default function useSetting() {
  const [settings, setSetting] = useState<any>({})

  const saveSettings = (settingsData: any) => {
    localStorage.setItem('settings', JSON.stringify(settingsData))
    setSetting(settingsData)
  }
  const getSettingsFunction = (settingsData: any) => {
    setSetting(settingsData)
  }
  useEffect(() => {
    let storageSettings: any = localStorage.getItem('settings')
    storageSettings = JSON.parse(storageSettings)
    getSettingsFunction(storageSettings)
  }, [])
  return { saveSettings, settings }
}
