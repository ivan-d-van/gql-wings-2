import { gql } from '@apollo/client';

export const USER_INFO_WITHOUT_TRANSACTIONS = gql`
    query userInfoWithoutTransactions {
        userInfo {
            username
            email
            balance
        }
    }
`;
