import { useState, useEffect } from "react";
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

export default function ModalEdit({
  editNote,
  setEditNote,
  scrollableModal1,
  setScrollableModal1,
  newTitle,
  setNewTitle,
  newTag,
  setNewTag,
  usersClient,
  handleAddComment,
  currentUser,
  handleChange,
  handleAddTag,
  handleDeleteTag,
  handleAddMember,
  handleDeleteMember,
  addCheck,
  setAddCheck,
  handleAddTagCheck,
  handleEdit,
  handleDeleteChecklist,
  handleChangeChecklist,
  handleDeleteComment,
  handleDeleteTagCheck,
  handleChangeComment,
  handleSaveNote
}: any) {
  const [scrollableModal3, setScrollableModal3] = useState(false);
  const [scrollableModal4, setScrollableModal4] = useState(false);
  const [scrollableModalViewCheck, setScrollableModalViewCheck] = useState(false);
  const [selectedCheckView, setSelectedCheckView] = useState<any>(null);
  const [scrollableModalViewComment, setScrollableModalViewComment] = useState(false);
  const [selectedCommentView, setSelectedCommentView] = useState<any>(null);
  // Estado local para el modal - evita guardar cambios hasta que el usuario haga click en "Save changes"
  const [localEditNote, setLocalEditNote] = useState(editNote || { comments: [] });
  // Estado para rastrear qué comentarios están siendo editados (mostrando el input)
  const [editingComments, setEditingComments] = useState<Set<string>>(new Set());

  // Estado para el nuevo check completo a agregar
  const [newCheckFull, setNewCheckFull] = useState<any>({
    id: "",
    title: "",
    priority: "low",
    members: [] as any[],
    tags: [] as string[],
    finished: false,
  });

  // Función local para actualizar comentarios en localEditNote
  const handleChangeCommentLocal = (commentId: any, field: any, value: any) => {
    const updatedComments = (localEditNote.comments || []).map((comment: any) => {
      if (comment.id === commentId) {
        return { ...comment, [field]: value };
      }
      return comment;
    });
    setLocalEditNote({ ...localEditNote, comments: updatedComments });
  };

  // Función local para añadir comentarios en localEditNote
  const handleAddCommentLocal = () => {
    if (!currentUser || !currentUser.user_id) return;
    const newCommentId = Date.now().toString();
    const newComment = {
      id: newCommentId,
      user_id: currentUser.user_id,
      text: "",
      replies: [],
    };
    setLocalEditNote({
      ...localEditNote,
      comments: [...(localEditNote.comments || []), newComment],
    });
    // Marcar el nuevo comentario como en edición para mostrar el input
    setEditingComments(new Set([...Array.from(editingComments), newCommentId]));
  };

  // Función local para eliminar comentarios en localEditNote
  const handleDeleteCommentLocal = (commentId: any) => {
    const updatedComments = (localEditNote.comments || []).filter(
      (comment: any) => comment.id !== commentId
    );
    setLocalEditNote({ ...localEditNote, comments: updatedComments });
    // También eliminar del estado de edición
    const newEditingComments = new Set(editingComments);
    newEditingComments.delete(commentId);
    setEditingComments(newEditingComments);
  };

  // Sincronizar el estado local cuando editNote cambia (cuando se abre el modal)
  useEffect(() => {
    if (editNote) {
      setLocalEditNote(editNote);
      // Limpiar el estado de edición cuando se abre el modal
      setEditingComments(new Set());
    }
  }, [editNote, scrollableModal1]);
  return (
    <>
      <MDBModal
        open={scrollableModal1}
        onClose={() => setScrollableModal1(false)}
        tabIndex="-1"
      >
        <MDBModalDialog scrollable size="lg">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>EDIT TAG</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setScrollableModal1(false)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="labelForm">
                <div className="add-tag-title">
                  <i className="material-icons">image</i>
                  <strong>IMAGE</strong>
                </div>
                <img
                  src={localEditNote.image}
                  alt={localEditNote.title}
                  style={{ maxWidth: "100%", marginBottom: "1em" }}
                />
                <MDBInput
                  name="image"
                  label="Image..."
                  type="text"
                  value={localEditNote.image}
                  onChange={(e) => {
                    setLocalEditNote({...localEditNote, image: e.target.value});
                  }}
                />
              </div>
              <div className="labelForm">
                <div className="add-tag-title">
                  <i className="material-icons">done</i>
                  <strong>TITLE</strong>
                </div>
                <MDBInput
                  name="title"
                  label="Title..."
                  type="text"
                  value={localEditNote.title}
                  onChange={(e) => {
                    setLocalEditNote({...localEditNote, title: e.target.value});
                  }}
                />
              </div>
              <div className="labelForm">
                <div className="add-tag-title">
                  <i className="material-icons">tag</i>
                  <strong>TAGS</strong>
                </div>
                <ul className="tag-content">
                  {localEditNote.tags.length > 0 &&
                    localEditNote.tags.map((tag: string, index: number) => (
                      <li key={index}>
                        <MDBBadge
                          pill
                          light
                          className="tag-badge"
                          onClick={() => {
                            const updatedTags = localEditNote.tags.filter((_: string, i: number) => i !== index);
                            setLocalEditNote({...localEditNote, tags: updatedTags});
                          }}
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
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && newTag.trim() !== "") {
                          e.preventDefault();
                          setLocalEditNote({...localEditNote, tags: [...localEditNote.tags, newTag.trim()]});
                          setNewTag("");
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
                            !localEditNote.members.some(
                              (member: any) => member.user_id === user.user_id
                            )
                        )
                        .map((user: any) => (
                          <MDBDropdownItem
                            key={user.user_id}
                            link
                            onClick={() => {
                              setLocalEditNote({
                                ...localEditNote,
                                members: [...localEditNote.members, {user_id: user.user_id}]
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
                    {localEditNote.members.map((member: any) => {
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
                              onClick={() => {
                                const updatedMembers = localEditNote.members.filter(
                                  (m: any) => m.user_id !== user.user_id
                                );
                                setLocalEditNote({...localEditNote, members: updatedMembers});
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
                      style={{
                        cursor: "pointer",
                        fontWeight:
                          localEditNote.priority === level ? "bold" : "normal",
                      }}
                      onClick={() => {
                        setLocalEditNote({...localEditNote, priority: level});
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
                <MDBInput
                  name="deadline"
                  label="DeaLine..."
                  type="date"
                  value={localEditNote.dates?.deadline || ""} // Enlazado al estado local
                  onChange={(e) => {
                    setLocalEditNote((prevNote: any) => ({
                      ...prevNote,
                      dates: {
                        ...prevNote.dates,
                        deadline: e.target.value,
                      },
                    }));
                  }}
                />
              </div>
              <div className="labelForm">
                <div className="add-tag-title">
                  <i className="material-icons">notes</i>
                  <strong>DESCRIPTION</strong>
                </div>
                <MDBTextArea
                  label="Description..."
                  rows={4}
                  value={localEditNote.description}
                  onChange={(e) => {
                    setLocalEditNote({...localEditNote, description: e.target.value});
                  }}
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
                        id: String(localEditNote.checklist.length + 1),
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
                    {localEditNote.checklist.map((check: any) => (
                      <tr key={check.id} className="check-item">
                        {/* Checkbox para marcar la tarea */}
                        <td>
                          <input
                            type="checkbox"
                            checked={check.finished}
                            onChange={
                              (e) =>
                                setLocalEditNote({
                                  ...localEditNote,
                                  checklist: localEditNote.checklist.map((c: any) =>
                                    c.id === check.id
                                      ? { ...c, finished: e.target.checked }
                                      : c
                                  ),
                                })
                            }
                          />
                        </td>
                        {/* Campo para editar la prioridad */}
                        <td>
                          <ul className="tag-content">
                            <li className="grid">
                              <span
                                className={`priority ${check.priority}`}
                                title={check.priority}
                              ></span>
                            </li>
                          </ul>
                        </td>
                        {/* Campo para editar el título */}
                        <td>
                          <div>
                            <span>{check.title}</span>
                          </div>
                        </td>
                        {/* Campo para editar los tags */}
                        <td>
                          <ul className="tag-content">
                            {check.tags.map((tag: string, i: number) => (
                              <li key={i}>
                                <MDBBadge pill light>
                                  {tag}
                                </MDBBadge>
                              </li>
                            ))}
                          </ul>
                        </td>
                        {/* Campo para editar los members */}
                        <td>
                          {check.members.map((member: any) => {
                            const userId =
                              typeof member === "object"
                                ? member.user_id
                                : member; // Asegura obtener el user_id
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
                                onClick={() => {
                                  handleEdit(check);
                                }}
                              >
                                ✏️
                              </MDBBtn>
                              <MDBBtn
                                className="mx-2"
                                color="tertiary"
                                rippleColor="light"
                                onClick={() => handleDeleteChecklist(check.id)}
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
                  <strong>COMENTS</strong>
                  <MDBBtn
                    className="mx-2"
                    color="tertiary"
                    rippleColor="light"
                    onClick={handleAddCommentLocal}
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
                    {(localEditNote.comments || []).map((comment: any) => {
                      const user = usersClient.find(
                        (user: any) => user.user_id === comment.user_id
                      );

                      const isEditable =
                        user && currentUser && user.user_id === currentUser.user_id;
                      const isDeletable =
                        user && currentUser && user.user_id === currentUser.user_id;

                      return (
                        <tr key={comment.id} className="check-item">
                          {/* Campo para editar los members */}
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
                                    <p className="fw-bold mb-1">John Doe</p>
                                    <p className="text-muted mb-0">
                                      john.doe@gmail.com
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
                <p className="add-tag-title">
                  <i className="material-icons">attach_file</i>
                  <strong>ATACHMENTS</strong>
                </p>
                <MDBTable align="middle" small>
                  <MDBTableHead light>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Title</th>
                      <th scope="col">Status</th>
                      <th scope="col">Position</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                            alt=""
                            style={{ width: "35px", height: "35px" }}
                            className="rounded-circle"
                          />
                          <div className="ms-3">
                            <p className="fw-bold mb-1">John Doe</p>
                            <p className="text-muted mb-0">
                              john.doe@gmail.com
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="fw-normal mb-1">Software engineer</p>
                        <p className="text-muted mb-0">IT department</p>
                      </td>
                      <td>
                        <MDBBadge color="success" pill>
                          Active
                        </MDBBadge>
                      </td>
                      <td>Senior</td>
                    </tr>
                  </MDBTableBody>
                </MDBTable>
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                color="secondary"
                onClick={() => setScrollableModal1(false)}
              >
                Close
              </MDBBtn>
              <MDBBtn
                onClick={() => {
                  // Filtrar comentarios vacíos antes de guardar
                  const filteredNote = {
                    ...localEditNote,
                    comments: (localEditNote.comments || []).filter(
                      (comment: any) => comment.text && comment.text.trim() !== ""
                    ),
                  };
                  // Guardar los cambios locales al estado padre
                  setEditNote(filteredNote);
                  setScrollableModal1(false);
                }}
              >
                Save changes
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      {/* ADD CHECK */}
      <MDBModal
        open={scrollableModal4}
        onClose={() => setScrollableModal4(false)}
        tabIndex="-1"
      >
        <MDBModalDialog scrollable size="lg">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>ADD CHECK</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => {
                  setScrollableModal4(!scrollableModal4);
                }}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="labelForm">
                <div className="add-tag-title">
                  <i className="material-icons">done</i>
                  <strong>CHECK</strong>
                </div>
                <MDBInput
                  name="check"
                  label="Check..."
                  type="text"
                  value={newCheckFull.title}
                  onChange={(e) => setNewCheckFull({...newCheckFull, title: e.target.value})}
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
                      onClick={() => {
                        setNewCheckFull({ ...newCheckFull, priority: level });
                      }}
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
                    newCheckFull.tags.map((tag: string, index: number) =>
                      tag ? (
                        <li key={index}>
                          <MDBBadge
                            pill
                            light
                            className="tag-badge"
                            onClick={() => {
                              const updatedTags = newCheckFull.tags.filter((_: string, i: number) => i !== index);
                              setNewCheckFull({...newCheckFull, tags: updatedTags});
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            {tag} ✕
                          </MDBBadge>
                        </li>
                      ) : null
                    )}
                  <li>
                    <MDBInput
                      name="tag"
                      label="Tag..."
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && newTag.trim() !== "") {
                          e.preventDefault();
                          setNewCheckFull({...newCheckFull, tags: [...newCheckFull.tags, newTag.trim()]});
                          setNewTag("");
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
                            !newCheckFull.members.some(
                              (member: any) => member.user_id === user.user_id
                            )
                        )
                        .map((user: any) => (
                          <MDBDropdownItem
                            key={user.user_id}
                            link
                            onClick={() => {
                              setNewCheckFull({
                                ...newCheckFull,
                                members: [...newCheckFull.members, {user_id: user.user_id}]
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
                              onClick={() => {
                                const updatedMembers = newCheckFull.members.filter(
                                  (m: any) => m.user_id !== user.user_id
                                );
                                setNewCheckFull({...newCheckFull, members: updatedMembers});
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
                    setLocalEditNote({
                      ...localEditNote,
                      checklist: [...localEditNote.checklist, newCheckFull]
                    });
                    setNewCheckFull({
                      id: "",
                      title: "",
                      priority: "low",
                      members: [],
                      tags: [],
                      finished: false,
                    });
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
