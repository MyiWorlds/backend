interface Filter {
  property: string;
  condition: string;
  value: string | number | boolean | Date | null;
}

interface GetDocumentsByFilters {
  filters: Filter;
  orderBy: {
    property: string;
    ascending: boolean;
  };
  numberOfResults: number;
}

interface GetDocumentsByIds {
  collection: string;
  ids: string[];
}

interface GetDocumentById {
  id: string;
  collection: string;
}
