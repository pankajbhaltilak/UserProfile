import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteUserById, getUsers } from '../../services/users';
import Profile from '../Profile/Profile';
import routes from './../../routes/routeContainst.json';

const Users = () => {
  const { page = '1' } = useParams();
  const navigation = useNavigate();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Promise way
  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getUsers(page)
      .then((resData) => {
        setUsers(resData.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [page]);

  // async await example
  // useEffect(() => {
  //   const callApi = async () => {
  //     const resData = await getUsersWithAsyncAwait();
  //     setUsers(resData.data);
  //   };
  //   callApi();
  // }, []);

  const deleteHandler = (userIndex) => {
    const user = users[userIndex];
    const { id: userId } = user;
    deleteUserById(userId).then((isDelete) => {
      if (isDelete) {
        const userProfiles = [...users];
        userProfiles.splice(userIndex, 1);
        setUsers(userProfiles);
      }
    });
  };

  const profiles = users.map((user, index) => (
    <Profile
      key={index}
      fname={user.first_name}
      email={user.email}
      image={user.avatar}
      userIndex={index}
      deleteHandler={deleteHandler}
    />
  ));

  const pageChangeHandler = () => {
    const nextPage = page === '1' ? '2' : '1';
    navigation(`${routes.PROFILES}/${nextPage}`);
  };

  return (
    <div>
      {isLoading && <h2>Loading...</h2>}

      {!isLoading && (
        <>
          <h3>Page {page}</h3>
          <button onClick={pageChangeHandler}>
            Switch to page {page === '1' ? '2' : '1'}
          </button>

          {isError && (
            <h3 style={{ color: 'red' }}>
              There is some error, Please try after sometime!!!
            </h3>
          )}

          {!isError && <div>{profiles}</div>}
        </>
      )}
    </div>
  );
};

export default Users;
