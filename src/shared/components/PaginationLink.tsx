import { MemoryRouter, Route } from 'react-router';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import { useDispatch } from 'react-redux';
import { getAllUsers } from '../../store/actions/users';

export const PaginationLink = ({ pageNumber, history, page, searchInput }: any) => {

  const dispatch = useDispatch();

  const usersPerPage = (page: number) => {
    dispatch(getAllUsers(page, searchInput, history))
  }

  return (
    <MemoryRouter initialEntries={['/users']} initialIndex={0}>
      <Route>
        <Pagination
          page={page}
          count={pageNumber}
          onChange={(ev, page) => usersPerPage(page)}
          renderItem={(item) => {
                        
            return (
              <PaginationItem
                {...item}
              />
            )
          }}
        />
      </Route>
    </MemoryRouter>
  );
}
