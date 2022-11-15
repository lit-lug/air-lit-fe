interface FilterDataItem {
  key: string;
  select: number;
  submenu: FilterSubMenu[];
}

interface FilterSubMenu {
  label: string;
  value: any;
}

interface FilterChangeData {
  label: string;
  labelKey?: string;
  value?: string;
}
