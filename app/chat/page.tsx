"use client";

import Link from "next/link";

export default function Chat() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={"/"}>
            <div className="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            </div>
            </Link>
            <div className="w-12 h-12 bg-amber-300 rounded-full flex items-center justify-center text-white font-semibold text-lg">
              ОБ
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Ориёнбонк</h2>
              <p className="text-sm text-gray-500">Онлайн</p>
              
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="flex justify-center">
          <span className="px-3 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">
            Бугун
          </span>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-amber-300 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
            ОБ
          </div>
          <div className="flex flex-col max-w-[70%]">
            <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
              <p className="text-gray-800 text-[15px] leading-relaxed">
                Салом! Ман бот-консультанти Ориёнбонк мебошам. Чӣ тавр кӯмак карда метавонам?
              </p>
            </div>
            <span className="text-xs text-gray-500 mt-1 ml-2">10:23</span>
          </div>
        </div>

        <div className="flex items-start gap-3 justify-end">
          <div className="flex flex-col max-w-[70%] items-end">
            <div className="bg-amber-300 rounded-2xl rounded-tr-md px-4 py-3 shadow-sm">
              <p className="text-gray-900 text-[15px] leading-relaxed">
                Салом! Ман дар бораи қарзҳо маълумот мегирам
              </p>
            </div>
            <span className="text-xs text-gray-500 mt-1 mr-2">10:24</span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-amber-300 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
            ОБ
          </div>
          <div className="flex flex-col max-w-[70%]">
            <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
              <p className="text-gray-800 text-[15px] leading-relaxed">
                Хуб! Мо намудҳои гуногуни қарзҳо дорем:
              </p>
            </div>
            <span className="text-xs text-gray-500 mt-1 ml-2">10:25</span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-amber-300 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
            ОБ
          </div>
          <div className="flex flex-col max-w-[70%]">
            <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
              <p className="text-gray-800 text-[15px] leading-relaxed">
                • Автоқарз - барои харидани воситаи нақлиёт<br />
                • Ипотека - барои харидани хона<br />
                • Қарзи табдили - барои эҳтиёҷоти шахсӣ
              </p>
            </div>
            <span className="text-xs text-gray-500 mt-1 ml-2">10:25</span>
          </div>
        </div>

        <div className="flex items-start gap-3 justify-end">
          <div className="flex flex-col max-w-[70%] items-end">
            <div className="bg-amber-300 rounded-2xl rounded-tr-md px-4 py-3 shadow-sm">
              <p className="text-gray-900 text-[15px] leading-relaxed">
                Барои ипотека кадом шартҳо лозим аст?
              </p>
            </div>
            <span className="text-xs text-gray-500 mt-1 mr-2">10:26</span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-amber-300 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
            ОБ
          </div>
          <div className="flex flex-col max-w-[70%]">
            <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
              <p className="text-gray-800 text-[15px] leading-relaxed">
                Барои ипотека шумо бояд:
                <br />• Соли ҳаёти кории аз 6 моҳ зиёд
                <br />• Даромади меҳнати тасдиқшуда
                <br />• Банкоматҳои зарурӣ
              </p>
            </div>
            <span className="text-xs text-gray-500 mt-1 ml-2">10:27</span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-amber-300 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
            ОБ
          </div>
          <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full" style={{ animation: 'typing-dot 1.4s infinite', animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full" style={{ animation: 'typing-dot 1.4s infinite', animationDelay: '200ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full" style={{ animation: 'typing-dot 1.4s infinite', animationDelay: '400ms' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 px-4 py-4">
        <form className="flex items-end gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>
          <div className="flex-1 bg-gray-100 rounded-3xl px-4 py-3 flex items-end gap-3 min-h-[50px] max-h-32">
            <textarea
              placeholder="Паём нависед..."
              className="flex-1 bg-transparent border-none outline-none resize-none text-gray-800 placeholder-gray-500 text-[15px] overflow-y-auto"
              rows={1}
              style={{ maxHeight: '120px' }}
            />
            <button className="p-1.5 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
          <button className="bg-amber-300 hover:bg-amber-400 text-gray-900 rounded-full p-3 transition-colors flex-shrink-0 shadow-sm">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
