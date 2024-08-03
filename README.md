# useValueMutation
在开发中经常遇到这样的需求:受控组件要防抖地进行更新.  
useValueMutation可以解决这个问题,它可以帮助受控组件管理value.  
# 用法
```tsx
  const InputWithMutation:FC<{value:string,onChange:(newVal:string)=>void}> = props=>{
    const [value,onChange] = useValueMutation(props.value,props.onChange)
    return <input value={value} onChange={e => onChange(e.target.value)} />
  }
 
  const Comp:FC=()=>{
   const [text,setText] = useState('')
   return (
     <>
       <button onClick={()=>setText('reset')}>{text}</button>
       <InputWithMutation value={text} onChange={debounce(setText,1000)}/>
     </>
   )
  }
 ```
# 源码
`./useValueMutation/index.ts`
# 示例
`npm run example`  
示例源码`./app/page.tsx`
