import { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBadge,
  MDBCheckbox,
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
  const [modalMembersOpen, setModalMembersOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<Set<string>>(new Set());

  // Sincronizar selectedMembers cuando cambia el proyecto
  useEffect(() => {
    if (selectedProject && selectedProject.members) {
      const projectMemberIds = selectedProject.members.map((m: any) =>
        typeof m === "object" && m !== null ? m.user_id : m
      );
      setSelectedMembers(new Set(projectMemberIds));
    } else {
      // Si no hay miembros en el proyecto, inicializar como conjunto vacío
      setSelectedMembers(new Set());
    }
  }, [selectedProject]);
  // Obtener los miembros del proyecto para mostrar
  const projectMembers = selectedProject.members.filter((m: any) => selectedMembers.has(m.user_id));
  //const displayedMembers = projectMembers.slice(0, 3); // Muestra los primeros 3 miembros del proyecto
  //const remainingMembers = Math.max(0, projectMembers.length - 3);

  // Función para manejar el cambio de checkbox
  const handleMemberToggle = (userId: string) => {
    const newSelected = new Set(selectedMembers);
    if (newSelected.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedMembers(newSelected);
  };

  // Función para guardar los miembros seleccionados
  const handleSaveMembers = () => {
    const membersArray = Array.from(selectedMembers).map(userId => ({ user_id: userId }));
    const projectMembersFull = usersClient.filter((user: any) =>
      membersArray.some(m => m.user_id === user.user_id)
    );
    const updatedProject = {
      ...selectedProject,
      members: projectMembersFull,
    };
    handleUpdateProject(updatedProject);
    setModalMembersOpen(false);
  };
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
            <ul
              className="dashboard-header-list"
              title="Ver todos los miembros asignados a este proyecto"
              style={{ cursor: "pointer" }}
              onClick={() => setModalMembersOpen(true)}
            >
              {projectMembers.slice(0, 3).map((user: any) => (
                <li key={user.user_id}>
                  <img
                    src={user.image || 'https://via.placeholder.com/40'} // opcional: fallback
                    alt={user.full_name || 'Usuario'}
                    style={{ width: "40px", height: "40px" }}
                    className="rounded-circle"
                  />
                </li>
              ))}

              {projectMembers.length > 3 && (
                <li className="rounded-circle pill light">
                  <a href="#" onClick={(e) => { e.preventDefault(); setModalMembersOpen(true); }}>
                    {projectMembers.length - 3} +
                  </a>
                </li>
              )}

              {projectMembers.length === 0 && (
                <li className="rounded-circle pill light">
                  <a href="#" onClick={(e) => { e.preventDefault(); setModalMembersOpen(true); }}>
                    + Añadir miembros
                  </a>
                </li>
              )}
            </ul>
          </MDBCol>
        </MDBRow>
      </header>
      {selectedItem === "Dashboard" ? (
        <KanbanColumns
          usersClient={usersClient}
          projectMembers={projectMembers}
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
      {/* Modal de gestión de miembros del proyecto */}
      <MDBModal
        open={modalMembersOpen}
        onClose={() => setModalMembersOpen(false)}
        tabIndex="-1"
      >
        <MDBModalDialog scrollable size="lg">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Gestión de Miembros del Proyecto</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setModalMembersOpen(false)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBTable align="middle" small>
                <MDBTableHead light>
                  <tr>
                    <th scope="col">Seleccionar</th>
                    <th scope="col">Image</th>
                    <th scope="col">Full Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Skills</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {usersClient.map((user: any) => (
                    <tr key={user.user_id}>
                      <td>
                        <MDBCheckbox
                          checked={selectedMembers.has(user.user_id)}
                          onChange={() => handleMemberToggle(user.user_id)}
                        />
                      </td>
                      <td>
                        <img
                          src={user.image}
                          alt={user.full_name}
                          style={{ width: "40px", height: "40px" }}
                          className="rounded-circle"
                        />
                      </td>
                      <td>
                        <span className="fw-bold">{user.full_name}</span>
                      </td>
                      <td>
                        <span>{user.email}</span>
                      </td>
                      <td>
                        <MDBBadge color="info" pill>
                          {user.role || "User"}
                        </MDBBadge>
                      </td>
                      <td>
                        <ul className="tag-content" style={{ listStyle: "none", padding: 0, margin: 0 }}>
                          {user.skills && user.skills.map((skill: string, index: number) => (
                            <li key={index} style={{ display: "inline-block", marginRight: "5px" }}>
                              <MDBBadge pill light className="tag-badge">
                                {skill}
                              </MDBBadge>
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                color="secondary"
                onClick={() => {
                  // Restaurar el estado original al cancelar
                  const projectMemberIds = (selectedProject.members || []).map((m: any) =>
                    typeof m === "object" ? m.user_id : m
                  );
                  setSelectedMembers(new Set(projectMemberIds));
                  setModalMembersOpen(false);
                }}
              >
                Cancelar
              </MDBBtn>
              <MDBBtn
                color="primary"
                onClick={handleSaveMembers}
              >
                Guardar Cambios
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </MDBContainer>
  );
}
