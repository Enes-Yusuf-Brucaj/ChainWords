function WordList({ words }) {
  return (
    <div className="mt-4 bg-gray-100 p-3 rounded">
      <h2 className="font-semibold">Word Chain:</h2>
      <div>{words.join(" → ")}</div>
    </div>
  );
}

export default WordList;
