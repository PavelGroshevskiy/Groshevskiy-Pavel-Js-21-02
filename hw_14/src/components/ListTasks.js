import React from "react";

export default function ListTasks(props) {
  const items = props.items;
  console.log(items)
  const listItems = items.map(item => 
    <div className="list" key = {item.key}>
      <p> <input type="text" key={item.key} value={item.text}
        onChange = {
          (e) => {
            props.setUpdate(e.target.value, item.key)
          }
        }

      /> </p>
      <span> <button onClick={ () => props.deleteItem(item.key)}>
      Del 
      </button> </span>
    </div>
  ) 
  return(
    <div>
    {listItems}
    </div>
  )
}