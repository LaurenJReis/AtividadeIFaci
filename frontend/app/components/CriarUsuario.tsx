"use client"
import { useState } from "react"

export default function CriarUsuario() {
    const [form, setForm] = useState({ nome: "", email: "", senha: "" })

    return (
        <div className="w-[38vw] h-fit bg-[#13111c] border border-[#2d2040] rounded-lg p-5 flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-[#2d2040] pb-3">
                <div className="w-1.5 h-4 bg-[#a855f7] rounded-sm" />
                <h2 className="text-xs font-mono text-[#a855f7] tracking-widest uppercase">
                    Registrar Usuário
                </h2>
            </div>

            <div className="flex flex-col gap-3">
                {[
                    { label: "Nome Completo", key: "nome", type: "text", placeholder: "Nome do operador" },
                    { label: "E-mail", key: "email", type: "email", placeholder: "operador@planta.com" },
                    { label: "Senha", key: "senha", type: "password", placeholder: "••••••••" },
                ].map(f => (
                    <div key={f.key} className="flex flex-col gap-1">
                        <label className="text-[10px] font-mono text-[#8b949e] tracking-widest uppercase">
                            {f.label}
                        </label>
                        <input
                            type={f.type}
                            value={form[f.key as keyof typeof form]}
                            onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                            placeholder={f.placeholder}
                            className="bg-[#0d0d14] border border-[#2d2040] text-[#e6edf3] text-sm font-mono
                                       rounded px-3 py-2 focus:outline-none focus:border-[#a855f7] transition-colors
                                       placeholder:text-[#484f58]"
                        />
                    </div>
                ))}
            </div>

            <button className="mt-1 py-2 px-4 text-xs font-mono tracking-widest uppercase rounded
                               bg-[#a855f715] border border-[#a855f7] text-[#a855f7]
                               hover:bg-[#a855f7] hover:text-[#0d0d14] transition-all cursor-pointer">
                [ Registrar ]
            </button>
        </div>
    )
}
