import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
} from '@material-ui/core';

const FilterBoardSelector = ({boardIds, idToTitle, showBoard, setShowBoard}) => {
  const [text, setText] = useState('Show all')
  return (
    <FormControl variant="filled">
      <InputLabel htmlFor="filled-age-native-simple">Select Boards</InputLabel>
      <Select
        native
        value={text}
        onChange={e => {
          setText(e.target.value)
          setShowBoard(e.target.value)
        }}
        inputProps={{
          name: 'age',
          id: 'filled-age-native-simple',
        }}
      >
        <option value={boardIds}>Show all</option>
        {boardIds.map(boardId => (
          <option value={boardId}>{idToTitle[boardId]}</option>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterBoardSelector;
