"use client"
import { useState } from "react"

export default function ListarUsuario() {
    const [modalAberto, setModalAberto] = useState(false)

    return (
        <div className="flex-1 max-h-[88vh] overflow-y-auto flex flex-col gap-3">

            <div className="flex items-center gap-2">
                <div className="w-1.5 h-4 bg-[#34d399] rounded-sm" />
                <h2 className="text-xs font-mono text-[#34d399] tracking-widest uppercase">
                    Usuários Registrados
                </h2>
            </div>

            <div className="bg-[#13111c] border border-[#2d2040] rounded-lg p-4 flex flex-col gap-3
                            hover:border-[#3d2f58] transition-colors">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#34d399]"
                            style={{ boxShadow: "0 0 6px #34d399" }} />
                        <span className="text-sm font-semibold text-[#e6edf3]">Nome do Usuário</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded border
                                     bg-[#34d39915] border-[#34d399] text-[#34d399]">
                        ATIVO
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                    <div className="bg-[#0d0d14] rounded px-2 py-1.5 border border-[#2d2040]">
                        <p className="text-[#484f58] uppercase tracking-wider text-[9px] mb-0.5">E-mail</p>
                        <p className="text-[#8b949e]">usuario@email.com</p>
                    </div>
                    <div className="bg-[#0d0d14] rounded px-2 py-1.5 border border-[#2d2040]">
                        <p className="text-[#484f58] uppercase tracking-wider text-[9px] mb-0.5">Nível</p>
                        <p className="text-[#a855f7]">Operador</p>
                    </div>
                </div>

                <div className="flex justify-end gap-2 pt-1 border-t border-[#2d2040]">
                    <button onClick={() => setModalAberto(true)}
                        className="text-[10px] font-mono px-3 py-1 rounded border border-[#a855f730]
                                   text-[#a855f7] hover:bg-[#a855f715] transition-colors cursor-pointer">
                        Editar
                    </button>
                    <button className="text-[10px] font-mono px-3 py-1 rounded border border-[#ff444430]
                                       text-[#ff4444] hover:bg-[#ff444415] transition-colors cursor-pointer">
                        Remover
                    </button>
                </div>
            </div>

            {modalAberto && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-[#13111c] border border-[#2d2040] rounded-lg p-6 w-[420px] flex flex-col gap-4">
                        <div className="flex items-center gap-2 border-b border-[#2d2040] pb-3">
                            <div className="w-1.5 h-4 bg-[#f59e0b] rounded-sm" />
                            <h2 className="text-xs font-mono text-[#f59e0b] tracking-widest uppercase">
                                Editar Usuário
                            </h2>
                        </div>

                        {[
                            { label: "Novo Nome", type: "text", placeholder: "Nome completo" },
                            { label: "Novo E-mail", type: "email", placeholder: "email@planta.com" },
                            { label: "Nova Senha", type: "password", placeholder: "••••••••" },
                        ].map(f => (
                            <div key={f.label} className="flex flex-col gap-1">
                                <label className="text-[10px] font-mono text-[#8b949e] tracking-widest uppercase">
                                    {f.label}
                                </label>
                                <input type={f.type} placeholder={f.placeholder}
                                    className="bg-[#0d0d14] border border-[#2d2040] text-[#e6edf3] text-sm font-mono
                                               rounded px-3 py-2 focus:outline-none focus:border-[#f59e0b] transition-colors
                                               placeholder:text-[#484f58]"
                                />
                            </div>
                        ))}

                        <div className="flex gap-3 justify-end pt-1">
                            <button onClick={() => setModalAberto(false)}
                                className="text-xs font-mono px-4 py-2 rounded border border-[#f59e0b]
                                           text-[#f59e0b] hover:bg-[#f59e0b15] transition-colors cursor-pointer tracking-wider">
                                [ Salvar ]
                            </button>
                            <button onClick={() => setModalAberto(false)}
                                className="text-xs font-mono px-4 py-2 rounded border border-[#2d2040]
                                           text-[#8b949e] hover:border-[#ff4444] hover:text-[#ff4444] transition-colors cursor-pointer tracking-wider">
                                [ Cancelar ]
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
