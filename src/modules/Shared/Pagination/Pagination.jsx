import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Pagination({arrayOfPages,PaginationFun}) {

  const [currentPageGroup, setCurrentPageGroup] = useState(0);//store num of pages to display
  const pagesPerGroup = 5; //num of pages in each Group
  const totalGroups = Math.ceil(arrayOfPages.length / pagesPerGroup);  //total group=>num of pages/5 assume num of pages=10 [10/5=5]
  const startPageIndex = currentPageGroup * pagesPerGroup;   //0*5      start=0
  const endPageIndex = Math.min(startPageIndex + pagesPerGroup, arrayOfPages.length);   //0+5,10       end from 5 to 10
  
  const handleNextGroup = () => {
    if (currentPageGroup < totalGroups - 1) {
      setCurrentPageGroup(currentPageGroup + 1);
    }
  };
  
  const handlePreviousGroup = () => {
    if (currentPageGroup > 0) {
      setCurrentPageGroup(currentPageGroup - 1);
    }
  }
  return (
   <>
    
        <nav aria-label="Page navigation example" >
  <ul className="pagination">
    <li className="page-item ">
      <Link onClick={handlePreviousGroup}  className="page-link"  aria-label="Previous">
        <span aria-hidden="true" className='text-black'>Previous</span>
      </Link>
    </li>
    {arrayOfPages?.slice(startPageIndex, endPageIndex).map((page)=>(
         <li   key={page} onClick={()=>{PaginationFun(5,page)}} className="page-item">
          <Link className="page-link text-black" >{page}</Link></li>
    ))}
   
    <li className="page-item">
      <Link onClick={handleNextGroup} className="page-link"  aria-label="Next">
        <span aria-hidden="true" className='text-black'>Next</span>
      </Link>
    </li>
  </ul>
</nav>
    
   </>
  )
}




