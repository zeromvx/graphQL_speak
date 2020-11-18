import {gql} from 'apollo-boost';

export const addBookMutation = gql`
    mutation addBook($title: String!, $description: String!) {
        addBook(title: $title, description: $description) {
            id
        }
    }
`;