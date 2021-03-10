/** Export interfaces from the request folder */

export interface GetRecipesPageQuery {
  /** The last id to query */
  lastId?: string;
  pageSize: number;
}

export interface GetUserQuery {
  uid: string;
  email: string;
}
