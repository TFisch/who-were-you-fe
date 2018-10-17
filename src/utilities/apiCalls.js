import { userCleaner } from './helper';

export const fetchDeaths = async () => {
  const url = process.env.REACT_APP_DATABASE_API_URL + '/api/v1/deaths';
  const response = await fetch(url);
  const data = await response.json();
  await data;
};

export const fetchDateId = async day => {
  const underScoredDay = day.replace(/ /, '_');
  const url =
    process.env.REACT_APP_DATABASE_API_URL + `/api/v1/dates/${underScoredDay}`;
  const response = await fetch(url);
  const dateId = await response.json();
  return await dateId;
};

export const fetchDateById = async dateId => {
  const url =
    process.env.REACT_APP_DATABASE_API_URL + `/api/v1/dates/${dateId}/id`;
  const response = await fetch(url);
  const day = await response.json();
  return await day;
};

export const fetchDeathById = async deathId => {
  const url =
    process.env.REACT_APP_DATABASE_API_URL + `/api/v1/deaths/${deathId}`;
  const response = await fetch(url);
  const deadPerson = await response.json();
  return await deadPerson;
};

export const fetchDeathByDate = async (dateId, year) => {
  const url =
    process.env.REACT_APP_DATABASE_API_URL + `/api/v1/deaths/${dateId}/${year}`;
  const response = await fetch(url);
  const dead = await response.json();
  return await dead;
};

export const fetchUsers = async () => {
  const url = process.env.REACT_APP_DATABASE_API_URL + `/api/v1/users/`;
  const response = await fetch(url);
  const users = await response.json();
  const unresolvedCleanUsers = await users.map(async user => {
    const cleanUser = await userCleaner(user);
    return cleanUser;
  });
  return await Promise.all(unresolvedCleanUsers);
};

export const postUsers = async (name, death, notes) => {
  const url = process.env.REACT_APP_DATABASE_API_URL + `/api/v1/users/`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name,
      death_id: death[0].id,
      date_id: death[0].date_id,
      notes
    })
  });
  const user = await response.json();
  return await user;
};

export const deleteUser = async userId => {
  const url =
    process.env.REACT_APP_DATABASE_API_URL + `/api/v1/users/${userId}`;
  const response = await fetch(url, {
    method: 'DELETE'
  });
  return await response.json();
};

export const updateUser = async (userId, notes) => {
  const url =
    process.env.REACT_APP_DATABASE_API_URL + `/api/v1/users/${userId}`;
  const response = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      notes
    })
  });
  return await response.json();
};
