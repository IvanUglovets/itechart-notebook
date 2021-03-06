import React, {FC, useState} from "react";
import {Flex} from '../UI-components'
import {useStateSelector} from "../../hooks/useStateSelector";
import {useStateDispatch} from "../../hooks/useStateDispatch";
import {closeInput, showInput} from "../../redux/slices/toggleSlice";
import AddIcon from '@mui/icons-material/Add';
import {nanoid} from "nanoid";
import {ITodo} from "../../models/interfaces/ITodos";
import {addTodo} from "../../redux/slices/todoSlice";
import {Wrapper, StyledForm,SubmitButton} from "./styled-inputTodo";
import FormTextArea from "../FormTextArea/FormTextArea";
import FormInput from "../FormInput/FormInput";
import {getFullDate} from "../../models/date/getFullDate";


const CreateTodo: FC = () => {
    const [title, setTitle] = useState<string>('')
    const [body, setBody] = useState<string>('')

    const {isShowInput} = useStateSelector(state => state.toggleInput)
    const dispatch = useStateDispatch()

    const clearInputs = () => {
        setTitle('')
        setBody('')
    }

    const handleClickInput = () => {
        dispatch(showInput())
    }

    const handleFocus = () => {
        dispatch(showInput())
    }

    const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const todo: ITodo = {
            id: nanoid(8),
            title,
            body,
            completed: false,
            date: getFullDate()
        }
        dispatch(addTodo(todo))
        clearInputs()
        dispatch(closeInput())
    }

    return (
        <Wrapper>
            <Flex direction='column' width='100%' justify='center' align='center'>
                <StyledForm onSubmit={formSubmit}>
                    <FormInput
                        isShowInput={isShowInput}
                        handleClickInput={handleClickInput}
                        title={title}
                        setTitle={setTitle}
                        handleFocus={handleFocus}
                    />
                    {isShowInput ?
                        <>
                            <FormTextArea body={body} setBody={setBody}/>
                            <SubmitButton color="primary" aria-label="add" size='small' type='submit' disabled={!(title || body)}>
                                <AddIcon/>
                            </SubmitButton>
                        </> :
                        null}
                </StyledForm>
            </Flex>
        </Wrapper>
    )
}


export default CreateTodo;