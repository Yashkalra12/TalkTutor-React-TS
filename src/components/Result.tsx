import {
  Button,
  Container,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearState } from "../redux/slice";
import { useNavigate } from "react-router-dom";
import { countMatchingElements } from "../utils/features";

const Result = () => {
  const { words, result } = useSelector(
    (state: { root: StateType }) => state.root
  );
  const correctAns = countMatchingElements(
    result,
    words.map((word) => word.meaning)
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const percentage = (correctAns / words.length) * 100;

  const resetHandler = () => {
    dispatch(clearState());
    navigate("/");
  };

  return (
    <Container maxWidth={"sm"}>
      <Typography
        variant="h3"
        color={"secondary"}
        m={"2rem 0"}
      >
        Result
      </Typography>
      <Typography
        m={"1rem"}
        variant="h6"
      >
        You got {correctAns} right out of {words?.length}
      </Typography>
      <Stack
        direction={"row"}
        justifyContent={"space-evenly"}
      >
        <Stack>
          <Typography
            m={"1rem 0"}
            variant="h5"
          >
            Your Ans
          </Typography>
          <List>
            {result.map((value, idx) => (
              <ListItem key={idx}>
                {idx + 1} - {value}
              </ListItem>
            ))}
          </List>
        </Stack>
        <Stack>
          <Typography
            m={"1rem 0"}
            variant="h5"
          >
            Correct Ans
          </Typography>
          <List>
            {words.map((value, idx) => (
              <ListItem key={idx}>
                {idx + 1} - {value.meaning}
              </ListItem>
            ))}
          </List>
        </Stack>
      </Stack>
      <Typography
        m={"1rem"}
        variant="h5"
        color={percentage > 50 ? "#21ff72" : "#ff4d21"}
      >
        {percentage > 50 ? "Pass" : "Fail"}
      </Typography>
      <Button
        sx={{ margin: "1rem" }}
        variant="contained"
        color="secondary"
        onClick={resetHandler}
      >
        Reset
      </Button>
    </Container>
  );
};

export default Result;
