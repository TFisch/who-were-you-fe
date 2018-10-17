import React, { Component } from 'react';
import DateSubmitForm from '../common/DateSubmitForm'
import Header from '../Header'
import ReincarnationDisplay from '../ReincarnationDisplay'
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
    super()
    this.state = {
      showSubmitForm: true,

    }
  }

  async componentDidMount() {
    fetchDeaths();
    const notes = 'Well hello there';
    const name = 'Cody Taft';

    const dateId = await fetchDateId('FEBRUARY 17', 1989);
    const deathByDate = await fetchDeathByDate(dateId, 1989);

    const users = await fetchUsers();
    const postedUser = await postUsers(name, deathByDate, notes);
    console.log(postedUser);
  }

  findDeathMatch = async (cleanedDate, year) => {
    const dateId = await fetchDateId(cleanedDate, year);
    const deathByDate = await fetchDeathByDate(dateId, year);
    await console.log(deathByDate);
  }

  hideForm = (cleanedDate, year) => {
    this.findDeathMatch(cleanedDate, year);
    this.setState({ showSubmitForm: false })
  }

  render() {
    return (
      <div>
        <Header />

        {this.state.showSubmitForm &&
          <DateSubmitForm
            headerText="WHO ARE YOU?"
            inputOneText="What is your name?"
            inputTwoText="What is your birthday?"
            hideForm={this.hideForm}
          />
        }
        {!this.state.showSubmitForm &&
          <ReincarnationDisplay />
        }

      </div>
    );
  }
}

export default App;
