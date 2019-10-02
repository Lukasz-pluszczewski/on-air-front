import React  from 'react';
import { Spinner } from "react-bootstrap";

const Loader = () => (
  <Spinner size="lg" animation="grow" variant="light" role="status">
    <span className="sr-only">Loading...</span>
  </Spinner>
);

export default Loader;
