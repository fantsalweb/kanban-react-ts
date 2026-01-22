import { useState } from "react";
import {
  MDBBtn,
  MDBInput,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import KanbanColumn from "./KanbanColumn";

export default function KanbanColumns({
  usersClient,
  selectedProject,
  handleAddProject,
  handleUpdateProject,
  handleUpdateColumn,
}: any) {
  const [scrollableModal, setScrollableModal] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewColumnName(e.target.value);
  };
  return (
    <>
      <section className="columns">
        {selectedProject.columns.map((column: any) => (
          <KanbanColumn
            key={column.id}
            columnId={column.id}
            column={column}
            usersClient={usersClient}
            selectedProject={selectedProject}
            handleUpdateProject={handleUpdateProject}
            handleUpdateColumn={handleUpdateColumn}
          />
        ))}
        <MDBBtn outline onClick={() => setScrollableModal(true)} size="sm">
          Add another column ...
        </MDBBtn>
        <MDBModal
          open={scrollableModal}
          onClose={() => setScrollableModal(false)}
          tabIndex="-1"
        >
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>ADD NEW COLUMN...</MDBModalTitle>
              </MDBModalHeader>
              <MDBModalBody>
                <MDBInput
                  label="New column"
                  type="text"
                  value={newColumnName}
                  onChange={handleInputChange}
                />
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn
                  color="secondary"
                  onClick={() => setScrollableModal(false)}
                >
                  Close
                </MDBBtn>
                <MDBBtn
                  onClick={() => {
                    handleAddProject(newColumnName);
                    setScrollableModal(false);
                  }}
                >
                  Save changes
                </MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </section>
    </>
  );
}
