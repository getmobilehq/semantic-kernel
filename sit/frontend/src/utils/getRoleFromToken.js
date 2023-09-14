import jwtDecode from "jwt-decode";

const getRoleFromToken = () => {
	const token = localStorage.getItem("access-token");

	if (token) {
		const role = jwtDecode(token).role;
		return role;
	}
};

export default getRoleFromToken;
