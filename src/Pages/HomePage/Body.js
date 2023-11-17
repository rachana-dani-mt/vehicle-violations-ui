
import React, { useReducer, useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Card from '../../components/card/Card';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import Footer from '../../components/Footer/Footer';
import NavigationBar from '../../components/NavBar/NavigationBar';

const initialUsers = {
  loading: true,
  users: [],
  error: '',
  pageNo: 1,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        loading: action.loading,
        users: action.payload,
        error: '',
        pageNo: action.pageNo,
      };
    case 'FETCH_ERROR':
      return {
        loading: false,
        users: [],
        error: 'Something Went Wrong!!!',
        pageNo: 1,
      };
    default:
      return state;
  }
};

function Body({ match }) {
  const [state, dispatchState] = useReducer(reducer, initialUsers);
  const [inputValue, setInputValue] = useState('');

  const fetchData = (pageNo) => {
    const startIndex = (parseInt(pageNo) - 1) * 18;
    axios
      .get(
        `http://violations-alb-1492605749.us-east-1.elb.amazonaws.com/vehicle-violation/${inputValue}?startIndex=${startIndex}`
      )
      .then((response) => {
        dispatchState({
          type: 'FETCH_SUCCESS',
          payload: [response.data],
          error: '',
          loading: false,
          pageNo: parseInt(pageNo),
        });
      })
      .catch(() => {
        dispatchState({
          type: 'FETCH_ERROR',
          payload: [],
          error: 'Could not fetch any users.',
          loading: false,
          pageNo: 1,
        });
      });
  };

  useEffect(() => {
    fetchData(match.params.pageNo);
  }, [match.params.pageNo, inputValue]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue) {
      dispatchState({
        type: 'FETCH_SUCCESS',
        payload: [],
        error: '',
        loading: true,
        pageNo: 1,
      });
      fetchData(1);
    }
  };

  return (
    <div>
      <Container>
        {/* It is usefull when we fetch data from server */}

        <form onSubmit={handleSubmit}>
          <label htmlFor='registrationId'>Enter Registration ID:</label>
          <input
            type='text'
            id='registrationId'
            name='registrationId'
            value={inputValue}
            onChange={handleInputChange}
          />
          <button type='submit'>Submit</button>
        </form>
        {inputValue !== '' && (
          <>
            {state.loading ? (
              <h1 className='text-center'>Loading... Please Wait...</h1>
            ) : (
              <Row>
                {state.users.length === 0 ? (
                  <p>No users found.</p>
                ) : (
                  <Row>
                    {state.users.map((user) => {
                      return (
                        <Col key={user.id} md={4} sm={6} xs={12}>
                          <Card
                            name={`${user.owner_name}`}
                            id={user.registration_id}
                            fine_amount={user.fine_amount}
                          />
                        </Col>
                      );
                    })}
                  </Row>
                )}
              </Row>
            )}
            {state.error !== '' ? (
              <h5 className='text-center'>{state.error}</h5>
            ) : (
              ''
            )}
          </>
        )}
      </Container>
    </div>
  );
}

export default Body;