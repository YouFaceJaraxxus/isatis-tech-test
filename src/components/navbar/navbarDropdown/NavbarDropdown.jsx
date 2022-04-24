import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import navbarDropdownClasses from './navbarDropdown.module.scss';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';
import { DARK_THEME, LIGHT_THEME } from '../../../common/config/config';

const NavbarDropdown = ({
  text,
  options,
  marginLeft = false,
  marginRight = false,
  marginTop = false,
  marginBottom = false
}) => {
  const cx = classNames.bind(navbarDropdownClasses);

  const { theme } = useSelector((state) => state.common);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const chevronDown = '\u25BC';
  const chevronUp = '\u25B2';

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  }

  const dropdownMenuWrapperRef = useRef(null);
  const handleClickOutside = (event) => {
    if (dropdownMenuWrapperRef.current && !dropdownMenuWrapperRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  }
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownMenuWrapperRef]);

  return (
    <div className={cx({
      navbarDropdownWrapper: true,
      marginLeft: marginLeft,
      marginRight: marginRight,
      marginTop: marginTop,
      marginBottom: marginBottom
    })}
    >
      <div className={navbarDropdownClasses.textChevron} onClick={toggleDropdown}>
        <div>{text}</div>
        <div className={navbarDropdownClasses.chevron}>{dropdownOpen ? chevronUp : chevronDown}</div>
      </div>
      {
        dropdownOpen && (
          <div ref={dropdownMenuWrapperRef} className={navbarDropdownClasses.dropdownMenuWrapper}>
            {
              options.map((option) => (
                <div className={cx({
                  dropdownItem: true,
                  dropdownItemPrimary: theme === DARK_THEME,
                  dropdownItemPrimaryLight: theme === LIGHT_THEME
                })} key={option.id} onClick={() => {
                  option.action();
                  if (option.closeDropdown) {
                    setDropdownOpen(false);
                  }
                }}>
                  {option.text}
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  )
};

export default NavbarDropdown;