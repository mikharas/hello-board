import React, { useState, useCallback } from 'react';
// import styled from 'styled-components';
import { ClickAwayListener } from '@material-ui/core';
import TextareaAutosize from 'react-autosize-textarea';

const defaultTitleStyle = {
  outline: 'none',
  background: 'white',
  marginTop: '13px',
  marginBottom: '15px',
  fontFamily: 'inherit',
  fontWeight: 'bold',
  fontSize: '30px',
  padding: '15px',
  width: '90%',
  borderRadius: '15px',
  border: '0',
};

const EditableTitle = ({
  title,
  changeTitle,
  style,
  normalStyle,
}) => {
  const [value, setValue] = useState(title);
  const [isEditmode, setIsEditMode] = useState(false);

  const toggleEditMode = useCallback(() => {
    setIsEditMode(!isEditmode);
  }, [isEditmode]);

  const changeValue = newValue => setValue(newValue);
  console.log('render editable title');

  if (!isEditmode) {
    return (
      <h1
        onClick={() => toggleEditMode()}
        style={style && normalStyle}
      >
        {title}
      </h1>
    );
  }

  return (
    <ClickAwayListener
      onClickAway={() => {
        if (!value) {
          changeValue(title);
          toggleEditMode();
        } else {
          changeTitle(value);
          toggleEditMode();
        }
      }}
    >
      <TextareaAutosize
        style={style || defaultTitleStyle}
        autoFocus
        onFocus={e => e.target.select()}
        value={value}
        onInput={event => changeValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            if (!value) {
              changeValue(title);
              toggleEditMode();
            } else {
              changeTitle(value);
              toggleEditMode();
            }
          }
        }}
        type="text"
      />
    </ClickAwayListener>
  );
};

export default React.memo(EditableTitle);
