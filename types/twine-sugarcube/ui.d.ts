/// <reference types="jquery" />

export interface DialogOptions {
    /** Top y-coordinate of the dialog (default: 50; in pixels, but without the unit). */
    top?: number | undefined;
    /** Opacity of the overlay (default: 0.8). */
    opacity?: number | undefined;
}

export interface DialogAPI {
    /**
     * Appends the given content to the dialog's content area. Returns a reference to the Dialog object for chaining.
     *
     * NOTE: If your content contains any SugarCube markup, you'll need to use the Dialog.wiki() method instead.
     * @param content The content to append. As this method is essentially a shortcut for jQuery(Dialog.body()).append
     * (…), see jQuery's append() method for the range of valid content types.
     * @since 2.9.0
     * @example
     * Dialog.append("Cry 'Havoc!', and let slip the <em>ponies</em> of <strong>friendship</strong>.");
     * Dialog.append( <some DOM nodes> );
     */
    append(...content: ReadonlyArray<JQuery.htmlString | JQuery.TypeOrArray<JQuery.Node | JQuery<JQuery.Node>>>): this;

    /**
     * Returns a reference to the dialog's content area
     * @since 2.0.0
     * @example
     * jQuery(Dialog.body()).append("Cry 'Havoc!', and let slip the <em>ponies</em> of <strong>friendship</strong>.");
     * jQuery(Dialog.body()).wiki("Cry 'Havoc!', and let slip the //ponies// of ''friendship''.");
     */
    body(): HTMLElement;

    /**
     * Closes the dialog.
     * @since 2.0.0
     */
    close(): this;

    /**
     * Prepares the dialog for use.
     * @param title The title of the dialog.
     * @param classNames The space-separated-list of classes to add to the dialog.
     * @since 2.37.0
     * @example
     * Dialog
     * 	.create("Character Sheet", "charsheet")
     * 	.wikiPassage("Player Character")
     * 	.open();
     */
    create(title?: string, classNames?: string): this;

    /**
     * Empties the dialog's content area.
     * @since 2.37.0
     * @example
     * // Replacing the open dialog's content
     * Dialog
     * 	.empty()
     * 	.wikiPassage("Quests");
     */
    empty(): this;
    /**
     * Returns whether the dialog is currently open.
     * @param classNames the space-separated-list of classes to check for when determining the state of the dialog.
     * Each of built-in dialogs contains a name-themed class which can be tested for in this manner—e.g. the Saves
     * dialog contains the class saves.
     * @since 2.0.0
     * @example
     * if (Dialog.isOpen()) {
     *        // code to execute if the dialog is open...
     * }
     * @example
     * if (Dialog.isOpen("saves")) {
     *        // code to execute if the Saves dialog is open
     * }
     */
    isOpen(classNames?: string): boolean;

    /**
     * Opens the dialog.
     *
     * NOTE: Call this only after populating the dialog with content.
     * @param options The options to be used when opening the dialog.
     * @param closeFn The function to execute whenever the dialog is closed.
     * @since 2.0.0
     */
    open(options?: DialogOptions, closeFn?: () => void): this;

    /**
     * Prepares the dialog for use and returns a reference to its content area.
     * @param title The title of the dialog.
     * @param classNames The space-separated-list of classes to add to the dialog.
     * @since 2.0.0
     * @deprecated in 2.37.0 in favor of Dialog.create()
     * @example
     * // Basic example.
     * Dialog.setup();
     * Dialog.wiki("Blah //blah// ''blah''.");
     * Dialog.open();
     *
     * @example
     * // Adding a title to the dialog.
     * Dialog.setup("Character Sheet");
     * Dialog.wiki(Story.get("PC Sheet").processText());
     * Dialog.open();
     *
     * @example
     * // Adding a title and class to the dialog.
     * Dialog.setup("Character Sheet", "charsheet");
     * Dialog.wiki(Story.get("PC Sheet").processText());
     * Dialog.open();
     */
    setup(title?: string, classNames?: string): HTMLElement;

