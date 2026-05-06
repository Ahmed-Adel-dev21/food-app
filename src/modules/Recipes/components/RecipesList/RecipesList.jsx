import React, { useEffect, useState } from "react";
import chief from "../../../../assets/images/Recipes.png";
import defaultImage from "../../../../assets/images/defulteImage.jpeg";
import Header from "../../../Shared/components/Header/Header";
import { recipeApi } from "../../../../api";
import { toast } from "react-toastify";
import NoData from "../../../Shared/components/NoData/NoData";
import { Button, Modal, Spinner, Table } from "react-bootstrap";
import DeleteConfermation from "../../../Shared/components/DeleteConfermation/DeleteConfermation";
import { useNavigate } from "react-router-dom";
import { getAllRecipe } from "../../../../api/modules/Recipes";

export default function RecipesList() {
  const navigate = useNavigate();

  // useState for get Recipe
  const [Recipes, setRecipe] = useState([]);
  // get Recipe
  const getRecipe = async () => {
    try {
      const response = await getAllRecipe();
      const data = response?.data;
      setRecipe(data);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
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
  // modale delete
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleShow = (Recipe) => {
    setSelectedRecipe(Recipe);
    setShow(true);
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

  useEffect(() => {
    getRecipe();
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
          <button
            onClick={() => navigate("/dashboard/recipe-data")}
            className="btn btn-success py-2 px-3 px-lg-5"
          >
            Add New Item
          </button>
        </div>
      </div>

      <div>
        {Recipes && Recipes.length > 0 ? (
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
                    <i
                      onClick={() => handleEdit(Recipe)}
                      className="fa-regular fa-pen-to-square fs-5 text-primary cursor-pointer mx-3"
                    ></i>
                    <i
                      onClick={() => handleShow(Recipe)}
                      className="fa-regular fa-trash-can fs-5 text-danger cursor-pointer"
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
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
    </>
  );
}
