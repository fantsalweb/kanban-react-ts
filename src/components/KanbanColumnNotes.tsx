import React, { useState } from "react";
import {
  MDBBtn,
  MDBBadge,
  MDBInput,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBTextArea,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import KanbanColumnNote from "./KanbanColumnNote";

interface Note {
  id: string;
  img: string;
  title: string;
  description: string;
  checklist: { id: number; title: string; finished: boolean }[];
  members: { user_id: string }[];
  tags: string[];
  priority: string;
  dates: {
    createdAt: string;
    deadline: string;
  };
  comments: { id: string; user_id: string; text: string }[];
  files: any[];
}

interface Column {
  id: string;
  title: string;
  notes: Note[];
}

interface KanbanColumnNotesProps {
  column: Column;
  handleUpdateColumn: (column: Column) => void;
  handleAddNote: (note: Note) => void;
  usersClient: any[];
  handleAddMember: (userId: string, noteId?: string) => void;
  handleDeleteMember: (userId: string, noteId: string) => void;
  selectedProject: any;
}

interface NoteValue {
  id: string;
  img: string;
  title: string;
  description: string;
  checklist: { id: number; title: string; finished: boolean }[];
  members: { user_id: string }[];
  tags: string[];
  priority: string;
  dates: { createdAt: string; deadline: string };
  comments: { id: string; user_id: string; text: string }[];
  files: any[];
}

export default function KanbanColumnNotes({
  column,
  handleUpdateColumn,
  handleAddNote,
  usersClient,
  handleAddMember,
  handleDeleteMember,
  selectedProject,
}: KanbanColumnNotesProps) {
  const [scrollableModal, setScrollableModal] = useState(false);
  const [toggleTwoModal, setToggleTwoModal] = useState(false);
  const [scrollableModal4, setScrollableModal4] = useState(false);
  const [scrollableModalEditCheck, setScrollableModalEditCheck] = useState(false);
  const [scrollableModalViewCheck, setScrollableModalViewCheck] = useState(false);
  const [selectedCheckEdit, setSelectedCheckEdit] = useState<any>(null);
  const [selectedCheckView, setSelectedCheckView] = useState<any>(null);
  const currentDate = new Date();
  const dateToday = currentDate.toISOString().split("T")[0];
  const [noteValue, setNoteValue] = useState<NoteValue>({
    id: "",
    img: "",
    title: "",
    description: "",
    checklist: [],
    members: [],
    tags: [],
    priority: "",
    dates: {
      createdAt: dateToday,
      deadline: dateToday,
    },
    comments: [],
    files: [],
  });
  const [newTag, setNewTag] = useState(""); // Estado para el input individual
  const [newCheckTag, setNewCheckTag] = useState(""); // Estado para el input de tags en ADD CHECK modal
  /*const currentDate = new Date();
  const dateToday = currentDate.toISOString().split("T")[0];*/
  const [newCheck, setNewCheck] = useState("");
  const [newCheckFull, setNewCheckFull] = useState<any>({
    id: "",
    title: "",
    priority: "low",
    members: [] as any[],
    tags: [] as string[],
    finished: false,
  });
  const [newComment, setNewComment] = useState("");
  noteValue.dates.createdAt = dateToday;
  const currentUser = "1";
  // Estado para rastrear qué comentarios están siendo editados (mostrando el input)
  const [editingComments, setEditingComments] = useState<Set<string>>(new Set());
  const [scrollableModalViewComment, setScrollableModalViewComment] = useState(false);
  const [selectedCommentView, setSelectedCommentView] = useState<any>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNoteValue((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTag.trim() !== "") {
      setNoteValue((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()], // Agregar el nuevo tag
      }));
      setNewTag(""); // Limpiar el input
      e.preventDefault(); // Evitar salto de línea en textarea
    }
  };
  const handleRemoveTag = (index: number) => {
    setNoteValue((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };
  // Agregar un nuevo check a la lista con un ID único
  const handleAddCheck = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newCheck.trim() !== "") {
      setNoteValue((prev) => ({
        ...prev,
        checklist: [
          ...prev.checklist,
          { id: Date.now(), title: newCheck.trim(), finished: false },
        ],
      }));
      setNewCheck(""); // Limpiar el input
      e.preventDefault();
    }
  };

  // Editar un check existente asegurando el formato correcto
  const handleEditCheck = (id: number, newTitle: string) => {
    setNoteValue((prev) => ({
      ...prev,
      checklist: prev.checklist.map((check) =>
        check.id === id ? { ...check, title: newTitle } : check
      ),
    }));
  };

  // Eliminar un check correctamente usando su ID
  const handleRemoveCheck = (id: number) => {
    setNoteValue((prev) => ({
      ...prev,
      checklist: prev.checklist.filter((check) => check.id !== id),
    }));
  };

  // Agregar tag al nuevo check
  const handleAddCheckTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newCheckTag.trim() !== "") {
      setNewCheckFull((prev: any) => ({
        ...prev,
        tags: [...prev.tags, newCheckTag.trim()],
      }));
      setNewCheckTag("");
      e.preventDefault();
    }
  };

  // Remover tag del nuevo check
  const handleRemoveCheckTag = (index: number) => {
    setNewCheckFull((prev: any) => ({
      ...prev,
      tags: prev.tags.filter((_: string, i: number) => i !== index),
    }));
  };

  // Agregar miembro al nuevo check
  const handleAddCheckMember = (userId: string) => {
    if (!userId) return;

    const exists = newCheckFull.members.some(
      (m: any) => (typeof m === "object" ? m.user_id : m) === userId
    );
    if (!exists) {
      setNewCheckFull((prev: any) => ({
        ...prev,
        members: [...prev.members, { user_id: userId }],
      }));
    }
  };

  // Remover miembro del nuevo check
  const handleRemoveCheckMember = (userId: string) => {
    setNewCheckFull((prev: any) => ({
      ...prev,
      members: prev.members.filter(
        (member: any) =>
          (typeof member === "object" ? member.user_id : member) !== userId
      ),
    }));
  };

  // Editar un check existente
  const handleEditCheckModal = (check: any) => {
    setSelectedCheckEdit({ ...check });
    setScrollableModalEditCheck(true);
  };

  // Guardar cambios del check editado
  const handleSaveCheckEdit = () => {
    setNoteValue((prev) => ({
      ...prev,
      checklist: prev.checklist.map((c) =>
        c.id === selectedCheckEdit.id ? selectedCheckEdit : c
      ),
    }));
    setScrollableModalEditCheck(false);
    setSelectedCheckEdit(null);
  };
  // Función para añadir un nuevo comentario vacío (se llama al hacer clic en el botón)
  const handleAddCommentClick = () => {
    const newCommentId = Date.now().toString();
    const newCommentObj = {
      id: newCommentId,
      user_id: currentUser,
      text: "",
      replies: [] as any[],
    };
    setNoteValue((prev) => ({
      ...prev,
      comments: [...(prev.comments || []), newCommentObj],
    }));
    // Marcar el nuevo comentario como en edición para mostrar el input
    setEditingComments(new Set([...Array.from(editingComments), newCommentId]));
  };

  // Función para actualizar el texto de un comentario
  const handleChangeCommentLocal = (commentId: string, field: string, value: string) => {
    setNoteValue((prev) => ({
      ...prev,
      comments: (prev.comments || []).map((comment) =>
        comment.id === commentId ? { ...comment, [field]: value } : comment
      ),
    }));
  };

  // Función para eliminar un comentario
  const handleDeleteCommentLocal = (commentId: string) => {
    setNoteValue((prev) => ({
      ...prev,
      comments: (prev.comments || []).filter((comment) => comment.id !== commentId),
    }));
    // También eliminar del estado de edición
    const newEditingComments = new Set(editingComments);
    newEditingComments.delete(commentId);
    setEditingComments(newEditingComments);
  };

  // Eliminar un miembro de noteValue
  const handleRemoveMember = (userId: string) => {
    setNoteValue((prev) => ({
      ...prev,
      members: prev.members.filter((member) => member.user_id !== userId),
    }));
  };

  // Agregar un miembro a noteValue (para nota nueva)
  const handleAddMemberLocal = (userId: string) => {
    if (!userId) return;

    const exists = noteValue.members.some((m) => m.user_id === userId);
    if (!exists) {
      setNoteValue((prev) => ({
        ...prev,
        members: [...prev.members, { user_id: userId }],
      }));
    }
  };

  // KanbanColumnNotes.tsx
  // handleAddMember ahora viene del componente padre (KanbanColumn.tsx)

  return (
    <>
      {column.notes.map((note) => (
        <KanbanColumnNote
          key={note.id}
          column={column}
          note={note}
          handleUpdateColumn={handleUpdateColumn}
          usersClient={usersClient}
          handleAddMember={handleAddMember}
          handleDeleteMember={handleDeleteMember}
        />
      ))}
      <MDBBtn
        className="mx-2"
        color="tertiary"
        rippleColor="light"
        onClick={() => setScrollableModal(!scrollableModal)}
      >
        + Add a tag ...
      </MDBBtn>
      <MDBModal
        open={scrollableModal}
        onClose={() => setScrollableModal(false)}
        tabIndex="-1"
      >
        <MDBModalDialog scrollable size="lg">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>ADD NEW TAG...</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setScrollableModal(false)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="labelForm">
                <div className="add-tag-title">
                  <i className="material-icons">done</i>
                  <strong>TITLE</strong>
                </div>
                <MDBInput
                  name="title"
                  label="Title..."
                  type="text"
                  value={noteValue.title}
                  onChange={handleChange}
                />
              </div>
              <div className="labelForm">
                <div className="add-tag-title">
                  <i className="material-icons">tag</i>
                  <strong>TAGS</strong>
                </div>
                <ul className="tag-content">
                  {noteValue.tags.length > 0 &&
                    noteValue.tags.map((tag, index) => (
                      <li key={index}>
                        <MDBBadge
                          pill
                          light
                          className="tag-badge"
                          onClick={() => handleRemoveTag(index)} // Hacer clic para eliminar
                          style={{ cursor: "pointer" }}
                        >
                          {tag} ✕
                        </MDBBadge>
                      </li>
                    ))}
                  <li>
                    <MDBInput
                      name="tag"
                      label="Tag..."
                      type="text"
                      value={newTag} // Enlazado al estado
                      onChange={(e) => setNewTag(e.target.value)} // Guardar valor en estado
                      onKeyDown={handleAddTag} // Agregar al presionar Enter
                    />
                  </li>
                </ul>
              </div>
              <div className="labelForm">
                <div className="add-tag-title">
                  <i className="material-icons">group</i>
                  <strong>MEMBERS</strong>
                  {/* Dropdown para agregar nuevos miembros */}
                  <MDBDropdown>
                    <MDBDropdownToggle
                      className="btn btn-outline-primary"
                      size="sm"
                    >
                      Add Member
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                      {usersClient
                        .filter(
                          (user: any) =>
                            !noteValue.members.some(
                              (member: any) => member.user_id === user.user_id
                            )
                        )
                        .map((user: any) => (
                          <MDBDropdownItem
                            key={user.user_id}
                            link
                            onClick={() => handleAddMemberLocal(user.user_id)}
                          >
                            {user.full_name}
                          </MDBDropdownItem>
                        ))}
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </div>
                <MDBTable align="middle" small>
                  <MDBTableHead light>
                    <tr>
                      <th scope="col">Image</th>
                      <th scope="col">Full Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Skills</th>
                      <th scope="col">Action</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {noteValue.members.map((member: any) => {
                      const userId =
                        typeof member === "object" ? member.user_id : member;
                      const user = usersClient.find(
                        (user: any) => user.user_id === userId
                      );

                      return user ? (
                        <tr key={user.user_id}>
                          <td>
                            <img
                              src={user.image}
                              alt=""
                              style={{ width: "35px", height: "35px" }}
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
                            {user.skills.map((skill: string, index: number) => (
                              <MDBBadge
                                key={index}
                                pill
                                light
                                className="tag-badge"
                                style={{ cursor: "pointer" }}
                              >
                                {skill}
                              </MDBBadge>
                            ))}
                          </td>
                          <td>
                            <MDBBtn
                              className="mx-2"
                              color="tertiary"
                              rippleColor="light"
                              onClick={() => handleRemoveMember(user.user_id)}
                            >
                              🗑️
                            </MDBBtn>
                          </td>
                        </tr>
                      ) : null;
                    })}
                  </MDBTableBody>
                </MDBTable>
              </div>
              <div className="labelForm">
                <div className="add-tag-title">
                  <i className="material-icons">priority_high</i>
                  <strong>PRIORITY</strong>
                </div>
                <ul className="tag-content">
                  {["low", "medium", "high"].map((level) => (
                    <li
                      key={level}
                      className="grid"
                      onClick={() =>
                        setNoteValue({ ...noteValue, priority: level })
                      }
                      style={{
                        cursor: "pointer",
                        fontWeight:
                          noteValue.priority === level ? "bold" : "normal",
                      }}
                    >
                      {level === "low" && "Baja:"}
                      {level === "medium" && "Media:"}
                      {level === "high" && "Alta:"}
                      <span
                        className={`priority ${level}`}
                        title={level.charAt(0).toUpperCase() + level.slice(1)}
                      ></span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="labelForm">
                <div className="add-tag-title">
                  <i className="material-icons">event</i>
                  <strong>DATES</strong>
                </div>
                <ul className="clear-style-ul">
                  <li>
                    <span>Start: {dateToday}</span>
                  </li>
                  <li>
                    <span>
                      <MDBInput
                        name="deadline"
                        label="Deadline..."
                        type="date"
                        value={noteValue.dates.deadline || ""}
                        onChange={
                          (e) =>
                            {
                              console.log(e.target.value)
                              setNoteValue((prev: any) => ({
                                ...prev,
                                dates: {
                                  ...prev.dates,
                                  deadline: e.target.value, // Actualiza directamente la propiedad 'deadline' en 'dates'
                                },
                              }))
                            }
                        }
                      />
                    </span>
                  </li>
                </ul>
              </div>
              <div className="labelForm">
                <div className="add-tag-title">
                  <i className="material-icons">notes</i>
                  <strong>DESCRIPTION</strong>
                </div>
                <MDBTextArea
                  name="description"
                  label="Description..."
                  rows={3}
                  value={noteValue.description}
                  onChange={handleChange}
                />
              </div>
              <div className="labelForm">
                <div className="add-tag-title">
                  <i className="material-icons">checklist</i>
                  <strong>CHECKLIST</strong>
                  <MDBBtn
                    className="mx-2"
                    color="tertiary"
                    rippleColor="light"
                    onClick={() => {
                      setNewCheckFull({
                        id: String(noteValue.checklist.length + 1),
                        title: "",
                        priority: "low",
                        members: [],
                        tags: [],
                        finished: false,
                      });
                      setScrollableModal4(!scrollableModal4);
                    }}
                  >
                    + Add a check ...
                  </MDBBtn>
                </div>
                <MDBTable align="middle" small>
                  <MDBTableHead light>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">Priority</th>
                      <th scope="col">Check</th>
                      <th scope="col">Tags</th>
                      <th scope="col">Members</th>
                      <th scope="col">Action</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {noteValue.checklist.map((check: any) => (
                      <tr key={check.id} className="check-item">
                        <td>
                          <input
                            type="checkbox"
                            checked={check.finished || false}
                            onChange={(e) =>
                              setNoteValue((prev) => ({
                                ...prev,
                                checklist: prev.checklist.map((c) =>
                                  c.id === check.id
                                    ? { ...c, finished: e.target.checked }
                                    : c
                                ),
                              }))
                            }
                          />
                        </td>
                        <td>
                          <ul className="tag-content">
                            <li className="grid">
                              <span
                                className={`priority ${check.priority || "low"}`}
                                title={check.priority || "low"}
                              ></span>
                            </li>
                          </ul>
                        </td>
                        <td>
                          <div>
                            <span>{check.title}</span>
                          </div>
                        </td>
                        <td>
                          <ul className="tag-content">
                            {check.tags &&
                              check.tags.map((tag: string, i: number) => (
                                <li key={i}>
                                  <MDBBadge pill light>
                                    {tag}
                                  </MDBBadge>
                                </li>
                              ))}
                          </ul>
                        </td>
                        <td>
                          {check.members &&
                            check.members.map((member: any) => {
                              const userId =
                                typeof member === "object"
                                  ? member.user_id
                                  : member;
                              const user = usersClient.find(
                                (user: any) => user.user_id === userId
                              );
                              return user ? (
                                <img
                                  key={user.user_id}
                                  src={user.image}
                                  alt={user.full_name}
                                  title={user.full_name}
                                  style={{ width: "35px", height: "35px" }}
                                  className="rounded-circle"
                                />
                              ) : null;
                            })}
                        </td>
                        <td>
                          <MDBBtn
                            className="mx-2"
                            color="tertiary"
                            rippleColor="light"
                            onClick={() => {
                              setSelectedCheckView(check);
                              setScrollableModalViewCheck(true);
                            }}
                          >
                            👁️
                          </MDBBtn>
                          {!check.finished && (
                            <>
                              <MDBBtn
                                className="mx-2"
                                color="tertiary"
                                rippleColor="light"
                                onClick={() => handleEditCheckModal(check)}
                              >
                                ✏️
                              </MDBBtn>
                              <MDBBtn
                                className="mx-2"
                                color="tertiary"
                                rippleColor="light"
                                onClick={() => handleRemoveCheck(check.id)}
                              >
                                🗑️
                              </MDBBtn>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </MDBTableBody>
                </MDBTable>
              </div>
              <div className="labelForm">
                <div className="add-tag-title">
                  <i className="material-icons">comment</i>
                  <strong>COMMENTS</strong>
                  <MDBBtn
                    className="mx-2"
                    color="tertiary"
                    rippleColor="light"
                    onClick={handleAddCommentClick}
                  >
                    + Add a comment ...
                  </MDBBtn>
                </div>
                <MDBTable align="middle" small>
                  <MDBTableHead light>
                    <tr>
                      <th scope="col">User</th>
                      <th scope="col">Comment</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {(noteValue.comments || []).map((comment: any) => {
                      const user = usersClient.find(
                        (user: any) => user.user_id === comment.user_id
                      );

                      const isEditable =
                        user && currentUser && user.user_id === currentUser;
                      const isDeletable =
                        user && currentUser && user.user_id === currentUser;

                      return (
                        <tr key={comment.id} className="check-item">
                          <td>
                            <div className="d-flex align-items-center">
                              {user ? (
                                <>
                                  <img
                                    key={comment.id}
                                    src={user.image}
                                    alt={user.full_name}
                                    title={user.full_name}
                                    style={{ width: "35px", height: "35px" }}
                                    className="rounded-circle"
                                  />
                                  <div className="ms-3">
                                    <p className="fw-bold mb-1">{user.full_name}</p>
                                    <p className="text-muted mb-0">
                                      {user.email}
                                    </p>
                                  </div>
                                </>
                              ) : null}
                            </div>
                          </td>

                          <td>
                            {isEditable && editingComments.has(comment.id) ? (
                              <MDBInput
                                type="text"
                                value={comment.text}
                                onChange={(e) =>
                                  handleChangeCommentLocal(
                                    comment.id,
                                    "text",
                                    e.target.value
                                  )
                                }
                                onKeyPress={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    // Si el comentario tiene texto, guardarlo y ocultar el input
                                    if (comment.text.trim() !== "") {
                                      const newEditingComments = new Set(editingComments);
                                      newEditingComments.delete(comment.id);
                                      setEditingComments(newEditingComments);
                                    } else {
                                      // Si está vacío, eliminar el comentario
                                      handleDeleteCommentLocal(comment.id);
                                    }
                                  }
                                }}
                                placeholder="Escribe un comentario y presiona Enter..."
                                autoFocus
                              />
                            ) : (
                              <p>{comment.text || ""}</p>
                            )}
                          </td>
                          <td>
                            {/* Mientras se está escribiendo, mostrar papelera para eliminar */}
                            {editingComments.has(comment.id) && (
                              <MDBBtn
                                className="mx-2"
                                color="tertiary"
                                rippleColor="light"
                                onClick={() => handleDeleteCommentLocal(comment.id)}
                              >
                                🗑️
                              </MDBBtn>
                            )}
                            {/* Cuando está guardado, mostrar ojo para ver en modal */}
                            {!editingComments.has(comment.id) && comment.text.trim() !== "" && (
                              <MDBBtn
                                className="mx-2"
                                color="tertiary"
                                rippleColor="light"
                                onClick={() => {
                                  setSelectedCommentView(comment);
                                  setScrollableModalViewComment(true);
                                }}
                              >
                                👁️
                              </MDBBtn>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </MDBTableBody>
                </MDBTable>
              </div>
              <div className="labelForm">
                <div className="add-tag-title">
                  <i className="material-icons">attach_file</i>
                  <strong>ATACHMENTS</strong>
                </div>
                <MDBTable align="middle" small>
                  <MDBTableHead>
                    <tr>
                      <th scope="col">Member</th>
                      <th scope="col">File</th>
                      <th scope="col">Description</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody></MDBTableBody>
                </MDBTable>
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                color="secondary"
                onClick={() => {
                  setScrollableModal(!setScrollableModal);
                  // Limpiar el estado de edición al cerrar el modal
                  setEditingComments(new Set());
                }}
              >
                Close
              </MDBBtn>
              <MDBBtn
                onClick={() => {
                  // Filtrar comentarios vacíos antes de guardar
                  const filteredNoteValue = {
                    ...noteValue,
                    comments: (noteValue.comments || []).filter(
                      (comment: any) => comment.text && comment.text.trim() !== ""
                    ),
                  };
                  handleAddNote(filteredNoteValue);
                  setScrollableModal(!setScrollableModal);
                  // Limpiar el estado de edición al cerrar el modal
                  setEditingComments(new Set());
                }}
              >
                Save changes
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      <MDBModal
        open={scrollableModal4}
        onClose={() => setScrollableModal4(false)}
        tabIndex="-1"
      >
        <MDBModalDialog scrollable>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>ADD NEW CHECK...</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setScrollableModal4(false)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="labelForm">
                <div className="add-tag-title">
                  <i className="material-icons">done</i>
                  <strong>TITLE</strong>
                </div>
                <MDBInput
                  label="Title..."
                  type="text"
                  value={newCheckFull.title}
                  onChange={(e) =>
                    setNewCheckFull({
                      ...newCheckFull,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div className="labelForm">
                <div className="add-tag-title">
                  <i className="material-icons">priority_high</i>
                  <strong>PRIORITY</strong>
                </div>
                <ul className="tag-content">
                  {["low", "medium", "high"].map((level) => (
                    <li
                      key={level}
                      className="grid"
                      onClick={() =>
                        setNewCheckFull({
                          ...newCheckFull,
                          priority: level,
                        })
                      }
                      style={{
                        cursor: "pointer",
                        fontWeight:
                          newCheckFull.priority === level ? "bold" : "normal",
                      }}
                    >
                      {level === "low" && "Baja:"}
                      {level === "medium" && "Media:"}
                      {level === "high" && "Alta:"}
                      <span
                        className={`priority ${level}`}
                        title={level.charAt(0).toUpperCase() + level.slice(1)}
                      ></span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="labelForm">
                <div className="add-tag-title">
                  <i className="material-icons">tag</i>
                  <strong>TAGS</strong>
                </div>
                <ul className="tag-content">
                  {newCheckFull.tags.length > 0 &&
                    newCheckFull.tags.map((tag: string, index: number) => (
                      <li key={index}>
                        <MDBBadge
                          pill
                          light
                          className="tag-badge"
                          onClick={() => handleRemoveCheckTag(index)}
                          style={{ cursor: "pointer" }}
                        >
                          {tag} ✕
                        </MDBBadge>
                      </li>
                    ))}
                  <li>
                    <MDBInput
                      label="Tag..."
                      type="text"
                      value={newCheckTag}
                      onChange={(e) => setNewCheckTag(e.target.value)}
                      onKeyDown={handleAddCheckTag}
                    />
                  </li>
                </ul>
              </div>
              <div className="labelForm">
                <div className="add-tag-title">
                  <i className="material-icons">group</i>
                  <strong>MEMBERS</strong>
                  <MDBDropdown>
                    <MDBDropdownToggle
                      className="btn btn-outline-primary"
                      size="sm"
                    >
                      Add Member
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                      {usersClient
                        .filter(
                          (user: any) =>
                            !newCheckFull.members.some(
                              (member: any) =>
                                (typeof member === "object"
                                  ? member.user_id
                                  : member) === user.user_id
                            )
                        )
                        .map((user: any) => (
                          <MDBDropdownItem
                            key={user.user_id}
                            link
                            onClick={() => handleAddCheckMember(user.user_id)}
                          >
                            {user.full_name}
                          </MDBDropdownItem>
                        ))}
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </div>
                <MDBTable align="middle" small>
                  <MDBTableHead light>
                    <tr>
                      <th scope="col">Image</th>
                      <th scope="col">Full Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Skills</th>
                      <th scope="col">Action</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {newCheckFull.members.map((member: any) => {
                      const userId =
                        typeof member === "object" ? member.user_id : member;
                      const user = usersClient.find(
                        (user: any) => user.user_id === userId
                      );

                      return user ? (
                        <tr key={user.user_id}>
                          <td>
                            <img
                              src={user.image}
                              alt=""
                              style={{ width: "35px", height: "35px" }}
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
                            {user.skills.map((skill: string, index: number) => (
                              <MDBBadge
                                key={index}
                                pill
                                light
                                className="tag-badge"
                              >
                                {skill}
                              </MDBBadge>
                            ))}
                          </td>
                          <td>
                            <MDBBtn
                              className="mx-2"
                              color="tertiary"
                              rippleColor="light"
                              onClick={() => handleRemoveCheckMember(user.user_id)}
                            >
                              🗑️
                            </MDBBtn>
                          </td>
                        </tr>
                      ) : null;
                    })}
                  </MDBTableBody>
                </MDBTable>
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                color="secondary"
                onClick={() => setScrollableModal4(false)}
              >
                Close
              </MDBBtn>
              <MDBBtn
                onClick={() => {
                  if (newCheckFull.title.trim() !== "") {
                    setNoteValue({
                      ...noteValue,
                      checklist: [...noteValue.checklist, newCheckFull],
                    });
                    setNewCheckFull({
                      id: "",
                      title: "",
                      priority: "low",
                      members: [],
                      tags: [],
                      finished: false,
                    });
                    setNewCheckTag("");
                    setScrollableModal4(false);
                  }
                }}
              >
                Add Check
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      {/* EDIT CHECK MODAL */}
      <MDBModal
        open={scrollableModalEditCheck}
        onClose={() => setScrollableModalEditCheck(false)}
        tabIndex="-1"
      >
        <MDBModalDialog scrollable>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>EDIT CHECK</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setScrollableModalEditCheck(false)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              {selectedCheckEdit && (
                <>
                  <div className="labelForm">
                    <div className="add-tag-title">
                      <i className="material-icons">done</i>
                      <strong>TITLE</strong>
                    </div>
                    <MDBInput
                      label="Title..."
                      type="text"
                      value={selectedCheckEdit.title}
                      onChange={(e) =>
                        setSelectedCheckEdit({
                          ...selectedCheckEdit,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="labelForm">
                    <div className="add-tag-title">
                      <i className="material-icons">priority_high</i>
                      <strong>PRIORITY</strong>
                    </div>
                    <ul className="tag-content">
                      {["low", "medium", "high"].map((level) => (
                        <li
                          key={level}
                          className="grid"
                          onClick={() =>
                            setSelectedCheckEdit({
                              ...selectedCheckEdit,
                              priority: level,
                            })
                          }
                          style={{
                            cursor: "pointer",
                            fontWeight:
                              selectedCheckEdit.priority === level
                                ? "bold"
                                : "normal",
                          }}
                        >
                          {level === "low" && "Baja:"}
                          {level === "medium" && "Media:"}
                          {level === "high" && "Alta:"}
                          <span
                            className={`priority ${level}`}
                            title={
                              level.charAt(0).toUpperCase() + level.slice(1)
                            }
                          ></span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="labelForm">
                    <div className="add-tag-title">
                      <i className="material-icons">tag</i>
                      <strong>TAGS</strong>
                    </div>
                    <ul className="tag-content">
                      {selectedCheckEdit.tags &&
                        selectedCheckEdit.tags.length > 0 &&
                        selectedCheckEdit.tags.map(
                          (tag: string, index: number) => (
                            <li key={index}>
                              <MDBBadge
                                pill
                                light
                                className="tag-badge"
                                onClick={() => {
                                  const updatedTags = selectedCheckEdit.tags.filter(
                                    (_: string, i: number) => i !== index
                                  );
                                  setSelectedCheckEdit({
                                    ...selectedCheckEdit,
                                    tags: updatedTags,
                                  });
                                }}
                                style={{ cursor: "pointer" }}
                              >
                                {tag} ✕
                              </MDBBadge>
                            </li>
                          )
                        )}
                      <li>
                        <MDBInput
                          label="Tag..."
                          type="text"
                          value={newCheckTag}
                          onChange={(e) => setNewCheckTag(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && newCheckTag.trim() !== "") {
                              setSelectedCheckEdit({
                                ...selectedCheckEdit,
                                tags: [
                                  ...selectedCheckEdit.tags,
                                  newCheckTag.trim(),
                                ],
                              });
                              setNewCheckTag("");
                              e.preventDefault();
                            }
                          }}
                        />
                      </li>
                    </ul>
                  </div>
                  <div className="labelForm">
                    <div className="add-tag-title">
                      <i className="material-icons">group</i>
                      <strong>MEMBERS</strong>
                      <MDBDropdown>
                        <MDBDropdownToggle
                          className="btn btn-outline-primary"
                          size="sm"
                        >
                          Add Member
                        </MDBDropdownToggle>
                        <MDBDropdownMenu>
                          {usersClient
                            .filter(
                              (user: any) =>
                                !selectedCheckEdit.members.some(
                                  (member: any) =>
                                    (typeof member === "object"
                                      ? member.user_id
                                      : member) === user.user_id
                                )
                            )
                            .map((user: any) => (
                              <MDBDropdownItem
                                key={user.user_id}
                                link
                                onClick={() => {
                                  setSelectedCheckEdit({
                                    ...selectedCheckEdit,
                                    members: [
                                      ...selectedCheckEdit.members,
                                      { user_id: user.user_id },
                                    ],
                                  });
                                }}
                              >
                                {user.full_name}
                              </MDBDropdownItem>
                            ))}
                        </MDBDropdownMenu>
                      </MDBDropdown>
                    </div>
                    <MDBTable align="middle" small>
                      <MDBTableHead light>
                        <tr>
                          <th scope="col">Image</th>
                          <th scope="col">Full Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Skills</th>
                          <th scope="col">Action</th>
                        </tr>
                      </MDBTableHead>
                      <MDBTableBody>
                        {selectedCheckEdit.members &&
                          selectedCheckEdit.members.map((member: any) => {
                            const userId =
                              typeof member === "object"
                                ? member.user_id
                                : member;
                            const user = usersClient.find(
                              (user: any) => user.user_id === userId
                            );

                            return user ? (
                              <tr key={user.user_id}>
                                <td>
                                  <img
                                    src={user.image}
                                    alt=""
                                    style={{ width: "35px", height: "35px" }}
                                    className="rounded-circle"
                                  />
                                </td>
                                <td>
                                  <span className="fw-bold">
                                    {user.full_name}
                                  </span>
                                </td>
                                <td>
                                  <span>{user.email}</span>
                                </td>
                                <td>
                                  {user.skills.map(
                                    (skill: string, index: number) => (
                                      <MDBBadge
                                        key={index}
                                        pill
                                        light
                                        className="tag-badge"
                                      >
                                        {skill}
                                      </MDBBadge>
                                    )
                                  )}
                                </td>
                                <td>
                                  <MDBBtn
                                    className="mx-2"
                                    color="tertiary"
                                    rippleColor="light"
                                    onClick={() => {
                                      const updatedMembers = selectedCheckEdit.members.filter(
                                        (m: any) =>
                                          (typeof m === "object"
                                            ? m.user_id
                                            : m) !== user.user_id
                                      );
                                      setSelectedCheckEdit({
                                        ...selectedCheckEdit,
                                        members: updatedMembers,
                                      });
                                    }}
                                  >
                                    🗑️
                                  </MDBBtn>
                                </td>
                              </tr>
                            ) : null;
                          })}
                      </MDBTableBody>
                    </MDBTable>
                  </div>
                </>
              )}
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                color="secondary"
                onClick={() => setScrollableModalEditCheck(false)}
              >
                Close
              </MDBBtn>
              <MDBBtn onClick={handleSaveCheckEdit}>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      {/* VIEW CHECK MODAL */}
      <MDBModal
        open={scrollableModalViewCheck}
        onClose={() => setScrollableModalViewCheck(false)}
        tabIndex="-1"
      >
        <MDBModalDialog scrollable>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>VIEW CHECK</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setScrollableModalViewCheck(false)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              {selectedCheckView && (
                <>
                  <div className="labelForm">
                    <div className="add-tag-title">
                      <i className="material-icons">done</i>
                      <strong>TITLE</strong>
                    </div>
                    <p>{selectedCheckView.title}</p>
                  </div>
                  <div className="labelForm">
                    <div className="add-tag-title">
                      <i className="material-icons">priority_high</i>
                      <strong>PRIORITY</strong>
                    </div>
                    <ul className="tag-content">
                      <li className="grid">
                        <span
                          className={`priority ${selectedCheckView.priority || "low"}`}
                          title={selectedCheckView.priority || "low"}
                        ></span>
                        <span style={{ marginLeft: "10px" }}>
                          {selectedCheckView.priority === "low" && "Baja"}
                          {selectedCheckView.priority === "medium" && "Media"}
                          {selectedCheckView.priority === "high" && "Alta"}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="labelForm">
                    <div className="add-tag-title">
                      <i className="material-icons">tag</i>
                      <strong>TAGS</strong>
                    </div>
                    <ul className="tag-content">
                      {selectedCheckView.tags && selectedCheckView.tags.length > 0 ? (
                        selectedCheckView.tags.map((tag: string, index: number) => (
                          <li key={index}>
                            <MDBBadge pill light>
                              {tag}
                            </MDBBadge>
                          </li>
                        ))
                      ) : (
                        <p style={{ color: "#999" }}>No tags</p>
                      )}
                    </ul>
                  </div>
                  <div className="labelForm">
                    <div className="add-tag-title">
                      <i className="material-icons">group</i>
                      <strong>MEMBERS</strong>
                    </div>
                    <MDBTable align="middle" small>
                      <MDBTableHead light>
                        <tr>
                          <th scope="col">Image</th>
                          <th scope="col">Full Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Skills</th>
                        </tr>
                      </MDBTableHead>
                      <MDBTableBody>
                        {selectedCheckView.members && selectedCheckView.members.length > 0 ? (
                          selectedCheckView.members.map((member: any) => {
                            const userId =
                              typeof member === "object" ? member.user_id : member;
                            const user = usersClient.find(
                              (user: any) => user.user_id === userId
                            );

                            return user ? (
                              <tr key={user.user_id}>
                                <td>
                                  <img
                                    src={user.image}
                                    alt=""
                                    style={{ width: "35px", height: "35px" }}
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
                                  {user.skills.map((skill: string, index: number) => (
                                    <MDBBadge key={index} pill light className="tag-badge">
                                      {skill}
                                    </MDBBadge>
                                  ))}
                                </td>
                              </tr>
                            ) : null;
                          })
                        ) : (
                          <tr>
                            <td colSpan={4}>
                              <p style={{ color: "#999", textAlign: "center" }}>No members assigned</p>
                            </td>
                          </tr>
                        )}
                      </MDBTableBody>
                    </MDBTable>
                  </div>
                </>
              )}
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                color="secondary"
                onClick={() => setScrollableModalViewCheck(false)}
              >
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      {/* VIEW COMMENT MODAL */}
      <MDBModal
        open={scrollableModalViewComment}
        onClose={() => setScrollableModalViewComment(false)}
        tabIndex="-1"
      >
        <MDBModalDialog scrollable>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>VIEW COMMENT</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setScrollableModalViewComment(false)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              {selectedCommentView && (
                <>
                  <div className="labelForm">
                    <div className="add-tag-title">
                      <i className="material-icons">person</i>
                      <strong>USER</strong>
                    </div>
                    {(() => {
                      const user = usersClient.find(
                        (u: any) => u.user_id === selectedCommentView.user_id
                      );
                      return user ? (
                        <div className="d-flex align-items-center">
                          <img
                            src={user.image}
                            alt={user.full_name}
                            style={{ width: "50px", height: "50px" }}
                            className="rounded-circle me-3"
                          />
                          <div>
                            <p className="fw-bold mb-1">{user.full_name}</p>
                            <p className="text-muted mb-0">{user.email}</p>
                          </div>
                        </div>
                      ) : (
                        <p>Usuario no encontrado</p>
                      );
                    })()}
                  </div>
                  <div className="labelForm">
                    <div className="add-tag-title">
                      <i className="material-icons">comment</i>
                      <strong>COMMENT</strong>
                    </div>
                    <p style={{ fontSize: "16px", lineHeight: "1.6" }}>
                      {selectedCommentView.text}
                    </p>
                  </div>
                  {selectedCommentView.replies && selectedCommentView.replies.length > 0 && (
                    <div className="labelForm">
                      <div className="add-tag-title">
                        <i className="material-icons">reply</i>
                        <strong>REPLIES</strong>
                      </div>
                      {selectedCommentView.replies.map((reply: any, index: number) => {
                        const replyUser = usersClient.find(
                          (u: any) => u.user_id === reply.user_id
                        );
                        return (
                          <div key={index} className="mb-3 p-3" style={{ backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
                            {replyUser ? (
                              <div className="d-flex align-items-center mb-2">
                                <img
                                  src={replyUser.image}
                                  alt={replyUser.full_name}
                                  style={{ width: "35px", height: "35px" }}
                                  className="rounded-circle me-2"
                                />
                                <span className="fw-bold">{replyUser.full_name}</span>
                              </div>
                            ) : null}
                            <p className="mb-0">{reply.text}</p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                color="secondary"
                onClick={() => setScrollableModalViewComment(false)}
              >
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
