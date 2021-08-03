import React, { useEffect, useState } from 'react';
import { Accordion, Card, Col, Row } from 'react-bootstrap';
import { ITrade } from '../../shared/models/ITrade';
import Api from '../../services/Api';

const TradesHistory: React.FC = () => {
  const [trades, setTrades] = useState<Array<ITrade>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchTrades(): Promise<void> {
      setLoading(true);
      try {
        const receivedTrades = await Api.get('/trades');
        setTrades([...receivedTrades.data]);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    }

    fetchTrades();
  }, []);

  const formatDate = (data: Date): string => {
    if (data) {
      return new Intl.DateTimeFormat('en-US').format(data);
    }
    return '';
  };

  return (
    <div className="d-flex h-100 align-items-center">
      <Card className="w-75 mx-auto shadow">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <Card.Header>Trades History</Card.Header>
            <Card.Body>
              {trades.length > 0 ? (
                <div className="d-flex flex-row">
                  <Accordion className="flex-grow-1">
                    {trades.map((trade, idx) => (
                      <Card key={trade.id}>
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey={String(idx)}
                        >
                          {trade.fair_trade ? (
                            <span className="text-success">Fair</span>
                          ) : (
                            <span className="text-danger">Unfair</span>
                          )}
                          &nbsp;Trade&nbsp;at&nbsp;
                          {formatDate(new Date(trade.created_at))}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={String(idx)}>
                          <Card.Body>
                            <Row>
                              <Col md={6}>
                                <div className="font-weight-bold">Side 1</div>
                                <br />
                                {trade.tradeRecords
                                  .filter(
                                    tradeRecordFilter => tradeRecordFilter.left,
                                  )
                                  .map(tradeRecord => (
                                    <>
                                      <div>
                                        <span className="font-weight-bold text-warning">
                                          Pokemon:
                                        </span>
                                        &nbsp;
                                        <span className="text-capitalize">
                                          {tradeRecord.pokemon.name}
                                        </span>
                                        &nbsp;
                                        <span className="font-weight-bold text-info">
                                          XP:
                                        </span>
                                        {tradeRecord.pokemon.base_experience}
                                      </div>
                                    </>
                                  ))}
                              </Col>
                              <Col md={6}>
                                <div className="font-weight-bold">Side 2</div>
                                <br />
                                {trade.tradeRecords
                                  .filter(
                                    tradeRecordFilter =>
                                      !tradeRecordFilter.left,
                                  )
                                  .map(tradeRecord => (
                                    <>
                                      <div>
                                        <span className="font-weight-bold text-warning">
                                          Pokemon:
                                        </span>
                                        &nbsp;
                                        <span className="text-capitalize">
                                          {tradeRecord.pokemon.name}
                                        </span>
                                        &nbsp;
                                        <span className="font-weight-bold text-info">
                                          XP:
                                        </span>
                                        {tradeRecord.pokemon.base_experience}
                                      </div>
                                    </>
                                  ))}
                              </Col>
                            </Row>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    ))}
                  </Accordion>
                </div>
              ) : (
                <div>No trades made yet...</div>
              )}
            </Card.Body>
          </>
        )}
      </Card>
    </div>
  );
};

export default TradesHistory;
