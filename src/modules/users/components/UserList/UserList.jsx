import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownButton,
  Modal,
  Pagination,
  Spinner,
  Table,
} from "react-bootstrap";

import { toast } from "react-toastify";
import { deleteUsersById, getUsers } from "../../../../api/modules/user";
import chief from "../../../../assets/images/Recipes.png";
import DeleteConfermation from "../../../Shared/components/DeleteConfermation/DeleteConfermation";
import Header from "../../../Shared/components/Header/Header";
import NoData from "../../../Shared/components/NoData/NoData";

export default function UserList() {
  const [selectedUsers, setSelectedUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // loding of delete
  const [isDeleting, setIsDeleting] = useState(false);
  // useState for get Users
  const [Users, setUsers] = useState([]);
  const [nameValue, setNameValue] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(6);
  const [totalPages, setTotalPages] = useState(0);
  // get Users

  const getAllUser = async (userName, page, size) => {
    setIsLoading(true);
    try {
      const response = await getUsers(userName, page, size);
      setUsers(response?.data?.data || []);
      setTotalPages(response?.data?.totalNumberOfPages || 0);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  // (Debouncing Search)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getAllUser(nameValue, pageNumber, pageSize);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [nameValue, pageNumber]);

  const onFilterChange = (setter, value) => {
    setter(value);
    setPageNumber(1); // back to first page
  };
  //---------------------------
  // delet GetUser by id
  const deletUsers = async (id) => {
    if (!id) return;
    setIsDeleting(true);
    try {
      const response = await deleteUsersById(id);
      toast.success("Deleted Successfully");
      handleClose();
      // await getUser();
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setIsDeleting(false);
    }
  };
  // modale delete
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleShow = (user) => {
    setSelectedUsers(user);
    setShow(true);
  };

  return (
    <>
      <Header
        title={"Users "}
        description={`You can now add your items that any user can order it from the Application and you can edit`}
        imgUrl={chief}
        Data={"List"}
      />
      <div className="container-fluid ">
        <div className=" my-2 row d-flex justify-content-between align-items-center py-3 px-4 ">
          <div className="col-md-8">
            <h4>
              <span className="text-success"></span> Users Table Details!
            </h4>
            <p className="my-2"> You can check all details</p>
          </div>
        </div>
      </div>

      <div className="row p-3 bg-light justify-content-center m-2 rounded shadow-sm">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name..."
            onChange={(e) => onFilterChange(setNameValue, e.target.value)}
          />
        </div>
      </div>
      <div>
        <div>
          {isLoading ? (
            // شكل الـ Loading Spinner
            <div className="d-flex flex-column justify-content-center align-items-center my-5 py-5">
              <Spinner animation="border" variant="success" />
              <h5 className="mt-3 text-success">Loading Users...</h5>
            </div>
          ) : Users.length > 0 ? (
            <>
              <Table responsive hover className="text-center custom-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Creation Date</th>
                    <th>E-mail</th>
                    <th>Country</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Users.map((user) => (
                    <tr key={user?.id}>
                      <td>{user?.id}</td>
                      <td>{user?.userName}</td>
                      <td>
                        {new Date(user?.creationDate).toLocaleDateString()}
                      </td>
                      <td>{user?.email}</td>
                      <td>{user?.country}</td>
                      <td>
                        <DropdownButton
                          as={ButtonGroup}
                          id={`dropdown-button-drop-start`}
                          drop="start"
                          variant="transperant"
                          title="..."
                        >
                          <Dropdown.Item onClick={() => handleShow(user)}>
                            <i className="fa-regular fa-trash-can text-success mx-1"></i>
                            Delete
                          </Dropdown.Item>
                        </DropdownButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {/* Pagination */}
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
      </div>

      {/* modal delete  */}
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <DeleteConfermation
            deleteItem={"user"}
            categoryName={selectedUsers?.userName}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-danger"
            disabled={isDeleting || !selectedUsers?.id}
            onClick={() => deletUsers(selectedUsers?.id)}
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
