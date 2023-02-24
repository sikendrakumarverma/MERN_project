import React from "react";
import UserCard from "./UserCard";

export default function Users(props) {
  return (
    <div className="product-wrapper">
      {props.users.map((item, index) => (
        <UserCard
          key={item.id}
          onShowMore={() => props.onUserClick(item)}// In onUserClick key come a function(handleUserClick) from parent and 
          onDelete={() => props.onDelete(item)}//from child send user details by calling some(item) parameter(onUserClick(item))
          user={item}
          image={"https://i.pravatar.cc/200/200" + index}
          name2={products[index].name2}
          image2={"https://api.lorem.space/image/shoes?w=200&h=200&" + index}
        />
      ))}
    </div>
  );
}

const products = [
  {
    id: 1,
    name2: "Crab Brie In Phyllo",
  },
  {
    id: 2,
    name2: "Tart Shells - Barquettes, Savory",
  },
  {
    id: 3,
    name2: "Tuna - Bluefin",
  },
  {
    id: 4,
    name2: "Beef - Texas Style Burger",
  },
  {
    id: 5,
    name2: "Island Oasis - Lemonade",
  },
  {
    id: 6,
    name2: "Asparagus - Mexican",
  },
  {
    id: 7,
    name2: "Buffalo - Short Rib Fresh",
  },
  {
    id: 8,
    name2: "Bread - Pita",
  },
  {
    id: 9,
    name2: "Shichimi Togarashi Peppeers",
  },
  {
    id: 10,
    name2: "Plastic Wrap",
  }
]