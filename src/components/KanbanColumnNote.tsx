import { useState } from "react";
import ModalView from "./ModalView";
import ModalEdit from "./ModalEdit";
import {
  MDBBtn,
  MDBBadge,
  MDBCheckbox,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBListGroup,
  MDBListGroupItem,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBProgress,
  MDBProgressBar,
  MDBTextArea,
  MDBInput,
} from "mdb-react-ui-kit";

interface ChecklistItem {
  id: string;
  title: string;
  priority?: string;
  members?: { user_id: string }[];
  tags: string[];
  finished: boolean;
}

interface Reply {
  user_id: string;
  text: string;
}

interface Comment {
  id: string;
  user_id: string;
  text: string;
  replies: Reply[];
}

interface Note {
  id: string;
  image: string;
  title: string;
  description: string;
  checklist: ChecklistItem[];
  members: { user_id: string }[];
  tags: string[];
  priority: string;
  dates: {
    createdAt: string;
    deadline: string;
  };
  comments: Comment[];
  files: any[];
}

export default function KanbanColumnNote({
  column,
  note,
  handleUpdateColumn,
  usersClient,
}: any) {
  const newNote: Note = {
    id: "",
    image: "",
    title: "",
    description: "",
    checklist: [
      {
        id: "",
        title: "",
        priority: "",
        members: [
          {
            user_id: "",
          },
        ],
        tags: [""],
        finished: false,
      },
    ],
    members: [
      {
        user_id: "",
      },
    ],
    tags: [""],
    priority: "",
    dates: {
      createdAt: "",
      deadline: "",
    },
    comments: [
      {
        id: "",
        user_id: "",
        text: "",
        replies: [],
      },
    ],
    files: [],
  };
  const [editNote, setEditNote] = useState<Note>(newNote); // Guarda la nota completa en edición
  const [addCheck, setAddCheck] = useState({
    id: "",
    title: "",
    priority: "",
    members: [
      {
        user_id: "",
      },
    ],
    tags: [""],
    finished: false,
  });
  const [newTag, setNewTag] = useState(""); // Estado para el nuevo tag
  const [newTitle, setNewTitle] = useState(""); // Estado para el nuevo tag
  const [newChecklistItem, setNewChecklistItem] = useState(""); // Estado para el nuevo checklist item
  const [newCheck, setNewCheck] = useState("");
  const [scrollableModal, setScrollableModal] = useState(false);
  const [scrollableModal1, setScrollableModal1] = useState(false);
  const [scrollableModal2, setScrollableModal2] = useState(false);

  const [selectedRow, setSelectedRow] = useState<ChecklistItem | null>(null); // Datos de la fila seleccionada

  // Editar un checklist
  const handleEdit = (row: any) => {
    setSelectedRow({ ...row }); // Clonamos para evitar mutaciones directas
    setScrollableModal2(!scrollableModal2);
  };

  // 📝 Entrar en modo edición con toda la nota
  const handleEditClick = (note: any) => {
    setEditNote({ ...note });
  };

  // ✏️ Actualizar dinámicamente cualquier campo de la nota
  const handleChange = (field: any, value: any) => {
    console.log(field);
    console.log(value);
    setEditNote((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleChangeTag = (index: any, value: any) => {
    const updatedTags = [...editNote.tags];
    updatedTags[index] = value;
    setEditNote({ ...editNote, tags: updatedTags });
  };

  // ➕ Agregar un nuevo tag a la lista
  const handleAddTag = (e: any) => {
    if (e.key === "Enter" && newTag.trim() !== "") {
      e.preventDefault(); // Evitar que el formulario se envíe por defecto
      setEditNote({ ...editNote, tags: [...editNote.tags, newTag.trim()] }); // Agregar el tag
      setNewTag(""); // Limpiar el campo de entrada
    }
  };

  // ➕ Agregar un nuevo tag a la lista
  const handleAddTagCheck = (e: any) => {
    if (e.key === "Enter" && newTag.trim() !== "" && selectedRow) {
      e.preventDefault();

      const updatedChecklist = editNote.checklist.map((check) =>
        check.id === selectedRow.id
          ? { ...check, tags: [...check.tags, newTag.trim()] }
          : check
      );

      setEditNote({
        ...editNote,
        checklist: updatedChecklist,
      });

      setNewTag("");
    }
  };

  // ❌ Eliminar tag
  const handleDeleteTag = (index: any) => {
    const updatedTags = editNote.tags.filter((_, i) => i !== index);
    setEditNote({ ...editNote, tags: updatedTags });
  };

  // ❌ Eliminar tag
  const handleDeleteTagCheck = (index: any) => {
    const updatedTags = addCheck.tags.filter((_, i) => i !== index);
    setAddCheck({ ...addCheck, tags: updatedTags });
  };

  // ✅ Guardar los cambios en la nota
  const handleSaveNote = () => {
    const updatedNotes = column.notes.map((n: any) =>
      n.id === editNote.id ? editNote : n
    );
    console.log(updatedNotes);
    handleUpdateColumn({ ...column, notes: updatedNotes });
    setEditNote(newNote); // Salir del modo edición
  };

  // 🗑️ Eliminar nota
  const handleDeleteNote = (noteId: any) => {
    const updatedNotes = column.notes.filter((n: any) => n.id !== noteId);
    handleUpdateColumn({ ...column, notes: updatedNotes });
  };

  const handleChangeChecklist = (id: any, field: any, value: any) => {
    if (!editNote) return; // Evita errores si editNote es null

    //console.log(id, field, value);

    const updatedChecklist = editNote.checklist.map((check) =>
      check.id === id ? { ...check, [field]: value } : check
    );

    setEditNote((prev) => ({
      ...prev,
      checklist: updatedChecklist,
    }));
  };

  // ➕ Agregar un nuevo checklist item
  const handleAddChecklist = (e: any) => {
    if (e.key === "Enter" && newCheck.trim() !== "") {
      e.preventDefault(); // Evitar el comportamiento por defecto del formulario

      const newChecklist = {
        id: String(editNote.checklist.length + 1), // Generar un ID único
        title: newCheck.trim(), // Usamos el valor ingresado
        priority: "low",        // valor por defecto
        members: [],            // vacío al crear
        tags: [],               // vacío al crear
        finished: false, // Inicializar en falso
      };

      setEditNote({
        ...editNote,
        checklist: [...editNote.checklist, newChecklist],
      });

      setNewCheck(""); // Limpiar el input después de agregar el nuevo elemento
    }
  };

  // ❌ Eliminar checklist item
  const handleDeleteChecklist = (id: any) => {
    const updatedChecklist = editNote.checklist.filter(
      (check) => check.id !== id
    ); // Filtra por el id
    setEditNote({ ...editNote, checklist: updatedChecklist });
  };

  const handleChangeComment = (commentId: any, field: any, value: any) => {
    const updatedComments = editNote.comments.map((comment) => {
      if (comment.id === commentId) {
        return { ...comment, [field]: value }; // Cambiar el campo especificado (en este caso 'text')
      }
      return comment; // Si no es el comentario que estamos editando, lo dejamos igual
    });

    setEditNote({ ...editNote, comments: updatedComments });
  };

  const handleAddComment = () => {
    const newComment: Comment = {
      id: Date.now().toString(),
      user_id: currentUser.user_id,
      text: "",
      replies: [], // 👈 OBLIGATORIO
    };

    // Actualiza el estado de las notas con el nuevo comentario
    setEditNote((prevNote) => ({
      ...prevNote,
      comments: [...prevNote.comments, newComment], // Añadimos el nuevo comentario
    }));
  };

  const handleDeleteComment = (commentId: any) => {
    const commentToDelete = editNote.comments.find(
      (comment) => comment.id === commentId
    );

    // Verificamos que el usuario actual es el autor del comentario antes de eliminarlo
    if (commentToDelete && commentToDelete.user_id === currentUser.user_id) {
      const updatedComments = editNote.comments.filter(
        (comment) => comment.id !== commentId
      );

      setEditNote({ ...editNote, comments: updatedComments });
    } else {
      alert("You can only delete your own comments");
    }
  };

  const handleAddReply = (commentId: any) => {
    const replyText = prompt("Enter your reply:");
    if (replyText) {
      const newReply = {
        user_id: currentUser.user_id, // Asigna el user_id del usuario actual
        text: replyText,
      };

      const updatedComments = editNote.comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...comment.replies, newReply], // Agregar la respuesta al comentario
          };
        }
        return comment;
      });

      setEditNote({ ...editNote, comments: updatedComments });
    }
  };

  const handleAddMember = (userId: any) => {
    if (!userId) return;

    const userExists = editNote.members.some(
      (member) => member.user_id === userId
    );
    if (!userExists) {
      setEditNote((prevNote) => ({
        ...prevNote,
        members: [...prevNote.members, { user_id: userId }],
      }));
    }
  };

  const handleDeleteMember = (userId: any) => {
    const updatedMembers = editNote.members.filter(
      (member) => member.user_id !== userId
    );
    setEditNote((prevNote) => ({
      ...prevNote,
      members: updatedMembers,
    }));
  };

  const checks = note.checklist.length;
  let checkFinish = note.checklist.filter(
    (check: any) => check.finished === true
  );
  checkFinish = checkFinish.length;
  const currentUser: { user_id: string } = {
    user_id: "3",
  };

  const formatedDate = (formatDate: any) => {
    const date = new Date(formatDate);
    const formatter = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    });
    const formattedDate = formatter.format(date);
    return formattedDate;
  };
  let priority = "low";
  let colorPriority = "green";
  if (note.priority === "high") {
    priority = "high";
    colorPriority = "red";
  } else if (note.priority === "medium") {
    priority = "medium";
    colorPriority = "orange";
  }
  const priorityClass = `priority ${note.priority.toLowerCase()}`;
  const completedCount = note.checklist.filter(
    (check: any) => check.finished
  ).length;
  const totalCount = note.checklist.length;
  const completionPercentage =
    totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  const viewNote = false;
  return (
    <>
      <article className="task">
        <div>
          <img src={note.image} alt={note.title} style={{ maxWidth: "100%" }} />
        </div>
        <div>
          <strong className={colorPriority} title={note.priority}>
            {note.title}
          </strong>
          <MDBDropdown>
            <MDBDropdownToggle color="tertiary">...</MDBDropdownToggle>
            <MDBDropdownMenu>
              <MDBDropdownItem
                link
                onClick={() => setScrollableModal(!scrollableModal)}
              >
                VIEW
              </MDBDropdownItem>
              <MDBDropdownItem
                link
                onClick={() => {
                  setScrollableModal1(!scrollableModal1);
                  handleEditClick(note);
                }}
              >
                EDIT
              </MDBDropdownItem>
              <MDBDropdownItem link onClick={() => handleDeleteNote(note.id)}>
                DELETE
              </MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </div>
        <ul>
          {note.tags.map((tag: string, i: number) => (
            <MDBBadge pill light key={i}>
              {tag}
            </MDBBadge>
          ))}
        </ul>
        <p>{note.description}</p>
        <div className="task-icons">
          <div style={{ fontSize: "10px" }}>
            <span>
              <i className="material-icons">checklist</i>
              {checkFinish}/ {note.checklist.length}
            </span>
            <span>
              <i className="material-icons">attach_file</i>
              {note.files.length}
            </span>
            <span>
              <i className="material-icons">comment</i>
              {note.comments.length}
            </span>
            <span>
              <i className="material-icons">event</i>
              {formatedDate(note.dates.deadline)}
            </span>
          </div>
          <div className="task-members">
            {note.members.map((member: { user_id: string }) => {
              const user = usersClient.find(
                (user: any) => user.user_id === member.user_id
              );
              return user ? (
                <img
                  key={user.user_id}
                  src={user.image}
                  alt={user.full_name}
                  className="rounded-circle"
                  style={{ width: "30px", height: "30px" }}
                />
              ) : null;
            })}
          </div>
        </div>
      </article>
      {/* VIEW TAG */}
      <ModalView
        note={note}
        scrollableModal={scrollableModal}
        setScrollableModal={setScrollableModal}
        usersClient={usersClient}
        formatedDate={formatedDate}
        completionPercentage={completionPercentage}
        handleChangeChecklist={handleChangeChecklist}
      />
      {/* EDIT TAG */}
      <ModalEdit
        editNote={editNote}
        setEditNote={setEditNote}
        scrollableModal1={scrollableModal1}
        setScrollableModal1={setScrollableModal1}
        newTag={newTag}
        setNewTag={setNewTag}
        newTitle={newTitle}
        setNewTitle={setNewTitle}
        usersClient={usersClient}
        handleAddComment={handleAddComment}
        currentUser={currentUser}
        handleChange={handleChange}
        handleAddTag={handleAddTag}
        handleDeleteTag={handleDeleteTag}
        handleAddMember={handleAddMember}
        handleDeleteMember={handleDeleteMember}
        addCheck={addCheck}
        setAddCheck={setAddCheck}
        handleAddTagCheck={handleAddTagCheck}
        handleEdit={handleEdit}
        handleDeleteChecklist={handleDeleteChecklist}
        handleChangeChecklist={handleChangeChecklist}
        handleDeleteComment={handleDeleteComment}
        handleDeleteTagCheck={handleDeleteTagCheck}
        handleSaveNote={handleSaveNote}
      />
      {/* EDIT CHECK */}
      <MDBModal
        open={scrollableModal2}
        onClose={() => setScrollableModal2(false)}
        tabIndex="-1"
      >
        <MDBModalDialog scrollable size="lg">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>EDIT CHECKS</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => {
                  setScrollableModal2(!scrollableModal2);
                }}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              {selectedRow ? (
                <>
                  <div className="labelForm">
                    <div className="add-tag-title">
                      <i className="material-icons">done</i>
                      <strong>CHECK</strong>
                    </div>
                    <MDBInput
                      name="check"
                      label="Check..."
                      type="text"
                      value={
                        editNote?.checklist.find((c) => c.id === selectedRow.id)
                          ?.title || ""
                      }
                      onChange={(e) => {
                        handleChangeChecklist(
                          selectedRow.id,
                          "title",
                          e.target.value
                        );
                      }}
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
                            setEditNote((prev) => ({
                              ...prev,
                              priority: level,
                            }))
                          }
                          style={{
                            cursor: "pointer",
                            fontWeight:
                              selectedRow.priority === level
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
                      {selectedRow.tags.length > 0 &&
                        selectedRow.tags.map((tag, index) => (
                          <li key={index}>
                            <MDBBadge
                              pill
                              light
                              className="tag-badge"
                              onClick={() => handleDeleteTagCheck(index)} // Hacer clic para eliminar
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
                          onKeyDown={handleAddTagCheck} // Agregar al presionar Enter
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
                              !selectedRow?.members?.some(
                                (member: any) => member.user_id === user.user_id
                              )
                          )
                          .map((user: any) => (
                            <MDBDropdownItem
                              key={user.user_id}
                              link
                              onClick={() => handleAddMember(user.user_id)}
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
                        {selectedRow?.members?.map((member: any) => {
                        const userId =
                          typeof member === "object" ? member.user_id : member;
                        const user = usersClient.find((user: any) => user.user_id === userId);

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
                              {user.skills.map(({skill, index}: {skill: string, index: number}) => (
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
                                onClick={() => handleDeleteMember(user.user_id)}
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
              ) : null}
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                color="secondary"
                onClick={() => setScrollableModal2(false)}
              >
                Close
              </MDBBtn>
              <MDBBtn>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
