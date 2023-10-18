export function volume2VOL(volume?: number | string) {
  if (!volume) return null;
  const v = Number(volume);
  switch (v) {
    case 2011:
      return 'VOL.1';
    case 2012:
      return 'VOL.2';
    case 2013:
      return 'VOL.3';
    case 2014:
      return 'VOL.4';
    case 2015:
      return 'VOL.5';
    case 2016:
      return 'VOL.6';
    case 2017:
      return 'VOL.7';
    case 2018:
      return 'VOL.8';
    case 2019:
      return 'VOL.9';
    case 2020:
      return 'VOL.10';
    case 2021:
      return 'VOL.11';
    default:
      return '';
  }
}
