import {gql} from "@apollo/client";

export const booksQuery = gql`
    query booksQuery {
        books {
            id
            title
        }
    }
`;

export const deleteBookMutation = gql`
    mutation deleteBook($id: ID) {
        deleteBook(id: $id) {
            id
        }
    }
`;