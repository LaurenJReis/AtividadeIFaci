"use client"
import { useState } from "react"
import Header from "../components/Header"
import CriarDispositivo from "./CriarDispositivo"
import ListarDispositivos from "./ListarDispositivos"

export default function Devices() {
    const [refresh, setRefresh] = useState(0)

    return (
        <div className="min-h-screen bg-[#0d0d14] text-[#e6edf3]">
            <Header name="Gerenciar Dispositivos" />

            <div className="px-6 py-2 bg-[#0d0d14] border-b border-[#2d2040] flex items-center gap-4">
                <span className="text-[10px] font-mono text-[#484f58] tracking-widest">
                    MÓDULO: DEVICE MANAGER
                </span>
                <span className="text-[#2d2040]">·</span>
                <span className="text-[10px] font-mono text-[#484f58]">
                    API: localhost:8080
                </span>
            </div>

            <div className="flex gap-4 p-6 items-start">
                <CriarDispositivo onCriado={() => setRefresh(r => r + 1)} />
                <ListarDispositivos refresh={refresh} />
            </div>
        </div>
    )
}
