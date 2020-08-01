import React, {useState} from "react";
import {changeProp, IDataProps} from "../App/App";
import styles from "./Item.module.css";
import CheckboxDelete from "../CheckboxDelete/CheckboxDelete";

interface IItemProps extends IDataProps {
    onClickDelete: (arg: number) => void
    changeItem: (arg: string, arg2: number, arg3 : changeProp) => void
}

const Item: React.FC<IItemProps> =
    ({id,
    name,
    type,
    color,
    changeItem,
    editedShow,
    onClickDelete}) => {

    const [currentName, setCurName] = useState(name);
    const [currentType, setCurType] = useState(type);
    const [currentColor, setCurColor] = useState(color);
    const [currentEdited, setCurEdited] = useState(editedShow)

    const onKeyEvent =
        (event: any, arg: string,  id: number, prop: changeProp) => {
        if (event.key === "Enter") {
            changeItem(arg, id, prop)
            setCurEdited(true);
            setTimeout(hideEditedIcon, 1000)

        }
    }

    const onDoubleClick = (arg: string,  id: number, prop: changeProp) => {
        changeItem(arg, id, prop)
        setCurEdited(true);
        setTimeout(hideEditedIcon, 1000)
    }

    const hideEditedIcon = () => {
        setCurEdited(false)
    }

    return (<div className={styles.item}>
        <input className={styles.input_name}
               style={{color: currentColor}}
               type="text"
               value={currentName}
               onDoubleClick={() => onDoubleClick(currentName, id, "name")}
               onKeyPress={event =>
                   onKeyEvent(event, currentName, id, "name")}
               onChange={event => setCurName(event.target.value)}/>
        <input className={styles.input_type} type="text"
               style={{color: currentColor}}
               value={currentType}
               onDoubleClick={() => onDoubleClick(currentType, id, "type")}
               onKeyPress={event =>
                   onKeyEvent(event, currentType, id, "type")}
               onChange={event => setCurType(event.target.value)}/>
        <input className={styles.input_color} type="color"
               value={color}
               onChange={event => {
                   setCurColor(event.target.value)
                   changeItem(event.target.value, id, "color")
               }}/>
        <CheckboxDelete id={id} onClickDelete={onClickDelete}/>
        {currentEdited? <div className={styles.edited_icon}/>: ''}
    </div>)
}


export default Item;