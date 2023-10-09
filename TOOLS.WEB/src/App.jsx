import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';


import 'aos/dist/aos.css';
import AOS from 'aos';
import './assets/css/style.scss';
import './charts/ChartjsConfig';
import './assets/translate/i18n';

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
import SignupIntended from './pages/signup/SignupIntended';
import SignupSituation from './pages/signup/SignupSituation';
import SignupPersonalData from './pages/signup/SignupPersonalData';
import SignupUserData from './pages/signup/SignupUserData';
import ConfirmEmail from './pages/signup/ConfirmEmail';
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
import RequireAuth from './components/auth/RequireAuth';
import Permission from './pages/settings/Permission';
import Business from './pages/settings/Business';
import Header from './partials/Header';
import Sidebar from './partials/Sidebar';

import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';

defineElement(lottie.loadAnimation);

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
    document.querySelector('html').style.scrollBehavior = 'none'
    document.querySelector('html').style.scrollSnapType =  ''

    window.scroll({ top: 0 })

    document.querySelector('html').style.scrollBehavior = ''

  }, [location.pathname]);

  const dontShowGlobalComponents = () => {
    const user = JSON.parse(localStorage.getItem("user") ?? null);

    return user === null 
    || location.pathname === '/' 
    || location.pathname === '/signin' 
    || location.pathname === '/signup/intendedtype' 
    || location.pathname === '/signup/situation' 
    || location.pathname === '/signup/basic' 
    || location.pathname === '/signup/user'
    || location.pathname === '/confirm-email'
    || location.pathname === '/reset-password'
  };

  function AppRoutes(){
    return (
      <Routes>
        {/* No required login */}
        <Route path="/" element={<Home/>} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup/intendedtype" element={<SignupIntended />} />
        <Route path="/signup/situation" element={<SignupSituation />} />
        <Route path="/signup/basic" element={<SignupPersonalData />} />
        <Route path="/signup/user" element={<SignupUserData />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* Required login */}
        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/dashboard/analytics" element={<RequireAuth><Analytics /></RequireAuth>} />
        <Route path="/dashboard/fintech" element={<RequireAuth><Fintech /></RequireAuth>} />
        <Route path="/ecommerce/customers" element={<RequireAuth><Customers /></RequireAuth>} />
        <Route path="/ecommerce/orders" element={<RequireAuth><Orders /></RequireAuth>} />
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
        <Route path="/settings/permission/:id" element={<RequireAuth><Permission /></RequireAuth>} />
        <Route path="/settings/business/:id" element={<RequireAuth><Business /></RequireAuth>} />
        <Route path="/settings/notifications/:id" element={<RequireAuth><Notifications /></RequireAuth>} />
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
    );
  }

  return (
    <>
      {/* Show Header & Sidebar */}
      {!dontShowGlobalComponents() ?
        (<div className='flex h-screen overflow-hidden'>
            {/* Sidebar */}
            <Sidebar/>
            <div className='relative flex flex-col flex-1 no-scrollbar overflow-x-hidden'>
              {/* Header */}
              <Header/>
              {/* AppRoutes */}
              <AppRoutes/>
            </div>
          </div>) :
        (<div className='bg-white flex flex-col min-h-screen no-scrollbar-ms overflow-hidden'>
          {/* AppRoutes */}
          <AppRoutes/>
        </div>)
      }
    </>
  );
}

export default App;
