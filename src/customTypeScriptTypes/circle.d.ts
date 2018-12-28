interface Circle {
  id?: string | null;
  cached?: boolean;
  cache?: any;
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
  line?: string | null;
  lines?: string[] | null;
}
