import React from "react";
import { Card } from "semantic-ui-react";

const ResultSearch = props => {
  return <Card header={`${props.value} $us`} description="Debt" />;
};

export default ResultSearch;
