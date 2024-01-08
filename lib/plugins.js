const commands = [];
//const Config = require('../../config');

function Joshbot(info, logic, button) {
    var data = info;
    data.function = logic;
    if (!button) data.button = false;
    if (!info.name) data.name = false;
    if (!info.alias) data.alias = false;
    if (!info.react) data.react = false;
    if (!info.need) data.need = false;
    if (!info.category) data.category = "others";
    if (!info.desc) data.desc = false;
    if (!info.rule) data.rule = 0;
    if (!info.cooldown) data.cooldown = 6;
    if (!info.filename) data.filename = false;
    if (!info.notCmd) data.notCmd = false;
    commands.push(data);
}

module.exports = { Joshbot, commands };