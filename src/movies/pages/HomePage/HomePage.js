import homePicture from '../../../assets/home.png';
import mobileHomePicture from '../../../assets/home-phone.png';
import classes from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={classes.home}>
      <div className={classes.text}>
        <h1>Keep track of movies you want to watch!</h1>
        <p>
          Find your favourite movies and add them to your <span>WatchList</span>
        </p>
      </div>
      <img className={classes.picture} src={homePicture} alt="home" />
      <img
        className={classes.mobilePicture}
        src={mobileHomePicture}
        alt="home"
      />
    </div>
  );
};

export default HomePage;
