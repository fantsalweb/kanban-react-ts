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
  /*const currentDate = new Date();
  const dateToday = currentDate.toISOString().split("T")[0];*/
  const [newCheck, setNewCheck] = useState("");
  const [newComment, setNewComment] = useState("");
  noteValue.dates.createdAt = dateToday;
  const currentUser = "1";
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
  // Agregar un nuevo comentario
  const handleAddComment = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newComment.trim() !== "") {
      setNoteValue((prev) => ({
        ...prev,
        comments: [
          ...prev.comments,
          { id: Date.now().toString(), user_id: currentUser, text: newComment },
        ],
      }));

      setNewComment(""); // Limpiar input después de agregar
      e.preventDefault();
    }
  };
  // Editar un check existente asegurando el formato correcto
  const handleEditComment = (id: string, newComment: string) => {
    setNoteValue((prev) => ({
      ...prev,
      comments: prev.comments.map((comment) =>
        comment.id === id ? { ...comment, text: newComment } : comment
      ),
    }));
  };

  // Eliminar un check correctamente usando su ID
  const handleRemoveComment = (id: string) => {
    setNoteValue((prev) => ({
      ...prev,
      comments: prev.comments.filter((comment) => comment.id !== id),
    }));
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
                </div>
                {/* Input SIEMPRE ARRIBA */}
                <MDBInput
                  name="check"
                  label="Add check..."
                  type="text"
                  value={newCheck}
                  onChange={(e) => setNewCheck(e.target.value)}
                  onKeyDown={handleAddCheck}
                />
                {/* Lista de checks (debajo del input) */}
                <ul className="checklist-content">
                  {noteValue.checklist.map((check) => (
                    <li key={check.id} className="check-item">
                      <MDBInput
                        type="text"
                        value={check.title}
                        onChange={(e) =>
                          handleEditCheck(check.id, e.target.value)
                        }
                      />
                      <MDBBtn
                        color="danger"
                        size="sm"
                        onClick={() => handleRemoveCheck(check.id)}
                      >
                        ✕
                      </MDBBtn>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="labelForm">
                <div className="add-tag-title">
                  <i className="material-icons">comment</i>
                  <strong>COMMENTS</strong>
                </div>
                {/* Input SIEMPRE ARRIBA */}
                <MDBInput
                  name="comment"
                  label="Add comment..."
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={handleAddComment}
                />
                {/* Lista de comentarios (debajo del input) */}
                <ul className="comment-list">
                  {noteValue.comments.map((comment) => (
                    <li key={comment.id} className="comment-item">
                      <MDBInput
                        type="text"
                        value={comment.text}
                        onChange={(e) =>
                          handleEditComment(comment.id, e.target.value)
                        }
                      />
                      <MDBBtn
                        color="danger"
                        size="sm"
                        onClick={() => handleRemoveComment(comment.id)}
                      >
                        ✕
                      </MDBBtn>
                    </li>
                  ))}
                </ul>
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
                onClick={() => setScrollableModal(!setScrollableModal)}
              >
                Close
              </MDBBtn>
              <MDBBtn
                onClick={() => {
                  setScrollableModal(!setScrollableModal);
                  handleAddNote(noteValue);
                }}
              >
                Save changes
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
