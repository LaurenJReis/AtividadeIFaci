"use client"
import { useState } from "react"

interface Props {
    onCriado: () => void
}

export default function CriarDispositivo({ onCriado }: Props) {
    const [form, setForm] = useState({ nome: "", tipo: "", ip: "", descricao: "" })
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState<{ texto: string; erro: boolean } | null>(null)

    const tiposDispositivo = [
        "Sensor de Temperatura",
        "Sensor de Pressão",
        "Sensor de Umidade",
        "Sensor de Presença",
        "Controlador PLC",
        "Atuador / Relé",
        "Gateway OPC-UA",
        "Outro",
    ]

    const criar = async () => {
        if (!form.nome || !form.tipo) {
            setMsg({ texto: "Nome e tipo são obrigatórios.", erro: true })
            return
        }
        setLoading(true)
        try {
            const res = await fetch("http://localhost:8080/devices", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            })
            const json = await res.json()
            if (res.ok) {
                setMsg({ texto: json.msg, erro: false })
                setForm({ nome: "", tipo: "", ip: "", descricao: "" })
                onCriado()
            } else {
                setMsg({ texto: json.msg, erro: true })
            }
        } catch {
            setMsg({ texto: "Erro ao conectar com a API.", erro: true })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-[38vw] h-fit bg-[#13111c] border border-[#2d2040] rounded-lg p-5 flex flex-col gap-4">

            <div className="flex items-center gap-2 border-b border-[#2d2040] pb-3">
                <div className="w-1.5 h-4 bg-[#a855f7] rounded-sm" />
                <h2 className="text-xs font-mono text-[#a855f7] tracking-widest uppercase">
                    Registrar Dispositivo
                </h2>
            </div>

            {msg && (
                <div className={`text-xs font-mono px-3 py-2 rounded border ${
                    msg.erro
                        ? "bg-[#ff444415] border-[#ff4444] text-[#ff4444]"
                        : "bg-[#34d39915] border-[#34d399] text-[#34d399]"
                }`}>
                    {msg.erro ? "✗" : "✓"} {msg.texto}
                </div>
            )}

            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-[#8b949e] tracking-widest uppercase">
                        Nome do Dispositivo *
                    </label>
                    <input
                        type="text"
                        value={form.nome}
                        onChange={e => setForm({ ...form, nome: e.target.value })}
                        placeholder="ex: Sensor-01"
                        className="bg-[#0d0d14] border border-[#2d2040] text-[#e6edf3] text-sm font-mono
                                   rounded px-3 py-2 focus:outline-none focus:border-[#a855f7] transition-colors
                                   placeholder:text-[#484f58]"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-[#8b949e] tracking-widest uppercase">
                        Tipo *
                    </label>
                    <select
                        value={form.tipo}
                        onChange={e => setForm({ ...form, tipo: e.target.value })}
                        className="bg-[#0d0d14] border border-[#2d2040] text-[#e6edf3] text-sm font-mono
                                   rounded px-3 py-2 focus:outline-none focus:border-[#a855f7] transition-colors"
                    >
                        <option value="">Selecionar tipo...</option>
                        {tiposDispositivo.map(t => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-[#8b949e] tracking-widest uppercase">
                        Endereço IP / Node ID
                    </label>
                    <input
                        type="text"
                        value={form.ip}
                        onChange={e => setForm({ ...form, ip: e.target.value })}
                        placeholder="ex: 192.168.1.10 ou ns=2;i=2"
                        className="bg-[#0d0d14] border border-[#2d2040] text-[#e6edf3] text-sm font-mono
                                   rounded px-3 py-2 focus:outline-none focus:border-[#a855f7] transition-colors
                                   placeholder:text-[#484f58]"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-[#8b949e] tracking-widest uppercase">
                        Descrição
                    </label>
                    <textarea
                        value={form.descricao}
                        onChange={e => setForm({ ...form, descricao: e.target.value })}
                        placeholder="Observações sobre o dispositivo..."
                        rows={2}
                        className="bg-[#0d0d14] border border-[#2d2040] text-[#e6edf3] text-sm font-mono
                                   rounded px-3 py-2 focus:outline-none focus:border-[#a855f7] transition-colors
                                   placeholder:text-[#484f58] resize-none"
                    />
                </div>
            </div>

            <button
                onClick={criar}
                disabled={loading}
                className="mt-1 py-2 px-4 text-xs font-mono tracking-widest uppercase rounded
                           bg-[#a855f715] border border-[#a855f7] text-[#a855f7]
                           hover:bg-[#a855f7] hover:text-[#0d0d14] transition-all
                           disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
                {loading ? "Registrando..." : "[ Registrar ]"}
            </button>
        </div>
    )
}
