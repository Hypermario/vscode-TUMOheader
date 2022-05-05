"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
var path_1 = require("path");
var vscode = require("vscode");
var moment = require("moment");
var vscode_1 = require("vscode");
var header_1 = require("./header");
var getCurrentUser = function () {
    return vscode.workspace.getConfiguration()
        .get('TUMOheader.username') || 'tumo';
};
var getCurrentCity = function () {
    return vscode.workspace.getConfiguration()
        .get('TUMOheader.city') || "world";
};
var newHeaderInfo = function (document, headerInfo) {
    var user = getCurrentUser();
    var city = getCurrentCity();
    return Object.assign({}, {
        createdAt: moment(),
    }, headerInfo, {
        filename: (0, path_1.basename)(document.fileName),
        author: "".concat(user),
        city: city,
        updatedAt: moment(),
        updatedBy: user,
    });
};
var insertHeaderHandler = function () {
    var activeTextEditor = vscode.window.activeTextEditor;
    var document = activeTextEditor.document;
    if ((0, header_1.supportsLanguage)(document.languageId))
        activeTextEditor.edit(function (editor) {
            var currentHeader = (0, header_1.extractHeader)(document.getText());
            if (currentHeader)
                editor.replace(new vscode_1.Range(0, 0, 10, 0), (0, header_1.renderHeader)(document.languageId, newHeaderInfo(document, (0, header_1.getHeaderInfo)(currentHeader))));
            else
                editor.insert(new vscode_1.Position(0, 0), (0, header_1.renderHeader)(document.languageId, newHeaderInfo(document)));
        });
    else
        vscode.window.showInformationMessage("No header support for language ".concat(document.languageId));
};
var startUpdateOnSaveWatcher = function (subscriptions) {
    return vscode.workspace.onWillSaveTextDocument(function (event) {
        var document = event.document;
        var currentHeader = (0, header_1.extractHeader)(document.getText());
        event.waitUntil(Promise.resolve((0, header_1.supportsLanguage)(document.languageId) && currentHeader ?
            [
                vscode_1.TextEdit.replace(new vscode_1.Range(0, 0, 10, 0), (0, header_1.renderHeader)(document.languageId, newHeaderInfo(document, (0, header_1.getHeaderInfo)(currentHeader))))
            ]
            : []));
    }, null, subscriptions);
};
var activate = function (context) {
    var disposable = vscode.commands
        .registerTextEditorCommand('TUMOheader.insertHeader', insertHeaderHandler);
    context.subscriptions.push(disposable);
    startUpdateOnSaveWatcher(context.subscriptions);
};
exports.activate = activate;
//# sourceMappingURL=extension.js.map