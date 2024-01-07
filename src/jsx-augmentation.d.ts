declare namespace JSX {
  interface ElementArray extends Array<React.ReactElement> {}
  type Element = React.ReactElement | ElementArray;
}
