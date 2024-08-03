'use client'

import { useValueMutation } from "@/useValueMutation"
import { debounce } from "lodash-es"
import { FC, useState } from "react"

const Demo1: FC = () => {
  const [text, setText] = useState('')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
      <button onClick={() => setText(Math.random().toString(36).slice(2))}>突变</button>
      {text}
      <InputWithMutation value={text} onChange={debounce(setText, 1000)} />
    </div>
  )
}

export default Demo1

const InputWithMutation: FC<{ value: string, onChange: (newVal: string) => void }> = props => {
  const [value, onChange] = useValueMutation(props.value, props.onChange)
  return <input value={value} onChange={e => onChange(e.target.value)} />
}

const DatePickerWithMutation: FC<{ value: string, onChange: (newVal: string) => void }> = props => {
  const [value, onChange] = useValueMutation(props.value, props.onChange, (val1, val2) => {
    if (!val1 || !val2) return false
    return new Date(val1).getTime() === new Date(val2).getTime()
  })
  return (
    <input type='date'
      value={new Date(value).toJSON().slice(0,10)}
      onChange={e => onChange(e.target.value)}
    />
  )
}

/** 这是一个需要自定义isEqual函数的例子 */
const Demo2: FC = () => {
  const [date, setDate] = useState(()=>new Date().toLocaleString())
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
      <button onClick={() => setDate(new Date().toLocaleString())}>突变</button>
      {new Date(date).toLocaleString()}
      <DatePickerWithMutation value={date} onChange={debounce(setDate, 1000)} />
    </div>
  )
}