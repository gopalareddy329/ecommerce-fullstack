import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DashboardPage from './dashBoardPage/DashBoardPage';
import AddProductPage from './addProductPage/AddProductPage';
import RemoveProductPage from './removeProductsPage/RemoveProductsPage';
import HeaderProductPage from './headerProductsPage/HeaderProductsPage';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import { IoMdMenu } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";


const AdminPage = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [changeClass, setChangeClass] = useState('translate-x-[-200px]');
  const location = useLocation();
  const [isActive,setIsActive]=useState(location.pathname)

  const sliderOpen = () => {
    setChangeClass('translate-x-[0px]');
    setOpenMenu(!openMenu);
  };
  useEffect(()=>{
    setIsActive(location.pathname)
  },[location.pathname])

  const renderPage = () => {
   
    switch (location.pathname) {
      
      case '/admin':
        
        return <DashboardPage />;
      case '/admin/addproduct':
        return <AddProductPage />;
      case '/admin/removeproduct':
        return <RemoveProductPage />;
      case '/admin/headerproduct':
        return <HeaderProductPage />;
      default:
        return null;
    }
  };

  return (
    <div className='bg-gray-50 h-full'  >
     
      <div className='min-h-screen overflow-y-hidden'>
        <div className={'absolute top-0 z-10 min-h-[130vh] h-full bg-white pt-[8rem] w-fit min-w-[50px] border-r '}>
          {openMenu ? (
            <div className={'flex flex-col text-[20px] ' + changeClass}>
              <div className='flex items-end justify-end w-[95%] mb-5 '>
                <IoCloseCircleOutline onClick={sliderOpen} size={40} />
              </div>
              <Link to="/admin" className={'rounded-xl  p-5 border-b w-full max-w-[400px] mx-auto '+ (isActive==="/admin" && "bg-red-500  text-white") }>Dashboard</Link>
              <Link to="/admin/addproduct" className={'rounded-xl  p-5 border-b w-full max-w-[400px] mx-auto '+ (isActive==="/admin/addproduct" && "bg-red-500  text-white") }>AddProduct</Link>
              {/*<Link to="/admin/removeproduct" className={'rounded-xl  p-5 border-b w-full max-w-[400px] mx-auto '+ (isActive==="/admin/removeproduct" && "bg-red-500  text-white") }>RemoveProducts</Link>*/}
              <Link to="/admin/headerproduct" className={'rounded-xl  p-5 border-b w-full max-w-[400px] mx-auto '+ (isActive==="/admin/headerproduct" && "bg-red-500  text-white") }>HeaderProducts</Link>
            </div>
          ) : (
            <div className='w-full flex justify-center'>
              <IoMdMenu onClick={sliderOpen} size={40} />
            </div>
          )}
        </div>
        <ContentWrapper className="z-0 py-10 relative justify-center flex flex-wrap">
       
          {renderPage()}
        </ContentWrapper>
      </div>
    </div>
  );
};

export default AdminPage;
