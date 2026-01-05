import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';
import Link from 'next/link';

export default async function PrivacyPage() {
  const filePath = path.join(process.cwd(), 'docs', 'legal', 'POLITICA_PRIVACIDADE.md');
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
            Política de Privacidade - Plataforma Senda
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Última atualização: 3 de janeiro de 2026 • Versão 1.0.0 • LGPD Compliance
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 prose prose-sm max-w-none
          prose-headings:font-serif prose-headings:text-gray-900
          prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2
          prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
          prose-p:text-gray-700 prose-p:leading-relaxed
          prose-a:text-[#C8963E] prose-a:no-underline hover:prose-a:underline
          prose-strong:text-gray-900 prose-strong:font-semibold
          prose-ul:list-disc prose-ul:ml-6
          prose-table:border-collapse prose-table:w-full
          prose-th:border prose-th:border-gray-300 prose-th:bg-gray-100 prose-th:p-2
          prose-td:border prose-td:border-gray-300 prose-td:p-2
        ">
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>

        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-serif font-semibold text-gray-900 mb-4">
            Seus Direitos (LGPD Art. 18)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-[#F0EBE3] rounded">
              <strong className="text-gray-900">✅ Acesso:</strong>
              <p className="text-gray-700 mt-1">Ver quais dados temos sobre você</p>
            </div>
            <div className="p-3 bg-[#F0EBE3] rounded">
              <strong className="text-gray-900">✏️ Correção:</strong>
              <p className="text-gray-700 mt-1">Atualizar informações incorretas</p>
            </div>
            <div className="p-3 bg-[#F0EBE3] rounded">
              <strong className="text-gray-900">🗑️ Exclusão:</strong>
              <p className="text-gray-700 mt-1">Apagar seus dados (quando aplicável)</p>
            </div>
            <div className="p-3 bg-[#F0EBE3] rounded">
              <strong className="text-gray-900">📦 Portabilidade:</strong>
              <p className="text-gray-700 mt-1">Baixar dados em formato estruturado</p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <Link
              href="/dashboard/settings/privacy"
              className="inline-flex items-center px-4 py-2 bg-[#B2B8A3] text-white rounded-lg hover:bg-[#9FA593] transition-colors"
            >
              Gerenciar Meus Dados
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Contato do Encarregado de Dados (DPO):{' '}
            <a href="mailto:privacidade@senda.app" className="text-[#C8963E] hover:underline font-medium">
              privacidade@senda.app
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
