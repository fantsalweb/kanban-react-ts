import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";

export default function Header({
  selectedClient,
  projects,
  onProjectChange,
}: any) {
  return (
    <MDBNavbar light bgColor="light">
      <MDBContainer fluid>
        <MDBNavbarBrand tag="span" className="mb-0 h1">
          <span>{selectedClient.name}</span>
        </MDBNavbarBrand>
        <div className="flex">
          <MDBDropdown>
            <MDBDropdownToggle className="btn btn-outline-primary" size="sm">
              Projects
            </MDBDropdownToggle>
            <MDBDropdownMenu>
              {projects.map((project: any) => (
                <MDBDropdownItem
                  key={project.id}
                  onClick={() => onProjectChange(project.id)}
                >
                  {project.name}
                </MDBDropdownItem>
              ))}
            </MDBDropdownMenu>
          </MDBDropdown>
          <i className="material-icons">settings</i>
          <i className="material-icons">notifications</i>
          <i className="material-icons">info</i>
          <img
            src="https://mdbootstrap.com/img/new/avatars/8.jpg"
            alt=""
            style={{ width: "40px", height: "40px" }}
            className="rounded-circle"
          />
        </div>
      </MDBContainer>
    </MDBNavbar>
  );
}
