function SearchBar({ value, onSearch }) {
  return (
    <input
      id="search"
      type="text"
      className="search"
      placeholder="Search Projects"
      value={value}
      onChange={(event) => onSearch(event.target.value)}
    />
  );
}

export default SearchBar;
