import React, { Component } from 'react';
import DateSubmitForm from '../common/DateSubmitForm';
import Header from '../Header';
import './App.css';
import {
  fetchDeaths,
  fetchDateId,
  fetchUsers,
  fetchDeathByDate,
  postUsers,
  deleteUsers,
  updateUser
} from '../../utilities/apiCalls';

class App extends Component {
  constructor() {
    super();
  }

  async componentDidMount() {
    fetchDeaths();
    const notes = 'Well hello there';
    const name = 'Cody Taft';

    const dateId = await fetchDateId('FEBRUARY 17', 1989);
    const deathByDate = await fetchDeathByDate(dateId, 1989);

    const users = await fetchUsers();
    console.log(users);
    const postedUser = await postUsers(name, deathByDate, notes);
    console.log(postedUser);
    console.log(await deleteUsers(6));
    console.log(await updateUser(34, 'hi there'));
  }

  render() {
    return (
      <div>
        <Header />
        <DateSubmitForm
          headerText="Who Are You?"
          inputOneText="what is your name?"
          inputTwoText="what is your birthday?"
        />
      </div>
    );
  }
}

export default App;
