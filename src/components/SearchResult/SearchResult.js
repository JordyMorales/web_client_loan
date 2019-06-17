import React from "react";
import { Card } from "semantic-ui-react";

const ResultSearch = ({ value }) => {
  return <Card header={`${value} $us`} description="Debt" />;
};

export default ResultSearch;
