import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';
import Link from 'next/link';

export default async function CancellationPage() {
  const filePath = path.join(process.cwd(), 'docs', '04_LEGAL', 'POLITICA_CANCELAMENTO.md');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  const processedContent = await remark()
    .use(html)
    .process(fileContent);
  const contentHtml = processedContent.toString();

  return (
    <div className="min-h-screen bg-[#F0EBE3]">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link 
            href="/" 
            className="inline-flex items-center text-sm text-[#B2B8A3] hover:text-[#C8963E] transition-colors mb-3"
          >
            ← Voltar para home
          </Link>
          <h1 className="text-3xl font-serif font-bold text-gray-900">
            Política de Cancelamento e Reembolso
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Última atualização: 3 de janeiro de 2026 • Versão 1.0.0
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Resumo Rápido */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-serif font-bold text-gray-900 mb-4">
            📝 Resumo Rápido das Regras
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
              <div className="text-3xl mb-2">✅</div>
              <div className="font-semibold text-green-900 mb-1">≥ 24 horas</div>
              <div className="text-sm text-green-700">Reembolso 100%</div>
            </div>
            <div className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
              <div className="text-3xl mb-2">⚠️</div>
              <div className="font-semibold text-yellow-900 mb-1">&lt; 24 horas</div>
              <div className="text-sm text-yellow-700">Taxa de 50%</div>
            </div>
            <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
              <div className="text-3xl mb-2">🚨</div>
              <div className="font-semibold text-blue-900 mb-1">Emergência</div>
              <div className="text-sm text-blue-700">Terapeuta decide</div>
            </div>
          </div>
        </div>

        {/* Conteúdo Completo */}
        <div className="bg-white rounded-lg shadow-lg p-8 prose prose-sm max-w-none
          prose-headings:font-serif prose-headings:text-gray-900
          prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2
          prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
          prose-p:text-gray-700 prose-p:leading-relaxed
          prose-a:text-[#C8963E] prose-a:no-underline hover:prose-a:underline
        ">
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Dúvidas sobre cancelamento?{' '}
            <a href="mailto:cancelamento@senda.app" className="text-[#C8963E] hover:underline font-medium">
              cancelamento@senda.app
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
