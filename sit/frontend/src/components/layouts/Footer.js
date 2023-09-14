import { Col, Layout, Row } from "antd";
import styles from "./Footer.module.css";

function Footer() {
	const { Footer: AntFooter } = Layout;
	const year = new Date().getFullYear();

	return (
		<AntFooter className={styles.footer}>
			<Row justify={"center"}>
				<Col xs={24} md={24} lg={12} className={styles.copyrightCol}>
					<p className={styles.copyrightText}>
						{year}{" "}
						<a
							href='https://solution.omega.ac'
							className='font-weight-bold'
							target='_blank'
							rel='noreferrer'>
							Omega Solution
						</a>{" "}
					</p>
				</Col>
			</Row>
		</AntFooter>
	);
}

export default Footer;
