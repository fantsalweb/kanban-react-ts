import {
  MDBBtn,
  MDBBadge,
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
} from "mdb-react-ui-kit";

interface ModalViewProps {
  note: any;
  scrollableModal: boolean;
  setScrollableModal: React.Dispatch<React.SetStateAction<boolean>>;
  usersClient: any;
  formatedDate: (formatDate: any) => string;
  completionPercentage: number;
  handleChangeChecklist: (
    id: string,
    field: string,
    value: string | boolean
  ) => void;
}

export default function ModalView({
  note,
  scrollableModal,
  setScrollableModal,
  usersClient,
  formatedDate,
  completionPercentage,
  handleChangeChecklist
}: ModalViewProps) {
  return (
    <MDBModal
      open={scrollableModal}
      onClose={() => setScrollableModal(false)}
      tabIndex="-1"
    >
      <MDBModalDialog scrollable size="lg">
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>VIEW TAG</MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={() => setScrollableModal(false)}
            ></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <div className="labelForm">
              <img src={note.image} alt={note.title} />
            </div>
            <div className="labelForm">
              <div className="add-tag-title">
                <i className="material-icons">done</i>
                <strong>TITLE</strong>
              </div>
              <div>
                <span>{note.title}</span>
              </div>
            </div>
            <div className="labelForm">
              <p className="add-tag-title">
                <i className="material-icons">tag</i>
                <strong>TAGS</strong>
              </p>
              <ul className="tag-content">
                {note.tags.map((tag: string, i: number) => (
                  <li key={i}>
                    <MDBBadge pill light>
                      {tag}
                    </MDBBadge>
                  </li>
                ))}
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
                  {note.members.map((member: any) => {
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
                          {user.skills.map(({skill, index}: {skill: string; index: number}) => (
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
                      fontWeight: note.priority === level ? "bold" : "normal",
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
              <p className="add-tag-title">
                <i className="material-icons">event</i>
                <strong>DATES</strong>
              </p>
              <ul className="clear-style-ul">
                <li>
                  <span>Start: {formatedDate(note.dates.createdAt)}</span>
                </li>
                <li>
                  <span>End: {formatedDate(note.dates.deadline)}</span>
                </li>
              </ul>
            </div>
            <div className="labelForm">
              <p className="add-tag-title">
                <i className="material-icons">notes</i>
                <strong>DESCRIPTION</strong>
              </p>
              <p>{note.description}</p>
            </div>
            <div className="labelForm">
              <div className="add-tag-title">
                <i className="material-icons">checklist</i>
                <strong>CHECKLIST</strong>
              </div>
              <span>PROGRESS {completionPercentage.toFixed(2)}%</span>
              <MDBProgress height="20">
                <MDBProgressBar
                  width={completionPercentage.toFixed(2)}
                  valuemin={0}
                  valuemax={100}
                >
                  {completionPercentage.toFixed(2)}%
                </MDBProgressBar>
              </MDBProgress>
              <br />
              <MDBTable align="middle" small>
                <MDBTableHead light>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Priority</th>
                    <th scope="col">Check</th>
                    <th scope="col">Tags</th>
                    <th scope="col">Members</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {note.checklist.map((check: any) => (
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
                          disabled={true}
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
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
            </div>
            <div className="labelForm">
              <p className="add-tag-title">
                <i className="material-icons">comment</i>
                <strong>COMENTS</strong>
              </p>
              <MDBTable align="middle" small>
                <MDBTableHead light>
                  <tr>
                    <th scope="col">User</th>
                    <th scope="col">Comment</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {note.comments.map((comment: any) => {
                    const user = usersClient.find(
                      (user: any) => user.user_id === comment.user_id
                    );

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

                        <td>{comment.text}</td>
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
                          <p className="text-muted mb-0">john.doe@gmail.com</p>
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
            <MDBBtn color="secondary" onClick={() => setScrollableModal(false)}>
              Close
            </MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
