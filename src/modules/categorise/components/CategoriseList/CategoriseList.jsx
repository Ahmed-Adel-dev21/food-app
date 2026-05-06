import React, { useEffect, useState } from "react";
import chief from "../../../../assets/images/Recipes.png";
import Header from "../../../Shared/components/Header/Header";
import { categoriesApi } from "../../../../api";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import noImageData from "../../../../assets/images/no-data.png";
import NoData from "../../../Shared/components/NoData/NoData";
import DeleteConfermation from "../../../Shared/components/DeleteConfermation/DeleteConfermation";
import { useForm } from "react-hook-form";
import { getAllCategories, updateCategoriesById } from "../../../../api/modules/categories";

export default function CategoriseList() {
  // loding of delete
  const [isDeleting, setIsDeleting] = useState(false);
  // useState for get category
  const [categories, setCategories] = useState([]);
  // get categories
  const getCategories = async () => {
    try {
      const response = await getAllCategories();

      const data = response?.data;
      setCategories(data);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  // delet GetCategories by id
  const deletCategories = async (id) => {
    if (!id) return;
    setIsDeleting(true);
    try {
      const response = await categoriesApi.deleteCategoriesById(id);
      toast.success("Deleted Successfully");
      handleClose();
      // await getCategories();
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setIsDeleting(false);
    }
  };


  // useState use in define category in modal and props
  const [selectedCategory, setSelectedCategory] = useState(null);
  // modale delete
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setSelectedCategory(null);
  };
// show delete modale
  const handleShow = (category) => {
    setSelectedCategory(category);
    setShow(true);
  };

  useEffect(() => {
    getCategories();
  }, []);

  // all function of adding and update category
  const [isAdding, setIsAdding] = useState(false); // spinner
  const [isEdit, setIsEdit] = useState(false);
  // modal Add
  const [showAdd, setShowAdd] = useState(false);
  const handleShowAdd = () => {
  setIsEdit(false);
  setSelectedCategory(null);
  reset({ name: "" });
  setShowAdd(true);
};
  // handel open Edite
  const handleEdit = (category) => {
  setSelectedCategory(category);
  setIsEdit(true);
  setShowAdd(true); 
  reset({
    name: category.name,
  });
};
  // ---
  const handleCloseAdd = () => {
    setShowAdd(false);
    setIsEdit(false);
    setSelectedCategory(null);
    reset({ name: "" });
  };
  // useForm for add category
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  // adding and update category
  const submitCategory = async (data) => {
    setIsAdding(true);
    try {
      if (isEdit) {
        
        await updateCategoriesById(selectedCategory.id, data);
        toast.success("Category updated successfully");
      } else {
        await categoriesApi.createCategories(data);
        toast.success("Category added successfully");
      }

      await getCategories();
      handleCloseAdd();
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setIsAdding(false);
    }
  };

  

  return (
    <>
      {/* modal delete  */}
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <DeleteConfermation
            deleteItem={"Category"}
            categoryName={selectedCategory?.name}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-danger"
            disabled={isDeleting || !selectedCategory?.id}
            onClick={() => deletCategories(selectedCategory?.id)}
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
      {/* modal add */}
      <Modal centered show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title className="">{isEdit ? "Edit Category" : "Add Category"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="my-4">
          <form onSubmit={handleSubmit(submitCategory)}>
            <div className="input-group my-4">
              <input
                type="text"
                className="form-control"
                placeholder="Category Name "
                {...register("name", { required: "Name is required" })}
              />
            </div>
            {errors.name && (
              <p className="text-danger">{errors.name.message}</p>
            )}
            <div className="d-flex justify-content-end">
              <button className="btn btn-success py-1 px-3" disabled={isAdding}>
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
                    {isEdit ? "Updating..." : "Adding..."}
                  </>
                ) : isEdit ? (
                  "Update"
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      {/* -------------- */}
      <Header
        title={"Categories "}
        description={`You can now add your items that any user can order it from the Application and you can edit`}
        imgUrl={chief}
        Data={"Items"}
      />

      <div className="row d-flex justify-content-between align-items-center my-4 px-2">
        <div className="col-md-8">
          <h4>Categories Table Details</h4>
          <span>You can check all details</span>
        </div>
        <div className="col-md-4 text-start text-md-end my-1">
          <button onClick={handleShowAdd} className="btn btn-success py-2 px-3">
            Add New Category
          </button>
        </div>
      </div>

      <div>
        {categories.length > 0 ? (
          <Table responsive  hover className="text-center custom-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Creation Date</th>
                <th>Modification Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category, index) => (
                <tr key={category?.id}>
                  <td>{category?.id}</td>
                  <td>{category?.name}</td>
                  <td>
                    {new Date(category?.creationDate).toLocaleDateString()}
                  </td>
                  <td>
                    {new Date(category?.modificationDate).toLocaleDateString()}
                  </td>
                  <td>
                    <i
                      onClick={() => handleEdit(category)}
                      className="fa-regular fa-pen-to-square fs-5 text-primary cursor-pointer mx-3"
                    ></i>
                    <i
                      onClick={() => handleShow(category)}
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
    </>
  );
}
