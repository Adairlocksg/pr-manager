import { ComboBoxItem } from "./Combobox";

export enum EnumUpdatePrInterval {
  FIVE_SECONDS = 5000,
  TEN_SECONDS = 10000,
  THIRTY_SECONDS = 30000,
  ONE_MINUTE = 60000,
  NOT_DEFINED = 0,
}

export const EnumUpdatePrIntervalToCombo: ComboBoxItem[] = [
  {
    value: EnumUpdatePrInterval.FIVE_SECONDS.toString(),
    label: "5 segundos",
  },
  {
    value: EnumUpdatePrInterval.TEN_SECONDS.toString(),
    label: "10 segundos",
  },
  {
    value: EnumUpdatePrInterval.THIRTY_SECONDS.toString(),
    label: "30 segundos",
  },
  {
    value: EnumUpdatePrInterval.ONE_MINUTE.toString(),
    label: "1 minuto",
  },
  {
    value: EnumUpdatePrInterval.NOT_DEFINED.toString(),
    label: "Não definido",
  },
];

export const stringUpdateIntervalToEnum = (
  value: string
): EnumUpdatePrInterval => {
  switch (value) {
    case EnumUpdatePrInterval.FIVE_SECONDS.toString():
      return EnumUpdatePrInterval.FIVE_SECONDS;
    case EnumUpdatePrInterval.TEN_SECONDS.toString():
      return EnumUpdatePrInterval.TEN_SECONDS;
    case EnumUpdatePrInterval.THIRTY_SECONDS.toString():
      return EnumUpdatePrInterval.THIRTY_SECONDS;
    case EnumUpdatePrInterval.ONE_MINUTE.toString():
      return EnumUpdatePrInterval.ONE_MINUTE;
    case EnumUpdatePrInterval.NOT_DEFINED.toString():
      return EnumUpdatePrInterval.NOT_DEFINED;
    default:
      return EnumUpdatePrInterval.NOT_DEFINED;
  }
};

export default EnumUpdatePrInterval;
