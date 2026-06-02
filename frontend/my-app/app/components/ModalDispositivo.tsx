"use client";

import { useEffect, useState } from "react";
import Botao from "./Botao";

interface Sensores {
  temperatura: number;
  pressao: number;
  umidade: number;
  sensorPresenca: boolean;
  releSeguranca: boolean;
}

interface Dispositivo {
  id: string;
  nome: string;
  statusDispositivo: "online" | "offline" | "alerta";
  conexaoAtiva: boolean;
  travaLiberada: boolean;
  ultimaAtualizacao?: string;
  sensores: Sensores;
}

interface IModal {
  aberto: boolean;
  dispositivo?: Dispositivo | null;
  onFechar: () => void;
  onSalvar: (dados: Dispositivo) => void;
}

const dispositivoVazio = (): Dispositivo => ({
  id: `EQP-${String(Math.floor(Math.random() * 900) + 100)}`,
  nome: "",
  statusDispositivo: "online",
  conexaoAtiva: true,
  travaLiberada: false,
  ultimaAtualizacao: new Date().toISOString(),
  sensores: {
    temperatura: 0,
    pressao: 0,
    umidade: 0,
    sensorPresenca: false,
    releSeguranca: false,
  },
});

export default function ModalDispositivo({ aberto, dispositivo, onFechar, onSalvar }: IModal) {
  const [form, setForm] = useState<Dispositivo>(dispositivoVazio());

  useEffect(() => {
    if (dispositivo) {
      setForm(dispositivo);
    } else {
      setForm(dispositivoVazio());
    }
  }, [dispositivo, aberto]);

  if (!aberto) return null;

  const modoEdicao = Boolean(dispositivo);

  const handleChange = (campo: keyof Dispositivo, valor: any) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleSensor = (campo: keyof Sensores, valor: any) => {
    setForm((prev) => ({
      ...prev,
      sensores: { ...prev.sensores, [campo]: valor },
    }));
  };

  const handleSubmit = () => {
    if (!form.nome.trim()) {
      alert("O nome do dispositivo é obrigatório.");
      return;
    }
    onSalvar(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-6">
            {modoEdicao ? "Editar Dispositivo" : "Novo Dispositivo"}
          </h2>

          <div className="flex flex-col gap-4">
            {/* ID */}
            <div>
              <label className="text-sm text-slate-500 block mb-1">ID do Dispositivo</label>
              <input
                type="text"
                value={form.id}
                onChange={(e) => handleChange("id", e.target.value)}
                disabled={modoEdicao}
                className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm disabled:bg-slate-100 disabled:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>

            {/* Nome */}
            <div>
              <label className="text-sm text-slate-500 block mb-1">Nome *</label>
              <input
                type="text"
                value={form.nome}
                onChange={(e) => handleChange("nome", e.target.value)}
                placeholder="Ex: Sensor de Temperatura"
                className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>

            {/* Status */}
            <div>
              <label className="text-sm text-slate-500 block mb-1">Status</label>
              <select
                value={form.statusDispositivo}
                onChange={(e) => handleChange("statusDispositivo", e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
              >
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="alerta">Alerta</option>
              </select>
            </div>

            {/* Sensores numéricos */}
            <p className="text-sm font-semibold text-slate-700 mt-2">Sensores</p>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-sm text-slate-500 block mb-1">Temperatura (°C)</label>
                <input
                  type="number"
                  value={form.sensores.temperatura}
                  onChange={(e) => handleSensor("temperatura", Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>
              <div>
                <label className="text-sm text-slate-500 block mb-1">Pressão (bar)</label>
                <input
                  type="number"
                  value={form.sensores.pressao}
                  onChange={(e) => handleSensor("pressao", Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>
              <div>
                <label className="text-sm text-slate-500 block mb-1">Umidade (%)</label>
                <input
                  type="number"
                  value={form.sensores.umidade}
                  onChange={(e) => handleSensor("umidade", Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>
            </div>

            {/* Sensores booleanos */}
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.sensores.sensorPresenca}
                  onChange={(e) => handleSensor("sensorPresenca", e.target.checked)}
                  className="w-4 h-4 accent-emerald-600"
                />
                <span className="text-sm">Sensor de Presença ativo</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.sensores.releSeguranca}
                  onChange={(e) => handleSensor("releSeguranca", e.target.checked)}
                  className="w-4 h-4 accent-emerald-600"
                />
                <span className="text-sm">Relé de Segurança ativado</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.conexaoAtiva}
                  onChange={(e) => handleChange("conexaoAtiva", e.target.checked)}
                  className="w-4 h-4 accent-emerald-600"
                />
                <span className="text-sm">Conexão ativa</span>
              </label>
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-3 mt-6">
            <Botao nome="Cancelar" estilo="secundario" onClick={onFechar} />
            <Botao nome={modoEdicao ? "Salvar alterações" : "Criar dispositivo"} estilo="confirmar" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}
