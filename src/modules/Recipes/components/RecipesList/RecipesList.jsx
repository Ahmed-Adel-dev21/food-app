import { useContext, useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Modal,
  Pagination,
  Spinner,
  Table,
} from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../Context/AuthContext";
import { favApi, recipeApi } from "../../../../api";
import { getAllRecipe } from "../../../../api/modules/Recipes";
import { getAllTags } from "../../../../api/modules/Tags";
import { getAllCategories } from "../../../../api/modules/categories";
import chief from "../../../../assets/images/Recipes.png";
import defaultImage from "../../../../assets/images/burger-king.jpg";
import DeleteConfermation from "../../../Shared/components/DeleteConfermation/DeleteConfermation";
import Header from "../../../Shared/components/Header/Header";
import NoData from "../../../Shared/components/NoData/NoData";
import { MdOutlineFavorite } from "react-icons/md";
import { IoCloseCircle } from "react-icons/io5";
import { createFav } from "../../../../api/modules/favourites";

export default function RecipesList() {
  const { loginData } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  // get categories
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    try {
      const response = await getAllCategories();
      const data = response?.data?.data;
      setCategories(data);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  //---------------------------------------
  // get Tags
  const [Tags, setTags] = useState([]);
  const getTags = async () => {
    try {
      const response = await getAllTags();
      const data = response?.data;
      setTags(data);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  // useState for get and filteration Recipe
  const [Recipes, setRecipe] = useState([]);
  const [nameValue, setNameValue] = useState("");
  const [tagId, setTagId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  // get Recipe
  const getRecipe = async (name, tag, cat, page, size) => {
    setIsLoading(true);
    try {
      const response = await getAllRecipe(name, tag, cat, size, page);
      const data = response?.data?.data;
      setRecipe(data);
      setTotalPages(response?.totalNumberOfPages || 0);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  // (Debouncing Search)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getRecipe(nameValue, tagId, categoryId, pageNumber, pageSize);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [nameValue, tagId, categoryId, pageNumber]);

  const onFilterChange = (setter, value) => {
    setter(value);
    setPageNumber(1); // back to first page
  };

  // loding of delete
  const [isDeleting, setIsDeleting] = useState(false);
  // delet  by id
  const deletGetRecipes = async (id) => {
    if (!id) return;
    setIsDeleting(true);
    try {
      const response = await recipeApi.deleteRecipeById(id);
      toast.success("Deleted Successfully");
      getRecipe();

      handleClose();
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setIsDeleting(false);
    }
  };

  // useState use in define Recipe in modal and props
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [viewRecipe, setViewRecipe] = useState(null);
  // modale delete
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleShow = (Recipe) => {
    setSelectedRecipe(Recipe);
    setShow(true);
  };
  // modal Add
  const [showAdd, setShowAdd] = useState(false);
  const handleShowAdd = (Recipe) => {
    setViewRecipe(Recipe);
    setShowAdd(true);
  };
  const handleCloseAdd = () => {
    setShowAdd(false);
  };

  // ------ work on update
  const handleEdit = (recipe) => {
    navigate("/dashboard/recipe-data", {
      state: {
        recipeData: recipe,
        isUpdate: true,
      },
    });
  };

  // Add to Fav
  // const [fav, setCategories] = useState([]);
  const [isAdding, setIsAdding] = useState(false); // spinner

  const addToFavs = async (id) => {
    setIsAdding(true);
    try {
      const response = await favApi.createFav({
        recipeId: id,
      });
      toast.success("Added To Favourite List ");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    getCategories();
    getTags();
  }, []);

  return (
    <>
      <Header
        title={"Recipes "}
        description={`You can now add your items that any user can order it from  , the Application and you can edit`}
        imgUrl={chief}
        Data={"Items"}
      />

      <div className="row d-flex justify-content-between align-items-center my-4 px-2">
        <div className="col-md-8">
          <h4>Recipe Table Details</h4>
          <span>You can check all details</span>
        </div>
        <div className="col-md-4 text-start text-md-end my-1">
          {loginData?.userGroup != "SystemUser" ? (
            <button
              onClick={() => navigate("/dashboard/recipe-data")}
              className="btn btn-success py-2 px-3 px-lg-5"
            >
              Add New Item
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>

      {/* search and sort by */}
      <div className="row p-3 bg-light m-2 rounded shadow-sm">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name..."
            onChange={(e) => onFilterChange(setNameValue, e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            onChange={(e) => onFilterChange(setTagId, e.target.value)}
          >
            <option value="">Filter by Tag</option>
            {Tags.map((tag) => (
              <option key={tag.id} value={tag?.id}>
                {tag?.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            onChange={(e) => onFilterChange(setCategoryId, e.target.value)}
          >
            <option value="">Filter by Category</option>
            {categories.map((category) => (
              <option key={category.id} value={String(category.id)}>
                {category?.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        {isLoading ? (
          <div className="d-flex flex-column justify-content-center align-items-center my-5 py-5">
            <Spinner animation="border" variant="success" size="xl" />
            <h5 className="mt-3 text-success">Loading Recipes...</h5>
          </div>
        ) : Recipes && Recipes.length > 0 ? (
          <>
            <Table responsive hover className="text-center custom-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>tag</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {Recipes.map((Recipe, index) => (
                  <tr key={Recipe?.id || index}>
                    <td>{Recipe?.id}</td>
                    <td>{Recipe?.name}</td>
                    <td>
                      <img
                        className="recipy-image"
                        src={
                          Recipe?.imagePath
                            ? `https://upskilling-egypt.com:3006/${Recipe.imagePath}`
                            : defaultImage
                        }
                        alt="image Recipe"
                      />
                    </td>
                    <td>{Recipe?.price}</td>
                    <td>{Recipe?.description}</td>
                    <td>{Recipe?.tag?.name}</td>
                    <td>{Recipe?.category[0]?.name}</td>
                    <td>
                      {["start"].map((direction) => (
                        <DropdownButton
                          as={ButtonGroup}
                          key={direction}
                          id={`dropdown-button-drop-${direction}`}
                          drop={direction}
                          variant="transperant"
                          className="fs-1 fw-bold"
                          title={`...`}
                        >
                          <Dropdown.Item onClick={() => handleShowAdd(Recipe)}>
                            <i className="fa-solid fa-eye  text-success  cursor-pointer mx-1 ">
                              {" "}
                            </i>
                            View
                          </Dropdown.Item>
                          {loginData?.userGroup != "SystemUser" ? (
                            <>
                              <Dropdown.Item onClick={() => handleEdit(Recipe)}>
                                <i className="fa-regular fa-pen-to-square  text-success  cursor-pointer mx-1 ">
                                  {" "}
                                </i>
                                Edit
                              </Dropdown.Item>
                              <Dropdown.Item onClick={() => handleShow(Recipe)}>
                                <i className="fa-regular fa-trash-can  text-success cursor-pointer mx-1"></i>
                                Delete
                              </Dropdown.Item>
                            </>
                          ) : (
                            <></>
                          )}
                        </DropdownButton>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* Pagination Component */}
            <div className="d-flex justify-content-between align-items-center my-4 px-4">
              <span className="text-muted">
                Showing page {pageNumber} of {totalPages}
              </span>
              <Pagination className="mb-0">
                <Pagination.First
                  disabled={pageNumber === 1}
                  onClick={() => setPageNumber(1)}
                >
                  First Page
                </Pagination.First>
                <Pagination.Prev
                  disabled={pageNumber === 1}
                  onClick={() => setPageNumber((prev) => prev - 1)}
                >
                  Prev
                </Pagination.Prev>
                <Pagination.Item active>{pageNumber}</Pagination.Item>
                <Pagination.Next
                  disabled={pageNumber === totalPages}
                  onClick={() => setPageNumber((prev) => prev + 1)}
                >
                  Next
                </Pagination.Next>
                <Pagination.Last
                  disabled={pageNumber === totalPages}
                  onClick={() => setPageNumber(totalPages)}
                >
                  Final Page
                </Pagination.Last>
              </Pagination>
            </div>
          </>
        ) : (
          <NoData />
        )}
      </div>

      {/* modal delete  */}
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <DeleteConfermation
            deleteItem={"Recipe"}
            categoryName={selectedRecipe?.name}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-danger"
            disabled={isDeleting}
            onClick={() => deletGetRecipes(selectedRecipe?.id)}
          >
            {isDeleting ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Deleting...
              </>
            ) : (
              "Delete this item"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      {/* modal view */}
      <div className="modal-view">
        <Modal  size="lg" centered show={showAdd} onHide={handleCloseAdd}>
          
          <Modal.Body  className="p-3 modal-view rounded rounded-3 ">
            <button 
      onClick={handleCloseAdd}
      className="bg-transparent border border-0 position-absolute end-0 top-0 m-3 shadow-lg " 
      
    ><IoCloseCircle className="text-danger"/></button>
            <div className="d-flex justify-content-center">
              <div className="col-lg-6">
                <img
                  className=" image-view rounded rounded-4  "
                  src={
                    viewRecipe?.imagePath
                      ? `https://upskilling-egypt.com:3006/${viewRecipe.imagePath}`
                      : defaultImage
                  }
                  alt="image Recipe"
                />
              </div>
              <div className="col-lg-6">
                <div className=" row g-1 d-flex justify-content-center text-white   my-2 px-3 rounded rounded-4 ">
                  <div className="text-center text-white d-flex justify-content-center align-items-center my-2   mx-auto rounded rounded-4  ">
                    <h4 className="text-success fw-bold">
                      {viewRecipe?.name} <span className="fw-lighter">|</span>{" "}
                      <span className="fw-medium "></span> {viewRecipe?.price}$
                    </h4>
                  </div>
                  <div className="col-6">
                    <div className="  ps-2  rounded rounded-4  w-auto">
                      <h5>Tag</h5>
                      <h6 className="text-success">{viewRecipe?.tag?.name}</h6>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="  ps-2 rounded rounded-4  w-auto">
                      <h5>Category</h5>
                      <h6 className="text-success">
                        {viewRecipe?.category[0]?.name}
                      </h6>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="  ps-2 rounded rounded-4  w-auto">
                      <h5>Name</h5>
                      <h6 className="text-success">{viewRecipe?.name}</h6>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="  ps-2 rounded rounded-4  w-auto">
                      <h5>Price</h5>
                      <h6 className="text-success">{viewRecipe?.price} $</h6>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="  ps-2 rounded rounded-4  w-auto">
                      <h5>ID :</h5>
                      <h6 className="text-success">{viewRecipe?.id}</h6>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="  ps-2 rounded rounded-4  w-auto">
                      <h5>Creation Date </h5>
                      <h6 className="text-success">
                        {new Date(
                          viewRecipe?.creationDate,
                        ).toLocaleDateString()}
                      </h6>
                    </div>
                  </div>

                  {loginData?.userGroup == "SystemUser" ? (
                    <div
                      onClick={() => addToFavs(viewRecipe?.id)}
                      className="col-md-8 mt-3 d-flex justify-content-center align-items-center"
                    >
                      <button className="color-card  border border-0 py-1 px-4 rounded rounded-3 text-white fs-5">
                        {isAdding ? (
                          <>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                              className="me-2"
                            />
                            "Adding..."
                          </>
                        ) : (
                          <>
                            Add to Favourites{" "}
                            <MdOutlineFavorite className="text-danger fs-4" />
                          </>
                        )}
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
