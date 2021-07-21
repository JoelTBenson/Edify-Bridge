import React from "react";
import { Router, Route, Switch } from 'react-router-dom'; 
import { ApolloProvider } from '@apollo/client';
import { client } from './config/apollo';

// history
import history from './config/history';

// bring in components
import Header from "./components/Header";

// bring in pages
import Home from "./pages/Home";
import Classes from './pages/Classes';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Tutors from './pages/Tutors';
import Navbar from "./components/Navbar";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router history={history}>
        <Header />
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/tutors" component={Tutors} />
          <Route exact path="/classes" component={Classes} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
