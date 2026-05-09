import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { MdOutlineFavorite } from "react-icons/md";
import { toast } from "react-toastify";
import { favApi } from "../../../../api";
import {
  default as chief,
  default as defaultImage,
} from "../../../../assets/images/Recipes.png";
import Header from "../../../Shared/components/Header/Header";
import NoData from "../../../Shared/components/NoData/NoData";

export default function FavList() {
  const [favs, setFav] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const addToFavs = async () => {
    setIsAdding(true);
    try {
      const response = await favApi.getAllFav();
      setFav(response?.data?.data);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setIsAdding(false);
    }
  };
  const [deletingId, setDeletingId] = useState(null);
  // delet  by id
  const deletFav = async (id) => {
    if (!id) return;
    setDeletingId(id);
    try {
      const response = await favApi.deleteFavById(id);
      toast.success("Deleted Successfully");
      addToFavs();
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    addToFavs();
  }, []);
  return (
    <>
      <Header
        title={"Favorite "}
        description={`You can now add your items that any user can order it from the Application and you can edit`}
        imgUrl={chief}
      />
      {isAdding ? (
        <div className="d-flex justify-content-center align-items-center h-50">
          Wating...
          <Spinner
            as="span"
            animation="border"
            size="lg"
            role="status"
            aria-hidden="true"
            className="mx-3 text-success "
          />
        </div>
      ) : (
        <div className="my-3">
          {favs && favs.length > 0 ? (
            <div className="row g-4 mx-auto my-3 px-5 ">
              {favs.map((fav) => (
                <div key={fav?.id} className="col-md-6 col-lg-4">
                  <Card className="border border-0 rounded-4 shadow-lg">
                    <button
                      disabled={deletingId === fav?.id}
                      onClick={() => deletFav(fav?.id)}
                      className="position-absolute m-2 end-0 modal-view rounded rounded-4 shadow-lg border border-0 p-2"
                    >
                      {deletingId === fav?.id ? (
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="text-danger"
                        />
                      ) : (
                        <MdOutlineFavorite className="text-danger fs-4" />
                      )}
                    </button>
                    <Card.Img
                      className="border border-0 rounded-4"
                      variant="top"
                      src={
                        fav?.recipe?.imagePath
                          ? `https://upskilling-egypt.com:3006/${fav?.recipe?.imagePath}`
                          : defaultImage
                      }
                    />
                    <Card.Body className=" row d-flex justify-content-center   ">
                      <div className="col-6   d-flex justify-content-center">
                        <Card.Title className="text-success fs-6">
                          <h4 className="text-black">Name</h4>
                          {fav?.recipe?.name}
                        </Card.Title>
                      </div>
                      <div className="col-6 d-flex justify-content-center">
                        <Card.Title className="text-success fs-6">
                          <h4 className="text-black">Price</h4>
                          {fav?.recipe?.price}
                        </Card.Title>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <NoData />
          )}
        </div>
      )}
    </>
  );
}
