import { FC } from 'react';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { getAllUsers } from '../../../store/actions/users';
import { History } from 'history';

const useStyles = makeStyles((theme: Theme) => createStyles({
  searchBar: {
    minHeight: 32,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.05),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.05),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
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
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },

}),
);

interface ISearchForm {
  page: number,
  searchInput: string,
  history: History,
  setsearchInput: (state: string) => void 
}

export const SearchForm: FC<ISearchForm> = ({page, history, searchInput, setsearchInput}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {    
    setsearchInput(event?.target.value);
  }

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {    
    (event.key === 'Enter')
      &&
      dispatch(getAllUsers(page, searchInput, history));
  };

  return (
    <Toolbar className={classes.searchBar}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Поиск по имени и/или фамилии…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          onChange={handleChange}
          onKeyDown={handleSearch}
          value={searchInput}
        />
      </div>
    </Toolbar>
  );
}
