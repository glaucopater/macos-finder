import "./Header.css";

export const TitleImage = () => (
  <span role="img" aria-labelledby="title-image">
    📄
  </span>
);

export const Header = () => {
  return (
    <header className="Header">
      <h3 className="HeaderTitle">
        {"Documents"} <TitleImage />
      </h3>
    </header>
  );
};
