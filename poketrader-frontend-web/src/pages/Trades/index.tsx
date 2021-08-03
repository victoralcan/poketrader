import React, { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from 'reactstrap';
import { IPokemon } from '../../shared/models/IPokemon';
import Api from '../../services/Api';

const Trades: React.FC = () => {
  const [leftSearch, setLeftSearch] = useState<string>('');
  const [rightSearch, setRightSearch] = useState<string>('');
  const [leftSearchError, setLeftSearchError] = useState<boolean>(false);
  const [rightSearchError, setRightSearchError] = useState<boolean>(false);
  const [leftPokemons, setLeftPokemons] = useState<Array<IPokemon>>([]);
  const [rightPokemons, setRightPokemons] = useState<Array<IPokemon>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const errorMessage = 'Pokemon does not exists!';
  const inputPlaceholder = 'Type Pokemon name';
  const searchingText = 'Searching Pokemon...';

  const handlePokemonSearch = async (left: boolean): Promise<void> => {
    setLeftSearchError(false);
    setRightSearchError(false);
    setLoading(true);
    try {
      const newPokemon = await Api.get(
        `/pokemons/${left ? leftSearch : rightSearch}`,
      );
      if (left) setLeftPokemons([...leftPokemons, newPokemon.data]);
      else setRightPokemons([...rightPokemons, newPokemon.data]);
      setLoading(false);
    } catch (e) {
      if (left) setLeftSearchError(true);
      else setRightSearchError(true);
      setLoading(false);
    }
  };

  return (
    <div className="d-flex h-100 align-items-center">
      <Card className="w-75 mx-auto shadow">
        <CardHeader>Choose pokemons for trade!</CardHeader>
        <CardBody>
          <div className="d-flex flex-row">
            <div className="flex-grow-1 border border-info rounded mx-2">
              <div className="d-flex flex-row m-2">
                <Input
                  placeholder={inputPlaceholder}
                  value={leftSearch}
                  className="mt-auto"
                  onChange={event => setLeftSearch(event.target.value)}
                />
                <Button
                  color="success"
                  className="ml-2 mt-auto"
                  onClick={() => handlePokemonSearch(true)}
                  disabled={loading}
                >
                  Search
                </Button>
              </div>
              {leftSearchError && (
                <div className="m-2 text-danger">{errorMessage}</div>
              )}
              {loading && <div className="m-2">{searchingText}</div>}
              <div
                style={{
                  minHeight: '200px',
                }}
              >
                {leftPokemons.map(pokemon => (
                  <div className="m-2">
                    Pokemon: {pokemon.name} <Button>D</Button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-grow-1 border border-info rounded mx-2">
              <div className="d-flex flex-row m-2">
                <Input
                  placeholder={inputPlaceholder}
                  className="mt-auto"
                  value={rightSearch}
                  onChange={event => setRightSearch(event.target.value)}
                />
                <Button
                  color="success"
                  className="ml-2 mt-auto"
                  onClick={() => handlePokemonSearch(false)}
                  disabled={loading}
                >
                  Search
                </Button>
              </div>
              {rightSearchError && (
                <div className="m-2 text-danger">{errorMessage}</div>
              )}
              {loading && <div className="m-2">{searchingText}</div>}
              <div
                style={{
                  minHeight: '200px',
                }}
              >
                {rightPokemons.map(pokemon => (
                  <div className="m-2">
                    Pokemon: {pokemon.name} <Button>D</Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardBody>
        <CardFooter>
          <Button className="float-right" color="primary">
            Register trade!
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Trades;
