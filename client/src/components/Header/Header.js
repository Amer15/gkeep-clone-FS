import React from 'react';
import Logo from '../../assets/keep_48dp.png';
import './Header.css';

const Header = (props) => {
  let style;
  if(props.searchValue.length > 0){
    style = {
       marginRight: '5px',
       opacity: '1'
    }
  } 
  else{
    style = {
      marginRight: '5px',
      opacity: '0'
   }
  }

  return (
    <>
      <header id="Header">
        <div className="logo">
          <img src={Logo} alt="logo" />
          <h4>Keep</h4>
        </div>
        <div className="searchBar-container">
          <ion-icon name="search-outline" className="searchBar-icon"></ion-icon>
          <input type="text"
            name="search"
            placeholder="Search..."
            value={props.searchValue}
            onChange={props.onSearchHandler} />
          <ion-icon 
          name="close-outline" 
          style={style}
          onClick={props.clearSearchHandler}></ion-icon>
        </div>
      </header>
    </>
  )
}

export default Header;
