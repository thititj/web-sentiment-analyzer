import React from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import { Button, Grid, Typography, Card } from "@mui/material";

import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";

import IconButton from "@mui/material/IconButton";
import HelpIcon from "@mui/icons-material/Help";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import BoxSentiment from "./components/BoxSentiment";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const [open, setOpen] = React.useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [prob, setProb] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = async () => {
    let taskText = text.trim();
    if (taskText.length === 0) {
      setOpen(true);
      return;
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text })
    };
    const response = await fetch(
      "https://nlp-api.ppirch.me/predict",
      requestOptions
    );
    const data = await response.json();
    setSentiment(data.sentiment);
    setProb(data.probability);
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid style={{ margin: 7 }}>
        <p
          style={{
            display: "table-cell",
            verticalAlign: "middle",
            textAlign: "center",
            fontSize: 36,
            color: "white",
            margin: 20
          }}
        >
          Thai Sentiment Analyzer
        </p>
      </Grid>
      <Grid style={{ marginBottom: 7 }}>
        <p
          style={{
            display: "table-cell",
            verticalAlign: "middle",
            textAlign: "center",
            fontSize: 18,
            color: "white"
          }}
        >
          "แอปพลิเคชันสำหรับวิเคราะห์อารมณ์ของข้อความภาษาไทย รุ่นทดสอบ"
        </p>
      </Grid>
        
      <Paper
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "50%",
          minWidth: 300
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          style={{ fontSize: "14px" }}
          placeholder="ใส่ข้อความที่นี่"
          fullWidth
          multiline
          onChange={handleChange}
          onSubmit={handleSubmit}
          onKeyPress={(ev) => {
            if (ev.key === "Enter") {
              handleSubmit();
              ev.preventDefault();
            }
          }}
        />
        <Tooltip
          title={
            <Typography fontSize={14}>
              ใส่ข้อความแล้วกดปุ่มวิเคราะห์เพื่อทำการวิเคราะห์ความรู้สึกของข้อความ
            </Typography>
          }
          placement="top"
        >
          <IconButton sx={{ p: "10px" }}>
            <HelpIcon />
          </IconButton>
        </Tooltip>
        <Divider sx={{ height: 28, marginRight: 1 }} orientation="vertical" />
        <Button
          sx={{ m: 0.5 }}
          endIcon={<BarChartOutlinedIcon />}
          style={{ fontSize: "14px" }}
          variant="contained"
          disableElevation
          onClick={handleSubmit}
          type="button"
        >
          วิเคราะห์
        </Button>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="warning"
            sx={{ width: "100%" }}
          >
            กรุณาใส่ข้อความ!
          </Alert>
        </Snackbar>
      </Paper>

      <Card
        sx={{ maxWidth: 500, m: 3.5 }}
        style={{ width: "70%", height: "70%" }}
      >
        {sentiment === "q" && (
          <>
            <BoxSentiment
              emoji="🤔"
              sentiment={"คำถาม"}
              neu={prob[1]}
              pos={prob[2]}
              neg={prob[0]}
              q={prob[3]}
            />
          </>
        )}
        {sentiment === "neg" && (
          <BoxSentiment
            emoji="🙁"
            sentiment={"ข้อความเชิงลบ"}
            neu={prob[1]}
            pos={prob[2]}
            neg={prob[0]}
            q={prob[3]}
          />
        )}
        {sentiment === "neu" && (
          <BoxSentiment
            emoji="😐"
            sentiment={"ข้อความทั่วไป"}
            neu={prob[1]}
            pos={prob[2]}
            neg={prob[0]}
            q={prob[3]}
          />
        )}
        {sentiment === "pos" && (
          <BoxSentiment
            emoji="😀"
            sentiment={"ข้อความเชิงบวก"}
            neu={prob[1]}
            pos={prob[2]}
            neg={prob[0]}
            q={prob[3]}
          />
        )}
      </Card>
    </Grid>
  );
}

export default App;