    /**
     * Renders the given markup and appends it to the dialog's content area.
     *
     * NOTE: If your content consists of DOM nodes, you'll need to use the @see Dialog.append() method instead.
     * @param wikiMarkup The markup to render.
     * @since 2.9.0
     * @example
     * Dialog.wiki("Cry 'Havoc!', and let slip the //ponies// of ''friendship''.");
     */
    wiki(wikiMarkup: string): this;
    /**
     * Renders the passage by the given name and appends it to the dialog's content area. Returns a reference to the Dialog object for chaining.
     *
     * @param name The name of the passage to render.
     * @since 2.37.0
     * @example
     * Dialog.wikiPassage("Inventory");
     */
    wikiPassage(name: string): this;
}

export interface FullscreenRequestOptions {
    /**
     * Determines the fullscreen navigation UI preference. Valid values are (default: "auto"):
     * * "auto": Indicates no preference.
     * * "hide": Request that the browser's navigation UI be hidden. The full dimensions of the screen will be used to
     *    display the element.
     * * "show": Request that the browser's navigation UI be shown. The screen dimensions allocated to the element will
     *    be clamped to leave room for the UI.
     */
    navigationUI: "auto" | "hide" | "show";
}

/**
 * Provides access to browsers' fullscreen functionality.
 */
export interface FullscreenAPI {
    /**
     * Current fullscreen element or, if fullscreen mode is not active, null.
     * @since 2.31.0
     */
    readonly element: HTMLElement;

    /**
     * Returns whether fullscreen is both supported and enabled.
     * @since 2.31.0
     */
    isEnabled(): boolean;

    /**
     * Returns whether fullscreen mode is currently active.
     * @since 2.31.0
     */
    isFullscreen(): boolean;

    /**
     * Request that the browser enter fullscreen mode.
     * @param options The fullscreen options object.
     * @param requestedEl The element to enter fullscreen mode with. If omitted, defaults to the entire page.
     * @since 2.31.0
     */
    request(options?: FullscreenRequestOptions, requestedEl?: HTMLElement): Promise<void>;

    /**
     * Request that the browser exit fullscreen mode.
     * @since 2.31.0
     */
    exit(): Promise<void>;

    /**
     * Request that the browser toggle fullscreen mode—i.e., enter or exit as appropriate.
     * @param options The fullscreen options object. See Fullscreen.request() for more information.
     * @param requestedEl The element to toggle fullscreen mode with. If omitted, defaults to the entire page.
     * @since 2.31.0
     */
    toggle(options?: FullscreenRequestOptions, requestedEl?: HTMLElement): Promise<void>;

    /**
     * Attaches fullscreen change event handlers.
     * @param handlerFn The function to invoke when fullscreen mode is changed.
     * @param requestedEl The element to attach the handler to.
     * @since 2.31.0
     */
    onChange(handlerFn: (ev: JQuery.Event) => void, requestedEl?: HTMLElement): void;

    /**
     * Removes fullscreen change event handlers.
     * @param handlerFn The function to remove. If omitted, will remove all handler functions.
     * @param requestedEl The element to remove the handler(s) from.
     * @since 2.31.0
     */
    offChange(handlerFn: (ev: JQuery.Event) => void, requestedEl?: HTMLElement): void;

    /**
     * Attaches fullscreen error event handlers.
     * @param handlerFn The function to invoke when fullscreen mode encounters an error.
     * @param requestedEl The element to attach the handler to.
     * @since 2.31.0
     */
    onError(handlerFn: (ev: JQuery.Event) => void, requestedEl?: HTMLElement): void;

    /**
     * Removes fullscreen error event handlers.
     * @param handlerFn The function to remove. If omitted, will remove all handler functions.
     * @param requestedEl The element to remove the handler(s) from.
     * @since 2.31.0
     */
    offError(handlerFn: (ev: JQuery.Event) => void, requestedEl?: HTMLElement): void;
}

export interface LoadScreenAPI {
    /**
     * Acquires a loading screen lock and returns its ID. Displays the loading screen, if necessary.
     * @since 2.15.0
     */
    lock(): number;

    /**
     * Releases the loading screen lock with the given ID. Hides the loading screen, if no other locks exist.
     * @param lockId The loading screen lock ID.
     * @since 2.15.0
     * @example
     * var lockId = LoadScreen.lock();
     * // Do something whose timing is unpredictable that should be hidden by the loading screen
     * LoadScreen.unlock(lockId);
     */
    unlock(lockId: number): void;
}

export interface UIAPI {
    /**
     * Opens the built-in alert dialog, displaying the given message to the player.
     * @param message The message to display to the player.
     * @param options The options object. @see Dialog.addClickHandler() for more information.
     * @param closeFn The function to execute whenever the dialog is closed.
     * @since 2.0.0
     */
    alert(message: string, options?: DialogOptions, closeFn?: () => void): void;

