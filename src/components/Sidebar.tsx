export function Sidebar({ children }: { children: JSX.Element[] }) {
  return <div className="sidebar">{children}</div>;
}

export function SidebarTop({ children }: { children: JSX.Element[] }) {
  return <div className="sidebar__top">{children}</div>;
}
