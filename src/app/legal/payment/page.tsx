import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';
import Link from 'next/link';

export default async function PaymentPage() {
  const filePath = path.join(process.cwd(), 'docs', '04_LEGAL', 'TERMOS_PAGAMENTO.md');
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
            Termos de Pagamento
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Última atualização: 3 de janeiro de 2026 • Versão 1.0.0
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Planos Rápidos */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-serif font-bold text-gray-900 mb-4">
            💰 Planos de Assinatura
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border-2 border-gray-200 rounded-lg">
              <div className="text-lg font-semibold text-gray-900 mb-1">FREE</div>
              <div className="text-2xl font-bold text-[#B2B8A3] mb-2">R$ 0<span className="text-sm font-normal">/mês</span></div>
              <div className="text-sm text-gray-600">+ R$ 5/sessão</div>
              <div className="text-xs text-gray-500 mt-2">Limite: 5 sessões/mês</div>
            </div>
            <div className="p-4 border-2 border-[#B2B8A3] bg-[#F0EBE3] rounded-lg">
              <div className="text-lg font-semibold text-gray-900 mb-1">PRO</div>
              <div className="text-2xl font-bold text-[#B2B8A3] mb-2">R$ 29<span className="text-sm font-normal">/mês</span></div>
              <div className="text-sm text-gray-600">+ R$ 2/sessão</div>
              <div className="text-xs text-gray-500 mt-2">Ilimitado</div>
            </div>
            <div className="p-4 border-2 border-[#C8963E] bg-gradient-to-br from-[#F0EBE3] to-white rounded-lg">
              <div className="text-lg font-semibold text-gray-900 mb-1">PREMIUM</div>
              <div className="text-2xl font-bold text-[#C8963E] mb-2">R$ 79<span className="text-sm font-normal">/mês</span></div>
              <div className="text-sm text-green-600 font-semibold">TAXA ZERO</div>
              <div className="text-xs text-gray-500 mt-2">Destaque homepage</div>
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
          prose-table:border-collapse prose-table:w-full
          prose-th:border prose-th:border-gray-300 prose-th:bg-gray-100 prose-th:p-2 prose-th:text-left
          prose-td:border prose-td:border-gray-300 prose-td:p-2
        ">
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Dúvidas sobre pagamentos?{' '}
            <a href="mailto:financeiro@senda.app" className="text-[#C8963E] hover:underline font-medium">
              financeiro@senda.app
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