    /**
     * Opens the built-in jump to dialog, which is populated via the bookmark tag.
     * @param options The options object. @see Dialog.addClickHandler() for more information.
     * @param closeFn The function to execute whenever the dialog is closed.
     * @since 2.0.0
     * @deprecated 2.37.0
     */
    jumpto(options?: DialogOptions, closeFn?: () => void): void;

    /**
     * Opens the built-in restart dialog, prompting the player to restart the story.
     * @param options The options object. @see Dialog.addClickHandler() for more information.
     * @since 2.0.0
     */
    restart(options?: DialogOptions): void;

    /**
     * Opens the built-in saves dialog.
     * @param options The options object. See Dialog.addClickHandler() for more information.
     * @param closeFn The function to execute whenever the dialog is closed.
     * @since 2.0.0
     */
    saves(options?: DialogOptions, closeFn?: () => void): void;

    /**
     * Opens the built-in settings dialog, which is populated from the Setting API.
     * @param options The options object. See Dialog.addClickHandler() for more information.
     * @param closeFn The function to execute whenever the dialog is closed.
     * @since 2.0.0
     */
    settings(options?: DialogOptions, closeFn?: () => void): void;

    /**
     * Opens the built-in share dialog, which is populated from the StoryShare passage.
     * @param options The options object. See Dialog.addClickHandler() for more information.
     * @param closeFn The function to execute whenever the dialog is closed.
     * @since 2.0.0
     * @deprecated 2.37.0
     */
    share(options?: DialogOptions, closeFn?: () => void): void;

    /**
     * Triggers a :uiupdate event that causes the update of the dynamically updated sections built-in
     * user interface—e.g., those populated by code passages, like StoryCaption and StoryMenu.
     * Automatically invoked during passage navigation.
     *
     * WARNING: As all dynamically updated sections of the built-in UI are updated, save for the main
     * passage display, it is recommended that this method be used sparingly.
     * Ideally, if you need to update these sections of the built-in UI outside of the normal passage
     * navigation update, then you should update only the specific areas you need to rather than the entire UI.
     * @since 2.37.0
     */
    update(): void;
}

export interface UIBarAPI {
    /**
     * Completely removes the UI bar and all of its associated styles and event handlers.
     * @since 2.17.0
     */
    destroy(): void;

    /**
     * Hides the UI bar. Returns a reference to the UIBar object for chaining.
     *
     * NOTE: This does not reclaim the space reserved for the UI bar. Thus, a call to UIBar.stow() may also be necessary.
     * Alternatively, if you simply want the UI bar gone completely and permanently, either using UIBar.destroy() or the
     * StoryInterface special passage may be a better choice.
     * @since 2.29.0
     */
    hide(): this;

    /**
     * Returns whether the UI bar is currently hidden.
     * @since 2.29.0
     */
    isHidden(): boolean;

    /**
     * Returns whether the UI bar is currently stowed.
     * @since 2.29.0
     */
    isStowed(): boolean;

    /**
     * Shows the UI bar. Returns a reference to the UIBar object for chaining.
     * @since 2.29.0
     */
    show(): this;

    /**
     * Stows the UI bar, so that it takes up less space.
     * @param noAnimation Whether to skip the default animation.
     * @since 2.17.0
     * @since 2.29.0: Added returned UIBar chaining reference.
     */
    stow(noAnimation?: boolean): this;

    /**
     * Unstows UI bar, so that it is fully accessible again.
     * @param noAnimation Whether to skip the default animation.
     * @since 2.17.0
     * @since 2.29.0: Added returned UIBar chaining reference.
     */
    unstow(noAnimation?: boolean): this;

    /**
     * Updates all sections of the UI bar that are populated by special passages — e.g., StoryBanner,
     * StoryCaption, StoryMenu, etc.
     * WARNING: As all special passage populated sections are updated it is recommended that
     * UIBar.update() be used sparingly. Ideally, if you need to update UI bar content outside of
     * the normal passage navigation update, then you should update only the specific areas you
     * need to rather than the entire UI bar.
     *
     * @since 2.29.0 Introduced
     * @deprecated 2.37.0 in favor of UI.update()
     */
    update(): void;
}

export {};
