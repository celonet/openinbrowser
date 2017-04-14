'use strict';

import * as vscode from 'vscode';
import * as path from 'path';

var exec = require('child_process').exec;

export function activate(context: vscode.ExtensionContext) {

    let disposable = vscode.commands.registerCommand('extension.openInBrowser', (e: vscode.Uri) => {
        if (e) {
            openFile(e.fsPath);
        } else {
            let editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showErrorMessage('No active text editor found');
                return;
            }

            const file = editor.document.fileName;
            openFile(`file:///${file}`);
        }
    });

    context.subscriptions.push(disposable);
}

function openFile(filePath: string) {
    const ext = path.extname(filePath.toString());
    /^\.(html|htm|shtml|xhtml)$/.test(ext) ?
        exec(`start ${filePath}`) :
        vscode.window.showInformationMessage('Supports html file only!');
}

export function deactivate() {
}