/** eslint-disable */
/** ЭТОТ ФАЙЛ АВТОМАТИЧЕСКИ СГЕНЕРИРОВАН, ЕСЛИ НУЖНО ПЕРЕСОБРАТЬ ФАЙЛ yarn graphql */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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
