import React, {ChangeEvent, Dispatch, SetStateAction, useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import {useMutation} from "@apollo/client";
import {addBookMutation} from "./mutations";
import {booksQuery} from "../AllBooks/queries";

type OuterProps = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const AddBookDialog: React.FC<OuterProps> = ({isOpen, setIsOpen}) => {
    const [addBook, result] = useMutation(addBookMutation);
    const [newBook, setNewBook] = useState({
        title: '',
        description: '',
    });

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const {name} = e.target;
        setNewBook({
            ...newBook,
            [name]: e.target.value
        })
    }

    const handleSubmit = (): void => {
        addBook({
            variables: {
                title: newBook.title,
                description: newBook.description
            },
            refetchQueries: [{query: booksQuery}]
        })
    }

    return (
        <Dialog open={isOpen}>
            <DialogTitle>
                <IconButton aria-label="close" onClick={() => setIsOpen(false)}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <TextField name="title" label="Название" onChange={handleInput} fullWidth/>
                <TextField name="description" label="Описание" onChange={handleInput} fullWidth/>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleSubmit}> Добавить</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddBookDialog;
