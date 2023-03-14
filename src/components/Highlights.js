import { Row, Col, Card } from 'react-bootstrap';

export default function Highlights(){
  return(
    <Row className="mt-3 mb-3">
    <Col className="mb-3 mx-auto" xs={10} md={4}>
        <Card className="cardHighlight p-3">
            <Card.Body>
              <Card.Title>Learn From Home</Card.Title>
              <Card.Text>
                   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                   Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
             </Card.Text>
            </Card.Body>
      </Card>
    </Col>
    <Col className="mb-3 mx-auto" xs={10} md={4}>
        <Card className="cardHighlight p-3">
            <Card.Body>
                <Card.Title>Study At Your Own Pace</Card.Title>
                <Card.Text>
                   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                   Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Card.Text>
            </Card.Body>
        </Card>
    </Col>
    <Col className="mb-3 mx-auto" xs={10} md={4}>
        <Card className="cardHighlight p-3">
            <Card.Body>
                <Card.Title>Build Projects</Card.Title>
                <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Card.Text>
            </Card.Body>
        </Card>
        </Col>
    </Row>
    );
}
