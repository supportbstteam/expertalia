import { ArrowRight } from "lucide-react";

export default function Maincard({
  icon,
  title,
  items,
  buttonText,
  buttonLink,
  onButtonClick,
  mainbuttonlink,
}) {
  return (
    <div className="bg-blue-50 rounded-lg  py-6 px-5 flex flex-col h-full">
      {/* Icon + Title */}
      <div className="flex items-center gap-3 mb-10">
        <div className="bg-[#052766] text-white p-4 rounded-full flex ">
          {icon}
        </div>
        <h3 className="font-semibold text-[#052766] text-2xl text-start">{title}</h3>
      </div>

      {/* Items */}
      <div className="flex-1">
        <ul className="space-y-3 h-full">
          {Array.isArray(items) ? (
            items.map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center bg-white rounded-md p-4 border hover:bg-[#f1f1f1] transition cursor-pointer h-full"
                onClick={onButtonClick}
              >
                <span className="text-[#052766]">{item}</span>
                <ArrowRight className="w-4 h-4 text-[#052766]" />
              </li>
            ))
          ) : (
            <li
              className="flex justify-between items-start bg-white rounded-md p-4 border hover:bg-[#f1f1f1] transition cursor-pointer"
              onClick={onButtonClick}
            >
              <div className="flex flex-col text-[#052766] text-left">
                {Object.values(items).map((val, idx) => (
                  <span key={idx}>{val}</span>
                ))}
              </div>
              <ArrowRight className="w-4 h-4 text-[#052766]" />
            </li>
          )}
        </ul>
      </div>

      {/* Main Button */}
      <a
        href={mainbuttonlink} // ✅ use href instead of src
        className="mt-[36px] flex items-center justify-center gap-2 text-center bg-[#052766] text-white py-4.5 px-4 rounded-md hover:bg-[#052766]/80 transition cursor-pointer"
      >
        {buttonText}
        <ArrowRight className="w-4 h-4 text-white rotate-300" />
      </a>
    </div>
  );
}
