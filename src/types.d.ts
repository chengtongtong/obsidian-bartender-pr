import type { i18n } from "i18next";
import "obsidian";
import "sortablejs";
import Sortable from "sortablejs";

declare global {
  const i18next: i18n;
}

declare module "sortablejs" {
  interface SortableEvent extends Event {
    items: HTMLElement[];
  }
}
declare module "obsidian" {
  export interface Workspace extends Events {
    on(name: "view-registered", callback: (type: string, viewCreator: ViewCreator) => any, ctx?: any): EventRef;
    on(name: "file-explorer-load", callback: (fileExplorer: FileExplorerView) => any, ctx?: any): EventRef;
    on(name: "file-explorer-sort-change", callback: (sortMethod: string) => any, ctx?: any): EventRef;
  }
  export interface PluginInstance {
    id: string;
  }
  export interface ViewRegistry {
    viewByType: Record<string, (leaf: WorkspaceLeaf) => unknown>;
    isExtensionRegistered(extension: string): boolean;
  }

  export interface App {
    internalPlugins: InternalPlugins;
    viewRegistry: ViewRegistry;
  }
  export interface InstalledPlugin {
    enabled: boolean;
    instance: PluginInstance;
  }

  export interface InternalPlugins {
    plugins: Record<string, InstalledPlugin>;
    getPluginById(id: string): InstalledPlugin;
  }
  export interface FileExplorerView extends View {
    dom: FileExplorerViewDom;
    createFolderDom(folder: TFolder): FileExplorerFolder;
    headerDom: FileExplorerHeader;
    sortOrder: string;
    hasCustomSorter?: boolean;
  }
  interface FileExplorerHeader {
    addSortButton(sorter: (sortType: string) => void, sortOrder: () => string): void;
  }
  interface FileExplorerFolder {}
  export interface FileExplorerViewDom {
    infinityScroll: InfinityScroll;
    navFileContainerEl: HTMLElement;
  }
  export interface InfinityScroll {
    rootEl: RootElements;
  }
  export interface RootElements {
    childrenEl: HTMLElement;
    children: ChildElement[];
    file: TAbstractFile;
    sorter: Sortable;
    fileExplorer: FileExplorerView;
  }
  export interface ChildElement {
    el: HTMLElement;
    file: TAbstractFile;
    fileExplorer: FileExplorerView;
    titleEl: HTMLElement;
    titleInnerEl: HTMLElement;
    children?: ChildElement[];
    childrenEl?: HTMLElement;
    sorter?: Sortable;
  }
}