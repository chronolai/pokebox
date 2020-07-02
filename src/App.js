import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouterLink,
  useParams,
} from "react-router-dom";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import { fade, makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';

import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';


import pokedex from './pokedex';
import { pad, findPokemon } from './utils';

import './52poke.css';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  card: {
    margin: '10px',
    maxWidth: `${68 * 6 + 32}px`,
    padding: 0,
  },
  grid: {
    maxWidth: `${68 * 6}px`,
    textAlign: 'center',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
  tac: {
    textAlign: 'center',
  },
}));

function Box(props) {
  const classes = useStyles();
  const { index, ids, search } = props;
  const min = (index - 1) * 30 + 1;
  const max = min + 29;
  const remain = Array.from(Array(30 - ids.length)).map(() => '000');
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2" className={classes.tac}>
          {pad(min)}~{pad(max)}
        </Typography>
        <Grid container spacing={0} className={classes.grid}>
          {
            [...ids, ...remain].map((idx, key) => {
              const { id, name } = findPokemon(idx);
              const qqindex = pad((index - 1) * 30 + ids.indexOf(id) + 1);
              return (
                <Grid item xs={2} key={key}>
                  <Tooltip title={`#${qqindex} - ${name.tw}`} disableHoverListener={id === '000'} arrow>
                    <span className={`sprite-icon sprite-icon-${id}`} onClick={() => {
                      window.open(`https://wiki.52poke.com/zh-hant/${name.tw}`)
                    }} style={{
                      opacity: search.length === 0 || name.tw.includes(search) ? 1 : 0.3,
                      backgroundColor: search.length > 0 && name.tw.includes(search) ? 'rgba(255, 0, 0, 0.7)' : null,
                    }}></span>
                  </Tooltip>
                </Grid>
              );
            })
          }
        </Grid>
      </CardContent>
    </Card>
  );
}

function Computer(props) {
  let { pokedexId } = useParams();
  const { search } = props;

  return (
    <Grid container justify="center" alignItems="center" direction="column">
      {
        Array.from(Array(Math.ceil(pokedex[pokedexId].length / 30)).keys()).map((i) => {
          const offset = 30 * i;
          const ids = pokedex[pokedexId].slice(offset, offset + 30);
          return (
            <Grid item key={i}>
              <Box index={i + 1} ids={ids} search={search} />
            </Grid>
          );
        })
      }
    </Grid>
  );
}

function GameSelector(props) {
  const { open, onClose } = props;

  function AreaLink(props) {
    return (
      <Link
        component={RouterLink}
        to={props.to}
        onClick={() => { onClose() }}
      >{props.label}</Link>
    );
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="game-selector-title">
      <DialogTitle id="simple-dialog-title">Game Selector</DialogTitle>
      <table border="1" style={{
        textAlign: 'center',
      }}>
        <tbody>
          <tr>
            <td>關都</td>
            <td colSpan="8"><AreaLink label="RGBY" to="/rgby" /></td>
            <td colSpan="8"><AreaLink label="FRLG" to="/frlg" /></td>
            <td colSpan="8"><AreaLink label="LGPE" to="/lgpe" /></td>
          </tr>
          <tr>
            <td>城都</td>
            <td colSpan="12"><AreaLink label="GSC" to="/gsc" /></td>
            <td colSpan="12"><AreaLink label="HGSS" to="/hgss" /></td>
          </tr>
          <tr>
            <td>豐緣</td>
            <td colSpan="12"><AreaLink label="RSE" to="/rse" /></td>
            <td colSpan="12"><AreaLink label="ORAS" to="/oras" /></td>
          </tr>
          <tr>
            <td>神奧</td>
            <td colSpan="12"><AreaLink label="DP" to="/dp" /></td>
            <td colSpan="12"><AreaLink label="Pt" to="/pt" /></td>
          </tr>
          <tr>
            <td>合眾</td>
            <td colSpan="12"><AreaLink label="BW" to="/bw" /></td>
            <td colSpan="12"><AreaLink label="B2W2" to="/b2w2" /></td>
          </tr>
          <tr>
            <td>卡洛斯</td>
            <td colSpan="8"><AreaLink label="Coastal" to="/xy_coastal" /></td>
            <td colSpan="8"><AreaLink label="Central" to="/xy_central" /></td>
            <td colSpan="8"><AreaLink label="Mountain" to="/xy_mountain" /></td>
          </tr>
          <tr>
            <td>阿羅拉</td>
            <td colSpan="12"><AreaLink label="SM" to="/sm" /></td>
            <td colSpan="12"><AreaLink label="USUM" to="/usum" /></td>
          </tr>
          <tr>
            <td>伽勒爾</td>
            <td colSpan="12"><AreaLink label="SWSH" to="/swsh" /></td>
            <td colSpan="12"><AreaLink label="ARMOR" to="/swsh_armor" /></td>
          </tr>
        </tbody>
      </table>
    </Dialog>
  );
}

function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    window.document.title = process.env.REACT_APP_NAME;
  }, []);

  return (
    <Router basename={ process.env.PUBLIC_URL }>
      <CssBaseline />
      <GameSelector open={open} onClose={handleClose} />
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleOpen}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>{process.env.REACT_APP_NAME} </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={name}
              onChange={e => {
                setName(e.target.value);
              }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Container>
        <Switch>
          <Route path="/:pokedexId">
            <Computer search={name} />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
