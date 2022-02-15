import React from "react";
import { makeStyles } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  ClickAwayListener,
  Paper,
  Popper,
  MenuItem,
  MenuList,
} from "@material-ui/core";
import ethLogo from "../eth-logo.png";
import bnbLogo from "../bnb-logo.png";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    padding: "1rem",
    display: "grid",
    zIndex: 21,
    boxShadow: "transparent 0px 0px 0px 1px",
    transition: "background-position 0.1s ease 0s, box-shadow 0.1s ease 0s",
    backgroundBlendMode: "hard-light",
    gridTemplateColumns: "300px 1fr 300px",
    [theme.breakpoints.down("lg")]: {
      gridTemplateColumns: "120px 1fr 1fr",
    },
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr 1fr",
    },
  },
  swapModeMenu: {
    width: "fit-content",
    display: "flex",
    gap: "10px",
    padding: "0px 2px",
    backgroundColor: "#191b1f",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    justifySelf: "center",
    borderRadius: 9999,
    [theme.breakpoints.down("lg")]: {
      justifySelf: "left",
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  swapModeMenuItem: {
    height: "90%",
    display: "flex",
    cursor: "pointer",
    justifyContent: "center",
    alignItems: "center",
    padding: "8px 12px",
    fontSize: "1rem",
    color: "#c3c5cb",
    fontWeight: 500,
    borderRadius: 9999,
    "&:hover": {
      color: "white",
    },
  },
  swapModeMenuItemActive: {
    fontWeight: 600,
    color: "white",
    backgroundColor: "#212429",
  },
  rightSideContainer: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    justifyContent: "right",
  },
  networkBtn: {
    display: "flex",
    borderRadius: 9999,
    cursor: "pointer",
    gap: 6,
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1rem",
    fontWeight: 500,
    padding: "10px 12px",
    backgroundColor: "#191b1f",
  },
  accountBtnContainer: {
    backgroundColor: "#191b1f",
    borderRadius: 9999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 44,
    padding: 2,
  },
  accountBtn: {
    cursor: "pointer",
    color: "white",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1rem",
    fontWeight: 500,
    borderRadius: 9999,
    padding: "10px 12px",
    backgroundColor: "#212429",
    border: "1px solid #212429",
    "&:hover": {
      border: "1px solid #353841",
    },
  },
  netWorkMenuContainer: {
    padding: 16,
    backgroundColor: "#191b1f",
    borderRadius: 20,
    width: 272,
  },
  netWorkMenuItem: {
    padding: 8,
    marginBottom: 8,
    color: "white",
    fontSize: 16,
    fontWeight: 500,
    display: "flex",
    gap: 4,
    alignItems: "center",
  },
  netWorkSelectText: {
    color: "#c3c5cb",
    fontWeight: 400,
    fontSize: 16,
  },
  netWorkText: {
    display: "block",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  swap_left_btngroup: {
    justifySelf: "center",
    backgroundColor: "#191b1f",
    width: "fit-content",
    padding: "2px",
    borderRadius: "16px",
    display: "grid",
    gridAutoFlow: "column",
    gap: "10px",
    overflow: "auto",
    // -webkit-box-align: 'center',
    alignItems: "center",
  },
  left_btns: {
    display: "flex",
    flexFlow: "row nowrap",
    borderRadius: "3rem",
    outline: "none;",
    cursor: "pointer",
    textDecoration: "none",
    color: "#c3c5cb",
    fontSize: "1rem",
    fontWeight: "500",
    padding: "8px 12px",
    wordBreak: "break-word",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
}));

const Navbar = (props) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [swapMode, setSwapMode] = React.useState("swap");
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const replaceBetween = (start, end, what, string) => {
    return string.substring(0, start) + what + string.substring(end);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <nav className={classes.container}>
      <a
        className="navbar-brand col-sm-3 col-md-2 mr-0 d-flex align-items-center"
        href="http://www.dappuniversity.com/bootcamp"
        target="_blank"
        rel="noopener noreferrer"
      >
        EthSwap
      </a>
      <div className={classes.swapModeMenu}>
        <div
          className={`${classes.swapModeMenuItem} ${
            swapMode === "swap" ? classes.swapModeMenuItemActive : ""
          }`}
          onClick={() => setSwapMode("swap")}
        >
          SWAP
        </div>
        <div
          className={`${classes.swapModeMenuItem} ${
            swapMode === "pool" ? classes.swapModeMenuItemActive : ""
          }`}
          onClick={() => setSwapMode("pool")}
        >
          POOL
        </div>
      </div>
      <div className={classes.rightSideContainer}>
        <div>
          <div
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? "composition-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            className={classes.networkBtn}
            onClick={handleToggle}
          >
            <img src={ethLogo} height="20" width="20" alt="" />
            <span className={classes.netWorkText}>Ethereum</span>
            <ExpandMoreIcon />
          </div>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {() => (
              <Paper className={classes.netWorkMenuContainer}>
                <div className={classes.netWorkSelectText}>
                  Select A Network
                </div>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem
                      onClick={handleClose}
                      className={classes.netWorkMenuItem}
                    >
                      <img
                        src={ethLogo}
                        width={20}
                        height={20}
                        alt=""
                      ></img>
                      Ethereum
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      className={classes.netWorkMenuItem}
                    >
                      <img
                        src={bnbLogo}
                        width={20}
                        height={20}
                        alt=""
                      ></img>
                      BNB
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            )}
          </Popper>
        </div>
        <div className={classes.accountBtnContainer}>
          <div className={classes.accountBtn}>
            {props.account !== ""
              ? replaceBetween(6, 38, "...", props.account)
              : ""}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
