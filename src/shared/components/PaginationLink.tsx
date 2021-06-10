import React from 'react';
import { MemoryRouter, Route } from 'react-router';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import { useDispatch } from 'react-redux';
import { getAllUsers } from '../../store/actions/getUsers';
import { urls } from '../../routes/urls';
import { getAllReservations } from '../../store/actions/reservations';

export const PaginationLink = ({ pageNumber, history, page, pagLocation }: any) => {

  const dispatch = useDispatch();

  const usersPerPage = (page: number, pagLocation: string) => {
    (pagLocation==='users')
    ?
    dispatch(getAllUsers(page, history))
    :
    dispatch(getAllReservations(page, history))
  }

  return (
    <MemoryRouter initialEntries={['/users']} initialIndex={0}>
      <Route>
        <Pagination
          page={page}
          count={pageNumber}
          onChange={(ev, page) => usersPerPage(page, pagLocation)}
          renderItem={(item) => {
                        
            return (
              <PaginationItem
                // component={Link}
                // to={`${urls.users}${`?page=${item.page}`}`}
                {...item}
              />

            )
          }}
        />
        {/* {() => {
          const query = new URLSearchParams(location.search);
          const page = parseInt(query.get('page') || '1', 10);
          return (
            
          );
        }} */}
      </Route>
    </MemoryRouter>
  );
}
