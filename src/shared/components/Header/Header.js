import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';

import { AuthContext } from '../../context/auth-context';
// import Button from '../UIElements/Button';
import './Header.css';

const Header = () => {
  const [showLinks, setShowLinks] = useState(false);
  const authCtx = useContext(AuthContext);

  const clickHandler = () => {
    setShowLinks(!showLinks);
  };

  return (
    <header className="header">
      <div>
        <Link onClick={clickHandler} className="brand" to="/">
          <h3>WL</h3>
        </Link>
      </div>

      <button onClick={clickHandler} className="toggleButton">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
      {authCtx.isLoggedIn && (
        <div className={showLinks ? 'navigation' : 'hidden'}>
          <ul>
            <li>
              <Link
                onClick={clickHandler}
                className="navigationLink"
                to="/search"
              >
                <h3>search</h3>
              </Link>
            </li>
            <li>
              <Link
                onClick={clickHandler}
                className="navigationLink"
                to={`/${authCtx.userId}/movies`}
              >
                <h3>my movies</h3>
              </Link>
            </li>
            <li>
              <Link to="/" onClick={authCtx.logout} className="navigationLink">
                <h3> logout </h3>
              </Link>
            </li>
          </ul>
        </div>
      )}
      {!authCtx.isLoggedIn && (
        <div className={showLinks ? 'navigation' : 'hidden'}>
          <ul>
            <Link onClick={clickHandler} className="navigationLink" to="/auth">
              <h3>login / signup</h3>
            </Link>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
