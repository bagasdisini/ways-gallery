import Container from "react-bootstrap/Container";
import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { API } from "../config/api";
import { useQuery } from "react-query";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import toRupiah from "@develoka/angka-rupiah-js";
import NavBar from "./NavBar";
import Dropdown from "react-bootstrap/Dropdown";

function Transaction() {
  useEffect(() => {
    document.title = "Order";
  }, []);

  const [state] = useContext(UserContext);

  let { data: transactions } = useQuery("mytransactions12Cache", async () => {
    const response = await API.get("/my-transactions");
    const response2 = response.data.data.filter(
      (p) => p.admin_id == state.user.id
    );
    return response2;
  });

  return (
    <div>
      <NavBar />
      <Container
        className="d-flex justify-content-center align-items-center mx-auto"
        style={{ marginTop: "10px" }}
      >
        <div style={{ width: "90%" }}>
          <div>
            <Dropdown className="my-4">
              <Dropdown.Toggle
                style={{
                  backgroundColor: "#E7E7E7",
                  color: "black",
                  borderColor: "#E7E7E7",
                }}
                className="px-3"
              >
                Transaction &ensp;
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">My Order</Dropdown.Item>
                <Dropdown.Item href="#/action-1">My Offer</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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
                          width: "5%",
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
                          width: "15%",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        {p.date}
                      </td>
                      <td style={{ wordBreak: "break-all", width: "35%" }}>
                        {p.product}
                      </td>
                      <td
                        style={{
                          wordBreak: "break-all",
                          width: "13%",
                          verticalAlign: "middle",
                        }}
                      >
                        {toRupiah(p.value, { dot: ",", floatingPoint: 0 })}
                      </td>

                      {p.status == "Pending" ? (
                        <td
                          style={{
                            wordBreak: "break-all",
                            width: "10%",
                            textAlign: "center",
                            verticalAlign: "middle",
                          }}
                        >
                          <span className="text-warning">{p.status}</span>
                        </td>
                      ) : (
                        <td
                          style={{
                            wordBreak: "break-all",
                            width: "10%",
                            textAlign: "center",
                            verticalAlign: "middle",
                          }}
                        >
                          <span style={{ color: "green" }}>{p.status}</span>
                        </td>
                      )}
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
