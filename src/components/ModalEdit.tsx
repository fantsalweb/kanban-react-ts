import { useState } from "react";
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
                  src={editNote.image}
                  alt={editNote.title}
                  style={{ maxWidth: "100%", marginBottom: "1em" }}
                />
                <MDBInput
                  name="image"
                  label="Image..."
                  type="text"
                  value={editNote.image}
                  onChange={(e) => handleChange("image", e.target.value)}
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
                  value={editNote.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                />
              </div>
              <div className="labelForm">
                <div className="add-tag-title">
                  <i className="material-icons">tag</i>
                  <strong>TAGS</strong>
                </div>
                <ul className="tag-content">
                  {editNote.tags.length > 0 &&
                    editNote.tags.map(({tag, index}: {tag: string; index: number}) => (
                      <li key={index}>
                        <MDBBadge
                          pill
                          light
                          className="tag-badge"
                          onClick={() => handleDeleteTag(index)}
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
                      onKeyPress={(e) => handleAddTag(e)} // Agregar al presionar Enter
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
                            !editNote.members.some(
                              (member: any) => member.user_id === user.user_id
                            )
                        ) // Filtra los que ya están
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
                    {editNote.members.map((member: any) => {
                      const userId =
                        typeof member === "object" ? member.user_id : member; // Asegura obtener el user_id
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
                          editNote.priority === level ? "bold" : "normal",
                      }}
                      onClick={() => handleChange("priority", level)}
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
                  value={editNote.dates.deadline || ""} // Enlazado al estado
                  onChange={(e) =>
                    setEditNote((prevNote: any) => ({
                      ...prevNote,
                      dates: {
                        ...prevNote.dates,
                        deadline: e.target.value,
                      },
                    }))
                  } // Agregar al presionar Enter
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
                  value={editNote.description}
                  onChange={(e) => handleChange("description", e.target.value)}
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
                    onClick={() => setScrollableModal3(!scrollableModal3)}
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
                    {editNote.checklist.map((check: any) => (
                      <tr key={check.id} className="check-item">
                        {/* Checkbox para marcar la tarea */}
                        <td>
                          <input
                            type="checkbox"
                            checked={check.finished}
                            onChange={
                              (e) =>
                                handleChangeChecklist(
                                  check.id,
                                  "finished",
                                  e.target.checked
                                ) // Cambiar estado de "finished"
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
                    onClick={handleAddComment}
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
                    {editNote.comments.map((comment: any) => {
                      const user = usersClient.find(
                        (user: any) => user.user_id === comment.user_id
                      );

                      const isEditable =
                        user && user.user_id === currentUser.user_id; // Verifica si el comentario es editable por el usuario actual
                      const isDeletable =
                        user && user.user_id === currentUser.user_id; // Verifica si el comentario es eliminable por el usuario actual

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
                            {isEditable ? (
                              <MDBInput
                                type="text"
                                value={comment.text}
                                onChange={(e) =>
                                  handleChangeComment(
                                    comment.id,
                                    "text",
                                    e.target.value
                                  )
                                }
                                placeholder="Edit Comment"
                              />
                            ) : (
                              <p>{comment.text}</p>
                            )}
                          </td>
                          <td>
                            {/* El botón de eliminación solo aparece si el comentario es del usuario actual */}
                            {isDeletable && (
                              <MDBBtn
                                className="mx-2"
                                color="tertiary"
                                rippleColor="light"
                                onClick={() => handleDeleteComment(comment.id)}
                              >
                                🗑️
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
                  handleSaveNote();
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
        open={scrollableModal3}
        onClose={() => setScrollableModal3(false)}
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
                  setScrollableModal3(!scrollableModal3);
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
                  value={addCheck.title}
                  onChange={(e) => setAddCheck(e.target.value)}
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
                        setAddCheck({ ...addCheck, priority: level });
                        console.log(addCheck);
                      }}
                      style={{
                        cursor: "pointer",
                        fontWeight:
                          addCheck.priority === level ? "bold" : "normal",
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
                  {addCheck.tags.length > 0 &&
                    addCheck.tags.map(({tag, index}: {tag: string; index: number}) =>
                      tag ? (
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
                      ) : null
                    )}
                  <li>
                    <MDBInput
                      name="tag"
                      label="Tag..."
                      type="text"
                      value={newTag} // Enlazado al estado
                      onChange={(e) => setNewTag(e.target.value)} // Guardar valor en estado
                      onKeyPress={(e) => handleAddTagCheck(e)} // Agregar al presionar Enter
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
                            !addCheck.members.some(
                              (member: any) => member.user_id === user.user_id
                            )
                        ) // Filtra los que ya están
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
                    {addCheck.members.map((member: any) => {
                      const userId =
                        typeof member === "object" ? member.user_id : member; // Asegura obtener el user_id
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
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                color="secondary"
                onClick={() => setScrollableModal3(false)}
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
