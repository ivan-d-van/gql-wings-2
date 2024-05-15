import { gql } from '@apollo/client';

export const USER_INFO = gql`
    query userInfo($sort: SortInput) {
        userInfo(sort: $sort) {
            username
            email
            balance
            transactions {
                id
                date
                username
                balance
                amount
            }
        }
    }
`
