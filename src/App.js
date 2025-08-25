import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);


  function handleAddItems(item) {
    setItems(items => [...items, item])
  }

  function handleDeleteItem(id) {
    setItems(items => items.filter(item => item.id !== id))
  }

  function handletoggleItem(id) {
    setItems(items =>
      items.map(item =>
        item.id === id ? { ...item, packed: !item.packed }
          : item
      ));
  }

  return (
    <>
      <div className="app">
        <Logo />
        <Form onAddItems={handleAddItems} />
        <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handletoggleItem} />
        <Stats items={items} />
      </div>
    </>
  )
}

function Logo() {
  return (
    <>
      <h1>🌴 Far away 💼</h1>
    </>
  )
}

function Form({ onAddItems }) {
  const [description, setDescriotion] = useState("");
  const [quantity, setQuantity] = useState(1);



  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = {
      description, quantity,
      packed: false, id: Date.now()
    }
    console.log(newItem);

    onAddItems(newItem)

    setDescriotion('');
    setQuantity(1);
  }

  return (
    <>
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>What do you need for your 😍 trip?</h3>
        <select value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}>
          {Array.from({ length: 20 }, (_, i) => i + 1).map
            (num => (
              <option value={num} key={num}>
                {num}
              </option>
            ))}
        </select>
        <input type="text" placeholder="Item..." value={description}
          onChange={(e) => setDescriotion(e.target.value)} />
        <button>Add</button>
      </form>
    </>
  )
}

function PackingList({ items, onDeleteItem, onToggleItem }) {
  const [sortBy, setSortBy] = useState('input');
  let sorted;

  if (sortBy === "input") sorted = items;
  if (sortBy === "description")
    sorted = items
      .slice().sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sorted = items.slice()
      .sort((a,b) => Number(a.packed) - Number(b.packed));

  return (
    <>
      <div className="list">
        <ul>
          {sorted.map(item => <Item key={item.id} item={item}
            onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} />)}
        </ul>
        <div className="actions">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="input">Sort by input order</option>
            <option value="description">Sort by description</option>
            <option value="packed">Sort by packed status</option>
          </select>
        </div>
      </div>
    </>
  )
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <>
      <li>
        <input type="checkbox" value={item.packed} onChange={() => onToggleItem(item.id)} />
        <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
          {item.description} {item.quantity}
        </span>
        <button onClick={() => onDeleteItem(item.id)}>❌</button>
      </li>
    </>
  )
}

function Stats({ items }) {
  if (!items.length)
    return <p className="stats">
      <em>Start adding some items to your packing list🚀</em>
    </p>

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round(numPacked / numItems * 100);

  return (
    <>
      <footer className="stats">
        <em>
          {percentage === 100 ? "you got everything!  ready to go✈️" :
            `💼 You have ${numItems} items in your list, and you already packed
             ${numPacked} (${percentage}%)`}
        </em>
      </footer>
    </>
  )
}
