import React, { useEffect, useState } from 'react';
import { Card, Accordion, Row, Col } from 'react-bootstrap';
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
        console.log(e);
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
              <div className="d-flex flex-row">
                <Accordion className="flex-grow-1">
                  {trades.map((trade, idx) => (
                    <Card key={trade.id}>
                      <Accordion.Toggle as={Card.Header} eventKey={String(idx)}>
                        Trade {idx + 1}&nbsp;at&nbsp;
                        {formatDate(new Date(trade.created_at))}
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey={String(idx)}>
                        <Card.Body>
                          <div>
                            Fair trade: {trade.fair_trade ? 'Fair' : 'Unfair'}
                          </div>
                          <br />
                          <Row>
                            <Col md={6}>
                              <div>Side 1 of trade</div>
                              {trade.tradeRecords
                                .filter(
                                  tradeRecordFilter => tradeRecordFilter.left,
                                )
                                .map(tradeRecord => (
                                  <>
                                    <div>
                                      Pokemon: {tradeRecord.pokemon.name}
                                      &nbsp;XP:
                                      {tradeRecord.pokemon.base_experience}
                                    </div>
                                  </>
                                ))}
                            </Col>
                            <Col md={6}>
                              <div>Side 2 of trade</div>
                              {trade.tradeRecords
                                .filter(
                                  tradeRecordFilter => !tradeRecordFilter.left,
                                )
                                .map(tradeRecord => (
                                  <>
                                    <div>
                                      Pokemon: {tradeRecord.pokemon.name}
                                      &nbsp;XP:
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
            </Card.Body>
          </>
        )}
      </Card>
    </div>
  );
};

export default TradesHistory;
