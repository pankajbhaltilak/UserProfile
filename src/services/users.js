export const getUsers = (page=1) => {
    return fetch(`https://reqres.in/api/users?page=${page}`)
      .then(res => res.json());
};

export const getUsersWithAsyncAwait = async () => {
  const res = await fetch("https://reqres.in/api/users?page=2");
  return await res.json();
};

export const deleteUserById = (userId) => {
  return fetch(`https://reqres.in/api/users/${userId}`,{
    method: 'DELETE'
  })
  .then(res => res.status === 204);
};

export const setUser = (userData) => {
  const apiConfig = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };

  return fetch("https://reqres.in/api/users", apiConfig)
    .then((res) => {
      if (res.status !== 201) {
        throw new Error("Api failed");
      }
      return res.json();
    });
};