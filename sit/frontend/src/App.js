import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";

import Login from "./components/user/Login";
import Logout from "./components/user/Logout";
import UserList from "./components/user/user";

import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

import Page404 from "./components/404/404Page";
import Dashboard from "./components/Dashboard/Graph/Dashboard";
import DetailStaff from "./components/user/detailsStaff";

import Designation from "./components/designation/designation";
import DetailDesignation from "./components/designation/detailDesignation";
import UpdateDesignation from "./components/designation/updateDesignation";

import Main from "./components/layouts/Main";

import Department from "./components/department/Department.js";
import DetailDepartment from "./components/department/DetailsDepartment";
import AddPermission from "./components/role/AddPermission";
import DetailRole from "./components/role/DetailsRole";
import RoleList from "./components/role/role";
import InvoiceSetting from "./components/settings/invoiceSetting";
import GetAllUsers from "./components/user/GetAllUser";

import EmploymentStatus from "./components/employmentStatus/EmploymentStatus";
import DetailEmploymentStatus from "./components/employmentStatus/EmploymentStatusDetails";
import Shift from "./components/shift/Shift";
import DetailShift from "./components/shift/ShiftDetails";

import Account from "./components/account/account";
import BalanceSheet from "./components/account/balanceSheet";
import DetailAccount from "./components/account/detailAccount";
import IncomeStatement from "./components/account/incomeStatement";
import TrialBalance from "./components/account/trialBalance";

import { Navigate } from "react-router-dom";
import Attachment from "./components/CRM/Attachment/Attachment";
import Companies from "./components/CRM/Companies/Companies";
import CompanyDetails from "./components/CRM/Companies/CompanyDetails/CompanyDetails";
import ContactDetails from "./components/CRM/Contacts/ContactDetails/ContactDetails";
import Contacts from "./components/CRM/Contacts/Contacts";
import UserAccount from "./components/CRM/CustomerDashboard/Account";
import Email from "./components/CRM/Email/Email";
import SingleEmail from "./components/CRM/Email/SingleEmail";
import Notes from "./components/CRM/Notes/Notes";
import Opportunity from "./components/CRM/Opportunity/Opportunity";
import OpportunityDetails from "./components/CRM/Opportunity/OpportunityDetails/OpportunityDetails";
import Products from "./components/CRM/Products/Products";
import QuoteDetails from "./components/CRM/Quotes/QuoteDetails/QuoteDetails";
import Quotes from "./components/CRM/Quotes/Quotes";
import CompanyType from "./components/CRM/Setup/CompanySetup/CompanyType/CompanyType";
import Industry from "./components/CRM/Setup/CompanySetup/IndustrySetup/Industry";
import ContactSource from "./components/CRM/Setup/ContactSetup/ContactSourceSetup/ContactSource";
import ContactStage from "./components/CRM/Setup/ContactSetup/ContactStageSetup/ContactStage";
import EmailSetup from "./components/CRM/Setup/EmailSetup/EmailSetup";
import OpportunitySource from "./components/CRM/Setup/OpportunitySetup/OpportunitySourceSetup/OpportunitySource";
import OpportunityStage from "./components/CRM/Setup/OpportunitySetup/OpportunityStageSetup/OpportunityStage";
import OpportunityType from "./components/CRM/Setup/OpportunitySetup/OpportunityTypeSetup/OpportunityType";
import QuoteStage from "./components/CRM/Setup/QuoteSetup/QuoteStageSetup/QuoteStage";
import CrmTaskPriority from "./components/CRM/Setup/TaskSetup/TaskPriority/CrmTaskPriority";
import CrmTaskStatus from "./components/CRM/Setup/TaskSetup/TaskStatus/CrmTaskStatus";
import CrmTaskType from "./components/CRM/Setup/TaskSetup/TaskType/CrmTaskType";
import CrmTicketCategory from "./components/CRM/Setup/TicketSetup/TicketCategory/CrmTicketCategory";
import CrmTicketPriority from "./components/CRM/Setup/TicketSetup/TicketPriority/CrmTicketPriority";
import CrmTicketStatus from "./components/CRM/Setup/TicketSetup/TicketStatus/CrmTicketStatus";
import TaskDetails from "./components/CRM/Tasks/TaskDetails/TaskDetails";
import Tasks from "./components/CRM/Tasks/Tasks";
import SupportTicketForm from "./components/CRM/ticket/CreateTicket";
import Ticket from "./components/CRM/ticket/Ticket";
import TicketDetails from "./components/CRM/ticket/TicketDetails/DetailsPage";
import UserPrivateRoute from "./components/PrivateRoutes/UserPrivateRoute";
import Announcement from "./components/announcement/Announcement";
import DetailAnnouncement from "./components/announcement/AnnouncementDetails";
import DetailAward from "./components/award/DetailsAward";
import GetAllAward from "./components/award/GetAllAward";
import Setup from "./components/setup/Setup";
import SetupLayout from "./components/setup/SetupLayout";
import DetailTransaction from "./components/transaction/detailTransaction";
import Transaction from "./components/transaction/transaction";
import CustomerForgetPass from "./components/user/CustomerForgetPass";
import CustomerLogin from "./components/user/CustomerLogin";
import CustomerRegister from "./components/user/CustomerRegister";
import getRoleFromToken from "./utils/getRoleFromToken";

