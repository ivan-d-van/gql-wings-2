import {gql} from "@apollo/client";

export const SEND_TRANSACTION = gql`
    mutation sendTransaction($username: String!, $amount: Float!) {
        sendTransaction(username: $username, amount: $amount){
            trans_token {
                id, 
                date, 
                username, 
                amount, 
                balance
            }
        }
    }
`
