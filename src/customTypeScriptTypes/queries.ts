interface IFilter {
  property: string;
  condition: '==' | '<' | '>' | '<=' | '>=' | 'array-contains';
  value: any;
}

interface IOrderBy {
  property: string;
  ascending: boolean;
}

/**
 * @param selectFields by default will return all fields
 */
interface IGetDocumentsByFilters {
  filters: IFilter;
  selectFields: string[];
  orderBy: IOrderBy;
  numberOfResults: number;
}

interface IGetDocumentsByFiltersResponse {
  type: string;
  settings: {
    collection: string;
    filters: IFilter[];
    selectFields: string[];
    orderBy: IOrderBy;
    numberOfResults: number;
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