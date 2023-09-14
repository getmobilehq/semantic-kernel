import React from "react";
import { Link } from "react-router-dom";
import CreateBtn from "../../CRM/ticket/CreateBtn";

const CustomerDashboard = () => {
	return (
		//center the div high and width
		<div
			className='flex flex-col justify-center items-center bg-inherit'
			style={{ height: "60vh" }}>
			<div className='flex flex-col justify-center items-center'>
				<h1 className='text-4xl text-center font-bold font-poppins text-indigo-600 '>
					NEED SUPPORT ?
				</h1>
				<h1 className='text-5xl text-center font-bold font-poppins text-gray-800 '>
					WE ARE HERE TO HELP YOU
				</h1>

				<Link to='/support/ticket/create' className='mt-8'>
					<CreateBtn />
				</Link>
			</div>
		</div>
	);
};

export default CustomerDashboard;
