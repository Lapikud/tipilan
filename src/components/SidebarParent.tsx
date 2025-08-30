import SidebarLayoutServer from "./SidebarLayoutServer";

const SidebarParent = () => {
  return (
    <div className="fixed w-screen top-0 z-9999">
      <SidebarLayoutServer />
    </div>
  );
};

// This component is responsible for rendering the sidebar and header together.
// Server-side translations are handled by SidebarLayoutServer.

export default SidebarParent;
