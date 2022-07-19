
import React from 'react';
import './homePage.scss'
import Search from "../../components/search/search";
import { Suspense, useEffect, useReducer } from 'react';
import { appState, reducer, types } from '../../services/reducer';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { stringifyParams, toParamsObj } from '../../utils/utils';
import Spinner from '../../components/spinner/spinner';
const List = React.lazy(()=> import('../../components/filmList/filmList'));


function Home() {
  const [store, dispatch] = useReducer(reducer, appState);
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(()=> {
    const params = toParamsObj(searchParams);
    dispatch({type: types.SET_PARAMS, payload: params})
  },[]);

  useEffect(()=> {
   navigate({pathname:'/films', search: stringifyParams(store)})
  },[store]);

  const changeGenre = (genre:string) => {
    dispatch({type: types.SET_GENRE, payload: {genre : genre}})
  } 

  const search = (title:string) => {
    dispatch({type: types.SET_QUERY, payload: {search : title}})
  } 

  return (
  <div className='home'>
    <Search {...store} changeGenre={changeGenre} search={search}/>
    <Suspense fallback={<Spinner></Spinner>}>
        <List title={store.search} genre={store.genre}/>
    </Suspense>
  </div>);
}

export default Home;