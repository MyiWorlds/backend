interface IFilter {
  property: string;
  condition: '==' | '<' | '>' | '<=' | '>=' | 'array-contains';
  value: any;
}

interface IOrderBy {
  property: string;
  ascending: boolean;
}

interface IGetDocumentsByFilters {
  filters: IFilter;
  orderBy: IOrderBy;
  numberOfResults: number;
  hasMoreResults: boolean;
}

interface IGetDocumentsByFiltersResponse {
  type: string;
  data: {
    collection: string;
    filters: IFilter[];
    orderBy: IOrderBy;
    numberOfResults: number;
    hasMoreResults: boolean;
    cursor: any | null;
  };
  lines: any[];
}

interface IGetDocumentsByIds {
  collection: string;
  ids: string[];
}

interface IGetDocumentById {
  id: string;
  collection: string;
}
