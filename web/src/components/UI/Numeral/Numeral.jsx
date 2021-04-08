import numeral from "numeral";

const UINumeral = ({ format, children }) => {
  return <span>{numeral(children).format(format)}</span>;
};
export default UINumeral;
