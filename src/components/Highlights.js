import { Row, Col, Card } from 'react-bootstrap';

export default function Highlights(){
  return(
    <Row className="mt-3 mb-3">
    <Col className="mb-3 mx-auto" xs={10} md={4}>
        <Card className="highlight-card p-3">
            <Card.Body className="d-flex flex-column">
                <img
                    className="highlight-img mx-auto img-fluid"
                    src={require('../images/schedule.png')}
                    alt="GPU for Productivity"
                />
                <Card.Title className="highlight-title">Pick Your Schedule</Card.Title>
                <Card.Text className="m-2">
                   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Card.Text>
            </Card.Body>
      </Card>
    </Col>
    <Col className="mb-3 mx-auto" xs={10} md={4}>
        <Card className="highlight-card p-3">
            <Card.Body className="d-flex flex-column">
                <img
                    className="highlight-img mx-auto img-fluid"
                    src={require('../images/homestudy.png')}
                    alt="GPU for Productivity"
                />
                <Card.Title className="highlight-title">Study at Home</Card.Title>
                <Card.Text className="m-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Card.Text>
            </Card.Body>
        </Card>
    </Col>
    <Col className="mb-3 mx-auto" xs={10} md={4}>
        <Card className="highlight-card p-3">
            <Card.Body className="d-flex flex-column">
                <img
                    className="highlight-img mx-auto img-fluid"
                    src={require('../images/projects.png')}
                    alt="GPU for Productivity"
                />
                <Card.Title className="highlight-title">Build Projects</Card.Title>
                <Card.Text className="m-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Card.Text>
            </Card.Body>
        </Card>
        </Col>
    </Row>
    );
}
