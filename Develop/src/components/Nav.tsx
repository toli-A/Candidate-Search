import { NavLink } from "react-router-dom";

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <>
      <NavLink to={'/'}>Home</NavLink>
      <NavLink to={'/SavedCandidates'}>Saved Candidates</NavLink>
    </>
  )
};

export default Nav;
