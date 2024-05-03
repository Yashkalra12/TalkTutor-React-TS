import { Container, Button, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const languages: LanguageType[] = [
  {
    name: "Japanese",
    code: "ja",
  },
  {
    name: "Hindi",
    code: "hi",
  },
  {
    name: "Spanish",
    code: "es",
  },
  {
    name: "French",
    code: "fr",
  },
];

const Home = () => {
  const navigate = useNavigate();

  const btnClickHandler = (language: string) => {
    navigate(`/learn?language=${language}`);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <Typography
        variant="h4"
        textAlign={"center"}
      >
        Welcome, begin your journey of learning.
      </Typography>
      <Stack
        direction={"row"}
        spacing={"2rem"}
        p={"2rem"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {languages.map((language: LanguageType) => (
          <Button
            key={language.code}
            variant="contained"
            onClick={() => btnClickHandler(language.code)}
            color={"secondary"}
            style={{ color: "white" }}
          >
            {language.name}
          </Button>
        ))}
      </Stack>
      <Typography textAlign={"center"}>
        Choose one language from above
      </Typography>
    </Container>
  );
};

export default Home;
