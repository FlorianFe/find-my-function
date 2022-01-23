import './ParamsInput.css';
import { useState, useEffect } from 'react';
import { flatten, update, remove } from 'ramda';
import Input from '@mui/material/Input';
import { makeStyles } from '@mui/styles';

const isLastCharAOpenedComma = (text) => {
  const charArray = text.split('');
  const lastIndex = charArray.length - 1;

  let countRoundBrackets = 0;
  let countSquareBrackets = 0;
  let countCurlyBrackets = 0;

  for (let i = 0; i < charArray.length; i++) {
    if (charArray[i] === '(') {
      countRoundBrackets++;
    } else if (charArray[i] === ')') {
      countRoundBrackets--;
    } else if (charArray[i] === '[') {
      countSquareBrackets++;
    } else if (charArray[i] === ']') {
      countSquareBrackets--;
    } else if (charArray[i] === '{') {
      countCurlyBrackets++;
    } else if (charArray[i] === '}') {
      countCurlyBrackets--;
    }
  }

  return (
    charArray[lastIndex] === ',' &&
    countRoundBrackets === 0 &&
    countSquareBrackets === 0 &&
    countCurlyBrackets === 0
  );
};

const trimParams = (text) => {
  const charArray = text.split('');
  const lastIndex = charArray.length - 1;

  if (isLastCharAOpenedComma(text)) {
    return [text.substring(0, lastIndex), ''];
  }

  return [text];
};

const useStyles = makeStyles({
  root: {
    width: '50px',
    fontSize: '2rem',
  },
  input: {
    '&:focus': {
      width: '200px',
      fontSize: '2rem',
    },
  },
  focused: {
    width: '200px',
    fontSize: '2rem',
  },
});

const ParamsInput = ({ onChange }) => {
  const classes = useStyles();

  const [inputValues, setInputValues] = useState(['']);
  const [focusedInputIndex, setFocusedInputIndex] = useState(0);

  useEffect(() => {
    try {
      const inputValuesPrepared = inputValues.map((val) => eval(val));
      onChange(inputValuesPrepared);
    } catch (e) {
      onChange([]);
    }
  }, [inputValues]);

  const parts = flatten(
    inputValues.map((param, index) => {
      const inputElement =
        focusedInputIndex === index ? (
          <Input
            key={index}
            autoFocus={true}
            onFocus={() => {
              setFocusedInputIndex(index);
            }}
            onBlur={() => {
              setFocusedInputIndex(-1);
            }}
            classes={{
              root: classes.root,
              focused: classes.focused,
              input: classes.input,
            }}
            value={param}
            onKeyUp={(e) => {
              if (e.code === 'Backspace' && param === '' && index > 0) {
                setInputValues(remove(index, 1, inputValues));
                setFocusedInputIndex(index - 1);
              }
            }}
            onChange={(e) => {
              const value = e.target.value;
              const trimmedParams = trimParams(value);

              setInputValues(
                flatten(update(index, trimmedParams, inputValues))
              );

              if (isLastCharAOpenedComma(value)) {
                setFocusedInputIndex(index + 1);
              }
            }}
          />
        ) : (
          <span
            href="#"
            key={index}
            tabIndex="0"
            onFocus={() => {
              setFocusedInputIndex(index);
            }}
          >
            {param.length > 0 ? param : <b>?</b>}
          </span>
        );

      if (index !== 0) {
        return [', ', inputElement];
      }
      return [inputElement];
    })
  );

  return <>{parts}</>;
};

export default ParamsInput;
