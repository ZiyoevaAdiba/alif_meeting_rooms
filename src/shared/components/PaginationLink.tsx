import { MemoryRouter, Route } from 'react-router';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import { useDispatch } from 'react-redux';
import { getAllUsers } from '../../store/actions/users';
import { History } from 'history';
import { FC } from 'react';

interface IPaginationLink {
  pageNumber: number,
  history: History, 
  page: number, 
  searchInput: string
}
export const PaginationLink: FC<IPaginationLink> = ({ pageNumber, history, page, searchInput }) => {

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
