import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { API } from "../config/api";
import { useQuery } from "react-query";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import NavBar from "./NavBar";
import Pending from "../assets/pending.png";
import Sukses from "../assets/sukses.png";
import Button from "react-bootstrap/Button";
import Cancel from "../assets/cancel.png";

function Transaction() {
  useEffect(() => {
    document.title = "Order";
  }, []);

  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [idTransaction, setIdTransaction] = useState();

  let { data: transactions, refetch } = useQuery(
    "mytransactions12Cacwadhe",
    async () => {
      const response = await API.get("/my-transactions");
      const response2 = response.data.data.filter(
        (p) => p.admin_id == state.user.id
      );
      return response2;
    }
  );

  const [form] = useState({
    status: "cancel",
  });

  const [formProgress] = useState({
    status: "progress",
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const response = await API.patch(`/transaction/${idTransaction}`, form);

      const auth = await API.get("/check-auth");

      let payload = auth.data.data;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });

      refetch();
      setIdTransaction("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit1 = async (e) => {
    try {
      e.preventDefault();

      const response = await API.patch(
        `/transaction/${idTransaction}`,
        formProgress
      );

      const auth = await API.get("/check-auth");

      let payload = auth.data.data;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });

      refetch();
      setIdTransaction("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavBar />
      <Container
        className="d-flex justify-content-center align-items-center mx-auto"
        style={{ marginTop: "10px" }}
      >
        <div style={{ width: "90%" }}>
          <div className="mt-5">
            <h2 className="my-4">My Offer</h2>
            <div>
              <Table bordered hover style={{ border: "1px" }}>
                <thead style={{ backgroundColor: "#E5E5E5" }}>
                  <tr>
                    <th
                      style={{
                        wordBreak: "break-all",
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      No
                    </th>
                    <th
                      style={{
                        wordBreak: "break-all",
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      Client
                    </th>
                    <th
                      style={{
                        wordBreak: "break-all",
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      Order
                    </th>
                    <th
                      style={{
                        wordBreak: "break-all",
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      Start Project
                    </th>
                    <th
                      style={{
                        wordBreak: "break-all",
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      End Project
                    </th>
                    <th
                      style={{
                        wordBreak: "break-all",
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      Status
                    </th>
                    <th
                      style={{
                        wordBreak: "break-all",
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: "white" }}>
                  {transactions?.map((p, index) => (
                    <tr>
                      <td
                        style={{
                          wordBreak: "break-all",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                        key={p.id}
                      >
                        {index + 1}
                      </td>
                      <td
                        style={{
                          wordBreak: "break-all",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        {p.buyer.name}
                      </td>
                      <td
                        style={{
                          wordBreak: "break-all",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        {p.title}
                      </td>
                      <td
                        style={{
                          wordBreak: "break-all",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        {p.startDate}
                      </td>
                      <td
                        style={{
                          wordBreak: "break-all",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        {p.endDate}
                      </td>
                      <td
                        style={{
                          wordBreak: "break-all",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        {p.status === "pending" ? (
                          "Pending"
                        ) : p.status === "progress" ? (
                          "Progress"
                        ) : p.status === "cancel" ? (
                          "Cancel"
                        ) : p.status === "complete" ? (
                          "Complete"
                        ) : (
                          <></>
                        )}
                      </td>
                      <td
                        style={{
                          wordBreak: "break-all",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        {p.status === "pending" ? (
                          <div className="d-flex justify-content-evenly">
                            <Button
                              type="submit"
                              className="px-3"
                              style={{
                                background: "red",
                                border: "none",
                              }}
                              onClick={(e) => {
                                setIdTransaction(p.id);
                                handleSubmit(e);
                              }}
                            >
                              Cancel{" "}
                            </Button>
                            <Button
                              type="submit"
                              className="px-3"
                              style={{
                                background: "#2FC4B2",
                                border: "none",
                              }}
                              onClick={(e) => {
                                setIdTransaction(p.id);
                                handleSubmit1(e);
                              }}
                            >
                              Approve{" "}
                            </Button>
                          </div>
                        ) : p.status === "progress" ? (
                          <Button
                            type="submit"
                            className="px-3"
                            style={{
                              background: "#2FC4B2",
                              border: "none",
                            }}
                            onClick={() => {
                              navigate(`/send-project/${p.id}`);
                            }}
                          >
                            Send Project{" "}
                          </Button>
                        ) : p.status === "cancel" ? (
                          <img
                            src={Cancel}
                            alt="2"
                            width="25px"
                            height="25px"
                          ></img>
                        ) : p.status === "complete" ? (
                          <Button
                            type="submit"
                            className="px-3"
                            style={{
                              background: "#2FC4B2",
                              border: "none",
                            }}
                            onClick={() => {
                              navigate(`/view-project/${p.id}`);
                            }}
                          >
                            View Project
                          </Button>
                        ) : (
                          <></>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Transaction;
