import { useState } from "react";

function SingleProjectTest({ data }) {
  const [bonus, setBonus] = useState(data.bonus);

  const handleValue = (e) => {
    setBonus(e.target.value);
  };
  const handleSubmit = () => {
    console.log(data.id);
  };

  //   console.log(data);
  return (
    <>
      <input disabled type="text" onChange={handleValue} value={bonus} />
      <button className="text-green-400 p-2 m-2" onClick={handleSubmit}>
        submit
      </button>
    </>
  );
}

export default SingleProjectTest;
