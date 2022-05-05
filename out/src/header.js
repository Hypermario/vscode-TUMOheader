"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderHeader = exports.getHeaderInfo = exports.extractHeader = exports.supportsLanguage = void 0;
var moment = require("moment");
var delimiters_1 = require("./delimiters");
var genericTemplate = "\n********************************************************************************\n*                                                                              *\n*                                               _________    ______________    *\n*     $FILENAME____________________________    (__   ____)  (  _   _   __  )   *\n*     By: $AUTHOR__________________________       | | | |   | | | | | |  | |   *\n*                                                 | | | |___| | | | | |__| |   *\n*     Created: $CREATEDAT__________________       |_| (_______) |_| (______)   *\n*     Updated: $UPDATEDAT_________ by $UPDATEDBY________________     $CITY____ *\n*                                                                              *\n********************************************************************************\n".substring(1);
var getTemplate = function (languageId) {
    var _a = delimiters_1.languageDemiliters[languageId], left = _a[0], right = _a[1];
    var width = left.length;
    return genericTemplate
        .replace(new RegExp("^(.{".concat(width, "})(.*)(.{").concat(width, "})$"), 'gm'), left + '$2' + right);
};
var pad = function (value, width) {
    return value.concat(' '.repeat(width)).substr(0, width);
};
var formatDate = function (date) {
    return date.format('YYYY/MM/DD HH:mm:ss');
};
var parseDate = function (date) {
    return moment(date, 'YYYY/MM/DD HH:mm:ss');
};
var supportsLanguage = function (languageId) {
    return languageId in delimiters_1.languageDemiliters;
};
exports.supportsLanguage = supportsLanguage;
var extractHeader = function (text) {
    var headerRegex = "^(.{80}(\r\n|\n)){9}";
    var match = text.match(headerRegex);
    return match ? match[0].split('\r\n').join('\n') : null;
};
exports.extractHeader = extractHeader;
var fieldRegex = function (name) {
    return new RegExp("^((?:.*\\\n)*.*)(\\$".concat(name, "_*)"), '');
};
var getFieldValue = function (header, name) {
    var _a = genericTemplate.match(fieldRegex(name)), _ = _a[0], offset = _a[1], field = _a[2];
    return header.substr(offset.length, field.length);
};
var setFieldValue = function (header, name, value) {
    var _a = genericTemplate.match(fieldRegex(name)), _ = _a[0], offset = _a[1], field = _a[2];
    return header.substr(0, offset.length)
        .concat(pad(value, field.length))
        .concat(header.substr(offset.length + field.length));
};
var getHeaderInfo = function (header) { return ({
    filename: getFieldValue(header, 'FILENAME'),
    author: getFieldValue(header, 'AUTHOR'),
    createdAt: parseDate(getFieldValue(header, 'CREATEDAT')),
    city: getFieldValue(header, 'CITY'),
    updatedBy: getFieldValue(header, 'UPDATEDBY'),
    updatedAt: parseDate(getFieldValue(header, 'UPDATEDAT'))
}); };
exports.getHeaderInfo = getHeaderInfo;
var renderHeader = function (languageId, info) { return [
    { name: 'FILENAME', value: info.filename },
    { name: 'AUTHOR', value: info.author },
    { name: 'CREATEDAT', value: formatDate(info.createdAt) },
    { name: 'CITY', value: info.city },
    { name: 'UPDATEDAT', value: formatDate(info.updatedAt) },
    { name: 'UPDATEDBY', value: info.updatedBy }
].reduce(function (header, field) {
    return setFieldValue(header, field.name, field.value);
}, getTemplate(languageId)); };
exports.renderHeader = renderHeader;
//# sourceMappingURL=header.js.map