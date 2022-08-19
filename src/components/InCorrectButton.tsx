import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { FaThumbsDown } from "react-icons/fa";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function InCorrectButton() {
  const [openDiaglog, setOpenDiaglog] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  //กดปุ่มไม่ถูกต้อง
  //เปิดหน้าให้แก้คำ
  const handleClickOpen = () => {
    setOpenDiaglog(true);
  };
  //ปิดหน้าให้แก้คำ
  const handleClose = () => {
    setOpenDiaglog(false);
  };

  //snack
  const handleClick = () => {
    setOpen(true);
  };
  const handleCloseSnack = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setOpenDiaglog(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        startIcon={<FaThumbsDown />}
        size="medium"
        color="error"
        onClick={handleClickOpen}
      >
        ไม่ถูกต้อง
      </Button>
      <Dialog open={openDiaglog} onClose={handleClose}>
        <DialogTitle>ประเมินการวิเคราะห์</DialogTitle>
        <DialogContent>
          <DialogContentText>
            หากข้อความมีการวิเคราะห์ผิด รบกวนแก้ประเภทของประโยคให้ถูกต้อง
          </DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content"
            }}
          >
            <FormControl sx={{ mt: 5, minWidth: 150 }}>
              <p>ประเภทของประโยคที่ควรจะเป็น</p>
              <Select autoFocus defaultValue>
                <MenuItem value="neu">
                  ประโยคทั่วไป <span>😐</span>
                </MenuItem>
                <MenuItem value="pos">
                  ประโยคเชิงบวก <span>😀</span>
                </MenuItem>
                <MenuItem value="neg">
                  ประโยคเชิงลบ <span>🙁</span>
                </MenuItem>
                <MenuItem value="q">
                  ประโยคคำถาม <span>🤔</span>
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClick}>บันทึก</Button>
          <Snackbar
            open={open}
            autoHideDuration={500}
            onClose={handleCloseSnack}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center"
            }}
          >
            <Alert
              onClose={handleCloseSnack}
              severity="success"
              sx={{ width: "100%" }}
            >
              ขอบคุณสำหรับข้อเสนอแนะ
            </Alert>
          </Snackbar>
          <Button onClick={handleClose}>ยกเลิก</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default InCorrectButton;
