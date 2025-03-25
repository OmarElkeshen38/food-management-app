import noDataImg from '../../assets/images/noDataImg.png';

function NoData() {
  return (
    <>
      <div className='d-flex w-100 flex-column align-items-center justify-content-center p-4'>
        <div className="w-25">
          <img src={noDataImg} className='w-100' alt="no data" />
        </div>
        <h3>No Data !</h3>
        <span>are you sure you want to delete this item ? if you are sure just click on delete it</span>
      </div>
    </>
  )
}

export default NoData
