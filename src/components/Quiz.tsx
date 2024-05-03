import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Button,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { saveResult } from "../redux/slice";

const Quiz = () => {
  const [result, setResult] = useState<string[]>([]);
  const [count, setCount] = useState<number>(0);
  const [ans, setAns] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { words } = useSelector((state: { root: StateType }) => state.root);

  const nextHandler = (): void => {
    setResult((prev) => [...prev, ans]);
    setCount((prev: number) => prev + 1);
    setAns("");
  };

  useEffect(() => {
    if (count + 1 > words.length) {
      navigate("/result");
    }
    dispatch(saveResult(result));
  }, [result]);

  return (
    <Container
      maxWidth="sm"
      sx={{ padding: "1rem" }}
    >
      <Typography m={"2rem 0"}>Quiz</Typography>
      <Typography variant="h5">
        {count + 1}. {words[count]?.word}
      </Typography>
      <FormControl>
        <FormLabel
          sx={{ mt: "2rem", mb: "1rem", color: "#ACC196" }}
          color="secondary"
        >
          Meaning
        </FormLabel>
        <RadioGroup
          value={ans}
          onChange={(e) => setAns(e.target.value)}
        >
          {words[count]?.options.map((word) => (
            <FormControlLabel
              key={word}
              value={word}
              control={<Radio />}
              label={word}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Button
        sx={{
          margin: "3rem 0",
        }}
        variant="contained"
        color="secondary"
        fullWidth
        onClick={nextHandler}
        disabled={ans === ""}
      >
        {count === words.length - 1 ? "Submit" : "Next"}
      </Button>
    </Container>
  );
};

export default Quiz;
