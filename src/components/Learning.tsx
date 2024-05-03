import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Container,
  Button,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import { ArrowBack, VolumeUp } from "@mui/icons-material";
import { fetchAudio, translateWords } from "../utils/features";
import { useDispatch, useSelector } from "react-redux";
import {
  getWordsRequest,
  getWordsSuccess,
  getWordsFail,
  clearState,
} from "../redux/slice";
import Loader from "./Loader";

const Learning = () => {
  const [count, setCount] = useState<number>(0);
  const [audioSrc, setAudioSrc] = useState("");
  const audioRef = useRef(null);

  const params = useSearchParams()[0].get("language") as LanguageCodeType;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, words } = useSelector(
    (state: { root: StateType }) => state.root
  );

  const nextHandler = (): void => {
    setCount((prev: number) => prev + 1);
    setAudioSrc("");
  };

  useEffect(() => {
    dispatch(getWordsRequest());
    translateWords(params)
      .then((arr) => dispatch(getWordsSuccess(arr)))
      .catch((err) => dispatch(getWordsFail(err)));

    if (error) {
      alert(error);
      dispatch(clearState());
    }
  }, []);

  const audioHandler = async () => {
    const player: HTMLAudioElement = audioRef.current!;

    if (player) {
      player.play();
    } else {
      const data = await fetchAudio(words[count]?.word, params);

      setAudioSrc(data);
    }
  };

  if (loading) return <Loader />;

  return (
    <Container
      maxWidth="sm"
      sx={{ padding: "1rem" }}
    >
      {audioSrc && (
        <audio
          src={audioSrc}
          autoPlay
          ref={audioRef}
        ></audio>
      )}
      <IconButton
        onClick={
          count === 0 ? () => navigate("/") : () => setCount((prev) => prev - 1)
        }
        color="secondary"
      >
        <ArrowBack />
      </IconButton>

      <Typography m={"2rem 0"}>Learning Made Easy</Typography>
      <Stack
        direction={"row"}
        spacing={"1rem"}
        alignItems={"center"}
      >
        <Typography variant="h5">
          {count + 1}. {words[count]?.word}
        </Typography>
        <Typography
          variant="h5"
          color="#FFCC70"
        >
          - {words[count]?.meaning}
        </Typography>
        <IconButton
          color="secondary"
          onClick={audioHandler}
        >
          <VolumeUp />
        </IconButton>
      </Stack>
      <Button
        sx={{
          margin: "3rem 0",
        }}
        variant="contained"
        color="secondary"
        fullWidth
        onClick={
          count === words.length - 1 ? () => navigate("/quiz") : nextHandler
        }
      >
        {count === words.length - 1 ? "Test" : "Next"}
      </Button>
    </Container>
  );
};

export default Learning;
