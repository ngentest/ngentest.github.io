import { ResizeDivs } from '../custom-elements/resize-divs';
import { MonacoEditor } from '../custom-elements/monaco-editor';
!customElements.get('resize-divs') && customElements.define('resize-divs', ResizeDivs);
!customElements.get('monaco-editor') && customElements.define('monaco-editor', MonacoEditor);

import App from './app.svelte';

const app = new App({target: document.body});
export default app
