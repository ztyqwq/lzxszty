import { supabase } from './supabase';

interface AuthReadyDetail {
	accountId?: string;
	email?: string;
}

type ReadyCallback = (detail?: AuthReadyDetail) => void | Promise<void>;

export function onPrivateContentReady(callback: ReadyCallback) {
	const run = (event?: Event) => {
		const detail =
			event instanceof CustomEvent
				? event.detail
				: {
						accountId: document.documentElement.dataset.accountId,
					};
		void callback(detail);
	};

	if (document.documentElement.dataset.authState === 'unlocked') {
		run();
		return;
	}

	window.addEventListener('lzxszty:auth-ready', run, { once: true });
}

export function formatDate(value: string | null | undefined) {
	if (!value) return '';
	return value.slice(0, 10);
}

export function catLabel(value: string | null | undefined) {
	if (value === 'black') return '黑色小猫';
	if (value === 'white') return '白色小猫';
	return '未知小猫';
}

export async function getPrivateImageUrl(path: string | null | undefined) {
	if (!path || !supabase) return null;

	const { data, error } = await supabase.storage.from('love-private').createSignedUrl(path, 60 * 60);
	if (error) return null;
	return data.signedUrl;
}

export function setStatus(node: Element | null, message: string, state = 'idle') {
	if (!(node instanceof HTMLElement)) return;
	node.textContent = message;
	node.dataset.state = state;
}

function escapeHtml(value: string) {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

function renderInline(value: string) {
	return escapeHtml(value)
		.replace(/`([^`]+)`/g, '<code>$1</code>')
		.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
		.replace(/\*([^*]+)\*/g, '<em>$1</em>')
		.replace(
			/!\[([^\]]*)\]\(((?:https?:\/\/|\/)[^)]+)\)/g,
			'<img src="$2" alt="$1" loading="lazy" />',
		)
		.replace(
			/\[([^\]]+)\]\(((?:https?:\/\/|\/)[^)]+)\)/g,
			'<a href="$2" target="_blank" rel="noreferrer">$1</a>',
		);
}

export function renderMarkdown(markdown: string | null | undefined) {
	const lines = String(markdown || '').replace(/\r\n/g, '\n').split('\n');
	const blocks: string[] = [];
	let paragraph: string[] = [];
	let list: string[] = [];
	let code: string[] = [];
	let inCode = false;

	function flushParagraph() {
		if (!paragraph.length) return;
		blocks.push(`<p>${renderInline(paragraph.join(' '))}</p>`);
		paragraph = [];
	}

	function flushList() {
		if (!list.length) return;
		blocks.push(`<ul>${list.map((item) => `<li>${renderInline(item)}</li>`).join('')}</ul>`);
		list = [];
	}

	function flushCode() {
		if (!code.length) return;
		blocks.push(`<pre><code>${escapeHtml(code.join('\n'))}</code></pre>`);
		code = [];
	}

	for (const rawLine of lines) {
		const line = rawLine.trimEnd();

		if (line.trim().startsWith('```')) {
			if (inCode) {
				flushCode();
				inCode = false;
			} else {
				flushParagraph();
				flushList();
				inCode = true;
			}
			continue;
		}

		if (inCode) {
			code.push(rawLine);
			continue;
		}

		if (!line.trim()) {
			flushParagraph();
			flushList();
			continue;
		}

		const heading = line.match(/^(#{1,3})\s+(.+)$/);
		if (heading) {
			flushParagraph();
			flushList();
			const level = heading[1].length + 1;
			blocks.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
			continue;
		}

		const bullet = line.match(/^[-*]\s+(.+)$/);
		if (bullet) {
			flushParagraph();
			list.push(bullet[1]);
			continue;
		}

		const quote = line.match(/^>\s+(.+)$/);
		if (quote) {
			flushParagraph();
			flushList();
			blocks.push(`<blockquote>${renderInline(quote[1])}</blockquote>`);
			continue;
		}

		paragraph.push(line.trim());
	}

	flushParagraph();
	flushList();
	flushCode();

	return blocks.join('');
}
