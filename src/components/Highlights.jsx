import { Row, Col, Card } from 'react-bootstrap';
import { HOME_HIGHLIGHTS } from '../constants/app';


export default function Highlights() {
    return (
        <Row className="mt-3 mb-3">
            {HOME_HIGHLIGHTS.map((highlight, idx) => (
                <Col key={idx} className="mb-3 mx-auto" xs={10} md={4}>
                    <Card className="highlight-card p-3 h-100">
                        <Card.Body className="d-flex flex-column">
                            <img
                                className="highlight-img mx-auto img-fluid"
                                src={highlight.image}
                                alt={highlight.alt}
                            />
                            <Card.Title className="highlight-title">{highlight.title}</Card.Title>
                            <Card.Text className="m-2">
                                {highlight.message}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}
