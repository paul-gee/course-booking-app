
import { Col } from 'react-bootstrap';


export default function Footer() {
	return (
		<div className="footer-div text-center py-5 mt-5">
			<hr />
			<Col className="d-flex px-2 my-auto justify-content-center align-items-center">
				Copyright &copy; 2023 &nbsp;<a href="https://github.com/paul-gee" className="paul-footer">Paul Santos</a>
			</Col>
		</div>
	)
}