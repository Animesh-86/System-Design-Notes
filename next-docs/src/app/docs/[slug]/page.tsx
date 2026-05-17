import { getContentBySlug, getAllContent } from '@/lib/content';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import { CodeBlock } from '@/components/CodeBlock';
import 'highlight.js/styles/atom-one-dark.css';

export async function generateStaticParams() {
  const items = getAllContent();
  return items.map((item) => ({
    slug: item.slug,
  }));
}

export default async function DocPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const item = getContentBySlug(params.slug);

  if (!item) {
    notFound();
  }

  const parsedDocxContent = item?.type === 'docx'
    ? item.content.replace(/<div className="docx-content">([\s\S]*?)<\/div>/, '$1')
    : '';

  const getBreadcrumbLabel = (type: string) => {
    switch (type) {
      case 'lld': return 'Low Level Design Course';
      case 'docx': return 'High Level Design (HLD)';
      case 'pdf': return 'Roadmaps & Diagrams';
      case 'resource': return 'Interview Resources';
      default: return 'Docs';
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-500 pb-20 max-w-4xl mx-auto space-y-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-medium text-gray-500 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-full px-4 py-2 w-fit">
        <span>System Design Hub</span>
        <span>/</span>
        <span className="text-blue-600 dark:text-blue-400 font-semibold">{getBreadcrumbLabel(item.type)}</span>
        <span>/</span>
        <span className="text-gray-600 dark:text-gray-300 truncate max-w-[200px]" title={item.title}>{item.title}</span>
      </div>

      {/* Main Container */}
      {item.type === 'pdf' ? (
        <div className="w-full h-[82vh] rounded-3xl overflow-hidden shadow-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-[#0e0e11]/80 backdrop-blur-lg">
          <iframe 
            src="/pdfs/system-design-roadmap.pdf" 
            className="w-full h-full border-0" 
            title="System Design Roadmap" 
          />
        </div>
      ) : item.type === 'docx' ? (
        <div className="prose dark:prose-invert prose-blue max-w-none bg-white/60 dark:bg-[#0e0e11]/80 p-8 md:p-12 rounded-3xl border border-black/5 dark:border-white/10 backdrop-blur-lg shadow-2xl select-text">
          <h1 className="text-3xl font-extrabold tracking-tight mb-8 bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
            {item.title}
          </h1>
          <div 
            className="docx-render space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed font-sans"
            dangerouslySetInnerHTML={{ __html: parsedDocxContent }} 
          />
        </div>
      ) : (
        <article className="prose dark:prose-invert prose-blue prose-headings:text-gray-800 dark:prose-headings:text-gray-100 prose-a:text-blue-500 dark:prose-a:text-blue-400 prose-img:rounded-2xl max-w-none bg-white/60 dark:bg-[#0e0e11]/80 p-8 md:p-12 rounded-3xl border border-black/5 dark:border-white/10 backdrop-blur-lg shadow-2xl select-text">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
            components={{
              h1: ({node, ...props}) => <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mt-0 mb-6" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-gray-100 mt-8 mb-4 border-b border-black/5 dark:border-white/5 pb-2" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-xl font-semibold tracking-tight text-gray-700 dark:text-gray-200 mt-6 mb-3" {...props} />,
              p: ({node, ...props}) => <p className="text-gray-600 dark:text-gray-300 leading-relaxed my-4" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 my-4" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal pl-6 space-y-2 text-gray-600 dark:text-gray-300 my-4" {...props} />,
              li: ({node, ...props}) => <li className="text-gray-600 dark:text-gray-300" {...props} />,
              code: ({node, inline, className, children, ...props}: any) => {
                if (inline) {
                  return <code className="bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-pink-600 dark:text-pink-400 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>{children}</code>;
                }
                return <CodeBlock language={className}>{children}</CodeBlock>;
              }
            }}
          >
            {item.content}
          </ReactMarkdown>
        </article>
      )}
    </div>
  );
}
