import Container from "react-bootstrap/Container";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { API } from "../config/api";
import { useQuery } from "react-query";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import NavBar from "./NavBar";
import Dropdown from "react-bootstrap/Dropdown";

function Transaction() {
  useEffect(() => {
    document.title = "Order";
  }, []);

  const [state] = useContext(UserContext);

  let { data: transactions } = useQuery(
    "mytransactions12Cacwadhe",
    async () => {
      const response = await API.get("/my-transactions");
      const response2 = response.data.data.filter(
        (p) => p.admin_id == state.user.id
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
                      <td style={{ wordBreak: "break-all" }}>{p.title}</td>
                      <td
                        style={{
                          wordBreak: "break-all",
                          verticalAlign: "middle",
                        }}
                      >
                        {p.startDate}
                      </td>
                      <td
                        style={{
                          wordBreak: "break-all",
                          verticalAlign: "middle",
                        }}
                      >
                        {p.endDate}
                      </td>
                      <td
                        style={{
                          wordBreak: "break-all",
                          verticalAlign: "middle",
                        }}
                      >
                        {p.status}
                      </td>
                      <td
                        style={{
                          wordBreak: "break-all",
                          verticalAlign: "middle",
                        }}
                      ></td>
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
