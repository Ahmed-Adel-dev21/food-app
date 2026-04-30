import React, { useEffect, useState } from "react";
import chief from "../../../../assets/images/Recipes.png";
import Header from "../../../Shared/components/Header/Header";
import noData from "../../../../assets/images/no-data.png";
import { categoriesApi } from "../../../../api";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

export default function CategoriseList() {
  const [categories, setCategories] = useState([]);

  const [isDeleting, setIsDeleting] = useState(false);

  const getCategories = async () => {
    try {
      const response = await categoriesApi.getCategories();
      const data = response?.data;
      setCategories(data);
      console.log(categories);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const deletGetCategories = async (id) => {
    if (!id) return;
    setIsDeleting(true);
    try {
      const response = await categoriesApi.deleteCategoriesById(id);
      toast.success("Deleted Successfully");
      getCategories();
      // setCategories(prev => prev.filter(cat => cat.id !== id));
      handleClose();
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  // modale
  const [show, setShow] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (category) => {
    setSelectedCategory(category);
    setShow(true);
  };

  return (
    <>
      <Header
        title={"Categories "}
        description={`You can now add your items that any user can order it from the Application and you can edit`}
        imgUrl={chief}
        Data={"Items"}
      />

      <div className="d-flex justify-content-between align-items-center my-4 px-2">
        <div>
          <h4>Categories Table Details</h4>
          <span>You can check all details</span>
        </div>
        <button className="btn btn-success py-2 px-3">Add New Category</button>
      </div>

      <div>
        {categories && categories.length > 0 ? (
          <Table striped bordered hover className="text-center">
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
                <tr key={category?.id || index}>
                  <td>{category?.id}</td>
                  <td>{category?.name}</td>
                  <td>
                    {new Date(category?.creationDate).toLocaleDateString()}
                  </td>
                  <td>
                    {new Date(category?.modificationDate).toLocaleDateString()}
                  </td>
                  <td>
                    <i class="fa-regular fa-pen-to-square fs-5 text-primary cursor-pointer mx-3"></i>
                    <i
                      onClick={() => handleShow(category)}
                      class="fa-regular fa-trash-can fs-5 text-danger cursor-pointer"
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div className="text-center mb-5">
            <img src={noData} alt="no Data " />
            <h4 className="my-2">No Data !</h4>
            <span className="text-muted">
              are you sure you want to delete this item ? if you are sure just
              click on delete it
            </span>
          </div>
        )}
      </div>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img src={noData} alt="no Data " />
          <h4 className="my-2">Delete This User ?</h4>
          <span className="text-muted">
            are you sure you want to delete this item ? if you are sure just click on delete it
          </span>
        </Modal.Body>
        <Modal.Footer>
          
          <Button
            variant="outline-danger"
            disabled={isDeleting}
            onClick={() => deletGetCategories(selectedCategory?.id)}
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
