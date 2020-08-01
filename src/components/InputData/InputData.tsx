import React, {useState} from "react";
import styles from "./InputData.module.css";
interface IInputDataProps {
    onClickAdd:
        (arg: string, arg2: string) => void;
}

interface IInputDataState {
        name: string;
        type: string;
        miniError: string;
}

const InputData: React.FC<IInputDataProps> = ({onClickAdd}) => {

    const [info, setInfo] = useState<IInputDataState>({
        name: "",
        type: "",
        miniError: ""
    })

    const onClickButton = () => {
        if((info.name.trim() !== "") && (info.type.trim() !== "")) {
            onClickAdd(info.name, info.type)
            setInfo({name: "", type: "",
                miniError: ""})
        }
        else {
            setInfo(prevState =>({
                ...prevState,
                miniError: 'Error! Empty field'
            }) )
        }
    }


    return (<div >
        <div className={styles.box}>
            <input
                className={styles.inputItem}
                type="text"
                placeholder="Enter a name"
                value={info.name}
                onChange={event => setInfo({
                    ...info,
                    name: event.currentTarget.value,
                    miniError:""
                })}
                autoComplete='off'
                required
            />
            <input
                className={styles.inputItem}
                type="text"
                placeholder="Enter the type"
                value={info.type}
                onChange={event => setInfo({
                    ...info,
                    type: event.currentTarget.value,
                    miniError:""
                })}
                autoComplete='off'
                required
            />
        </div>
        <div className={styles.button_container}>
            <input
                className={styles.button}
                type="submit"
                value="ADD"
                onClick={onClickButton}
            />
            <p className={styles.errorInput}>{info.miniError}</p>
        </div>

    </div>)
}

export default InputData;
