export function Header({ children }: { children: JSX.Element[] }) {
  return <header className="header">{children}</header>;
}

export function HeaderTop({ children }: { children: JSX.Element[] }) {
  return <div className="header__top">{children}</div>;
}
