import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { ClickAwayListener, Button } from '@material-ui/core';
import TextareaAutosize from 'react-autosize-textarea';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

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
  allowEmpty,
  allowEnter,
  rows,
  showButtons,
}) => {
  const [value, setValue] = useState(title);
  const [isEditmode, setIsEditMode] = useState(false);

  const toggleEditMode = useCallback(() => {
    setIsEditMode(!isEditmode);
  }, [isEditmode]);

  const changeValue = newValue => setValue(newValue);

  const handleChange = () => {
    if (!value && !allowEmpty) {
      changeValue(title);
      toggleEditMode();
    } else {
      changeTitle(value);
      toggleEditMode();
    }
  };

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
      onClickAway={handleChange}
    >
      <Wrapper>
        <TextareaAutosize
          style={style || defaultTitleStyle}
          autoFocus
          onFocus={e => e.target.select()}
          value={value}
          rows={rows || 3}
          onInput={event => changeValue(event.target.value)}
          onKeyDown={(event) => {
            if (allowEnter && event.key === 'Enter') {
              handleChange();
            }
          }}
          type="text"
        />
        {showButtons && (
          <div>
            <Button onClick={handleChange}>Save</Button>
            <Button onClick={() => {
              setValue('');
              changeTitle('');
              toggleEditMode();
            }}
            >
              Delete
            </Button>
          </div>
        )}
      </Wrapper>
    </ClickAwayListener>
  );
};

export default React.memo(EditableTitle);
