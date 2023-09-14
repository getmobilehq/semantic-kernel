import { Affix, Breadcrumb, Layout } from "antd";
import React, { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import QuickLinks from "./QuickLinks";
import getRoleFromToken from "../../utils/getRoleFromToken";

const { Header: AntHeader, Content } = Layout;

function Main({ children }) {
	const navigate = useNavigate();
	//   // get the token from local storage and decode JWT Token and get the user id from the token
	//   const token = localStorage.getItem("access-token");

	//   useEffect(() => {
	//     if (token) {
	//       checkTokenExp(token);
	//       const id = jwtDecode(token).sub;
	//     }
	//   }, [token]);

	const [collapsed, setCollapsed] = useState(false);
	const [sideNavOpenKeys, setSideNavOpenKeys] = useState("");

	const sideNavOpenKeysHandler = (val) => {
		setSideNavOpenKeys(val);
	};

	const handleCollapsed = (val) => {
		setCollapsed(val);
	};

	const [visible, setVisible] = useState(false);
	const [fixed, setFixed] = useState(false);
	const role = getRoleFromToken();

	const openDrawer = () => setVisible(!visible);

	const handleFixedNavbar = (type) => setFixed(type);

	let { pathname } = useLocation();
	pathname = pathname.replace("/", " ");

	const pathArr = pathname.split("/");
	const pathArray = pathname.split("/");
	pathArray?.splice(0, 1, "Home");

	const isLogged = Boolean(localStorage.getItem("isLogged"));

	const navigateBack = () => {
		navigate(-1);
	};
	const navigateForward = () => {
		window.history.forward();
	};

	return (
		<div className='min-h-screen min-w-full'>
			<Layout className='layout'>
				{fixed ? (
					<Affix>
						<AntHeader>
							<Header
								onPress={openDrawer}
								name={pathname}
								subName={pathname}
								handleFixedNavbar={handleFixedNavbar}
								collapsed={collapsed}
								handleCollapsed={handleCollapsed}
								isLogged={isLogged}
							/>
						</AntHeader>
					</Affix>
				) : (
					<AntHeader>
						<Header
							onPress={openDrawer}
							name={pathname}
							subName={pathname}
							handleFixedNavbar={handleFixedNavbar}
							collapsed={collapsed}
							handleCollapsed={handleCollapsed}
						/>
					</AntHeader>
				)}
				{isLogged &&
					(pathname.trim() === "dashboard" || pathname.trim() === "") && (
						<QuickLinks
							sideNavOpenKeys={sideNavOpenKeys}
							sideNavOpenKeysHandler={sideNavOpenKeysHandler}
						/>
					)}
				<Content className=''>
					{role !== "customer" && (
						<div className='flex items-center gap-2 py-2 px-4'>
							<span
								className='cursor-pointer hover:bg-slate-500 hover:text-white dark:text-white'
								onClick={navigateBack}>
								<AiOutlineArrowLeft />
							</span>
							<span
								className='cursor-pointer hover:bg-slate-500 hover:text-white dark:text-white'
								onClick={navigateForward}>
								<AiOutlineArrowRight />
							</span>
							<Breadcrumb>
								{pathArray?.map((item, index) => {
									return (
										<Breadcrumb.Item className='dark:text-white' key={index}>
											{pathArray.length - 1 !== index && 0 !== index && (
												<Link className='dark:text-white' to={`/admin/${item}`}>
													{item}
												</Link>
											)}
											{pathArray.length - 1 === index && item}
											{0 === index && (
												<Link
													className='dark:text-white'
													to={`/admin/dashboard`}>
													{item}
												</Link>
											)}
										</Breadcrumb.Item>
									);
								})}
							</Breadcrumb>
						</div>
					)}
					<Content>{children}</Content>
				</Content>
			</Layout>
		</div>
	);
}

export default Main;
