import './App.css';
import { useState, useEffect } from 'react';
import Input from '@mui/material/Input';
import Grid from '@mui/material/Grid';
import { update, flatten, equals } from 'ramda';
import lodash, { isFunction } from 'lodash';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import ParamsInput from './ParamsInput/ParamsInput';
import RAMDA from './packages/RAMDA';
import MATH from './packages/MATH';

const LODASH = lodash;

const PACKAGES = [
  {
    name: 'ramda',
    funcs: RAMDA,
    docLink: (name) => `https://ramdajs.com/docs/#${name}`,
  },
  {
    name: 'lodash',
    funcs: LODASH,
    docLink: (name) => `https://lodash.com/docs/#${name}`,
  },
  {
    name: 'math',
    funcs: MATH,
    docLink: (name) =>
      `https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/${name}`,
  },
];

function App() {
  const [funcParams, setFuncParams] = useState(['']);
  const [funcResult, setFuncResult] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    search();
  }, [funcParams, funcResult]);

  const search = () => {
    const searchResults = flatten(
      PACKAGES.map((pack) => {
        const keys = Object.keys(pack.funcs);

        return keys
          .filter((key) => {
            try {
              if (!isFunction(pack.funcs[key])) return false;

              const calculatedFuncResult = pack.funcs[key](...funcParams);
              const calculatedFuncResultWithoutLastParam = pack.funcs[key](
                ...funcParams.slice(0, -1)
              );
              const evaluatedFuncResult = eval(funcResult);

              return (
                equals(calculatedFuncResult, evaluatedFuncResult) &&
                evaluatedFuncResult !== undefined &&
                !equals(
                  calculatedFuncResult,
                  calculatedFuncResultWithoutLastParam
                )
              );
            } catch (e) {
              return false;
            }
          })
          .map((key) => ({ name: key, pack: pack }));
      })
    );

    setSearchResults(searchResults);
  };

  return (
    <>
      <div style={{ position: 'fixed' }}>
        <a href="https://github.com/florianfe">
          <img
            loading="lazy"
            width="149"
            height="149"
            src="https://github.blog/wp-content/uploads/2008/12/forkme_left_darkblue_121621.png?resize=149%2C149"
            class="attachment-full size-full"
            alt="Fork me on GitHub"
            data-recalc-dims="1"
          />
        </a>
      </div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '50vh', fontSize: '2rem' }}
      >
        <Grid item xs={3}>
          <div
            onKeyUp={(e) => {
              if (e.code === 'Enter') search();
            }}
            className="content"
          >
            f(
            <ParamsInput
              onChange={(value) => {
                setFuncParams(value);
              }}
            />
            ) ={' '}
            <Input
              style={{ fontSize: '2rem' }}
              value={funcResult}
              onChange={(e) => {
                const value = e.target.value;
                setFuncResult(value);
              }}
            />
          </div>
        </Grid>
      </Grid>
      <div className="flex-container">
        <div className="flex-item">
          {searchResults !== null && searchResults.length === 0 && (
            <Typography>{`No results for f(${funcParams.join(
              ', '
            )}) = ${funcResult}`}</Typography>
          )}
        </div>
      </div>
      <div className="flex-container">
        {searchResults !== null &&
          searchResults.map((searchResult, index) => (
            <div className="flex-item" key={index}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {searchResult.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Package: {searchResult.pack.name} <br />
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    target="_blank"
                    href={searchResult.pack.docLink(searchResult.name)}
                  >
                    See the docs
                  </Button>
                </CardActions>
              </Card>
            </div>
          ))}
      </div>
    </>
  );
}

export default App;
