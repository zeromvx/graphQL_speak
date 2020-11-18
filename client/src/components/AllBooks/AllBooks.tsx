import React, {Dispatch, SetStateAction, MouseEvent} from 'react';
import {booksQuery, deleteBookMutation} from "./queries";
import {useMutation, useQuery} from "@apollo/client";
import {IconButton, List, ListItem, ListItemText} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {Book} from "../../types";

type OuterProps = {
    handleSelect: Dispatch<SetStateAction<string>>
}

const AllBooks: React.FC<OuterProps> = ({handleSelect}) => {
    const [deleteBook, result] = useMutation(deleteBookMutation);

    const {data: booksData = {}, loading } = useQuery(booksQuery);
    const {books = []} = booksData;

    const handleDelete = (e: MouseEvent<HTMLButtonElement>, id: string): void => {
        e.stopPropagation();

        deleteBook({
            variables: {
                id,
            },
            refetchQueries: [{query: booksQuery}]
        })
    }

    return (
        <>
            {loading && <div>Loading...</div>}
            <List>
                {books.map((book: Book) => (
                    <ListItem key={book.id} onClick={() => handleSelect(book.id)} button>
                        <ListItemText primary={book.title}/>
                        <IconButton onClick={(e) => handleDelete(e, book.id)}>
                            <DeleteIcon/>
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </>
    );
};

export default AllBooks;