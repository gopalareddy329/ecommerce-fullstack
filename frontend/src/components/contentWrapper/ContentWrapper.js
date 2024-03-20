import React from "react";



const ContentWrapper = ({ children,className }) => {
    return <div className={className + ` w-full max-w-[1600px]  my-0  py-0 px-[20px] mx-auto `}>{children}</div>;
};

export default ContentWrapper;