import React, { useEffect, useState } from 'react'
import Header from '../../../Shared/components/Header/Header'
import chief from '../../../../assets/images/Recipes.png'
import { deleteUsersById, getUsers } from '../../../../api/modules/user';
import { toast } from 'react-toastify';
import NoData from '../../../Shared/components/NoData/NoData';
import { Button, Modal, Spinner, Table } from 'react-bootstrap';
import DeleteConfermation from '../../../Shared/components/DeleteConfermation/DeleteConfermation';


export default function UserList() {
    const [selectedUsers, setSelectedUsers] = useState(null);
  
   // loding of delete
    const [isDeleting, setIsDeleting] = useState(false);
    // useState for get Users
    const [Users, setUsers] = useState([]);
    // get Users
    const getAllUser = async () => {
      try {
        const response = await getUsers();

        setUsers(response?.data || []);
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    };
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

       useEffect(() => {
          getAllUser();
        }, []);
  return (
    <>
    <Header  title={'Users '}
     description={`You can now add your items that any user can order it from the Application and you can edit`} 
     imgUrl={chief} Data={'List'}/>
                    <div className="container-fluid ">
                      <div className=" my-2 row d-flex justify-content-between align-items-center py-3 px-4 ">
                          <div className='col-md-8'>
                              <h4><span className='text-success'></span> Users Table Details!</h4>
                              <p className='my-2'> You can check all details</p>
                          </div>
                      </div>
                   </div>
        <div>
        {Users.length > 0 ? (
          <Table responsive  hover className="text-center custom-table">
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
              {Users.map((user, index) => (
                <tr key={user?.id}>
                  <td>{user?.id}</td>
                  <td>{user?.userName}</td>
                  <td>
                    {new Date(user?.creationDate).toLocaleDateString()}
                  </td>
                  <td> {user?.email}</td>
                  <td> {user?.country}</td>
                  <td>
                    {/* <i
                      onClick={() => handleEdit(user)}
                      className="fa-regular fa-pen-to-square fs-5 text-primary cursor-pointer mx-3"
                    ></i> */}
                    <i
                      onClick={() => handleShow(user)}
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
  )
}
