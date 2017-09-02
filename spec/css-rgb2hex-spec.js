'use babel';

import CssRgb2hex from '../lib/css-rgb2hex';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('CssRgb2hex', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('css-rgb2hex');
  });

  describe('when the css-rgb2hex:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.css-rgb2hex')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'css-rgb2hex:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.css-rgb2hex')).toExist();

        let cssRgb2hexElement = workspaceElement.querySelector('.css-rgb2hex');
        expect(cssRgb2hexElement).toExist();

        let cssRgb2hexPanel = atom.workspace.panelForItem(cssRgb2hexElement);
        expect(cssRgb2hexPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'css-rgb2hex:toggle');
        expect(cssRgb2hexPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.css-rgb2hex')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'css-rgb2hex:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let cssRgb2hexElement = workspaceElement.querySelector('.css-rgb2hex');
        expect(cssRgb2hexElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'css-rgb2hex:toggle');
        expect(cssRgb2hexElement).not.toBeVisible();
      });
    });
  });
});
