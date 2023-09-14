import { useEffect, useState } from "react";

// Custom hook
function useMobileView() {
	const initialValue = window.matchMedia("(max-width: 767px)").matches;
	const [isMobileView, setIsMobileView] = useState(initialValue);

	useEffect(() => {
		function handleResize() {
			setIsMobileView(window.innerWidth <= 767);
		}

		// Add event listener to check on window resize
		window.addEventListener("resize", handleResize);

		// Initial check on hook mount
		handleResize();

		// Clean up the event listener on hook unmount
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return isMobileView;
}

export default useMobileView;
