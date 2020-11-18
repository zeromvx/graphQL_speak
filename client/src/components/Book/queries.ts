import {gql} from "@apollo/client";

export const bookQuery = gql`
    query bookQuery($id: ID!) {
        book(id: $id) {
            description
        }
    }
`;