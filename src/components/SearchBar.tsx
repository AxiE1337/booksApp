import { useState } from 'react'
import { Input, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
const { Search } = Input

export default function SearchBar() {
  const [inputValue, setInputValue] = useState<string>('')
  const navigate = useNavigate()

  const performSearch = () => {
    if (inputValue.length > 2) {
      navigate(`/findBook/${inputValue}`)
      setInputValue('')
    }
  }

  return (
    <Space>
      <Search
        placeholder='Search for books'
        onChange={(e: any) => setInputValue(e.target.value)}
        value={inputValue}
        onSearch={performSearch}
      />
    </Space>
  )
}
