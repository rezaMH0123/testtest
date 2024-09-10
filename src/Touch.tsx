import React, { useState } from "react";
import "./App.css"; // فایل CSS برای استایل‌ها

interface GridItem {
  id: number;
  touched: boolean;
}

export default function Touch() {
  // آرایه‌ای برای نگه‌داری وضعیت لمس هر بخش از گرید
  const [grid, setGrid] = useState<GridItem[]>(
    Array.from({ length: 200 }, (_, i) => ({ id: i, touched: false })) // تعداد بیشتری آیتم گرید (مثلاً 400)
  );

  // تغییر وضعیت لمس هر بخش
  const handleTouch = (id: number) => {
    setGrid((prevGrid) =>
      prevGrid.map((item) =>
        item.id === id ? { ...item, touched: true } : item
      )
    );
  };

  // هندلر برای رویداد onTouchMove
  const handleTouchMove = (event: React.TouchEvent) => {
    const touch = event.touches[0]; // اولین لمس را بگیرید
    const targetElement = document.elementFromPoint(
      touch.clientX,
      touch.clientY
    ) as HTMLElement;
    if (targetElement && targetElement.dataset.id) {
      const id = parseInt(targetElement.dataset.id, 10);
      handleTouch(id);
    }
  };

  // هندلر برای رویداد onMouseMove (برای دسکتاپ)
  const handleMouseMove = (event: React.MouseEvent) => {
    const targetElement = event.target as HTMLElement;
    if (targetElement && targetElement.dataset.id) {
      const id = parseInt(targetElement.dataset.id, 10);
      handleTouch(id);
    }
  };

  // چک کردن اینکه آیا همه بخش‌ها لمس شده‌اند یا نه
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
        onTouchMove={handleTouchMove} // رویداد حرکت لمسی
        onMouseMove={handleMouseMove} // رویداد حرکت ماوس
      >
        {grid.map((item) => (
          <div
            key={item.id}
            data-id={item.id} // داده‌ای برای شناسایی هر آیتم
            className={`grid-item ${item.touched ? "touched" : "untouched"}`}
            onTouchStart={() => handleTouch(item.id)} // رویداد لمسی برای موبایل
            onClick={() => handleTouch(item.id)} // رویداد کلیک برای دسکتاپ
          />
        ))}
      </div>

      {/* دکمه تایید */}
      <button className="confirm-button" onClick={handleConfirm}>
        تایید
      </button>
    </div>
  );
}
