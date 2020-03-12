import {
  JupyterFrontEnd, JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ICommandPalette } from '@jupyterlab/apputils';
import { ILauncher } from '@jupyterlab/launcher';
import { IMainMenu } from '@jupyterlab/mainmenu';

import { Menu } from '@lumino/widgets';

import { ExamplePanel } from './panel';

namespace CommandIDs {
  export const create = 'clash:create';
}

/**
 * Initialization data for the clash extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'clash',
  autoStart: true,
  optional: [ILauncher],
  requires: [ICommandPalette, IMainMenu],
  activate: activate
};

function activate(
  app: JupyterFrontEnd,
  palette: ICommandPalette,
  mainMenu: IMainMenu,
  launcher: ILauncher | null
): void {
  const manager = app.serviceManager;
  const { commands, shell } = app;
  const category = 'CLASh';

  // Add launcher
  if (launcher) {
    launcher.add({
      command: CommandIDs.create,
      category: category
    });
  }

  async function createPanel(): Promise<ExamplePanel> {
    const panel = new ExamplePanel(manager);
    shell.add(panel, 'main');
    return panel;
  }

  // add menu tab
  const clashMenu = new Menu({ commands });
  clashMenu.title.label = 'CLASh';
  mainMenu.addMenu(clashMenu);

  // add commands to registry
  commands.addCommand(CommandIDs.create, {
    label: 'Open CLASh',
    caption: 'Open CLASh',
    execute: createPanel
  });

  // add items in command palette and menu
  palette.addItem({ command: CommandIDs.create, category });
  clashMenu.addItem({ command: CommandIDs.create });
}

export default extension;
