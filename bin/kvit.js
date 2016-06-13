#!/usr/bin/env node

'use strict';

const Operetta = require('operetta').Operetta;
const operetta = new Operetta();
const kvit = require('./../src/index');
var twitterUser = '';

const setUser = function (value) {
  twitterUser = value;
};

operetta.parameters(['-u', '--user'], 'Twitter username', setUser);

operetta.command('get', 'Get a key-value pair of a specific key', function (command) {
  command.parameters(['-u', '--user'], 'Twitter username', setUser);
  command.start(function (values) {
    const client = kvit({
      user: twitterUser,
    });
    var key = values.positional[0];
    client.get(key, function (err, result) {
      if (err) console.log(err);
      console.log(result);
    });
  });
});

operetta.start(function (values) {
  const subcommand = values.positional[0];
  const command = operetta.commands[subcommand];
  if (command) {
    const args = [values.positional[1]];
    var child = new Operetta(args);
    child.parent = operetta;
    command(child);
  }
});
