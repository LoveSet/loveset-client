import React /* Fragment */ from "react";
// import Backdrop from "@material-ui/core/Backdrop";
import Backdrop from "@mui/material/Backdrop";
// import CircularProgress from "@material-ui/core/CircularProgress";
// import CircularProgress from "@mui/material/CircularProgress";
// import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";

// const useStyles = makeStyles((theme) => ({
//   backdrop: {
//     zIndex: theme.zIndex.drawer + 1,
//     color: "#fff",
//   },
// }));

function GradientCircularProgress() {
  return (
    <React.Fragment>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e01cd5" />
            <stop offset="100%" stopColor="#1CB5E0" />
            {/* <stop offset="0%" stopColor="#5891ff" />
            <stop offset="100%" stopColor="#5891ff" /> */}
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress
        sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
      />
    </React.Fragment>
  );
}

function FacebookCircularProgress(props) {
  return (
    <Box sx={{ position: "relative" }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
        }}
        size={42}
        thickness={3}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: (theme) =>
            theme.palette.mode === "light" ? "#1a90ff" : "#00aff0",
          animationDuration: "350ms",
          position: "absolute",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        size={42}
        thickness={3}
        {...props}
      />
    </Box>
  );
}

function PageLoader({ loading }) {
  // const classes = useStyles();

  return (
    <>
      {loading && (
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          // className={classes.backdrop}
          open
        >
          <CircularProgress color="inherit" />
          {/* <FacebookCircularProgress /> */}
          {/* <GradientCircularProgress /> */}
        </Backdrop>
      )}
    </>
  );
}

export default PageLoader;
