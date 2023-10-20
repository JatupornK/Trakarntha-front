import DropDownSortList from "./DropDownSortList";

export default function DropDownSort({ list, text }) {
  // console.log(list)
  return (
    <>
      <ul>
        {list &&
          list.map((item, idx) => (
            <DropDownSortList item={item} key={idx} text={text} />
          ))}
      </ul>
    </>
  );
}
