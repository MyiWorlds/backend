interface Circle {
  id?: string | null;
  cached?: boolean;
  cache?: any;
  collection?: string | null;
  pii?: boolean | null;
  parent?: string | null;
  clonedFrom?: string | null;
  slug?: string | null;
  public?: boolean | null;
  passwordRequired?: boolean | null;
  type?: string | null;
  settings?: string | null;
  rating?: string | null;
  tags?: string[] | null;
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  media?: string | null;
  icon?: string | null;
  creator?: string | null;
  owner?: string | null;
  viewers?: string[] | null;
  editors?: string[] | null;
  dateCreated?: any | null;
  dateUpdated?: any | null;
  string?: string | null;
  data?:
    | any
    | null
    | IGetDocumentsByFilters
    | IGetDocumentById
    | IGetDocumentsByIds;
  number?: number | null;
  bigNumber?: any | null;
  boolean?: boolean | null;
  date?: any | null;
  geoPoint?: any | null;
  line?: string | null;
  lines?: string[] | null;
}
