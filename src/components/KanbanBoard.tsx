import { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import KanbanColumns from "./KanbanColumns";
import KanbanTable from "./KanbanTable";

export default function KanbanBoard({
  usersClient,
  selectedProject,
  handleUpdateProject,
  handleAddProject,
  handleUpdateColumn,
}: any) {
  const [selectedItem, setSelectedItem] = useState("Dashboard");
  const displayedMembers = usersClient.slice(0, 3); // Muestra los primeros 3 miembros
  const remainingMembers = usersClient.length - 3;
  return (
    <MDBContainer fluid>
      <header className="dashboard-header">
        <MDBRow className="mb-3">
          <MDBCol size="7" className="dashboard-header-title">
            <h2>{selectedProject.name}</h2>
            <MDBDropdown>
              <MDBDropdownToggle className="btn btn-outline-primary" size="sm">
                {selectedItem}
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                {selectedItem === "Dashboard" ? (
                  <MDBDropdownItem
                    link
                    onClick={() => setSelectedItem("Table")}
                  >
                    Table
                  </MDBDropdownItem>
                ) : (
                  <MDBDropdownItem
                    link
                    onClick={() => setSelectedItem("Dashboard")}
                  >
                    Dashboard
                  </MDBDropdownItem>
                )}
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBCol>
          <MDBCol size="5">
            <ul className="dashboard-header-list">
              {displayedMembers.map((user: any) => (
                <li key={user.user_id}>
                  <img
                    src={user.image}
                    alt=""
                    style={{ width: "40px", height: "40px" }}
                    className="rounded-circle"
                  />
                </li>
              ))}
              <li className="rounded-circle pill light">
                {remainingMembers} +
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </header>
      {selectedItem === "Dashboard" ? (
        <KanbanColumns
          usersClient={usersClient}
          selectedProject={selectedProject}
          handleAddProject={handleAddProject}
          handleUpdateProject={handleUpdateProject}
          handleUpdateColumn={handleUpdateColumn}
        />
      ) : (
        <KanbanTable
          usersClient={usersClient}
          selectedProject={selectedProject}
          handleUpdateProject={handleUpdateProject}
        />
      )}
    </MDBContainer>
  );
}
