import React, { useState } from 'react';
import classNames from 'classnames/bind';
import navbarDropdownClasses from './navbarDropdown.module.scss';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const NavbarDropdown = ({
  text,
  options,
  marginLeft = false,
  marginRight = false,
  marginTop = false,
  marginBottom = false
}) => {
  const cx = classNames.bind(navbarDropdownClasses);
  const history = useHistory();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const chevronDown = '\u25BC';
  const chevronUp = '\u25B2';

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  }

  return (
    <div className={cx({
      navbarDropdownWrapper: true,
      marginLeft: marginLeft,
      marginRight: marginRight,
      marginTop: marginTop,
      marginBottom: marginBottom
    })}>
      <div className={navbarDropdownClasses.textChevron} onClick={toggleDropdown}>
        <div>{text}</div>
        <div className={navbarDropdownClasses.chevron}>{dropdownOpen ? chevronUp : chevronDown}</div>
      </div>
      {
        dropdownOpen && (
          <div className={navbarDropdownClasses.dropdownMenuWrapper}>
            
          </div>
        )
      }
    </div>
  )
};

export default NavbarDropdown;