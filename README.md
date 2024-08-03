推荐使用hook useMutation
# withControlledPerformance
高阶组件.使一个非受控组件可以表现的像受控组件一样.即在value突变时,组件会应用新的value.  
相对于一般的实现,此组件的优点是可以规避在useEffect中执行setState,缺点是在突变的时候会失去焦点
# 用法
```tsx
export const App = () => {
 const initText = 'init'
 const [text,setText] = useState(initText)
 return (
   <button onClick={() => setText(initText)}>reset</button>
   <SwitchableInput value={text} onChange={setText} />
 )
}

const SwitchableInput = withSwitchableControlledState(Input)

const Input = (props: { defaultValue: string, onChange: (val: string) => void }) => {
 return <input defaultValue={props.defaultValue} onChange={e => props.onChange(e.target.value)} />
}
 ```
# 源码
`./withControlledPerformance/index.ts`
# 示例
`npm run example`  
示例源码`./app/page.tsx`
