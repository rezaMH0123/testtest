import React, { useState, useEffect } from "react";
import "./App.css";

export default function TouchTest() {
  const [columns, setColumns] = useState<number>(1);
  const [rows, setRows] = useState<number>(1);
  const [coloredItems, setColoredItems] = useState<number[]>([]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const calculateGrid = () => {
      const containerWidth = window.innerWidth;
      const containerHeight = window.innerHeight;

      const itemSize = 45;

      const calculatedColumns = Math.floor(containerWidth / itemSize);
      const calculatedRows = Math.floor(containerHeight / itemSize);

      setColumns(calculatedColumns);
      setRows(calculatedRows);
    };

    calculateGrid();
    window.addEventListener("resize", calculateGrid);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("resize", calculateGrid);
    };
  }, []);

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

  const handleTouch = (index: number) => {
    if (!coloredItems.includes(index)) {
      setColoredItems((prev) => [...prev, index]);
    }
  };

  const handleCheck = () => {
    const totalItems = columns * rows;
    if (coloredItems.length === totalItems) {
      alert("تمام آیتم‌ها رنگ شده‌اند!");
    } else {
      alert("هنوز برخی آیتم‌ها رنگ نشده‌اند.");
    }
  };

  return (
    <div>
      <div
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
        className="tContainer"
        onTouchMove={handleTouchMove}
        onMouseMove={handleMouseMove}
      >
        {[...Array(columns * rows)].map((_, index) => (
          <div
            key={index}
            data-id={index}
            className={`titems ${
              coloredItems.includes(index) ? "colored" : ""
            }`}
            onTouchStart={() => handleTouch(index)}
            onClick={() => handleTouch(index)}
          ></div>
        ))}
      </div>
      <button
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          border: "1px solid blue",
        }}
        onClick={handleCheck}
      >
        تایید
      </button>
    </div>
  );
}
