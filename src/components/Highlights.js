import { Row, Col, Card } from 'react-bootstrap';

export default function Highlights(){
  return(
    <Row className="mt-3 mb-3">
    <Col className="mb-3 mx-auto" xs={10} md={4}>
        <Card className="highlight-card p-3 h-100">
            <Card.Body className="d-flex flex-column">
                <img
                    className="highlight-img mx-auto img-fluid"
                    src={require('../images/schedule.png')}
                    alt="GPU for Productivity"
                />
                <Card.Title className="highlight-title">Pick Your Schedule</Card.Title>
                <Card.Text className="m-2">
                   Choose whether to go through the course quickly if your schedule allows or take a slower pace of classes to balance your studies with other obligations.
                </Card.Text>
            </Card.Body>
      </Card>
    </Col>
    <Col className="mb-3 mx-auto" xs={10} md={4}>
        <Card className="highlight-card p-3 h-100">
            <Card.Body className="d-flex flex-column">
                <img
                    className="highlight-img mx-auto img-fluid"
                    src={require('../images/homestudy.png')}
                    alt="GPU for Productivity"
                />
                <Card.Title className="highlight-title">Study at Home</Card.Title>
                <Card.Text className="m-2">
                    Attend classes at the comfort of your home. Avoid the hassle and expense of traveling to a physical location and instead focus on your learnings.
                </Card.Text>
            </Card.Body>
        </Card>
    </Col>
    <Col className="mb-3 mx-auto" xs={10} md={4}>
        <Card className="highlight-card p-3 h-100">
            <Card.Body className="d-flex flex-column">
                <img
                    className="highlight-img mx-auto img-fluid"
                    src={require('../images/projects.png')}
                    alt="GPU for Productivity"
                />
                <Card.Title className="highlight-title">Build Projects</Card.Title>
                <Card.Text className="m-2">
                    Gain hands-on experience on project building and improve your skills. Develop your own solutions and approaches and apply them in a tangible way.
                </Card.Text>
            </Card.Body>
        </Card>
        </Col>
    </Row>
    );
}
