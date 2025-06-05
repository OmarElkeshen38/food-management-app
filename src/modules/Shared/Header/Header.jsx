import React from 'react'

export default function Header({title,description,img}) {
  return (
    <>
    <div className="container-fluid header">
      
      <div className="row rounded-4 ">
        <div className="col-lg-8  ">
          <div className="content text-white m-4">
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </div>
        <div className="col-lg-4 text-center ">
          <div className="img">
           <img className='w-50' src= {img} alt="" />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
