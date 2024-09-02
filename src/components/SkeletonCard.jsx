
import { Card, Container } from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';


export const SkeletonCard = ({ cards }) => {
	return Array(cards)
		.fill(0)
		.map((card) => (
			<SkeletonTheme key={card} baseColor="#f2faff66" highlightColor="#23857a33">
				<Container className="p-3 mb-3" >
					<Card className="course-card text-center p-3">
						<Skeleton width={250} height={26} borderRadius={26} style={{ marginTop: "9px", marginBottom: "16px" }}/>
						<Skeleton width={85} height={20} borderRadius={20}/>
						<Skeleton width={140} height={24} borderRadius={24} style={{ marginBottom: "16px" }}/>
						<Skeleton width={163} height={36} borderRadius={36} style={{ marginBottom: "9px" }}/>
					</Card>
				</Container>
			</SkeletonTheme>
		));
}