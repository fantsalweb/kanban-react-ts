import { useState } from "react";

export default function KanbanTable({
  usersClient,
  selectedProject,
  handleUpdateProject,
}: {
  usersClient: any;
  selectedProject: any;
  handleUpdateProject: (project: any) => void;
}) {
  const [editNameColumn, setEditNameColumn] = useState(null);
  const [onChangeNameColumn, setOnChangeNameColumn] = useState("");

  // Función para guardar los cambios en la columna
  const handleSaveColumnName = (columnId: string) => {
    const updatedColumns = selectedProject.columns.map((col: any) =>
      col.id === columnId ? { ...col, name: onChangeNameColumn } : col
    );

    // Actualizar el proyecto con las nuevas columnas
    handleUpdateProject({ ...selectedProject, columns: updatedColumns });

    // Salir del modo edición
    setEditNameColumn(null);
  };

  // Función para activar edición y cargar el nombre actual
  const handleEditClick = (column: any) => {
    setEditNameColumn(column.id);
    setOnChangeNameColumn(column.name);
  };

  // 🛑 Función para eliminar una columna (solo si no tiene notes)
  const handleDeleteColumn = (columnId: string) => {
    const columnToDelete = selectedProject.columns.find(
      (col: any) => col.id === columnId
    );

    if (columnToDelete.notes.length > 0) {
      alert("No puedes eliminar esta columna porque contiene notas.");
      return;
    }

    const updatedColumns = selectedProject.columns.filter(
      (col: any) => col.id !== columnId
    );
    handleUpdateProject({ ...selectedProject, columns: updatedColumns });
  };

  return (
    <table>
      <thead>
        <tr>
          <th>COLUMN</th>
          <th>ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        {selectedProject.columns.map((column: any) => (
          <tr key={column.id}>
            {editNameColumn === column.id ? (
              <>
                <td>
                  <input
                    type="text"
                    value={onChangeNameColumn}
                    onChange={(e) => setOnChangeNameColumn(e.target.value)}
                  />
                </td>
                <td>
                  <button onClick={() => handleSaveColumnName(column.id)}>
                    SAVE
                  </button>
                  <button onClick={() => setEditNameColumn(null)}>
                    CANCEL
                  </button>
                </td>
              </>
            ) : (
              <>
                <td>{column.name}</td>
                <td>
                  <button onClick={() => handleEditClick(column)}>EDIT</button>
                  <button onClick={() => handleDeleteColumn(column.id)}>
                    DELETE
                  </button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
