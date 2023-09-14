import React from "react";

const LoginTable = ({ username, password }) => {
	return (
		<div className=''>
			<table className='w-full max-w-full mb-4 bg-transparent table-hover table-sm '>
				<tbody className='border border-slate-500 text-center'>
					<tr className='border border-slate-500'>
						<td className='border border-slate-500 px-9 py-3'>
							{" "}
							<strong>username</strong>
						</td>
						<td className='border border-slate-500 px-9 py-3'>
							{" "}
							<strong>password</strong>
						</td>
					</tr>

					<tr>
						<td className='border border-slate-500 px-9 py-2'>{username}</td>
						<td className='border border-slate-500 px-9 py-2'>{password}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default LoginTable;
