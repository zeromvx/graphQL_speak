import React, {useState} from 'react';
import './App.css';
import AllBooks from "./components/AllBooks/AllBooks";
import Book from "./components/Book/Book";
import AddIcon from '@material-ui/icons/Add';
import {
    Grid,
    IconButton, Typography
} from "@material-ui/core";
import AddBookDialog from "./components/AddBookDialog/AddBookDialog";

function App() {
    const [selectedBookId, setSelectedBookId] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Grid container direction="column" justify="center">
            <AddBookDialog isOpen={isOpen} setIsOpen={setIsOpen}/>

            <Grid item>
                <Typography variant="h4">Все книги</Typography>
                <IconButton onClick={() => setIsOpen(true)}>
                    <AddIcon/>
                </IconButton>
            </Grid>
            <Grid item>
                <AllBooks handleSelect={setSelectedBookId}/>
            </Grid>
            <Grid item>
                {!!selectedBookId && <Book bookId={selectedBookId}/>}
            </Grid>
        </Grid>
    );
}

export default App;
