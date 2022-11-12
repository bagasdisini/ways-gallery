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
  const [state] = useContext(UserContext);

  let { data: transactions } = useQuery(
    "mytransactions12Cacwadh2e",
    async () => {
      const response = await API.get("/my-transactions");
      const response2 = response.data.data.filter(
        (p) => p.buyer_id == state.user.id
      );
      return response2;
    }
  );

  return (
    <div>
      <NavBar />
      <Container
        className="d-flex justify-content-center align-items-center mx-auto"
        style={{ marginTop: "10px" }}
      >
        <div style={{ width: "90%" }}>
          <div className="mt-5">
            <h2 className="my-4">My Order</h2>
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
                      Vendor
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
                        {p.admin.name}
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
                          <img
                            src={Pending}
                            alt="2"
                            width="25px"
                            height="25px"
                          ></img>
                        ) : p.status === "progress" ? (
                          <img
                            src={Sukses}
                            alt="2"
                            width="25px"
                            height="25px"
                          ></img>
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
                              navigate(`/send-project/${p.id}`);
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
