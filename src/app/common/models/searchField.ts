import { NameValue } from './nameValue';

export class SearchField {
  field: string = '';
  label: string = '';
  dataType: string = 'text';
  isHidden?: boolean = false;
  isWildCard: boolean = false;

  public constructor(init?: Partial<SearchField>) {
    Object.assign(this, init);
  }
}

export class TextSearch extends SearchField {
  value?: string = '';
  readonly controlType: string = "textBox";

  public constructor(init?: Partial<TextSearch>) {
    super();
    Object.assign(this, init);
  }
}

export class DateSearch extends SearchField {
  value?: DateRange;
  isDateRange?: boolean = true;
  hasTimePicker?: boolean = false;
  readonly controlType: string = "datePicker";

  public constructor(init?: Partial<DateSearch>) {
    super();
    Object.assign(this, init);
  }
}

export class DropDownSearch extends SearchField {
  value?: string = '';
  dropDownValues: NameValue[];
  readonly controlType: string = "dropDown";

  public constructor(init?: Partial<DropDownSearch>) {
    super();
    Object.assign(this, init);
  }
}

export class DateRange {
  start?: Date;
  end?: Date;
}
