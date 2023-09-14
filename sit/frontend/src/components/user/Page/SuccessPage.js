import { Button, Result } from "antd";
import { Link } from "react-router-dom";
const SuccessPage = () => (
	<Result
		status='success'
		title={
			<div className=' items-center'>
				<h1 className=' text-2xl text-gray-800 font-poppins'>
					We have sent you an Email with Credentials{" "}
				</h1>

				<h2 className=' text-indigo-600 font-poppins font-semibold'>
					Please check your email
				</h2>
			</div>
		}
		subTitle='Usually it takes 5-10 minutes to receive the email. If you do not receive the email, please check your spam folder.'
		extra={[
			<Link to='/customer/login' key='login'>
				<Button type='primary' key='loginbtn'>
					Go to Login
				</Button>
			</Link>,
		]}
	/>
);
export default SuccessPage;
