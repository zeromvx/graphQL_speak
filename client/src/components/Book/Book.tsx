import React from 'react';
import {useQuery} from "@apollo/client";
import { bookQuery } from "./queries";

type OuterProps = {
    bookId: string;
}

const Book: React.FC<OuterProps> = ({bookId}) => {
    const {data = {}, loading, error} = useQuery(bookQuery, {
        variables: {
            id: bookId,
        }
    });

    const {book = {}} = data;

    return (
        <div>{book.description}</div>
    );
};

export default Book;