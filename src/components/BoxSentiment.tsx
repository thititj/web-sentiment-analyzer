import { Button, Stack } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { FaThumbsUp } from "react-icons/fa";

import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import InCorrectButton from "./InCorrectButton";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BoxSentiment = (props: {
  emoji: string;
  sentiment: string;
  neu: string;
  pos: string;
  neg: string;
  q: string;
}) => {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const { sentiment, emoji } = props;
  const data = [
    {
      sentiment: "ทั่วไป",
      ความน่าจะเป็น: props.neu
    },
    {
      sentiment: "เชิงบวก",
      ความน่าจะเป็น: props.pos
    },
    {
      sentiment: "เชิงลบ",
      ความน่าจะเป็น: props.neg
    },
    {
      sentiment: "คำถาม",
      ความน่าจะเป็น: props.q
    }
  ];

  return (
    <>
      <CardContent style={{ width: "90%", height: "70%" }}>
        <h2
          style={{
            display: "table-cell",
            verticalAlign: "middle",
            textAlign: "center",
            fontSize: 30
          }}
        >
          ข้อความนี้คือ : {sentiment} {emoji}
        </h2>
        <ResponsiveContainer width={"100%"} height={225}>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 2,
              right: 10,
              left: 0,
              bottom: 2
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="sentiment" />
            <YAxis type="number" domain={[0, 1]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="ความน่าจะเป็น" fill="#4b3db4" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
      <CardActions>
        <Stack direction="row" spacing={1}>
          <p style={{}}>ผลการวิเคราะห์ถูกต้องหรือไม่</p>
          <Button
            variant="outlined"
            startIcon={<FaThumbsUp />}
            size="medium"
            color="success"
            onClick={handleClick}
          >
            ถูกต้อง
          </Button>
          <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center"
            }}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              ขอบคุณสำหรับข้อเสนอแนะ
            </Alert>
          </Snackbar>
          <InCorrectButton />
        </Stack>
      </CardActions>
    </>
  );
};

export default BoxSentiment;
