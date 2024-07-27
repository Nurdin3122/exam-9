export interface Category {
    id:string
    name:string;
    type:string;
}

export interface CategoryMutation {
    name:string;
    type:string;
}

export type ApiCategory = Omit<Category, 'id'>;

export interface ApiCategories{
    [id: string]: ApiCategory;
}

export interface Transaction {
    id:string;
    IdCategory:string;
    amount:number;
    createdAt:string;
}
export interface TransactionMutation {
    type:string;
    category:string;
    amount:number;
    createdAt:string;
}

export type ApiTransaction = Omit<Transaction, 'id'>;

export interface ApiTransactions {
    [id: string]: ApiTransaction;
}

