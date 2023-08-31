<script lang='ts'>
  import { onMount } from 'svelte';

  /* monaco editor */
  let editor, editorLanguage;
  function editorChanged(e) {
    console.log(e.detail);
  }
   
  onMount(() => {
    console.log('onMount()')
  });
</script>

<style>
  monaco-editor { height: 100%; }
</style>

<h1>
  Generate Angular unit test online
  <a href="https://github.com/allenhwkim/ngentest"><i class="fa-brands fa-github h4"></i></a>
</h1> 

<resize-divs width class="h-100" on:resize-move={() => {}}>
  <div class="accordion accordion-flush w-25 mx-1 overflow-auto" id="accordionFlushExample">
    <div class="accordion-item">
      <h2 class="accordion-header" id="flush-headingOne">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
          EJS templates
        </button>
      </h2>
      <div id="flush-collapseOne" class="accordion-collapse collapse show" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          <div class="d-flex flex-column gap-2">
            <button class="btn btn-light">Class test template</button>
            <button class="btn btn-light">Component test template</button>
            <button class="btn btn-light">Directive test template</button>
            <button class="btn btn-light">Service test template</button>
            <button class="btn btn-light">Pipe test template</button>
          </div>
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="flush-headingTwo">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
          Declarations for component tests
        </button>
      </h2>
      <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
          Your component may use directives and pipes, which are defined in app-level
          Because your test does not know app-level declarations, they may break your test
          Your unit test should declare them separately as mock objects.
          <h3 class="h5 pt-1">Directives</h3>
          <input class="form-control" name="directives" value="myCustom"/>
          <h3 class="h5 pt-1">Pipes</h3>
          <input class="form-control" name="pipes" value="translate, phoneNumber, safeHtml"/>
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="flush-headingThree">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
          Mock code for service providers
        </button>
      </h2>
      <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
          Your constructor may use injectable services, that may only work in certain environment
          Because your test does not know the specific environment, they may break your test
          The follow object will tell test generator to mock those services with your own code
          e.g. {`@Injectable() MockElementRef { nativeElement = {}; }`}
          <pre>{`
            ElementRef: ['nativeElement = {};']
            Router: ['navigate() {};']
            Document: ['querySelector() {};']
            HttpClient: ['post() {};']
            TranslateService: ['translate() {};']
            EncryptionService: []
        `}</pre>
        </div></div>
    </div>
  </div>
  <div class="position-relative">
    Editor section
    <monaco-editor bind:this={editor}
      on:monaco-change={editorChanged}
      data-language={editorLanguage}
    ></monaco-editor>
  </div>
</resize-divs>

<form>

<!-- first student -->
<input type="text" name="students[a][first]">
<input type="text" name="students[a][last]">
<input type="text" name="students[a][age]">

<!-- second student -->
<input type="text" name="students[b][first]">
<input type="text" name="students[b][last]">
<input type="text" name="students[b][age]">
</form>