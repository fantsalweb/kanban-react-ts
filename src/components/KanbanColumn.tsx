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
import KanbanColumnNotes from "./KanbanColumnNotes";

export default function KanbanColumn({
  columnId,
  column,
  usersClient,
  selectedProject,
  handleUpdateProject,
  handleUpdateColumn,
}: any) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editNameColumn, setEditNameColumn] = useState(null);
  const [onChangeNameColumn, setOnChangeNameColumn] = useState("");
  const [editedName, setEditedName] = useState(column.name);

  // Guardar cambios en el nombre de la columna
  /*const handleSaveEdit = () => {
    onEditColumn(column.id, editedName.toUpperCase());
    setEditModalOpen(false);
  };*/

  // Función para guardar los cambios en la columna
  const handleSaveColumnName = (columnId: any) => {
    const updatedColumns = selectedProject.columns.map((col: any) =>
      col.id === columnId ? { ...col, name: editedName } : col
    );

    handleUpdateProject({ ...selectedProject, columns: updatedColumns });

    setEditNameColumn(null);
    setEditModalOpen(false);
  };
  // Función para activar edición y cargar el nombre actual
  const handleEditClick = (column: any) => {
    setEditNameColumn(column.id);
    setOnChangeNameColumn(column.name);
    setEditModalOpen(true);
  };
  // 🛑 Función para eliminar una columna (solo si no tiene notes)
  const handleDeleteColumn = (columnId: any) => {
    const columnToDelete = selectedProject.columns.find(
      (col: any) => col.id === columnId
    );

    setDeleteModalOpen(true);
    return;
  };
  const confirmDeleteColumn = (columnId: any) => {
    const updatedColumns = selectedProject.columns.filter(
      (col: any) => col.id !== columnId
    );
    handleUpdateProject({ ...selectedProject, columns: updatedColumns });
    setDeleteModalOpen(false);
  };
  const handleAddNote = (noteValue: any) => {
    console.log(noteValue);
    const newNote = {
      id: (column.notes.length + 1).toString(),
      img: "https://mdbootstrap.com/img/new/standard/city/017.webp",
      title: noteValue.title || "",
      description: noteValue.description || "",
      checklist: noteValue.checklist || [],
      members: noteValue.members || [],
      tags: noteValue.tags || [],
      priority: noteValue.priority || "low",
      dates: {
        createdAt: Date.now().toString(),
        deadline: noteValue.dates?.deadline || "",
      },
      comments: noteValue.comments || [],
      files: [],
    };

    const updatedColumns = selectedProject.columns.map((col: any) =>
      col.id === columnId ? { ...col, notes: [...col.notes, newNote] } : col
    );

    handleUpdateProject({ ...selectedProject, columns: updatedColumns });
  };

  // ➕ Agregar o actualizar miembros en una nota (nueva o existente)
  const handleAddMember = (userId: string, noteId?: string) => {
    if (!userId) return;

    // Caso 1: Actualizar nota EXISTENTE
    if (noteId) {
      const updatedColumns = selectedProject.columns.map((col: any) => {
        if (col.id === columnId) {
          const updatedNotes = col.notes.map((note: any) => {
            if (note.id === noteId) {
              const memberExists = note.members.some(
                (m: any) => m.user_id === userId
              );
              if (!memberExists) {
                return {
                  ...note,
                  members: [...note.members, { user_id: userId }],
                };
              }
            }
            return note;
          });
          return { ...col, notes: updatedNotes };
        }
        return col;
      });
      handleUpdateProject({ ...selectedProject, columns: updatedColumns });
    }
    // Caso 2: Se manejará en KanbanColumnNotes directamente para nota nueva
  };

  // ❌ Eliminar miembro de una nota existente
  const handleDeleteMember = (userId: string, noteId: string) => {
    const updatedColumns = selectedProject.columns.map((col: any) => {
      if (col.id === columnId) {
        const updatedNotes = col.notes.map((note: any) => {
          if (note.id === noteId) {
            return {
              ...note,
              members: note.members.filter(
                (m: any) => m.user_id !== userId
              ),
            };
          }
          return note;
        });
        return { ...col, notes: updatedNotes };
      }
      return col;
    });
    handleUpdateProject({ ...selectedProject, columns: updatedColumns });
  };
  
  return (
    <article className={`column ${column.color}`}>
      <header>
        <h3>{column.name}</h3>
        <div>
          <MDBBtn
            className="mx-2"
            color="tertiary"
            rippleColor="light"
            onClick={() => handleEditClick(column)}
          >
            EDIT
          </MDBBtn>
          <MDBBtn
            className="mx-2 delete"
            color="tertiary"
            rippleColor="light"
            onClick={() => handleDeleteColumn(columnId)}
          >
            DELETE
          </MDBBtn>
        </div>
      </header>
      <KanbanColumnNotes
        column={column}
        handleAddNote={handleAddNote}
        handleUpdateColumn={handleUpdateColumn}
        usersClient={usersClient}
        handleAddMember={handleAddMember}
        handleDeleteMember={handleDeleteMember}
        selectedProject={selectedProject}
      />
      {/* Modal para editar nombre */}
      <MDBModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        tabIndex="-1"
      >
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Editar nombre de la columna</MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBInput
                label="Nombre de la columna"
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={() => setEditModalOpen(false)}>
                Cancelar
              </MDBBtn>
              <MDBBtn
                color="primary"
                onClick={() => handleSaveColumnName(column.id)}
              >
                Guardar
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      {/* Modal de confirmación de eliminación */}
      <MDBModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        tabIndex="-1"
      >
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Confirmar eliminación</MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody>
              <>
                {column.notes.length > 0 ? (
                  <p>
                    No puedes eliminar esta columna porque tiene notas
                    asignadas.
                  </p>
                ) : (
                  <p>¿Estás seguro de que quieres eliminar esta columna?</p>
                )}
              </>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                color="secondary"
                onClick={() => setDeleteModalOpen(false)}
              >
                Cerrar
              </MDBBtn>
              {column.notes.length === 0 && (
                <MDBBtn
                  color="danger"
                  onClick={() => confirmDeleteColumn(columnId)}
                >
                  Eliminar
                </MDBBtn>
              )}
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </article>
  );
}
