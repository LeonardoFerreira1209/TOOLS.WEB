import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import 'aos/dist/aos.css';

import AOS from 'aos';

// Css
import './css/style.scss';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Fintech from './pages/Fintech';
import Customers from './pages/ecommerce/Customers';
import Orders from './pages/ecommerce/Orders';
import Invoices from './pages/ecommerce/Invoices';
import Shop from './pages/ecommerce/Shop';
import Shop2 from './pages/ecommerce/Shop2';
import Product from './pages/ecommerce/Product';
import Cart from './pages/ecommerce/Cart';
import Cart2 from './pages/ecommerce/Cart2';
import Cart3 from './pages/ecommerce/Cart3';
import Pay from './pages/ecommerce/Pay';
import Campaigns from './pages/Campaigns';
import UsersTabs from './pages/community/UsersTabs';
import UsersTiles from './pages/community/UsersTiles';
import Profile from './pages/community/Profile';
import Feed from './pages/community/Feed';
import Forum from './pages/community/Forum';
import ForumPost from './pages/community/ForumPost';
import Meetups from './pages/community/Meetups';
import MeetupsPost from './pages/community/MeetupsPost';
import CreditCards from './pages/finance/CreditCards';
import Transactions from './pages/finance/Transactions';
import TransactionDetails from './pages/finance/TransactionDetails';
import JobListing from './pages/job/JobListing';
import JobPost from './pages/job/JobPost';
import CompanyProfile from './pages/job/CompanyProfile';
import Messages from './pages/Messages';
import TasksKanban from './pages/tasks/TasksKanban';
import TasksList from './pages/tasks/TasksList';
import Inbox from './pages/Inbox';
import Calendar from './pages/Calendar';
import Account from './pages/settings/Account';
import Notifications from './pages/settings/Notifications';
import Apps from './pages/settings/Apps';
import Plans from './pages/settings/Plans';
import Billing from './pages/settings/Billing';
import Feedback from './pages/settings/Feedback';
import Changelog from './pages/utility/Changelog';
import Roadmap from './pages/utility/Roadmap';
import Faqs from './pages/utility/Faqs';
import EmptyState from './pages/utility/EmptyState';
import PageNotFound from './pages/utility/PageNotFound';
import KnowledgeBase from './pages/utility/KnowledgeBase';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import Onboarding01 from './pages/Onboarding01';
import Onboarding02 from './pages/Onboarding02';
import Onboarding03 from './pages/Onboarding03';
import Onboarding04 from './pages/Onboarding04';
import ButtonPage from './pages/component/ButtonPage';
import FormPage from './pages/component/FormPage';
import DropdownPage from './pages/component/DropdownPage';
import AlertPage from './pages/component/AlertPage';
import ModalPage from './pages/component/ModalPage';
import PaginationPage from './pages/component/PaginationPage';
import TabsPage from './pages/component/TabsPage';
import BreadcrumbPage from './pages/component/BreadcrumbPage';
import BadgePage from './pages/component/BadgePage';
import AvatarPage from './pages/component/AvatarPage';
import TooltipPage from './pages/component/TooltipPage';
import AccordionPage from './pages/component/AccordionPage';
import IconsPage from './pages/component/IconsPage';
import Home from './pages/Home';
import StoreProvider from './components/store/Provider';
import RequireAuth from './components/auth/RequireAuth';
import ConfirmEmail from './pages/ConfirmEmail';

// Lord icons.
import { loadAnimation } from "lottie-web";
import { defineLordIconElement } from "lord-icon-element";


// register lottie and define custom element
defineLordIconElement(loadAnimation);

