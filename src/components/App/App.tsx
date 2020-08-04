import React, {useState, useEffect, useLayoutEffect} from "react";
import ItemList from "../ItemList/ItemList";
import styles from "./App.module.css";
import InputData from "../InputData/InputData";

export type changeProp = "name" | "color" | "type";


export interface IDataProps {
  id: number
  name: string
  type: string
  color: string
  editedShow: boolean
}

const App: React.FC = () => {
  const [count, setCount] = useState(2);
  const [sortData, setSortData] = useState(false)
  const [data, setData] = useState<IDataProps[]>([
    {
      id: 1,
      name: "Dave",
      type: "main",
      color: "#d25e5e",
      editedShow: false
    },
    {
      id: 2,
      name: "Ron",
      type: "side",
      color: "#a631d2",
      editedShow: false
    }
  ])


  const onClickDelete = (id: number): void => {
    setData(data.filter(item => item.id !== id ))
  }

  const changeItem = (arg: string, id: number, prop: changeProp): void => {
    const newItems = data.map(item => {
      const newItem = {...item};
      if (item.id === id) {
        if (prop === "name") {
          newItem.name = arg;
        } else if (prop === "type") {
          newItem.type = arg;
        } else if (prop === "color") {
          newItem.color = arg;
        }
      }
      return newItem
    })
    setData(newItems)
  }

  useEffect(() => {
    localStorage.setItem('my-data', JSON.stringify(data))
    localStorage.setItem('my-count', JSON.stringify(count))
  }, [data, count])

  useLayoutEffect(() => {
    const dataLoc = localStorage.getItem('my-data')
    const dataCount = localStorage.getItem('my-count')
    if (dataLoc && dataCount) {
      setData(JSON.parse(dataLoc))
      setCount(JSON.parse(dataCount))
    }
  }, [])

  const compareName = function (emp1: any, emp2: any) {
    if (emp1.name > emp2.name) { return -1; }
    if (emp1.name < emp2.name) {return 1; }
    return 0;
  }

  const compareNameReverse = function (emp1: any, emp2: any) {
    if (emp1.name < emp2.name) { return -1; }
    if (emp1.name > emp2.name) {return 1; }
    return 0;
  }
  const onClickSort = () => {
    let sortedList = null;
    const newItem: any = data.map(item => item);
    if (!sortData) {
      sortedList = newItem.sort(compareName)
      setSortData(true)
    } else {
      sortedList = newItem.sort(compareNameReverse)
      setSortData(false)
    }
    setData(sortedList)

  }

  const onClickAdd = (name: string, type: string):void => {
    setData([
        ...data,
      {
        id: count + 1,
        name,
        type,
        color: "#C5E3FF",
        editedShow: false
      }
    ])
    setCount(count + 1)
  }

  return (<div className={styles.main}>
    <h1 className={styles.title}>Data table</h1>
    <InputData onClickAdd={onClickAdd}/>
    <ItemList list={data}
              onClickSort={onClickSort}
              changeItem={changeItem}
              onClickDelete={onClickDelete}/>
  </div>);
}

export default App;
