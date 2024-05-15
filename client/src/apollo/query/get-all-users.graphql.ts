import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
    query getAllUsers($filter: FilterInput) {
        getAllUsers(filter: $filter) {
            username
            email
            balance
        }
    } 
`
