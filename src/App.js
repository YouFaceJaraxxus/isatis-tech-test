import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { USER_LOCAL_STORAGE_KEY } from './common/config/config';
import { setCheckedIsLoggedIn, setLoggedIn } from './redux/reducers/authSlice';
import Routes from './routes/Routes';


const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const userLocalStorage = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
    if(userLocalStorage){
      const userLocalStorageParsed = JSON.parse(userLocalStorage);
      if(userLocalStorageParsed?.isLogged){
        dispatch(setLoggedIn(true));
      }else{
        dispatch(setCheckedIsLoggedIn(true));
      }
    } else {
      dispatch(setCheckedIsLoggedIn(true));
    }
  }, []);
  return (
    <Routes />
  );
}

export default App;
