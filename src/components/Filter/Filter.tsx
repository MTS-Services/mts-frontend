function Filter({ items }) {
  const arr = Object.values(items)[0];
  console.log(items);
  return (
    <>
      <div className="bg-primary border-accent flex rounded border-2 p-2">
        <div className="bg-primary border-accent/30 flex items-center border-r-1 pr-2">
          {/* <RiUserFill /> */}
          <h1>icon</h1>
        </div>
        <select className="bg-primary font-secondary border-accent/40 mr-2 ml-3 border px-3 focus:outline-0">
          {arr?.map((item) => <option className="p-2">{item}</option>)}
        </select>
      </div>
    </>
  );
}

export default Filter;
