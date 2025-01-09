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
class MyElm3 extends BaseElm {
    constructor() {
        super("t3");
    }
}
class MyElm4 extends BaseElm {
    #bool;
    constructor() {
        super("t4");
        this.#bool = false;
        this._use  = this.shadowRoot.getElementById("use");
        this.addEventListener("click", this.#click);
    }
    #click() {
        this.#bool = !this.#bool;
        this._use.setAttribute("href", "#click" + Number(this.#bool));
    }
}
class MyElm5 extends MyElm4 {
    constructor() {
        super();
        this.addEventListener("mousedown", this.#mouseDown);
    }
    #mouseDown() {
        this._use.setAttribute("href", "#mousedown");
    }
}
class MyElm6 extends BaseElm {
    #bool;
    constructor() {
        super("t6");
        this.#bool = false;
        this._use  = this.shadowRoot.getElementById("use");
        this.addEventListener("click", this.#click);
        this.addEventListener("mousedown", this.#mouseDown);
    }
    #click() {
        this.#bool = !this.#bool;
        this._use.setAttribute("href", "#click" + Number(this.#bool));
    }
    #mouseDown() {
        this._use.setAttribute("href", "#mousedown");
    }
}
customElements.define("my-elm1", MyElm1);
customElements.define("my-elm2", MyElm2);
customElements.define("my-elm3", MyElm3);
customElements.define("my-elm4", MyElm4);
customElements.define("my-elm5", MyElm5);
customElements.define("my-elm6", MyElm6);