import { Rating } from "@mui/material";
import React from "react";

type RatingProps = {
  // MUI Rating component props
  name?: string;
  value?: number;
  readonly?: boolean;
};

const RatingReact: React.FC<RatingProps> = ({
  value = 3,
  name,
  readonly = false,
}) => {
  const [ratingValue, setRatingValue] = React.useState<number>(value);
  return (
    <>
      <Rating
        name={name}
        value={value ? value : ratingValue}
        onChange={(event, newValue) => {
          setRatingValue(newValue);
        }}
        readOnly={readonly}
      />
    </>
  );
};

export default RatingReact;
