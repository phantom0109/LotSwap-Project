import React, { useEffect, useState } from "react";
import { Grid, InputBase, makeStyles } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
//import PropTypes from "prop-types";
import * as COLORS from "@material-ui/core/colors";
import {
  ClickAwayListener,
  Paper,
  Popper,
  MenuItem,
  MenuList,
} from "@material-ui/core";

import ethLogo from "../assets/img/eth-logo.png";
import bnbLogo from "../assets/img/bnb-logo.png";
import usdcLogo from "../assets/img/usdc-logo.png";
import compLogo from "../assets/img/comp-logo.png";
import daiLogo from "../assets/img/dai-logo.png";
import uniLogo from "../assets/img/uni-logo.png";
import wbtcLogo from "../assets/img/wbtc-logo.png";
import donateLogo from "../assets/img/token-logo.png";
import tokenLogo from "../assets/img/token-logo.png";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "0px 1rem",
    minHeight: "80px",
    backgroundColor: "#212429",
    borderRadius: theme.spacing(2),
    borderColor: "#191b1f",
    borderWidth: "1px",
    borderStyle: "solid",
    width: "100%",
    color: "white",
    "&:hover": {
      border: "1px solid gray",
    },
  },
  container_input: {
    padding: theme.spacing(1),
    minHeight: "68px",
    backgroundColor: COLORS.grey[50],
    borderRadius: theme.spacing(2),
    borderColor: COLORS.grey[300],
    borderWidth: "1px",
    borderStyle: "solid",
    marginLeft: "50%",
    textAlign: "right",
  },
  container_blank: {
    padding: theme.spacing(1),
    minHeight: "80px",
    borderRadius: theme.spacing(2),
  },
  grid: {
    display: "flex",
    padding: "1rem 0px",
  },
  gridBalance: {
    paddingBottom: "1rem",
  },
  suffix: {
    zIndex: "0",
    width: 140,
    padding: "0px 8px",
    height: "2.4rem",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#2c2f35",
    borderRadius: 16,
  },
  suffixText: {
    margin: "0px 16px",
  },
  balancePrice: {
    textAlign: "right",
    color: "#8f96ac",
  },
  balanceUSD: {
    color: "#8f96ac",
  },
  input: {
    ...theme.typography.h5,
    width: "100%",
    color: "white",
  },
  menu: {
    zIndex: "100",
  },
  inputBase: {
    textAlign: "left",
    color: "white",
  },
}));

export default function CoinField(props) {
  console.log("===================", props.currentNetwork)
  // This component is used to selecting a token and entering a value, the props are explained below:
  //      onClick - (string) => void - Called when the button is clicked
  //      symbol - string - The text displayed on the button
  //      value - string - The value of the text field
  //      onChange - (e) => void - Called when the text field changes
  //      activeField - boolean - Whether text can be entered into this field or not

  const classes = useStyles();
  const {
    balancePrice,
    balanceUSD,
    value,
    from,
    onChange,
    activeField,
  } = props;

  const [tokens, setTokens] = useState({});
  const [open, setOpen] = React.useState(false);
  // const [swapMode, setSwapMode] = React.useState("swap");
  const anchorRef = React.useRef(null);

  useEffect(() => {
    if (from) {
      setTokens({
        eth: {
          icon: ethLogo,
          title: "Ethereum",
        },
        bnb: {
          icon: bnbLogo,
          title: "BNB",
        },
      })
    } else {
      setTokens({
        defaultToken: {
          icon: tokenLogo,
          title: "Select",
        },
        eth: {
          icon: ethLogo,
          title: "Ethereum",
        },
        bnb: {
          icon: bnbLogo,
          title: "BNB",
        },
        usdc: {
          icon: usdcLogo,
          title: "USDC",
        },
        comp: {
          icon: compLogo,
          title: "Compound",
        },
        dai: {
          icon: daiLogo,
          title: "Dai",
        },
        wbtc: {
          icon: wbtcLogo,
          title: "WBTC",
        },
        uni: {
          icon: uniLogo,
          title: "Uni",
        },
        donate: {
          icon: donateLogo,
          title: "Donate",
        },
      })
    }
  }, [from])

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.grid}>
        <InputBase
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0.0"
          disabled={!activeField}
          classes={{ root: classes.input, input: classes.inputBase }}
        />

        <div
          size="small"
          variant="extended"
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          className={classes.suffix}
          // className={classes.networkBtn}
          onClick={handleToggle}
        >
          {tokens[props.currentToken] && (
            <>
              <img
                src={tokens[props.currentToken].icon}
                height="20"
                width="20"
                alt=""
              />
              <span className={classes.netWorkText}>
                {tokens[props.currentToken].title}
              </span>
              {!from && <ExpandMoreIcon />}
            </>
          )}
        </div>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
          className={classes.menu}
        >
          {() => (
            // console.log('field_flag->',props.fieldFlag)
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                {
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    {!from && Object.keys(tokens).map((key) => {
                      if(props.currentNetwork !== key)
                      return (
                      <MenuItem
                        onClick={(event) => {
                          props.changeToken(key);
                          handleClose(event);
                        }}
                        key={key}
                        className={classes.netWorkMenuItem}
                      >
                        <img
                          src={tokens[key].icon}
                          width={20}
                          height={20}
                          alt=""
                        ></img>
                        {tokens[key].title}
                      </MenuItem>
                    )})}
                  </MenuList>
                }
              </ClickAwayListener>
            </Paper>
          )}
        </Popper>
      </div>
      {/* Text Field */}
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        className={classes.gridBalance}
      >
        <Grid item xs={6} className={classes.balanceUSD}>
          {balanceUSD}
        </Grid>
        <Grid item xs={6} className={classes.balancePrice}>
          Balance: {balancePrice}
        </Grid>
      </Grid>
    </div>
  );
}