function App() {

  const location = useLocation();

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 600,
      easing: 'ease-out-sine',
    });
  });

  useEffect(() => {
    
    document.querySelector('html').style.scrollBehavior = 'auto'

    window.scroll({ top: 0 })

    document.querySelector('html').style.scrollBehavior = ''

  }, [location.pathname]); // triggered on route change

  return (
    <>
        <StoreProvider>
         <Routes>
          {/* No required login */}
          <Route exact path="/" element={<Home/>} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/confirmEmail/:code/:userId" element={ <ConfirmEmail /> } />
          <Route path="/reset-password" element={<ResetPassword />} />
          {/* Required login */}
          <Route exact path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
          <Route path="/dashboard/analytics" element={<RequireAuth><Analytics /></RequireAuth>} />
          <Route path="/dashboard/fintech" element={<RequireAuth><Fintech /></RequireAuth>} />
          <Route path="/ecommerce/customers" element={<RequireAuth><Customers /></RequireAuth>} />
          <Route path="/ecommerce/orders" element={<RequireAuth><Orders /><Orders /></RequireAuth>} />
          <Route path="/ecommerce/invoices" element={<RequireAuth><Invoices /></RequireAuth>} />
          <Route path="/ecommerce/shop" element={<RequireAuth><Shop /></RequireAuth>} />
          <Route path="/ecommerce/shop-2" element={<RequireAuth><Shop2 /></RequireAuth>} />
          <Route path="/ecommerce/product" element={<RequireAuth><Product /></RequireAuth>} />
          <Route path="/ecommerce/cart" element={<RequireAuth><Cart /></RequireAuth>} />
          <Route path="/ecommerce/cart-2" element={<RequireAuth><Cart2 /></RequireAuth>} />
          <Route path="/ecommerce/cart-3" element={<RequireAuth><Cart3 /></RequireAuth>} />
          <Route path="/ecommerce/pay" element={<RequireAuth><Pay /></RequireAuth>} />
          <Route path="/campaigns" element={<RequireAuth><Campaigns /></RequireAuth>} />
          <Route path="/community/users-tabs" element={<RequireAuth><UsersTabs /></RequireAuth>} />
          <Route path="/community/users-tiles" element={<RequireAuth><UsersTiles /></RequireAuth>} />
          <Route path="/community/profile" element={<RequireAuth><Profile /></RequireAuth>} />
          <Route path="/community/feed" element={<RequireAuth><Feed /></RequireAuth>} />
          <Route path="/community/forum" element={<RequireAuth><Forum /></RequireAuth>} />
          <Route path="/community/forum-post" element={<RequireAuth><ForumPost /></RequireAuth>} />
          <Route path="/community/meetups" element={<RequireAuth><Meetups /></RequireAuth>} />
          <Route path="/community/meetups-post" element={<RequireAuth><MeetupsPost /></RequireAuth>} />
          <Route path="/finance/cards" element={<RequireAuth><CreditCards /></RequireAuth>} />
          <Route path="/finance/transactions" element={<RequireAuth><Transactions /></RequireAuth>} />
          <Route path="/finance/transaction-details" element={<RequireAuth><TransactionDetails /></RequireAuth>} />
          <Route path="/job/job-listing" element={<RequireAuth><JobListing /></RequireAuth>} />
          <Route path="/job/job-post" element={<RequireAuth><JobPost /></RequireAuth>} />
          <Route path="/job/company-profile" element={<RequireAuth><CompanyProfile /></RequireAuth>} />
          <Route path="/messages" element={<RequireAuth><Messages /></RequireAuth>} />
          <Route path="/tasks/kanban" element={<RequireAuth><TasksKanban /></RequireAuth>} />
          <Route path="/tasks/list" element={<RequireAuth><TasksList /></RequireAuth>} />
          <Route path="/inbox" element={<RequireAuth><Inbox /></RequireAuth>} />
          <Route path="/calendar" element={<RequireAuth><Calendar /></RequireAuth>} />
          <Route path="/settings/account/:id" element={<RequireAuth><Account /></RequireAuth>}/>
          <Route path="/settings/notifications" element={<RequireAuth><Notifications /></RequireAuth>} />
          <Route path="/settings/apps" element={<RequireAuth><Apps /></RequireAuth>} />
          <Route path="/settings/plans" element={<RequireAuth><Plans /></RequireAuth>} />
          <Route path="/settings/billing" element={<RequireAuth><Billing /></RequireAuth>} />
          <Route path="/settings/feedback" element={<RequireAuth><Feedback /></RequireAuth>} />
          <Route path="/utility/changelog" element={<RequireAuth><Changelog /></RequireAuth>} />
          <Route path="/utility/roadmap" element={<RequireAuth><Roadmap /></RequireAuth>} />
          <Route path="/utility/faqs" element={<RequireAuth><Faqs /></RequireAuth>} />
          <Route path="/utility/empty-state" element={<RequireAuth><EmptyState /></RequireAuth>} />
          <Route path="/utility/404" element={<RequireAuth><PageNotFound /></RequireAuth>} />
          <Route path="/utility/knowledge-base" element={<RequireAuth><KnowledgeBase /></RequireAuth>} />
          <Route path="/onboarding-01" element={<RequireAuth><Onboarding01 /></RequireAuth>} />
          <Route path="/onboarding-02" element={<Onboarding02 />} />
          <Route path="/onboarding-03" element={<Onboarding03 />} />
          <Route path="/onboarding-04" element={<Onboarding04 />} />
          <Route path="/component/button" element={<ButtonPage />} />
          <Route path="/component/form" element={<FormPage />} />
          <Route path="/component/dropdown" element={<DropdownPage />} />
          <Route path="/component/alert" element={<AlertPage />} />
          <Route path="/component/modal" element={<ModalPage />} />
          <Route path="/component/pagination" element={<PaginationPage />} />
          <Route path="/component/tabs" element={<TabsPage />} />
          <Route path="/component/breadcrumb" element={<BreadcrumbPage />} />
          <Route path="/component/badge" element={<BadgePage />} />
          <Route path="/component/avatar" element={<AvatarPage />} />
          <Route path="/component/tooltip" element={<TooltipPage />} />
          <Route path="/component/accordion" element={<AccordionPage />} />
          <Route path="/component/icons" element={<IconsPage />} />
          <Route path="*" element={<RequireAuth><PageNotFound /></RequireAuth>} />
          </Routes>
        </StoreProvider>
    </>
  );
}

export default App;
