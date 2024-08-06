import { useCallback, useRef, useState } from "react";

/**
 * value突变时组件应用最新的value值,其余时刻表现如同非受控组件.
 * @param value 监听突变的值
 * @param onChange 变更函数
 * @param isEqual 比较函数.默认Object.is
 * @example
 * const InputWithMutation:FC<{value:string,onChange:(newVal:string)=>void}> = props=>{
 *   const [value,onChange] = useValueMutation(props.value,props.onChange)
 *   return <input value={value} onChange={e => onChange(e.target.value)} />
 * }
 *
 * const Comp:FC=()=>{
 *  const [text,setText] = useState('')
 *  return (
 *    <>
 *      <button onClick={()=>setText('reset')}>{text}</button>
 *      <InputWithMutation value={text} onChange={debounce(setText,1000)}/>
 *    </>
 *  )
 * }
 */
export function useValueMutation<T, V>(
  value: T,
  onChange: (newVal: T) => V,
  isEqual: (val1?: T, val2?: T) => boolean = Object.is
) {
  const prevValueRef = useRef(value);
  const [changedValue, setChangedValue] = useState<T>(value);
  const isUncontrolledRef = useRef(false);
  const onInnerChange = useCallback(
    (newVal: T) => {
      isUncontrolledRef.current = true;
      setChangedValue(newVal);
      return onChange(newVal);
    },
    [onChange]
  );
  const equal =
    isEqual(prevValueRef.current, value) || isEqual(value, changedValue);
  if (!equal) {
    isUncontrolledRef.current = false;
  }
  const curValue = isUncontrolledRef.current ? changedValue : value;

  prevValueRef.current = value;
  return [curValue, onInnerChange] as const;
}
