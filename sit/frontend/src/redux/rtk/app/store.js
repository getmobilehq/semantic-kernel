import { configureStore } from "@reduxjs/toolkit";

import accountSlice from "../features/account/accountSlice";
import announcementSlice from "../features/announcement/announcementSlice";
import apiSlice from "../features/api/apiSlice";
import awardSlice from "../features/award/awardSlice";
import awardHistorySlice from "../features/awardHistory/awardHistorySlice";
import crmAttachmentSlice from "../features/crm/attachment/crmAttachmentSlice";
import companySlice from "../features/crm/company/companySlice";
import companyTypeSlice from "../features/crm/companyType/companyTypeSlice";
import contactSlice from "../features/crm/contact/contactSlice";
import crmEmailSlice from "../features/crm/email/crmEmailSlice";
import emailConfigSlice from "../features/crm/email/emailConfigSlice";
import industrySlice from "../features/crm/industry/industrySlice";
import crmNoteSlice from "../features/crm/note/crmNoteSlice";
import opportunitySlice from "../features/crm/opportunity/opportunitySlice";
import opportunitySourceSlice from "../features/crm/opportunitySource/opportunitySourceSlice";
import opportunityStageSlice from "../features/crm/opportunityStage/opportunityStageSlice";
import opportunityTypeSlice from "../features/crm/opportunityType/opportunityTypeSlice";
import quoteSlice from "../features/crm/quote/quoteSlice";
import quoteStageSlice from "../features/crm/quoteStage/quoteStageSlice";
import crmTaskSlice from "../features/crm/task/crmTaskSlice";
import crmTaskPrioritySlice from "../features/crm/taskPriority/crmTaskPrioritySlice";
import crmTaskStatusSlice from "../features/crm/taskStatus/crmTaskStatusSlice";
import crmTaskTypeSlice from "../features/crm/taskType/crmTaskTypeSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import designationReducer from "../features/designation/designationSlice";
import employmentStatusSlice from "../features/employemntStatus/employmentStatusSlice";
import paymentSlice from "../features/payment/paymentSlice";
import shiftSlice from "../features/shift/shiftSlice";
import transactionSlice from "../features/transaction/transactionSlice";
import userReducer from "../features/user/userSlice";
import contactStageSlice from "./../features/crm/ContactStage/contactStageSlice";
import contactSourceSlice from "./../features/crm/contactSource/contactSourceSlice";
import productSlice from "./../features/crm/product/productSlice";
import ticketSlice from "../features/crm/ticket/ticketSlice";
import ticketStatusSlice from "../features/crm/ticketStatus/ticketStatusSlice";
import ticketCategorySlice from "../features/crm/ticketCategory/ticketCategorySlice";
import ticketPrioritySlice from "../features/crm/ticketPriority/ticketPrioritySlice";
import ticketCommentSlice from "../features/crm/ticketComment/ticketCommentSlice";
import customerSlice from "../features/crm/customer/customerSlice";
import roleSlice from "../features/role/roleSlice";

// const reduxLogger = require("redux-logger");
// const logger = reduxLogger.createLogger();

const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		users: userReducer,
		dashboard: dashboardReducer,
		designations: designationReducer,
		payment: paymentSlice,
		shift: shiftSlice,
		employmentStatus: employmentStatusSlice,
		accounts: accountSlice,
		transactions: transactionSlice,
		announcement: announcementSlice,
		award: awardSlice,
		awardHistory: awardHistorySlice,
		contact: contactSlice,
		company: companySlice,
		industry: industrySlice,
		companyType: companyTypeSlice,
		contactSource: contactSourceSlice,
		contactStage: contactStageSlice,
		opportunity: opportunitySlice,
		opportunitySource: opportunitySourceSlice,
		opportunityStage: opportunityStageSlice,
		opportunityType: opportunityTypeSlice,
		product: productSlice,
		quote: quoteSlice,
		quoteStage: quoteStageSlice,
		crmTask: crmTaskSlice,
		crmTaskPriority: crmTaskPrioritySlice,
		crmTaskStatus: crmTaskStatusSlice,
		crmTaskType: crmTaskTypeSlice,
		crmNote: crmNoteSlice,
		crmAttachment: crmAttachmentSlice,
		crmEmail: crmEmailSlice,
		emailConfig: emailConfigSlice,
		ticket: ticketSlice,
		ticketStatus: ticketStatusSlice,
		ticketCategory: ticketCategorySlice,
		ticketPriority: ticketPrioritySlice,
		ticketComment: ticketCommentSlice,
		customer: customerSlice,
		role: roleSlice,
	},
	devTools: true,

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(apiSlice.middleware),
	// middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
