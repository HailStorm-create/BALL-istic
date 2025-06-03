class Checkbox {
    constructor(labelText, top , left , id) {
        this.id = id;
        this.checkboxContainer = document.createElement("div");
        this.checkboxContainer.style.position = "absolute";
        this.checkboxContainer.style.top = top;
        this.checkboxContainer.style.left = left;
        
        this.checkbox = document.createElement("input");
        this.checkbox.type = "checkbox";
        this.checkbox.id = this.id;
        
        this.label = document.createElement("label");
        this.label.htmlFor = this.id;
        this.label.innerText = labelText;
        this.label.style.color = "white";
        this.label.style.marginLeft = "5px";
        
        this.checkboxContainer.appendChild(this.checkbox);
        this.checkboxContainer.appendChild(this.label);
        document.body.appendChild(this.checkboxContainer);
    }

    get checked() {
        return this.checkbox.checked;  // Ensure the property reflects actual state
    }

    get unchecked() {
        this.checkbox.checked = false;
    }

}
