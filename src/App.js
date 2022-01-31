import React, { Suspense } from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';

import AddMovieForm from './movies/components/AddMovieForm/AddMovieForm';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';
import Header from './shared/components/Header/Header';
import HomePage from './movies/pages/HomePage/HomePage';
import WelcomePage from './movies/pages/WelcomePage/WelcomePage';
import Form from './shared/components/Form/Form';
import UserPage from './movies/pages/UserPage/UserPage';
import SearchForm from './movies/components/SearchForm/SearchForm';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/search">
          <SearchForm />
        </Route>
        <Route path="/add" exact>
          <AddMovieForm />
        </Route>
        <Route path="/:userId/movies" exact>
          <UserPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <WelcomePage />
        </Route>
        <Route path="/auth">
          <Form />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        login: login,
        logout: logout,
        userId: userId,
      }}
    >
      <BrowserRouter>
        <Header />
        <Suspense
          fallback={
            <div className="center">
              <LoadingSpinner />
            </div>
          }
        >
          {routes}
        </Suspense>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
