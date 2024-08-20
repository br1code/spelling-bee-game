import { FC } from 'react';

interface HeaderProps {
  date: string;
  editor: string;
}

const Header: FC<HeaderProps> = ({ date, editor }) => {
  return (
    <header>
      <h1 className="title">Spelling Bee</h1>
      <p className="date">{date}</p>
      <p className="editor">NYT game edited by {editor}</p>
    </header>
  );
};

export default Header;
