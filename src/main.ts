import { ResizeDivs } from '../custom-elements/resize-divs';
import { MonacoEditor } from '../custom-elements/monaco-editor';
import App from './app.svelte';

!customElements.get('resize-divs') && customElements.define('resize-divs', ResizeDivs);
!customElements.get('monaco-editor') && customElements.define('monaco-editor', MonacoEditor);
// enable bootstrap tooltip e.g., data-toggle="tooltip" title="Tooltip on top"
window['$'](function () { window['$']('[data-toggle="tooltip"]').tooltip() });  

const app = new App({target: document.body});
export default app
