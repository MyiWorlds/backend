interface Filter {
  property: string;
  condition: string;
  value: string | number | boolean | Date | null;
}

interface GetDocumentsByFilters {
  filters: Filter;
  orderBy: string;
  requestedNumberOfResults: number;
}

interface GetDocumentsByIds {
  collection: string;
  ids: string[];
}

interface GetDocumentById {
  id: string;
  collection: string;
}

interface Circle {
  id?: string | null;
  collection?: string | null;
  pii?: boolean | null;
  parent?: string | null;
  slug?: string | null;
  public?: boolean | null;
  passwordRequired?: boolean | null;
  type?: string | null;
  settings?:
    | any
    | null
    | GetDocumentsByFilters
    | GetDocumentById
    | GetDocumentsByIds;
  styles?: string | null;
  rating?: string | null;
  tags?: string[] | null;
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  media?: string | null;
  icon?: string | null;
  creator?: String | null;
  owner?: String | null;
  viewers?: Array<String> | null;
  editors?: Array<String> | null;
  dateCreated?: any | null;
  dateUpdated?: any | null;
  string?: string | null;
  data?: any | null;
  number?: number | null;
  bigNumber?: any | null;
  boolean?: boolean | null;
  date?: any | null;
  geoPoint?: any | null;
  lines?: string[] | null;
}
