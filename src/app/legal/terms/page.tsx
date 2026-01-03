import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';
import Link from 'next/link';

export default async function TermsPage() {
  // Ler arquivo markdown
  const filePath = path.join(process.cwd(), 'docs', '04_LEGAL', 'TERMOS_DE_USO.md');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  // Converter markdown para HTML
  const processedContent = await remark()
    .use(html)
    .process(fileContent);
  const contentHtml = processedContent.toString();

  return (
    <div className="min-h-screen bg-[#F0EBE3]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link 
            href="/" 
            className="inline-flex items-center text-sm text-[#B2B8A3] hover:text-[#C8963E] transition-colors mb-3"
          >
            ← Voltar para home
          </Link>
          <h1 className="text-3xl font-serif font-bold text-gray-900">
            Termos de Uso - Plataforma Senda
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Última atualização: 3 de janeiro de 2026 • Versão 1.0.0
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 prose prose-sm max-w-none
          prose-headings:font-serif prose-headings:text-gray-900
          prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2
          prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
          prose-p:text-gray-700 prose-p:leading-relaxed
          prose-a:text-[#C8963E] prose-a:no-underline hover:prose-a:underline
          prose-strong:text-gray-900 prose-strong:font-semibold
          prose-ul:list-disc prose-ul:ml-6
          prose-ol:list-decimal prose-ol:ml-6
          prose-li:text-gray-700
          prose-blockquote:border-l-4 prose-blockquote:border-[#B2B8A3] prose-blockquote:pl-4 prose-blockquote:italic
          prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
        ">
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>

        {/* Footer Links */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-serif font-semibold text-gray-900 mb-4">
            Documentos Relacionados
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/legal/privacy"
              className="block p-4 border-2 border-gray-200 rounded-lg hover:border-[#B2B8A3] hover:shadow-md transition-all"
            >
              <div className="text-2xl mb-2">🔒</div>
              <div className="font-semibold text-gray-900 mb-1">Política de Privacidade</div>
              <div className="text-xs text-gray-600">LGPD Compliance</div>
            </Link>
            <Link
              href="/legal/cancellation"
              className="block p-4 border-2 border-gray-200 rounded-lg hover:border-[#B2B8A3] hover:shadow-md transition-all"
            >
              <div className="text-2xl mb-2">❌</div>
              <div className="font-semibold text-gray-900 mb-1">Política de Cancelamento</div>
              <div className="text-xs text-gray-600">Regras de reembolso</div>
            </Link>
            <Link
              href="/legal/payment"
              className="block p-4 border-2 border-gray-200 rounded-lg hover:border-[#B2B8A3] hover:shadow-md transition-all"
            >
              <div className="text-2xl mb-2">💳</div>
              <div className="font-semibold text-gray-900 mb-1">Termos de Pagamento</div>
              <div className="text-xs text-gray-600">Assinaturas e taxas</div>
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Dúvidas sobre os termos?{' '}
            <a href="mailto:juridico@senda.app" className="text-[#C8963E] hover:underline font-medium">
              juridico@senda.app
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
