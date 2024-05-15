/** eslint-disable */
/** ЭТОТ ФАЙЛ АВТОМАТИЧЕСКИ СГЕНЕРИРОВАН, ЕСЛИ НУЖНО ПЕРЕСОБРАТЬ ФАЙЛ yarn graphql */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export enum Directions {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type FilterInput = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<UserResponse>;
  sendTransaction: TransactionResponse;
};


export type MutationCreateUserArgs = {
  input?: InputMaybe<UserInput>;
};


export type MutationSendTransactionArgs = {
  amount: Scalars['Float']['input'];
  username: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAllUsers?: Maybe<Array<Maybe<User>>>;
  login?: Maybe<UserResponse>;
  userInfo: User;
  userTransactions?: Maybe<Array<Maybe<UserTransaction>>>;
};


export type QueryGetAllUsersArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type QueryUserInfoArgs = {
  sort?: InputMaybe<SortInput>;
};

export type SortInput = {
  direction?: InputMaybe<Directions>;
  field?: InputMaybe<Scalars['String']['input']>;
};

export type Transaction = {
  __typename?: 'Transaction';
  amount?: Maybe<Scalars['Float']['output']>;
  date?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  user?: Maybe<User>;
};

export type TransactionResponse = {
  __typename?: 'TransactionResponse';
  trans_token?: Maybe<UserTransaction>;
};

export type User = {
  __typename?: 'User';
  balance: Scalars['Float']['output'];
  email: Scalars['String']['output'];
  transactions?: Maybe<Array<Maybe<UserTransaction>>>;
  username: Scalars['String']['output'];
};

export type UserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  token_id: Scalars['String']['output'];
  user?: Maybe<User>;
};

export type UserTransaction = {
  __typename?: 'UserTransaction';
  amount?: Maybe<Scalars['Float']['output']>;
  balance?: Maybe<Scalars['Float']['output']>;
  date?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type CreateUserMutationVariables = Exact<{
  input?: InputMaybe<UserInput>;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'UserResponse', token_id: string, user?: { __typename?: 'User', email: string } | null } | null };

export type GetAllUsersQueryVariables = Exact<{
  filter?: InputMaybe<FilterInput>;
}>;


export type GetAllUsersQuery = { __typename?: 'Query', getAllUsers?: Array<{ __typename?: 'User', username: string, email: string, balance: number } | null> | null };

export type LoginQueryVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginQuery = { __typename?: 'Query', login?: { __typename?: 'UserResponse', token_id: string, user?: { __typename?: 'User', email: string, balance: number } | null } | null };

export type SendTransactionMutationVariables = Exact<{
  username: Scalars['String']['input'];
  amount: Scalars['Float']['input'];
}>;


export type SendTransactionMutation = { __typename?: 'Mutation', sendTransaction: { __typename?: 'TransactionResponse', trans_token?: { __typename?: 'UserTransaction', id?: number | null, date?: string | null, username?: string | null, amount?: number | null, balance?: number | null } | null } };

export type UserInfoWithoutTransactionsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserInfoWithoutTransactionsQuery = { __typename?: 'Query', userInfo: { __typename?: 'User', username: string, email: string, balance: number } };

export type UserInfoQueryVariables = Exact<{
  sort?: InputMaybe<SortInput>;
}>;


export type UserInfoQuery = { __typename?: 'Query', userInfo: { __typename?: 'User', username: string, email: string, balance: number, transactions?: Array<{ __typename?: 'UserTransaction', id?: number | null, date?: string | null, username?: string | null, balance?: number | null, amount?: number | null } | null> | null } };


export const CreateUserDocument = gql`
    mutation createUser($input: UserInput) {
  createUser(input: $input) {
    user {
      email
    }
    token_id
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const GetAllUsersDocument = gql`
    query getAllUsers($filter: FilterInput) {
  getAllUsers(filter: $filter) {
    username
    email
    balance
  }
}
    `;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
      }
export function useGetAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>;
export type GetAllUsersQueryResult = Apollo.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const LoginDocument = gql`
    query login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      email
      balance
    }
    token_id
  }
}
    `;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;
export const SendTransactionDocument = gql`
    mutation sendTransaction($username: String!, $amount: Float!) {
  sendTransaction(username: $username, amount: $amount) {
    trans_token {
      id
      date
      username
      amount
      balance
    }
  }
}
    `;
export type SendTransactionMutationFn = Apollo.MutationFunction<SendTransactionMutation, SendTransactionMutationVariables>;

/**
 * __useSendTransactionMutation__
 *
 * To run a mutation, you first call `useSendTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendTransactionMutation, { data, loading, error }] = useSendTransactionMutation({
 *   variables: {
 *      username: // value for 'username'
 *      amount: // value for 'amount'
 *   },
 * });
 */
export function useSendTransactionMutation(baseOptions?: Apollo.MutationHookOptions<SendTransactionMutation, SendTransactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendTransactionMutation, SendTransactionMutationVariables>(SendTransactionDocument, options);
      }
export type SendTransactionMutationHookResult = ReturnType<typeof useSendTransactionMutation>;
export type SendTransactionMutationResult = Apollo.MutationResult<SendTransactionMutation>;
export type SendTransactionMutationOptions = Apollo.BaseMutationOptions<SendTransactionMutation, SendTransactionMutationVariables>;
export const UserInfoWithoutTransactionsDocument = gql`
    query userInfoWithoutTransactions {
  userInfo {
    username
    email
    balance
  }
}
    `;

/**
 * __useUserInfoWithoutTransactionsQuery__
 *
 * To run a query within a React component, call `useUserInfoWithoutTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserInfoWithoutTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserInfoWithoutTransactionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserInfoWithoutTransactionsQuery(baseOptions?: Apollo.QueryHookOptions<UserInfoWithoutTransactionsQuery, UserInfoWithoutTransactionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserInfoWithoutTransactionsQuery, UserInfoWithoutTransactionsQueryVariables>(UserInfoWithoutTransactionsDocument, options);
      }
export function useUserInfoWithoutTransactionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserInfoWithoutTransactionsQuery, UserInfoWithoutTransactionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserInfoWithoutTransactionsQuery, UserInfoWithoutTransactionsQueryVariables>(UserInfoWithoutTransactionsDocument, options);
        }
export type UserInfoWithoutTransactionsQueryHookResult = ReturnType<typeof useUserInfoWithoutTransactionsQuery>;
export type UserInfoWithoutTransactionsLazyQueryHookResult = ReturnType<typeof useUserInfoWithoutTransactionsLazyQuery>;
export type UserInfoWithoutTransactionsQueryResult = Apollo.QueryResult<UserInfoWithoutTransactionsQuery, UserInfoWithoutTransactionsQueryVariables>;
export const UserInfoDocument = gql`
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
    `;

/**
 * __useUserInfoQuery__
 *
 * To run a query within a React component, call `useUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserInfoQuery({
 *   variables: {
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useUserInfoQuery(baseOptions?: Apollo.QueryHookOptions<UserInfoQuery, UserInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserInfoQuery, UserInfoQueryVariables>(UserInfoDocument, options);
      }
export function useUserInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserInfoQuery, UserInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserInfoQuery, UserInfoQueryVariables>(UserInfoDocument, options);
        }
export type UserInfoQueryHookResult = ReturnType<typeof useUserInfoQuery>;
export type UserInfoLazyQueryHookResult = ReturnType<typeof useUserInfoLazyQuery>;
export type UserInfoQueryResult = Apollo.QueryResult<UserInfoQuery, UserInfoQueryVariables>;