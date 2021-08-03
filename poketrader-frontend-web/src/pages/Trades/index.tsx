import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  const [tradeRate, setTradeRate] = useState<number>(0);
  const [modal, setModal] = useState(false);
  const errorMessage = 'Pokemon does not exists!';
  const inputPlaceholder = 'Type Pokemon name';
  const searchingText = 'Searching Pokemon...';

  const toggleModal = (): void => setModal(!modal);

  const calculateTradeRate = (): void => {
    const totalLeftBaseExperience = leftPokemons.reduce(
      (total, pokemon) => total + pokemon.base_experience,
      0,
    );
    const totalRightBaseExperience = rightPokemons.reduce(
      (total, pokemon) => total + pokemon.base_experience,
      0,
    );
    if (totalLeftBaseExperience >= totalRightBaseExperience) {
      setTradeRate(totalLeftBaseExperience / totalRightBaseExperience);
      return;
    }
    setTradeRate(totalRightBaseExperience / totalLeftBaseExperience);
  };

  useEffect(() => {
    calculateTradeRate();
    // eslint-disable-next-line
  }, [leftPokemons, rightPokemons]);

  const handleTradeSubmit = async (): Promise<void> => {
    setModal(true);
    try {
      const trade = {
        trade_rate: tradeRate,
        fair_trade: tradeRate <= 1.2,
        leftPokemons,
        rightPokemons,
      };
      await Api.post('/trades', trade);
    } catch (e) {
      // tratar erro
    }
  };

  const handlePokemonDelete = (left: boolean, idx: number): void => {
    if (left) {
      const copy = [...leftPokemons];
      copy.splice(idx, 1);
      setLeftPokemons([...copy]);
    } else {
      const copy = [...rightPokemons];
      copy.splice(idx, 1);
      setRightPokemons([...copy]);
    }
  };

  const handlePokemonSearch = async (left: boolean): Promise<void> => {
    if (left && leftPokemons.length >= 6) return;
    if (!left && rightPokemons.length >= 6) return;
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
        <CardHeader>
          <h4>
            Choose pokemons for trade! You can put 1 to 6 pokemons each side!
          </h4>
        </CardHeader>
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
                {leftPokemons.map((pokemon, idx) => (
                  <div className="m-3">
                    <span className="font-weight-bold">Pokemon:</span>&nbsp;
                    <span>{pokemon.name}</span>&nbsp;
                    <span>{pokemon.base_experience}</span>
                    <Button
                      className="bg-danger border-0 mx-3"
                      onClick={() => handlePokemonDelete(true, idx)}
                    >
                      <FontAwesomeIcon icon="trash" />
                    </Button>
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
                {rightPokemons.map((pokemon, idx) => (
                  <div className="m-3">
                    <span className="font-weight-bold">Pokemon:</span>&nbsp;
                    <span>{pokemon.name}</span>&nbsp;
                    <span>{pokemon.base_experience}</span>
                    <Button
                      className="bg-danger border-0 mx-3"
                      onClick={() => handlePokemonDelete(false, idx)}
                    >
                      <FontAwesomeIcon icon="trash" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="text-center m-3">
            {tradeRate > 0 && (
              <>
                <span>Fair trade:&nbsp;</span>
                {tradeRate > 1.2 ? (
                  <span className="text-danger font-weight-bold">Unfair</span>
                ) : (
                  <span className="text-success font-weight-bold">Fair</span>
                )}
              </>
            )}
          </div>
        </CardBody>
        <CardFooter>
          <Button
            className="float-right"
            color="primary"
            onClick={handleTradeSubmit}
          >
            Register trade!
          </Button>
        </CardFooter>
      </Card>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Trade Result</ModalHeader>
        <ModalBody>Trade sucessfully made!</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggleModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Trades;
