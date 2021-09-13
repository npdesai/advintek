export class RequestOptions {
  searchFilter?: SearchFilter;
  sortElement?: SortElement;
  page?: number;
  pageSize?: number;
  fields?: string[];
}

export class SearchFilter {
  conditionOperator?: ConditionOperator;
  filters?: Filter[];

  public constructor(init?: Partial<SearchFilter>) {
    Object.assign(this, init);
  }
}

export enum ConditionOperator {
  And,
  Or
}

export class Filter {
  propertyName?: string;
  operator: Operator = Operator.equals;
  value: any;
  caseSensitive: boolean = false;

  displayName?: string;
  dataType?: string;
}

export enum Operator {
  equals,
  greaterThan,
  lessThan,
  greaterThanOrEqual,
  lessThanOrEqual,
  contains,
  startsWith,
  endsWith,
  notEquals,
  isNull,
  isNotNull,
  wildcard
}

export class SortElement {
  propertyName?: string;
  sortOrder: SortOrder = SortOrder.descending;
}

export enum SortOrder {
  ascending = 1,
  descending = -1,
  noSort = 0
}
