import noImageData from "../../../../assets/images/no-data.png";
export default function NoData() {
  return (
    <>
      <div className="text-center mb-5">
        <img className="img-fluid" src={noImageData} alt="no Data " />
        <h4 className="my-2">No Data !</h4>
      </div>
    </>
  );
}
