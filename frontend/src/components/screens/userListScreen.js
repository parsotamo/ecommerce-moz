import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getUsers, deleteUser } from "../../actions";
import Message from "../Message";
import Loading from "../Loading";
import Paginate from "../Paginate";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPage = location.search.split("page=")[1] || 1;

  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, users, error, page, pages } = useSelector(
    (state) => state.userList
  );
  const { success: successDelete } = useSelector((state) => state.userDelete);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (userInfo && userInfo.role === "admin") {
      dispatch(getUsers(currentPage));
    } else {
      history.push("/");
    }
  }, [dispatch, history, userInfo, successDelete, currentPage]);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  return loading ? (
    <Loading />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div className="container">
      <div className="row mt-5">
        <div className="col-10">
          <h1 className="text-uppercase text-center my-5">Lista de Usuários</h1>
          <table className="table table-striped border table-hover responsive fs-4">
            <thead>
              <tr>
                <th>ID</th>
                <th>NOME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.role === "admin" ? (
                      <i className="fas fa-check text-success"></i>
                    ) : (
                      <i className="fas fa-times text-danger"></i>
                    )}
                  </td>
                  <td>
                    <i
                      className="fas fa-edit btn fs-4"
                      onClick={() => {
                        history.push(`/admin/users/update/${user._id}`);
                      }}
                    ></i>
                    <i
                      className="fas fa-trash text-danger ms-3 btn fs-4"
                      onClick={() => {
                        deleteUserHandler(user._id);
                      }}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Paginate pages={pages} page={page} />
        </div>
      </div>
    </div>
  );
};

export default UserListScreen;
