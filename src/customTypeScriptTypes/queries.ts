interface IFilter {
  property: string;
  condition: string;
  value: any;
}

/**
 * @param selectFields by default will return all fields
 */
interface IGetDocumentsByFilters {
  filters: IFilter;
  selectFields: string[];
  orderBy: {
    property: string;
    ascending: boolean;
  };
  numberOfResults: number;
}

interface IGetDocumentsByIds {
  collection: string;
  ids: string[];
}

interface IGetDocumentById {
  id: string;
  collection: string;
}
