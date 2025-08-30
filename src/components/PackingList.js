import { useState } from "react";
import Item from "./Item";
export default function PackingList({ items, onDeleteItem, onToggleItem, handleClearList }) {
    const [sortBy, setSortBy] = useState('input');
    let sorted;

    if (sortBy === "input") sorted = items;
    if (sortBy === "description")
        sorted = items
            .slice().sort((a, b) => a.description.localeCompare(b.description));

    if (sortBy === "packed")
        sorted = items.slice()
            .sort((a, b) => Number(a.packed) - Number(b.packed));

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
                    <button onClick={handleClearList}>Clear List</button>
                </div>
            </div>
        </>
    );
}
