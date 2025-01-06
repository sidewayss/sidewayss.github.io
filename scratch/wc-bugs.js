class BaseElm extends HTMLElement {
    static formAssociated = true;
    constructor(template) {
        super();
        this.attachShadow({mode:"open"});
        this.shadowRoot.appendChild(document.getElementById(template)
                                            .content.cloneNode(true));
        this._internals = this.attachInternals();
        this.tabIndex = 0;
        this.addEventListener("keydown", this.#keyDown);
        this.addEventListener("focus", this.#fur);
        this.addEventListener("blur",  this.#fur);
    }
    #keyDown(evt) {
        if (evt.code == "Escape")
            this.blur();
    }
    #fur(evt) {
        console.log(evt.type, evt.target.id, document.activeElement);
    }
}
class MyElm1 extends BaseElm {
    constructor() {
        super("t1");
    }
}
class MyElm2 extends BaseElm {
    constructor() {
        super("t2");
    }
}
customElements.define("my-elm1", MyElm1);
customElements.define("my-elm2", MyElm2);