import {
  JupyterFrontEnd, JupyterFrontEndPlugin
} from '@jupyterlab/application';


/**
 * Initialization data for the clash extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'clash',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension clash is activated!');
  }
};

export default extension;
