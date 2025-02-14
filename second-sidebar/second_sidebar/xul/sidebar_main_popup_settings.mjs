import { Button } from "./base/button.mjs";
import { HBox } from "./base/hbox.mjs";
import { Header } from "./base/header.mjs";
import { Panel } from "./base/panel.mjs";
import { PanelMultiView } from "./base/panel_multi_view.mjs";
import { ToolbarSeparator } from "./base/toolbar_separator.mjs";

export class SidebarMainPopupSettings extends Panel {
  constructor() {
    super({
      id: "sidebar-2-main-popup-settings",
      classList: ["sidebar-2-popup"],
    });
    this.setType("arrow").setRole("group");

    this.panelHeader = new HBox({ classList: ["panel-header"] });
    this.header = new Header(1).setText("Sidebar Settings");

    this.saveButton = this.#createSaveButton();
    this.cancelButton = this.#createCancelButton();
    this.buttons = new HBox({
      id: "sidebar-2-main-popup-settings-buttons",
    });

    this.autoHideBackToggle = this.#createToggle();
    this.autoHideBackToggleGroup = this.#createToggleGroup(
      this.autoHideBackToggle,
      "Auto hide back button"
    );
    this.autoHideForwardToggle = this.#createToggle();
    this.autoHideForwardToggleGroup = this.#createToggleGroup(
      this.autoHideForwardToggle,
      "Auto hide forward button"
    );
    this.multiView = this.#createMultiView();

    this.addEventListener("popupshown", () => {});
  }

  /**
   *
   * @returns {Button}
   */
  #createToggle() {
    const button = new Button({
      id: "moz-toggle-button",
      classList: ["toggle-button"],
    });
    button.setAttribute("part", "button");
    button.setAttribute("type", "button");

    button.addEventListener("click", (event) => {
      if (event.button === 0) {
        button.setPressed(!button.getPressed());
      }
    });

    return button;
  }

  /**
   *
   * @param {Button} toggle
   * @param {string} text
   * @returns {HBox}
   */
  #createToggleGroup(toggle, text) {
    const box = new HBox({
      classList: ["sidebar-2-web-panel-popup-edit-toggle-group"],
    });
    const label = new Header(1).setText(text);
    box.appendChildren(label, toggle);
    return box;
  }

  /**
   *
   * @returns {PanelMultiView}
   */
  #createMultiView() {
    this.panelHeader.appendChild(this.header);
    this.buttons.appendChild(this.cancelButton).appendChild(this.saveButton);
    const multiView = new PanelMultiView({
      id: "sidebar-2-main-popup-settings-multiview",
    }).appendChildren(
      this.panelHeader,
      new ToolbarSeparator(),
      this.autoHideBackToggleGroup,
      this.autoHideForwardToggleGroup,
      this.buttons
    );

    this.appendChild(multiView);
    return multiView;
  }

  /**
   *
   * @returns {Button}
   */
  #createSaveButton() {
    return new Button({
      classList: ["footer-button", "primary"],
    }).setText("Save");
  }

  /**
   *
   * @param {function(boolean, boolean):void} callback
   */
  listenSaveButtonClick(callback) {
    this.saveButton.addEventListener("mousedown", (event) => {
      if (event.button !== 0) {
        return;
      }
      const autoHideBackButton = this.autoHideBackToggle.getPressed();
      const autoHideForwardButton = this.autoHideForwardToggle.getPressed();
      callback(autoHideBackButton, autoHideForwardButton);
    });
  }

  /**
   *
   * @returns {Button}
   */
  #createCancelButton() {
    return new Button({ classList: ["footer-button"] }).setText("Cancel");
  }

  /**
   *
   * @param {function():void} callback
   */
  listenCancelButtonClick(callback) {
    this.cancelButton.addEventListener("mousedown", async (event) => {
      if (event.button !== 0) {
        return;
      }
      callback();
    });
  }

  /**
   *
   * @param {boolean} autoHideBackButton
   * @param {boolean} autoHideForwardButton
   */
  setDefaults(autoHideBackButton, autoHideForwardButton) {
    this.autoHideBackToggle.setPressed(autoHideBackButton);
    this.autoHideForwardToggle.setPressed(autoHideForwardButton);
  }
}
