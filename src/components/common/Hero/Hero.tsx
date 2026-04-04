export function Hero(){
    return (
        <section
            className="relative min-h-[60vh] md:min-h-[60vh] lg:min-h-[60vh] xl:min-h-screen flex items-center bg-gradient-to-br from-zinc-900 via-blue-950 to-zinc-900 text-white overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(at_bottom_right,#3b82f630_0%,transparent_50%)]"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full py-10 md:py-16">
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto">

                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6 tracking-tighter">
                        Найдите свой идеальный автомобиль
                    </h1>

                    <p className="text-lg sm:text-xl md:text-2xl text-zinc-300 mb-10 max-w-lg">
                        Быстрый подбор • Проверенные авто • Лучшие цены
                    </p>

                    <button
                        onClick={() => document.getElementById('catalog')?.scrollIntoView({behavior: 'smooth'})}
                        className="px-8 sm:px-10 py-4 sm:py-5 bg-blue-600 hover:bg-blue-700 text-base sm:text-lg font-semibold rounded-2xl transition-all active:scale-95 flex items-center gap-3 shadow-lg shadow-blue-600/30"
                    >
                        Начать подбор сейчас
                        <span className="text-2xl">↓</span>
                    </button>
                </div>
            </div>

            {/*/!* Индикатор прокрутки вниз *!/*/}
            {/*<div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">*/}
            {/*    <div className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center pt-2">*/}
            {/*        <div className="w-1 h-2 bg-white/70 rounded-full animate-scroll"></div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </section>
    )
}