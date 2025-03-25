import React from 'react';
import Header from '../Shared/Header/Header';
import dashHeaderImg from '../assets/images/dashHeaderImg.png';

function Dashboard() {
  return (
    <>
      <Header img={dashHeaderImg} title="Welcome Upskilling !" desc="This is a welcoming screen for the entry of the application , you can now see the options" />
      <h1 className="my-4">dashboard</h1>
    </>
  )
}

export default Dashboard
