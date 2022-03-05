export default function convertValueVoltage(value) {
  switch (value) {
    case 0:
      return '2V';
    case 1:
      return '200mV';
    case 2:
      return '400mV';
    case 3:
      return '1V';
    default:
      return value;
  }
}
