import React, { useState } from "react";
import "./App.css"; // فایل CSS برای استایل‌ها

interface GridItem {
  id: number;
  touched: boolean;
}

export default function Touch() {
  const [grid, setGrid] = useState<GridItem[]>(
    Array.from({ length: 100 }, (_, i) => ({ id: i, touched: false })) // گرید 10x10
  );

  const handleTouch = (id: number) => {
    setGrid((prevGrid) =>
      prevGrid.map((item) =>
        item.id === id ? { ...item, touched: true } : item
      )
    );
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    const touch = event.touches[0];
    const targetElement = document.elementFromPoint(
      touch.clientX,
      touch.clientY
    ) as HTMLElement;
    if (targetElement && targetElement.dataset.id) {
      const id = parseInt(targetElement.dataset.id, 10);
      handleTouch(id);
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    const targetElement = event.target as HTMLElement;
    if (targetElement && targetElement.dataset.id) {
      const id = parseInt(targetElement.dataset.id, 10);
      handleTouch(id);
    }
  };

  const handleConfirm = () => {
    const unTouched = grid.filter((item) => !item.touched);
    if (unTouched.length > 0) {
      alert("همه بخش‌ها لمس نشده‌اند!");
    } else {
      alert("همه بخش‌ها لمس شده‌اند!");
    }
  };

  return (
    <div className="container">
      <div
        className="grid-container"
        onTouchMove={handleTouchMove}
        onMouseMove={handleMouseMove}
      >
        {grid.map((item) => (
          <div
            key={item.id}
            data-id={item.id}
            className={`grid-item ${item.touched ? "touched" : "untouched"}`}
            onTouchStart={() => handleTouch(item.id)}
            onClick={() => handleTouch(item.id)}
          />
        ))}
      </div>

      <button className="confirm-button" onClick={handleConfirm}>
        تایید
      </button>
    </div>
  );
}
