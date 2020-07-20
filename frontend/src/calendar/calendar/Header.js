import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const years = [...Array(100).keys()].map(i => i + 2000);

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const getDate = (month, year) => new Date(year, months.indexOf(month), 1);

const HeaderStyled = styled.div`
  width: 100%;
  height 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 40px;
    color: red;
    margin: 0;
  }

  h2 {
    margin: 0;
    font-size: 20px;
  }
`;

const Header = ({ monthName, yearName, changeMonth }) => {
  const [anchorMonth, setAnchorMonth] = useState();
  const [anchorYear, setAnchorYear] = useState();

  const handleMonthClick = (event) => {
    setAnchorMonth(event.currentTarget);
  };

  const handleYearClick = (event) => {
    setAnchorYear(event.currentTarget);
  };

  const handleMonthClose = () => setAnchorMonth(null);
  const handleYearClose = () => setAnchorYear(null);

  return (
    <HeaderStyled>
      <Button
        onClick={handleMonthClick}
      >
        <h1>{monthName}</h1>
      </Button>
      <Button
        onClick={handleYearClick}
      >
        <h2>{yearName}</h2>
      </Button>
      <Menu
        anchorEl={anchorMonth}
        keepMounted
        open={Boolean(anchorMonth)}
        onClose={handleMonthClose}
      >
        {months.map(month => (
          <MenuItem
            onClick={() => {
              changeMonth(getDate(month, yearName));
              handleMonthClose();
            }}
          >
            {month}
          </MenuItem>
        ))}
      </Menu>
      <Menu
        anchorEl={anchorYear}
        keepMounted
        open={Boolean(anchorYear)}
        onClose={handleYearClose}
      >
        {years.map(year => (
          <MenuItem
            onClick={() => {
              changeMonth(getDate(monthName, year));
              handleYearClose();
            }}
          >
            {year}
          </MenuItem>
        ))}
      </Menu>
    </HeaderStyled>
  );
};

export default React.memo(Header);
