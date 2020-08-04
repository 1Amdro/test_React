import React from "react";
import Item from "../Item/Item";
import {changeProp, IDataProps} from "../App/App";
import styles from "./ItemList.module.css"

interface IItemListProps {
    list: IDataProps[],
    onClickDelete: (arg: number) => void
    changeItem: (arg: string, arg2: number, arg3: changeProp) => void
    onClickSort: () => void
}

const ItemList: React.FC<IItemListProps> =
    ({list, onClickDelete, changeItem, onClickSort}) => {

    return (
        <div className={styles.list_container}>
            <ul className={styles.list}>
                <div className={styles.column}>
                    <div>Name
                        <button onClick={() => onClickSort()}
                            className={styles.button_sort}/>
                    </div>
                    <div>Type</div>
                    <div>Color</div>
                </div>
                {list.map( (item: IDataProps ) =>
                    <li key={item.id}>
                        <Item id={item.id}
                              name={item.name}
                              type={item.type}
                              color={item.color}
                              editedShow={item.editedShow}
                              changeItem={changeItem}
                              onClickDelete={onClickDelete}
                        />
                    </li>
                )}
            </ul>
        </div>
    )
}


export default ItemList;