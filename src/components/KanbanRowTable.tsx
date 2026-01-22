import { MDBBtn, MDBBadge } from "mdb-react-ui-kit";

export default function KanbanRowTable({ rows }: any) {
  return (
    <>
      {rows.notes.map((row: any) => (
        <tr key={row.id}>
          <td>
            <div className="d-flex align-items-center">{row.title}</div>
          </td>
          <td>
            <p className="fw-normal mb-1">
              <strong>{rows.name}</strong>
            </p>
          </td>
          <td>
            {row.tags.map((tag: string) => (
              <MDBBadge pill light>
                {tag}
              </MDBBadge>
            ))}
          </td>
          <td>
            {row.members.map((member: any) => (
              <img
                src={member.img}
                alt={member.name}
                style={{ width: "40px", height: "40px" }}
                className="rounded-circle"
              />
            ))}
          </td>
          <td>{row.dates.deadline}</td>
          <td>
            <MDBBtn color="link" rounded size="sm">
              View
            </MDBBtn>
            <MDBBtn color="link" rounded size="sm">
              Edit
            </MDBBtn>
          </td>
        </tr>
      ))}
    </>
  );
}