function App() {
	return (
		<div className='App container-fluid'>
			<ToastContainer
				position='bottom-left'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='light'
			/>
			<BrowserRouter>
				<Main>
					<Routes>
						<Route path='/' element={<Navigate to={"/admin/auth/login"} />} />
						<Route
							path='/admin/dashboard'
							element={
								getRoleFromToken() !== "customer" ? <Dashboard /> : <Ticket />
							}></Route>
						<Route path='/admin' element={<Dashboard />} />
						<Route path='/customer/dashboard' element={<Ticket />} />
						<Route path='*' element={<Page404 />} />

						<Route path='/admin/auth/login' exact element={<Login />} />
						<Route path='/admin/auth/logout' exact element={<Logout />} />
						{/*         <Route path='/auth/register' exact element={<Register />} /> */}

						{/* === === === Setup Routes === === === */}
						<Route path='/admin/setup' element={<SetupLayout />}>
							<Route path='' element={<Setup />} />

							<Route element={<UserPrivateRoute permission={"create-user"} />}>
								<Route path='staffs-new' exact element={<UserList />} />
							</Route>

							<Route element={<UserPrivateRoute permission={"readAll-user"} />}>
								<Route path='staffs' exact element={<GetAllUsers />} />
							</Route>
							<Route
								element={<UserPrivateRoute permission={"readSingle-user"} />}>
								<Route path='staffs/:id' exact element={<DetailStaff />} />
							</Route>
							<Route
								element={
									<UserPrivateRoute permission={"readAll-rolePermission"} />
								}>
								<Route path='role' exact element={<RoleList />} />
							</Route>
							<Route
								element={
									<UserPrivateRoute permission={"readSingle-rolePermission"} />
								}>
								<Route path='role/:id' element={<DetailRole />} />
							</Route>
							<Route
								element={
									<UserPrivateRoute permission={"create-rolePermission"} />
								}>
								<Route path='role/permit/:id/' element={<AddPermission />} />
							</Route>
							<Route
								element={
									<UserPrivateRoute permission={"readAll-department"} />
								}>
								<Route path='department' exact element={<Department />} />
							</Route>
							<Route
								element={
									<UserPrivateRoute permission={"readSingle-department"} />
								}>
								<Route path='department/:id' element={<DetailDepartment />} />
							</Route>
							<Route
								element={
									<UserPrivateRoute permission={"readAll-designation"} />
								}>
								<Route path='designation' exact element={<Designation />} />
							</Route>

							<Route
								element={
									<UserPrivateRoute permission={"readSingle-designation"} />
								}>
								<Route path='designation/:id' element={<DetailDesignation />} />
							</Route>
							<Route
								element={
									<UserPrivateRoute permission={"update-designation"} />
								}>
								<Route
									path='designation/:id/update'
									element={<UpdateDesignation />}
								/>
							</Route>
							<Route
								element={<UserPrivateRoute permission={"readAll-setting"} />}>
								<Route
									path='company-setting'
									exact
									element={<InvoiceSetting />}
								/>
							</Route>

							{/* === === === Shift Routes === === === */}

							<Route
								element={<UserPrivateRoute permission={"readAll-shift"} />}>
								<Route path='shift' element={<Shift />} />
							</Route>

							<Route
								element={<UserPrivateRoute permission={"readSingle-shift"} />}>
								<Route path='shift/:id' element={<DetailShift />} />
							</Route>

							{/* === === === EmploymentStatus Routes === === === */}
							<Route
								element={
									<UserPrivateRoute permission={"readAll-employmentStatus"} />
								}>
								<Route
									path='employment-status'
									element={<EmploymentStatus />}
								/>
							</Route>

							<Route
								element={
									<UserPrivateRoute
										permission={"readSingle-employmentStatus"}
									/>
								}>
								<Route
									path='employment-status/:id'
									element={<DetailEmploymentStatus />}
								/>
							</Route>

							{/* === === === Accounting Routes === === === */}

							<Route
								element={<UserPrivateRoute permission={"readAll-account"} />}>
								<Route path='account' exact element={<Account />} />
								<Route path='account/:id' element={<DetailAccount />} />
								<Route
									path='account/trial-balance'
									exact
									element={<TrialBalance />}
								/>
								<Route
									path='account/balance-sheet'
									exact
									element={<BalanceSheet />}
								/>
								<Route
									path='account/income'
									exact
									element={<IncomeStatement />}
								/>
							</Route>
							{/* === === === Transaction Routes === === === */}
							<Route
								element={
									<UserPrivateRoute permission={"readAll-transaction"} />
								}>
								<Route path='transaction' exact element={<Transaction />} />
							</Route>

							<Route
								element={
									<UserPrivateRoute permission={"readSingle-transaction"} />
								}>
								<Route path='transaction/:id' element={<DetailTransaction />} />
							</Route>

							{/* === === === Announcement Routes === === === */}
							<Route
								element={
									<UserPrivateRoute permission={"readAll-announcement"} />
								}>
								<Route path='announcement' exact element={<Announcement />} />
							</Route>

							<Route
								element={
									<UserPrivateRoute permission={"readSingle-announcement"} />
								}>
								<Route
									path='announcement/:id'
									element={<DetailAnnouncement />}
								/>
							</Route>

							{/* === === === Award Routes === === === */}

							<Route
								element={<UserPrivateRoute permission={"readAll-award"} />}>
								<Route path='award/:id' element={<DetailAward />} />
								<Route path='award' exact element={<GetAllAward />} />
							</Route>
							{/* === === === contact setup Routes === === === */}
							<Route
								element={
									<UserPrivateRoute permission={"readAll-contactSource"} />
								}>
								<Route
									path='contact-source'
									exact
									element={<ContactSource />}
								/>
								<Route path='contact-stage' exact element={<ContactStage />} />
							</Route>
							<Route
								element={
									<UserPrivateRoute permission={"readAll-contactStage"} />
								}>
								<Route path='contact-stage' exact element={<ContactStage />} />
							</Route>

							{/* === === === company setup Routes === === === */}
							<Route
								element={
									<UserPrivateRoute permission={"readAll-companyType"} />
								}>
								<Route path='company-type' exact element={<CompanyType />} />
							</Route>
							<Route
								element={<UserPrivateRoute permission={"readAll-industry"} />}>
								<Route path='industry' exact element={<Industry />} />
							</Route>

							{/* === === === contact setup Routes === === === */}
							<Route
								element={
									<UserPrivateRoute permission={"readAll-opportunitySource"} />
								}>
								<Route
									path='opportunity-source'
									exact
									element={<OpportunitySource />}
								/>
							</Route>
							<Route
								element={
									<UserPrivateRoute permission={"readAll-opportunityStage"} />
								}>
								<Route
									path='opportunity-stage'
									exact
									element={<OpportunityStage />}
								/>
							</Route>
							<Route
								element={
									<UserPrivateRoute permission={"readAll-opportunityType"} />
								}>
								<Route
									path='opportunity-type'
									exact
									element={<OpportunityType />}
								/>
							</Route>

							{/* === === === Crm task setup Routes === === === */}
							<Route
								element={
									<UserPrivateRoute permission={"readAll-crmTaskStatus"} />
								}>
								<Route path='task-status' exact element={<CrmTaskStatus />} />
							</Route>
							<Route
								element={
									<UserPrivateRoute permission={"readAll-crmTaskType"} />
								}>
								<Route path='task-type' exact element={<CrmTaskType />} />
							</Route>
							<Route
								element={
									<UserPrivateRoute permission={"readAll-crmTaskPriority"} />
								}>
								<Route
									path='task-priority'
									exact
									element={<CrmTaskPriority />}
								/>
							</Route>

							{/* === === ===  quote setup Routes === === === */}
							<Route
								element={
									<UserPrivateRoute permission={"readAll-quoteStage"} />
								}>
								<Route path='quote-stage' exact element={<QuoteStage />} />
							</Route>

							{/* === === === email setup Routes === === === */}
							<Route path='email-config' element={<EmailSetup />} />

							{/* === === ===  Ticket setup Routes === === === */}
							<Route
								element={
									<UserPrivateRoute permission={"readAll-ticketCategory"} />
								}>
								<Route
									path='ticket-category'
									exact
									element={<CrmTicketCategory />}
								/>
							</Route>
							<Route
								element={
									<UserPrivateRoute permission={"readAll-ticketPriority"} />
								}>
								<Route
									path='ticket-priority'
									exact
									element={<CrmTicketPriority />}
								/>
							</Route>
							<Route
								element={
									<UserPrivateRoute permission={"readAll-ticketStatus"} />
								}>
								<Route
									path='ticket-status'
									exact
									element={<CrmTicketStatus />}
								/>
							</Route>
						</Route>

						{/* === === === CRM Routes === === === */}

						<Route path='/admin/company' element={<Companies />} />
						<Route
							path='/admin/company/:CompanyId'
							element={<CompanyDetails />}
						/>

						{/* === === === contact Routes === === === */}
						<Route path='/admin/contact' element={<Contacts />} />
						<Route
							path='/admin/contact/:ContactId'
							element={<ContactDetails />}
						/>
						{/* === === === opportunity Routes === === === */}
						<Route path='/admin/opportunity' element={<Opportunity />} />
						<Route
							path='/admin/opportunity/:OpportunityId'
							element={<OpportunityDetails />}
						/>
						{/* === === === product Routes === === === */}
						<Route path='/admin/products' element={<Products />} />

						{/* === === === quote Routes === === === */}
						<Route path='/admin/quote' element={<Quotes />} />
						<Route path='/admin/quote/:QuoteId' element={<QuoteDetails />} />

						{/* === === === task Routes === === === */}
						<Route path='/admin/task' element={<Tasks />} />
						<Route path='/admin/task/:TaskId' element={<TaskDetails />} />

						{/* === === === note Routes === === === */}
						<Route path='/admin/note' element={<Notes />} />

						{/* === === === Attachment Routes === === === */}
						<Route path='/admin/attachment' element={<Attachment />} />

						{/* === === === email Routes === === === */}
						<Route path='/admin/email' element={<Email />}>
							<Route path=':EmailId' element={<SingleEmail />} />
						</Route>

						{/* === === === Crm ticket  Routes === === === */}
						<Route path='/support/ticket' element={<Ticket />} />
						<Route path='/admin/ticket' element={<Ticket />} />
						<Route
							path='/support/ticket/create'
							element={<SupportTicketForm />}
						/>
						<Route path='/support/ticket/:id' element={<TicketDetails />} />

						{/* === === === Crm Customer  Routes === === === */}
						<Route path='/customer/login' element={<CustomerLogin />} />
						<Route path='/customer/register' element={<CustomerRegister />} />
						<Route
							path='/customer/forget-password'
							element={<CustomerForgetPass />}
						/>
						<Route path='/customer/profile' element={<UserAccount />} />
					</Routes>
				</Main>
			</BrowserRouter>
		</div>
	);
}

export default App;
