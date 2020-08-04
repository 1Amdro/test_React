import React from "react";
import styles from "./CheckboxDelete.module.css";

export interface ICheckboxDeleteProps {
    onClickDelete: (id: number) => void
    id: number
}

const CheckboxDelete: React.FC<ICheckboxDeleteProps> = ({id, onClickDelete}) => {

    return (<>
        <input className={styles.input_del}
               id={`del${id}`}
               onClick={() => onClickDelete(id)}
               type="checkbox"/>
        <label className={styles.label_del}
               htmlFor={`del${id}`}/>
    </>)
}

export default CheckboxDelete;