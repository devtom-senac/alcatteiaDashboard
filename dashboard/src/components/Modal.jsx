import React from "react";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  // Se children for array, o primeiro é o título, o resto é o conteúdo
  const isArray = Array.isArray(children);
  const header = isArray ? children[0] : null;
  const content = isArray ? children.slice(1) : children;

  return (
    <div
      className="fixed top-[64px] right-0 h-[calc(100vh-64px)] w-[450px] bg-[#220731] shadow-2xl z-50 overflow-y-auto transition-transform duration-300"
      style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
    >
      <div className="bg-[#2A2739] flex justify-between items-center p-6 border-b border-[#220731]">
        <div>{header}</div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white text-2xl font-bold ml-4"
        >
          &times;
        </button>
      </div>
      <div className="p-6 bg-[#2A2739]">{content}</div>
    </div>
  );
}