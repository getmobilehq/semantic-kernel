import { useEffect } from "react";
import { toast } from "react-toastify";
import getRoleFromToken from "../../utils/getRoleFromToken";

function Logout(props) {
	const role = getRoleFromToken();
	useEffect(() => {
		localStorage.clear();
		// deleteAllCookies();
		toast.success("Logged Out");
		// localStorage.setItem("isLogged", false);;

		localStorage.setItem("isLogged", "");

		if (role === "customer") window.location.href = "/customer/login";
		else window.location.href = "/admin/auth/login";
	}, []);
}
export default Logout;
